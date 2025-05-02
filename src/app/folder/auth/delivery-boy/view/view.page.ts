import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { AlertController, ToastController } from '@ionic/angular';

interface Commission {
  orderNumber: number;
  amount: number;
  date: Date;
  status: 'paid' | 'pending';
}

interface DeliveryBoy {
  name: string;
  phoneNumber: string;
  email: string;
  rating: number;
  totalOrdersDelivered: number;
  totalEarnings: number;
  ordersSettled: number;
  ordersUnsettled: number;
  settledAmount: number;
  unsettledAmount: number;
  commissions: Commission[];
}

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {
  id:any;
  deliveryBoy: any = {};
  earnings:any = [];
  ordersSettled:any = [];
  selectedEarnings: any[] = [];
  selectAll: boolean = false;
  sortStatus: 'all' | 'paid' | 'unpaid' = 'all';

  totalEarnings:any = 0;
  totalOrdersSettled:any = 0;
  totalOrdersUnsettled:any = 0;
  totalEarningsSettled:any = 0;
  totalEarningsUnsettled:any = 0;
  ordersUnsettled:any = [];
  totalOrdersDelivered:any = 0;

  startDate:any;
  endDate:any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpService,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('Delivery Boy ID:', this.id);
  }

  ionViewDidEnter(){
    this.getDeliveryBoy(this.id);
    this.getDeliveryBoyEarnings(this.id);
  }

  getDeliveryBoy(id:any){
    this.http.getDeliveryBoy(id).subscribe((res:any)=>{
      console.log(res);
      this.deliveryBoy = res.data[0];
    },(err:any)=>{
      console.log(err);
    })
  }

  getDeliveryBoyEarnings(id:any,startDate:string = '',endDate:string = ''){
    this.http.getDeliveryBoyEarnings(id,startDate,endDate).subscribe({
      next: (res:any) => {
        console.log('Delivery Boy Earnings');
        if (res) {
          this.earnings = res;
          this.totalEarnings = res.reduce((acc:any, curr:any) => acc + (curr.amount || 0), 0);
          
          this.ordersSettled = res.filter((item:any) => item.isSettled);
          this.totalOrdersSettled = res.filter((item:any) => item.isSettled).length;
          this.totalEarningsSettled = this.ordersSettled.reduce((acc:any, curr:any) => acc + (curr.amount || 0), 0);
          
          this.totalOrdersDelivered = res.length;
          this.ordersUnsettled = res.filter((item:any) => !item.isSettled);
          this.totalOrdersUnsettled = this.ordersUnsettled.length;
          this.totalEarningsUnsettled = this.ordersUnsettled.reduce((acc:any, curr:any) => acc + (curr.amount || 0), 0);
        }
      },
      error: (err:any) => {
        console.error('Error fetching delivery boy earnings:', err);
      }
    });
  }

  getDeliveryBoyOrdersSettled(id:any,startDate:string = '',endDate:string = ''){
    this.http.getDeliveryBoyOrdersSettled(id,startDate,endDate).subscribe((res:any)=>{
      console.log('Delivery Boy Orders Settled');
      console.log(res);
    })
  }

  // New methods for sorting and selection
  onSortStatusChange(event: any) {
    this.sortStatus = event.detail.value;
  }

  getFilteredEarnings() {
    if (this.sortStatus === 'all') {
      return this.earnings;
    }
    return this.earnings.filter((item: any) => 
      this.sortStatus === 'paid' ? item.isSettled : !item.isSettled
    );
  }

  onSelectAllChange(event: any) {
    this.selectAll = event.detail.checked;
    if (this.selectAll) {
      this.selectedEarnings = [...this.getFilteredEarnings()];
    } else {
      this.selectedEarnings = [];
    }
  }

  onEarningSelect(event: any, earning: any) {
    if (event.detail.checked) {
      this.selectedEarnings.push(earning);
    } else {
      this.selectedEarnings = this.selectedEarnings.filter(item => item._id !== earning._id);
    }
    this.selectAll = this.selectedEarnings.length === this.getFilteredEarnings().length;
  }

  isEarningSelected(earning: any): boolean {
    return this.selectedEarnings.some(item => item._id === earning._id);
  }

  getSelectedAmount(): number {
    return this.selectedEarnings.reduce((acc, curr) => acc + (curr.amount || 0), 0);
  }

  async markSettlement() {
    if (this.selectedEarnings.length === 0) {
      return;
    }

    const alert = await this.alertController.create({
      header: 'Confirm Settlement',
      message: `Are you sure you want to mark settlement for ${this.selectedEarnings.length} orders?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Confirm',
          handler: () => {
            this.processSettlement();
          }
        }
      ]
    });

    await alert.present();
  }

  private processSettlement() {
    const currentDate = new Date();
    const note = `Settlement marked on ${currentDate.toLocaleString()}`;
    
    const body = {
      driverId: this.id,
      earningIds: this.selectedEarnings.map(earning => earning._id),
      note: note
    };
    console.log(body);

    this.http.markDeliveryBoyEarningsSettled(body).subscribe({
      next: async (res: any) => {
        const toast = await this.toastController.create({
          message: 'Settlement marked successfully',
          duration: 2000,
          color: 'success',
          position: 'top'
        });
        await toast.present();

        // Refresh the earnings data
        this.getDeliveryBoyEarnings(this.id);
        // Clear selections
        this.selectedEarnings = [];
        this.selectAll = false;
      },
      error: async (err: any) => {
        const toast = await this.toastController.create({
          message: 'Failed to mark settlement. Please try again.',
          duration: 2000,
          color: 'danger',
          position: 'top'
        });
        await toast.present();
        console.error('Settlement error:', err);
      }
    });
  }
}
