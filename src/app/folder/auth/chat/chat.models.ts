export type ChatViewMode = 'list' | 'thread';

export type ChatListFilter = 'all' | 'unread';

export interface ChatUser {
  _id?: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  profileImage?: string;
}

export interface ChatLastMessage {
  _id?: string;
  text?: string;
  time?: string | Date;
  isUser?: boolean;
  isRead?: boolean;
  orderId?: string | null;
  userId?: string;
  adminId?: string;
}

export interface ChatSummary {
  _id: string;
  user: ChatUser;
  lastMessage?: ChatLastMessage;
  unreadCount?: number;
}

export interface ChatMessage {
  _id?: string;
  text: string;
  time: string | Date;
  isUser: boolean;
  isRead?: boolean;
  userId?: string;
  adminId?: string;
  orderId?: string | null;
}

export interface ChatHistoryResponse {
  messages: ChatMessage[];
  hasMore: boolean;
}
