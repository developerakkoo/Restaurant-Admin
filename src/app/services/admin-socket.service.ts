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
  private orderCancelledSubject = new Subject<any>();
  private refundRequiredSubject = new Subject<any>();
  private orderStatusUpdateSubject = new Subject<any>();

  readonly driverStatusChanged$ = this.driverStatusChangedSubject.asObservable();
  readonly orderCancelled$ = this.orderCancelledSubject.asObservable();
  readonly refundRequired$ = this.refundRequiredSubject.asObservable();
  readonly orderStatusUpdate$ = this.orderStatusUpdateSubject.asObservable();

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

    this.socket.on('orderCancelled', (event: any) => {
      this.orderCancelledSubject.next(event);
    });

    this.socket.on('refundRequired', (event: any) => {
      this.refundRequiredSubject.next(event);
    });

    this.socket.on('orderStatusUpdate', (event: any) => {
      this.orderStatusUpdateSubject.next(event);
    });
  }

  onDriverStatusChanged(): Observable<DriverStatusChangeEvent> {
    return this.driverStatusChanged$;
  }

  onOrderCancelled(): Observable<any> {
    return this.orderCancelled$;
  }

  onRefundRequired(): Observable<any> {
    return this.refundRequired$;
  }

  onOrderStatusUpdate(): Observable<any> {
    return this.orderStatusUpdate$;
  }
}
