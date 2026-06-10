import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AdminSocketService } from 'src/app/services/admin-socket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-delivery-boy',
  templateUrl: './delivery-boy.page.html',
  styleUrls: ['./delivery-boy.page.scss'],
})
export class DeliveryBoyPage implements OnInit, OnDestroy {
  boys:any[] = [];
  query:string = "";
  status:string = "";
  verificationStatusFilter = "";
  private statusSubscription?: Subscription;

  constructor(
    private auth:AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private adminSocket: AdminSocketService
  ) {}

  ngOnInit() {
    console.log('DeliveryBoyPage initialized');
    this.adminSocket.initAdminSocket();
    this.statusSubscription = this.adminSocket.onDriverStatusChanged().subscribe((event) => {
      this.boys = this.boys.map((boy) =>
        boy._id === event.userId
          ? { ...boy, isOnline: event.isOnline, lastSeen: event.lastSeen }
          : boy
      );
    });
  }

  ngOnDestroy() {
    this.statusSubscription?.unsubscribe();
  }

  onSearchChange(ev: any) {
    console.log(ev.detail.value);
    this.query = ev.detail.value;
    this.getAllDeliveryBoys();
  }

  ionViewDidEnter(){
    this.getAllDeliveryBoys();
  }

  filterEvent(ev:any){
    console.log(ev.detail.value);
    this.status = ev.detail.value;
    this.getAllDeliveryBoys();
  }

  onVerificationFilterChange(ev: any) {
    this.verificationStatusFilter = ev.detail.value || '';
    this.getAllDeliveryBoys();
  }

  getVerificationLabel(status?: string): string {
    switch (status) {
      case 'pending_review':
        return 'Pending Review';
      case 'verified':
        return 'Verified';
      case 'rejected_reupload':
        return 'Rejected (Re-upload)';
      case 'permanently_rejected':
        return 'Permanently Rejected';
      default:
        return 'Not Submitted';
    }
  }

  getVerificationColor(status?: string): string {
    switch (status) {
      case 'pending_review':
        return 'warning';
      case 'verified':
        return 'success';
      case 'rejected_reupload':
        return 'tertiary';
      case 'permanently_rejected':
        return 'danger';
      default:
        return 'medium';
    }
  }

  async getAllDeliveryBoys(){
    this.auth.getAllDeliveryBoys(
      this.query,
      1,
      50,
      '',
      '',
      this.status,
      '',
      this.verificationStatusFilter
    )
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
        this.boys = value['data']['content'];
        
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error.error);
        
      }
    })
  }
  viewNotifications() {
    this.router.navigate(['folder', 'notifications']);
  }
viewBoy(id:any){
  this.router.navigate(['folder','delivery-boy','view',id])
}
openDriverRegisterPage(){
  this.router.navigate(['folder','delivery-boy','add'])
    }


    block(id:any){
      this.auth.blockDeliveryBoy(id,1)
      .subscribe({
        next:async(value:any) =>{
          console.log(value);
          this.getAllDeliveryBoys();
        },
        error:async(error:HttpErrorResponse) =>{
          console.log(error);
          
        }
      })
    }

    unblock(id:any){
      this.auth.blockDeliveryBoy(id,0)
      .subscribe({
        next:async(value:any) =>{
          console.log(value);
          this.getAllDeliveryBoys();
        },
        error:async(error:HttpErrorResponse) =>{
          console.log(error);
          
        }
      })
    }

    deleteBoy(id:any){
      this.auth.deleteDeliveryBoy(id)
      .subscribe({
        next:async(value:any) =>{
          console.log(value);
          this.getAllDeliveryBoys();
        },
        error:async(error:HttpErrorResponse) =>{
          console.log(error);
          
        }
      })
    }
}
