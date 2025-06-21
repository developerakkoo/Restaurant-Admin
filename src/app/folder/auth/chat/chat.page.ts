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

  messages: any[] = [
   
  ];
  activeChats: any[] = [
   
  ];
  chatName:string = "";
  message:string = "";
  orderId:any = "";
  senderId:string = "666979f2983fa6cd5cf79d08";
  receiverId:string = "";
  chatId:any = "";
  selectedChatUserImage: string = "assets/icon/favicon.png";
  interval:any;
  constructor(private auth:AuthService,
              private socket: Socket,
              private loadingController: LoadingController
  ) {}

  ngOnInit() {
    console.log("chat page");
    this.socket.connect();
    this.socket.on('connect', () => {
      console.log('Socket connected');
    });

    this.socket.on('chatMessage', (msg: any) => {
      console.log('New message received:', msg);
      console.log('Message isUser:', msg.isUser);
      console.log('Current receiverId:', this.receiverId);
      
      // Check if this message belongs to the current conversation
      if (msg.userId === this.receiverId || msg.adminId === this.senderId) {
        this.messages.push(msg);
        console.log('Message added to conversation. Total messages:', this.messages.length);
        this.scrolToBottom();
      } else {
        console.log('Message not for current conversation');
      }
    });
    
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
        console.log(value);
        this.activeChats = value['data'];
    // this.getMessagesByChatId();
        
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error.error);
        
      }
    })
  }



  openChat(chatId:any){
    this.orderId = chatId.lastMessage.orderId;
    this.receiverId = chatId.user._id;
    this.chatId = chatId._id;
    console.log(this.chatId);
    this.chatName = chatId.user.phoneNumber;
    this.selectedChatUserImage = chatId.user.profileImage || 'assets/icon/favicon.png';
    this.socket.emit("joinChatRoom", { isAdmin:true, userId: this.receiverId });
    this.messages = [];
    this.getMessagesByChatId();
    
  }


  getMessagesByChatId(){
    if (!this.receiverId) return;
    
    this.auth.getMessagesByChatId(this.receiverId)
    .subscribe({
      next:async(value:any) =>{
        console.log('Messages loaded:', value);
        this.messages = value['data'];
        console.log('Messages array:', this.messages);
        this.scrolToBottom();
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error.error);
        
      }
    })
  }
  
  sendMessage(){
    if (!this.message.trim() || !this.chatId) return;
    
    const messageData = {
      text: this.message,
      adminId: this.senderId,
      userId: this.receiverId,
      isUser: false,
      time: new Date(),
      chatId: this.chatId
    };
    
    console.log('Sending message:', messageData);
    this.socket.emit("sendMessage", messageData);
    
    // Add message to local array immediately for instant feedback
    // this.messages.push(messageData);
    console.log('Updated messages array:', this.messages);
    this.scrolToBottom();
    
    // Clear the input
    this.message = '';
  }
}
