import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, Subject } from 'rxjs';

export interface DriverStatusChangeEvent {
  userId: string;
  userType: number;
  isOnline: boolean;
  lastSeen?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AdminSocketService {
  private initialized = false;
  private driverStatusChangedSubject = new Subject<DriverStatusChangeEvent>();

  readonly driverStatusChanged$ = this.driverStatusChangedSubject.asObservable();

  constructor(private socket: Socket) {}

  initAdminSocket(): void {
    if (this.initialized) {
      return;
    }

    this.initialized = true;
    this.socket.emit('adminJoin', {});

    this.socket.on('userStatusChanged', (event: DriverStatusChangeEvent) => {
      if (Number(event?.userType) !== 3) {
        return;
      }

      this.driverStatusChangedSubject.next({
        ...event,
        userId: event.userId?.toString(),
        isOnline: event.isOnline === true,
      });
    });
  }

  onDriverStatusChanged(): Observable<DriverStatusChangeEvent> {
    return this.driverStatusChanged$;
  }
}
