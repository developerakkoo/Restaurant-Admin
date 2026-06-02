import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChatHistoryResponse, ChatMessage, ChatSummary } from '../folder/auth/chat/chat.models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  private authHeaders() {
    return {
      headers: {
        'x-access-token': this.auth.accessToken.value,
      },
    };
  }

  getAllChats(): Observable<ChatSummary[]> {
    return this.http
      .get<{ data: ChatSummary[] }>(environment.URL + 'chat/active', this.authHeaders())
      .pipe(map((res) => res.data || []));
  }

  getMessagesByChatId(
    userId: string,
    options?: { before?: string; limit?: number }
  ): Observable<ChatHistoryResponse> {
    const adminId = this.auth.userId.value;
    let params = new HttpParams();
    if (options?.before) {
      params = params.set('before', options.before);
    }
    if (options?.limit) {
      params = params.set('limit', String(options.limit));
    }
    return this.http
      .get<{ data: ChatMessage[] | ChatHistoryResponse }>(
        environment.URL + `chat/history/admin/${userId}/${adminId}`,
        { ...this.authHeaders(), params }
      )
      .pipe(
        map((res) => {
          const payload = res.data;
          if (payload && !Array.isArray(payload) && 'messages' in payload) {
            return payload as ChatHistoryResponse;
          }
          const messages = (Array.isArray(payload) ? payload : []) as ChatMessage[];
          return {
            messages,
            hasMore: messages.length >= (options?.limit ?? 50),
          };
        })
      );
  }

  markChatAsRead(userId: string): Observable<unknown> {
    return this.http.put(
      environment.URL + `chat/read/${userId}`,
      {},
      this.authHeaders()
    );
  }
}
