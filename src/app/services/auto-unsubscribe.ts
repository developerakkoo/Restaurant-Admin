import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

export class AutoUnsubscribe implements OnDestroy {
  private subscriptions: Subscription[] = [];

  protected trackSubscription(subscription: Subscription): void {
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.subscriptions = [];
  }
}