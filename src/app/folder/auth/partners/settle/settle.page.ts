import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-settle',
  templateUrl: './settle.page.html',
  styleUrls: ['./settle.page.scss'],
})
export class SettlePage implements OnInit {
  settlements: any[] = [];
  selectedItems = new Set<string>();
  selectAll: boolean = false;
  sortStatus: 'all' | 'settled' | 'unsettled' = 'all';
  
  totalSettledAmount: number = 0;
  totalUnsettledAmount: number = 0;
  totalAdminEarnings: number = 0;
  hotelId:any;
  constructor(
    private route: ActivatedRoute,
    private http: HttpService,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
      this.hotelId = this.route.snapshot.paramMap.get('id');
    this.loadSettlements();
  }

  async loadSettlements() {
    const loading = await this.loadingController.create({
      message: 'Loading settlements...'
    });
    await loading.present();

    this.http.getPartnerSettlements(this.hotelId,true).subscribe({
      next: (res: any) => {
        this.settlements = res.data;
        this.calculateTotals();
        loading.dismiss();
      },
      error: (err: any) => {
        console.error('Error loading settlements:', err);
        this.showToast('Failed to load settlements', 'danger');
        loading.dismiss();
      }
    });
  }

  calculateTotals() {
    this.totalSettledAmount = this.settlements
      .filter(s => s.isSettled)
      .reduce((acc, curr) => acc + curr.totalPartnerEarning, 0);

    this.totalUnsettledAmount = this.settlements
      .filter(s => !s.isSettled)
      .reduce((acc, curr) => acc + curr.totalPartnerEarning, 0);

    this.totalAdminEarnings = this.settlements
      .reduce((acc, curr) => acc + curr.adminEarning, 0);
  }

  onSortStatusChange(event: any) {
    this.sortStatus = event.detail.value;
  }

  getFilteredSettlements() {
    if (this.sortStatus === 'all') {
      return this.settlements;
    }
    return this.settlements.filter(item => 
      this.sortStatus === 'settled' ? item.isSettled : !item.isSettled
    );
  }

  onSelectAllChange(event: any) {
    this.selectAll = event.detail.checked;
    if (this.selectAll) {
      this.getFilteredSettlements().forEach(item => {
        if (!item.isSettled) {
          this.selectedItems.add(item._id);
        }
      });
    } else {
      this.selectedItems.clear();
    }
  }

  onSettlementSelect(event: any, settlement: any) {
    if (event.detail.checked) {
      this.selectedItems.add(settlement._id);
    } else {
      this.selectedItems.delete(settlement._id);
    }
    this.selectAll = this.selectedItems.size === this.getFilteredSettlements().length;
  }

  isSettlementSelected(settlement: any): boolean {
    return this.selectedItems.has(settlement._id);
  }

  getSelectedAmount(): number {
    return this.settlements
      .filter(s => this.selectedItems.has(s._id))
      .reduce((acc, curr) => acc + curr.totalPartnerEarning, 0);
  }

  async submitSettlements() {
    if (this.selectedItems.size === 0) {
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Processing settlements...'
    });
    await loading.present();

    const body = {
      settlementIds: Array.from(this.selectedItems)
    };

    this.http.markPartnerSettlemetsPaid(body.settlementIds).subscribe({
      next: async (res: any) => {
        await loading.dismiss();
        this.showToast('Settlements marked successfully', 'success');
        this.selectedItems.clear();
        this.selectAll = false;
        this.loadSettlements(); // Refresh data
      },
      error: async (err: any) => {
        await loading.dismiss();
        console.error('Error marking settlements:', err);
        this.showToast('Failed to mark settlements', 'danger');
      }
    });
  }

  private async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'top'
    });
    await toast.present();
  }
}
