import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IonContent, LoadingController } from '@ionic/angular';
import { Socket } from 'ngx-socket-io';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild(IonContent, { static: false }) content!: IonContent;
  @ViewChild('messagesContainer', { static: false }) messagesContainer!: ElementRef;

  messages: any[] = [];
  activeChats: any[] = [];
  chatName:string = "";
  message:string = "";
  orderId:any = "";
  senderId:string = "";
  receiverId:string = "";
  chatId:any = "";
  selectedChatUserImage: string = "assets/icon/favicon.png";
  interval:any;
  private chatRoomUserId: string | null = null;

  constructor(private auth:AuthService,
              private socket: Socket,
              private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.senderId = this.auth.userId.value || '';
    this.initializeSocketListeners();
  }


  ionViewDidEnter(){
this.getAllChats();

  }

  ionViewDidLeave(){
    clearInterval(this.interval);
    this.socket.removeAllListeners("chatMessage");
    this.socket.disconnect();
  }
  onSearchChange(ev: any) {}

  
  scrolToBottom() {
    setTimeout(() => {
      if (this.messagesContainer) {
        const element = this.messagesContainer.nativeElement;
        element.scrollTop = element.scrollHeight;
      }
    }, 100);
  }


  getAllChats(){
    this.auth.getAllChats()
    .subscribe({
      next:async(value:any) =>{
        this.activeChats = (value['data'] || []).map((chat: any) => ({
          ...chat,
          unreadCount: chat.unreadCount || 0,
        }));
        this.sortActiveChats();
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error.error);
        
      }
    })
  }



  openChat(chatId:any){
    const userIdentifier = this.normalizeId(chatId.user?._id || chatId._id);
    this.orderId = chatId.lastMessage?.orderId || null;
    this.receiverId = userIdentifier;
    this.chatId = userIdentifier;
    this.chatName = chatId.user?.phoneNumber || chatId.user?.name || 'Customer';
    this.selectedChatUserImage = chatId.user?.profileImage || 'assets/icon/favicon.png';
    this.joinChatRoom(userIdentifier);
    this.messages = [];
    this.getMessagesByChatId();
    this.markChatAsRead(userIdentifier);
  }


  getMessagesByChatId(){
    if (!this.receiverId) return;
    
    this.auth.getMessagesByChatId(this.receiverId)
    .subscribe({
      next:async(value:any) =>{
        this.messages = value['data'] || [];
        this.scrolToBottom();
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error.error);
        
      }
    })
  }
  
  sendMessage(){
    const text = this.message.trim();
    if (!text || !this.chatId || !this.receiverId) return;
    
    const messageData = {
      text,
      adminId: this.senderId,
      userId: this.receiverId,
      isUser: false,
      time: new Date(),
      orderId: this.orderId || null,
    };
    
    this.socket.emit("sendMessage", messageData);
    
    const optimisticMessage = {
      ...messageData,
      isRead: true,
    };
    this.messages.push(optimisticMessage);
    this.updateChatPreview(this.receiverId, optimisticMessage, true);
    this.scrolToBottom();
    
    this.message = '';
  }

  private initializeSocketListeners() {
    if (!this.socket.ioSocket.connected) {
      this.socket.connect();
    }

    this.socket.on('connect', () => {
      console.log('Socket connected');
    });

    this.socket.on('chatMessage', (msg: any) => {
      this.handleIncomingMessage(msg);
    });
  }

  private handleIncomingMessage(msg: any) {
    if (!msg) {
      return;
    }
    const msgUserId = this.normalizeId(msg.userId);
    if (!msgUserId) {
      return;
    }
    const isCurrentChat =
      !!this.receiverId && msgUserId === this.receiverId;

    if (isCurrentChat) {
      this.messages.push(msg);
      this.scrolToBottom();
      this.markChatAsRead(msgUserId);
    }

    this.updateChatPreview(msgUserId, msg, msg.isUser === false && msg.adminId === this.senderId);
  }

  private joinChatRoom(userId: string) {
    if (!userId) return;
    this.chatRoomUserId = userId;
    this.socket.emit("joinChatRoom", { isAdmin:true, userId, adminId: this.senderId });
  }

  private markChatAsRead(userId: string) {
    if (!userId) return;
    this.auth.markChatAsRead(userId).subscribe({
      next: () => this.getAllChats(),
      error: (err) => console.error('Failed to mark chat as read', err)
    });
  }

  private updateChatPreview(userId: string, lastMessage: any, isAdminMessage: boolean) {
    if (!userId) {
      return;
    }

    const chatIndex = this.activeChats.findIndex((chat) => {
      const chatUserId = this.normalizeId(chat.user?._id || chat._id);
      return chatUserId === userId;
    });

    if (chatIndex === -1) {
      this.getAllChats();
      return;
    }

    const chat = this.activeChats[chatIndex];
    const unreadCount =
      userId === this.receiverId || isAdminMessage
        ? 0
        : (chat.unreadCount || 0) + 1;

    this.activeChats[chatIndex] = {
      ...chat,
      lastMessage: {
        ...(chat.lastMessage || {}),
        ...lastMessage,
      },
      unreadCount,
    };

    this.sortActiveChats();
  }

  private sortActiveChats() {
    this.activeChats.sort((a, b) => {
      const timeA = new Date(a.lastMessage?.time || 0).getTime();
      const timeB = new Date(b.lastMessage?.time || 0).getTime();
      return timeB - timeA;
    });
  }

  private normalizeId(value: any): string {
    if (!value) return '';
    if (typeof value === 'string') return value;
    if (typeof value === 'object' && value._id) {
      return value._id.toString();
    }
    if (value.toString) {
      return value.toString();
    }
    return '';
  }
}
