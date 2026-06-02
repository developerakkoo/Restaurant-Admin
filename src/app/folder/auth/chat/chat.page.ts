import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';
import { Socket } from 'ngx-socket-io';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import {
  ChatListFilter,
  ChatMessage,
  ChatSummary,
  ChatViewMode,
} from './chat.models';

dayjs.extend(relativeTime);

interface MessageGroup {
  dateLabel: string;
  messages: ChatMessage[];
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit, OnDestroy {
  @ViewChild('messagesContainer', { static: false })
  messagesContainer!: ElementRef<HTMLDivElement>;

  messages: ChatMessage[] = [];
  activeChats: ChatSummary[] = [];
  filteredChats: ChatSummary[] = [];
  messageGroups: MessageGroup[] = [];

  chatName = '';
  chatPhone = '';
  message = '';
  orderId: string | null = null;
  senderId = '';
  receiverId = '';
  chatId = '';
  selectedChatUserImage = 'assets/icon/favicon.png';
  selectedChat: ChatSummary | null = null;

  searchTerm = '';
  listFilter: ChatListFilter = 'all';
  viewMode: ChatViewMode = 'list';
  isMobileLayout = false;

  listLoading = false;
  listError = '';
  threadLoading = false;
  hasMoreMessages = false;
  loadingMore = false;

  socketConnected = false;

  private chatRoomUserId: string | null = null;
  constructor(
    private auth: AuthService,
    private chatService: ChatService,
    private socket: Socket,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.senderId = this.auth.userId.value || '';
    this.updateLayoutMode();
    this.initializeSocketListeners();
  }

  ionViewDidEnter() {
    this.getAllChats();
    if (this.receiverId) {
      this.joinChatRoom(this.receiverId);
    }
  }

  ngOnDestroy() {
    this.socket.off('chatMessage');
    this.socket.off('chatNotification');
    this.socket.off('connect');
    this.socket.off('disconnect');
  }

  @HostListener('window:resize')
  onResize() {
    this.updateLayoutMode();
  }

  private updateLayoutMode() {
    const wasMobile = this.isMobileLayout;
    this.isMobileLayout = window.innerWidth < 768;
    if (!this.isMobileLayout) {
      this.viewMode = this.receiverId ? 'thread' : 'list';
    } else if (!wasMobile && this.isMobileLayout && this.receiverId) {
      this.viewMode = 'thread';
    }
  }

  onSearchChange(ev: Event) {
    const value = (ev as CustomEvent).detail?.value ?? '';
    this.searchTerm = String(value).trim().toLowerCase();
    this.applyListFilters();
  }

  setListFilter(filter: ChatListFilter) {
    this.listFilter = filter;
    this.applyListFilters();
  }

  clearSearch() {
    this.searchTerm = '';
    this.applyListFilters();
  }

  private applyListFilters() {
    let list = [...this.activeChats];

    if (this.listFilter === 'unread') {
      list = list.filter((c) => (c.unreadCount || 0) > 0);
    }

    if (this.searchTerm) {
      list = list.filter((chat) => {
        const name = (chat.user?.name || '').toLowerCase();
        const phone = (chat.user?.phoneNumber || '').toLowerCase();
        const preview = (chat.lastMessage?.text || '').toLowerCase();
        return (
          name.includes(this.searchTerm) ||
          phone.includes(this.searchTerm) ||
          preview.includes(this.searchTerm)
        );
      });
    }

    this.filteredChats = list;
  }

  getAllChats() {
    this.listLoading = true;
    this.listError = '';
    this.chatService.getAllChats().subscribe({
      next: (data) => {
        this.activeChats = data.map((chat) => ({
          ...chat,
          unreadCount: chat.unreadCount || 0,
        }));
        this.sortActiveChats();
        this.applyListFilters();
        this.listLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        console.error(error.error);
        this.listError = 'Could not load conversations';
        this.listLoading = false;
      },
    });
  }

  openChat(chat: ChatSummary) {
    const userIdentifier = this.normalizeId(chat.user?._id || chat._id);
    this.selectedChat = chat;
    this.orderId = chat.lastMessage?.orderId
      ? this.normalizeId(chat.lastMessage.orderId)
      : null;
    this.receiverId = userIdentifier;
    this.chatId = userIdentifier;
    this.chatName = this.getDisplayName(chat);
    this.chatPhone = chat.user?.phoneNumber || '';
    this.selectedChatUserImage =
      chat.user?.profileImage || 'assets/icon/favicon.png';
    this.messages = [];
    this.messageGroups = [];
    this.joinChatRoom(userIdentifier);
    this.getMessagesByChatId();
    this.markChatAsRead(userIdentifier);
    if (this.isMobileLayout) {
      this.viewMode = 'thread';
    }
  }

  backToList() {
    this.viewMode = 'list';
  }

  getMessagesByChatId(before?: string) {
    if (!this.receiverId) return;

    const isLoadMore = !!before;
    if (isLoadMore) {
      this.loadingMore = true;
    } else {
      this.threadLoading = true;
    }

    this.chatService.getMessagesByChatId(this.receiverId, { before, limit: 50 }).subscribe({
      next: (res) => {
        if (isLoadMore) {
          this.messages = [...res.messages, ...this.messages];
        } else {
          this.messages = res.messages || [];
          if (!this.orderId && this.messages.length) {
            const withOrder = this.messages.find((m) => m.orderId);
            if (withOrder?.orderId) {
              this.orderId = this.normalizeId(withOrder.orderId);
            }
          }
        }
        this.hasMoreMessages = res.hasMore;
        this.buildMessageGroups();
        this.threadLoading = false;
        this.loadingMore = false;
        if (!isLoadMore) {
          this.scrollToBottom();
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error(error.error);
        this.threadLoading = false;
        this.loadingMore = false;
        this.showToast('Failed to load messages');
      },
    });
  }

  loadOlderMessages() {
    if (!this.hasMoreMessages || this.loadingMore || !this.messages.length) {
      return;
    }
    const oldest = this.messages[0];
    const before =
      typeof oldest.time === 'string'
        ? oldest.time
        : new Date(oldest.time).toISOString();
    this.getMessagesByChatId(before);
  }

  async sendMessage() {
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

    this.message = '';

    try {
      this.socket.emit('sendMessage', messageData);
      const optimisticMessage: ChatMessage = {
        ...messageData,
        isRead: true,
      };
      this.messages.push(optimisticMessage);
      this.buildMessageGroups();
      this.updateChatPreview(this.receiverId, optimisticMessage, true);
      this.scrollToBottom();
    } catch {
      this.message = text;
      this.showToast('Failed to send message');
    }
  }

  viewOrder() {
    if (this.orderId) {
      this.router.navigate(['folder', 'orders', 'view', this.orderId]);
    }
  }

  getDisplayName(chat: ChatSummary): string {
    if (chat.user?.name?.trim()) {
      return chat.user.name;
    }
    return chat.user?.phoneNumber || 'Customer';
  }

  getInitials(chat: ChatSummary): string {
    const name = chat.user?.name?.trim();
    if (name) {
      return name
        .split(' ')
        .map((p) => p[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
    }
    const phone = chat.user?.phoneNumber || '?';
    return phone.slice(-2);
  }

  getPreviewText(chat: ChatSummary): string {
    const text = chat.lastMessage?.text?.trim();
    return text || 'No messages yet';
  }

  formatListTime(time?: string | Date): string {
    if (!time) return '';
    const d = dayjs(time);
    if (d.isSame(dayjs(), 'day')) {
      return d.format('h:mm A');
    }
    if (d.isSame(dayjs().subtract(1, 'day'), 'day')) {
      return 'Yesterday';
    }
    return d.format('MMM D');
  }

  formatBubbleTime(time: string | Date): string {
    return dayjs(time).format('h:mm A');
  }

  isActiveChat(chat: ChatSummary): boolean {
    const id = this.normalizeId(chat.user?._id || chat._id);
    return id === this.receiverId;
  }

  chatRootClasses(): string {
    const classes = ['chat-root'];
    if (this.isMobileLayout) {
      classes.push(
        this.viewMode === 'list'
          ? 'chat-root--mobile-list'
          : 'chat-root--mobile-thread'
      );
    }
    return classes.join(' ');
  }

  private buildMessageGroups() {
    const groups: MessageGroup[] = [];
    let currentLabel = '';
    let currentMessages: ChatMessage[] = [];

    for (const msg of this.messages) {
      const label = this.getDateLabel(msg.time);
      if (label !== currentLabel) {
        if (currentMessages.length) {
          groups.push({ dateLabel: currentLabel, messages: currentMessages });
        }
        currentLabel = label;
        currentMessages = [msg];
      } else {
        currentMessages.push(msg);
      }
    }
    if (currentMessages.length) {
      groups.push({ dateLabel: currentLabel, messages: currentMessages });
    }
    this.messageGroups = groups;
  }

  private getDateLabel(time: string | Date): string {
    const d = dayjs(time);
    if (d.isSame(dayjs(), 'day')) return 'Today';
    if (d.isSame(dayjs().subtract(1, 'day'), 'day')) return 'Yesterday';
    return d.format('MMMM D, YYYY');
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.messagesContainer?.nativeElement) {
        const el = this.messagesContainer.nativeElement;
        el.scrollTop = el.scrollHeight;
      }
    }, 100);
  }

  private initializeSocketListeners() {
    if (!this.socket.ioSocket.connected) {
      this.socket.connect();
    }
    this.socketConnected = this.socket.ioSocket.connected;

    this.socket.on('connect', () => {
      this.socketConnected = true;
      if (this.chatRoomUserId) {
        this.joinChatRoom(this.chatRoomUserId);
      }
    });

    this.socket.on('disconnect', () => {
      this.socketConnected = false;
    });

    this.socket.on('chatMessage', (msg: ChatMessage) => {
      this.handleIncomingMessage(msg);
    });

    this.socket.on('chatNotification', (payload: { userId: string; lastMessage: ChatMessage }) => {
      if (payload?.userId && payload?.lastMessage) {
        this.updateChatPreview(
          this.normalizeId(payload.userId),
          payload.lastMessage,
          payload.lastMessage.isUser === false
        );
      } else {
        this.getAllChats();
      }
    });
  }

  private handleIncomingMessage(msg: ChatMessage) {
    if (!msg) return;
    const msgUserId = this.normalizeId(msg.userId);
    if (!msgUserId) return;

    const isCurrentChat = !!this.receiverId && msgUserId === this.receiverId;

    if (isCurrentChat) {
      this.messages.push(msg);
      this.buildMessageGroups();
      this.scrollToBottom();
      this.markChatAsRead(msgUserId);
    }

    this.updateChatPreview(
      msgUserId,
      msg,
      msg.isUser === false && msg.adminId === this.senderId
    );
  }

  private joinChatRoom(userId: string) {
    if (!userId) return;
    this.chatRoomUserId = userId;
    this.socket.emit('joinChatRoom', {
      isAdmin: true,
      userId,
      adminId: this.senderId,
    });
  }

  private markChatAsRead(userId: string) {
    if (!userId) return;
    this.chatService.markChatAsRead(userId).subscribe({
      next: () => {
        const idx = this.activeChats.findIndex(
          (c) => this.normalizeId(c.user?._id || c._id) === userId
        );
        if (idx !== -1) {
          this.activeChats[idx] = { ...this.activeChats[idx], unreadCount: 0 };
          this.applyListFilters();
        }
      },
      error: (err) => console.error('Failed to mark chat as read', err),
    });
  }

  private updateChatPreview(
    userId: string,
    lastMessage: ChatMessage,
    isAdminMessage: boolean
  ) {
    if (!userId) return;

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
    this.applyListFilters();
  }

  private sortActiveChats() {
    this.activeChats.sort((a, b) => {
      const timeA = new Date(a.lastMessage?.time || 0).getTime();
      const timeB = new Date(b.lastMessage?.time || 0).getTime();
      return timeB - timeA;
    });
  }

  private normalizeId(value: unknown): string {
    if (!value) return '';
    if (typeof value === 'string') return value;
    if (typeof value === 'object' && value !== null && '_id' in value) {
      return String((value as { _id: unknown })._id);
    }
    return String(value);
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2500,
      position: 'bottom',
      cssClass: 'de-toast',
    });
    await toast.present();
  }
}
