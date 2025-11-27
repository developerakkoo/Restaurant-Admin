import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import * as XLSX from 'xlsx';
import {
  OrderStatus,
  getStatusName,
  getStatusColor as getStatusColorFromConstants,
  getStatusIcon as getStatusIconFromConstants,
  getAdminStatuses,
  canAdminAction,
  ADMIN_ACTIONABLE_STATUSES,
} from 'src/app/constants/order-status.constants';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  
  orderId:any;
  orders: any[] = [];
filteredOrders: any[] = [];
paginatedOrders: any[] = [];

searchTerm: string = '';
pageSize: number = 20;
currentPage: number = 1;
totalPages: number = 1;


  drivers:any[] = [];
  query:string = "";
  status:string = "";

  startDate:any = "";
  endDate:any = "";

  // Cache status options to avoid calling function in template
  statusOptions: { value: string; label: string }[] = [];

  filename:any= "new-sheet.xlsx";
  isRefreshing: boolean = false;
  constructor(private auth:AuthService,
    private router:Router,
    private actionSheetController: ActionSheetController,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    console.log("Ng On Init");
    // Initialize status options
    this.initializeStatusOptions();
  }

  /**
   * Initialize status options for dropdown
   */
  initializeStatusOptions() {
    try {
      const allStatuses = getAdminStatuses();
      this.statusOptions = [
        { value: '', label: 'All' },
        ...allStatuses.map(status => ({
          value: status.toString(),
          label: getStatusName(status),
        })),
      ];
    } catch (error) {
      console.error('Error initializing status options:', error);
      this.statusOptions = [{ value: '', label: 'All' }];
    }
  }

  onSearchChange(ev: any) {
    console.log(ev.detail.value);
    this.query = ev.detail.value;
    this.getAllOrders();
    this.getAllDeliveryBoys();

  }

  ionViewDidEnter(){
    console.log("Ion View Did Enter");
    this.getAllOrders();
    this.getAllDeliveryBoys();
  }

  /**
   * Refresh orders and delivery boys data
   */
  async handleRefresh() {
    this.isRefreshing = true;
    try {
      // Fetch both orders and delivery boys
      this.getAllOrders();
      this.getAllDeliveryBoys();
      
      // Keep refreshing state for at least 500ms to show animation
      await new Promise(resolve => setTimeout(resolve, 500));
    } finally {
      this.isRefreshing = false;
    }
  }

  filterEvent(ev:any){
    console.log(ev.detail.value);
    this.status = ev.detail.value;
    this.getAllOrders();
    this.getAllDeliveryBoys();

  }

  setDateEvent(event:any, type:any){
    console.log(event.detail.value);
console.log(type);

    let date = event.detail.value;
    if(type === "s"){
      console.log("Set Start Date");
      this.startDate = date;
      
    }else if(type === "e"){
      console.log("Set End Date");
      this.endDate = date;
      
      
    }
    
    this.getAllOrders();
    console.log(this.startDate);
    console.log(this.endDate);
    
    

    
  }
  async getAllDeliveryBoys(){
    this.auth.getAllDeliveryBoys(this.query, 1, 50,"","", "")
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
        this.drivers = value['data']['content'];
        //filter The Array For only unblocked Drivers
        
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error.error);
        
      }
    })
  }
  async getAllOrders(){
    console.log("Get All Orders");
    this.auth.getAllOrders(this.query, 1, 50, this.status,"",this.startDate,this.endDate)
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
        // Handle different response structures
        if (Array.isArray(value['data'])) {
          this.orders = value['data'];
        } else if (value['data'] && Array.isArray(value['data']['content'])) {
          this.orders = value['data']['content'];
        } else if (value['data'] && Array.isArray(value['data']['data'])) {
          this.orders = value['data']['data'];
        } else {
          this.orders = [];
        }
        this.filteredOrders = [...this.orders];
        this.updatePagination();
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error.error);
        this.orders = [];
        this.filteredOrders = [];
        this.updatePagination();
      }
    })
  }

  acceptOrder(orderId:any){
    this.auth.AcceptRejectOrder(orderId, OrderStatus.ACCEPTED)
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
        this.getAllOrders();
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error.error);
        
      }
    })
  }


  rejectOrder(orderId:any){
    this.auth.AcceptRejectOrder(orderId, OrderStatus.CANCELLED_BY_HOTEL)
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
        this.getAllOrders();
        
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error.error);
        
      }
    })
  }
  async presentActionSheet(orderId:any) {
     const actionSheet = await this.actionSheetController.create({
       header: 'Albums',
       buttons: [{
         text: 'Accept',
         role: '',
         icon: 'checkmark',
         handler: () => {
           console.log('Delete clicked');
           this.acceptOrder(orderId);
         }
       }, {
         text: 'Reject',
         icon: 'trash',
         handler: () => {
           console.log('Share clicked');
           this.rejectOrder(orderId);
         }
       }, {
         text: 'Cancel',
         icon: 'close',
         role: 'cancel',
         handler: () => {
           console.log('Cancel clicked');
         }
       }]
     });
   
     await actionSheet.present();
    // else  if(this.status == 4){
    //  const actionSheet = await this.actionSheetController.create({
    //    header: 'Albums',
    //    buttons: [{
    //      text: 'Handed over to Delivery Boy',
    //      role: '',
    //      icon: 'checkmark',
    //      handler: () => {
    //        console.log('Delete clicked');
    //      }
    //    }, {
    //      text: 'Cancel',
    //      icon: 'close',
    //      role: 'cancel',
    //      handler: () => {
    //        console.log('Cancel clicked');
    //      }
    //    }]
    //  });
   
    //  await actionSheet.present();
    // }
   }
viewNotifications(){}
assignDriverEvent(ev:any, orderId:any){
  const selectedValue = ev.detail?.value;
  console.log('Selected drivers:', selectedValue);
  console.log('Order ID:', orderId);

  // Normalize selection to an array of unique, truthy driver IDs
  const selectedIds: string[] = Array.isArray(selectedValue)
    ? selectedValue
    : selectedValue
      ? [selectedValue]
      : [];

  const uniqueIds = Array.from(new Set(selectedIds.filter((id) => !!id)));

  console.log('Normalized driver IDs:', uniqueIds);

  if (uniqueIds.length === 0) {
    return;
  }

  if (uniqueIds.length === 1) {
    this.assignSingleDriver(orderId, uniqueIds[0]);
  } else {
    this.assignMultipleDrivers(orderId, uniqueIds);
  }
}

private async assignSingleDriver(orderId: string, deliveryBoyId: string) {
  const loading = await this.loadingController.create({
    message: 'Assigning driver...',
    spinner: 'crescent',
  });
  await loading.present();

  this.auth.assignDeliveryBoy(orderId, deliveryBoyId).subscribe({
    next: async (value: any) => {
      await loading.dismiss();
      console.log(value);
      await this.presentToast('Driver assigned successfully', 'success');
      this.getAllOrders();
      this.getAllDeliveryBoys();
    },
    error: async (error: HttpErrorResponse) => {
      await loading.dismiss();
      console.log(error.error);
      const errorMessage = error.error?.message || 'Failed to assign driver';
      await this.presentToast(errorMessage, 'danger');
    },
  });
}

private async assignMultipleDrivers(orderId: string, deliveryBoyIds: string[]) {
  const loading = await this.loadingController.create({
    message: `Assigning ${deliveryBoyIds.length} driver(s)...`,
    spinner: 'crescent',
  });
  await loading.present();

  this.auth.assignMultipleDeliveryBoy(orderId, deliveryBoyIds).subscribe({
    next: async (value: any) => {
      await loading.dismiss();
      console.log(value);
      const assignedCount = value?.data?.sentTo || deliveryBoyIds.length;
      const totalCount = value?.data?.totalRequested || deliveryBoyIds.length;
      if (assignedCount === totalCount) {
        await this.presentToast(`Successfully assigned ${assignedCount} driver(s)`, 'success');
      } else {
        await this.presentToast(`Assigned to ${assignedCount} of ${totalCount} driver(s)`, 'warning');
      }
      this.getAllOrders();
      this.getAllDeliveryBoys();
    },
    error: async (error: HttpErrorResponse) => {
      await loading.dismiss();
      console.log(error.error);
      const errorMessage = error.error?.message || 'Failed to assign drivers';
      await this.presentToast(errorMessage, 'danger');
    },
  });
}
filterOrders() {
  const term = this.searchTerm.toLowerCase();
  this.filteredOrders = this.orders.filter(order =>
    order.orderId.toLowerCase().includes(term) ||
    order.user?.name.toLowerCase().includes(term) ||
    order.userAddress?.address.toLowerCase().includes(term)
  );
  this.currentPage = 1;
  this.updatePagination();
}

updatePagination() {
  this.totalPages = Math.ceil(this.filteredOrders.length / this.pageSize);
  const startIndex = (this.currentPage - 1) * this.pageSize;
  this.paginatedOrders = this.filteredOrders.slice(startIndex, startIndex + this.pageSize);
}

changePage(page: number) {
  if (page > 0 && page <= this.totalPages) {
    this.currentPage = page;
    this.updatePagination();
  }
}

totalPagesArray(): number[] {
  return Array(this.totalPages).fill(0).map((_, i) => i + 1);
}

/**
 * Get status text using constants
 */
getStatusText(status: number | string | undefined | null): string {
  if (status === undefined || status === null) {
    return 'Unknown';
  }
  // Convert string to number if needed
  const statusNum = typeof status === 'string' ? parseInt(status, 10) : status;
  if (isNaN(statusNum)) {
    return 'Unknown';
  }
  return getStatusName(statusNum);
}

/**
 * Get status color using constants
 */
getStatusColor(status: number | string | undefined | null): string {
  if (status === undefined || status === null) {
    return 'medium';
  }
  // Convert string to number if needed
  const statusNum = typeof status === 'string' ? parseInt(status, 10) : status;
  if (isNaN(statusNum)) {
    return 'medium';
  }
  return getStatusColorFromConstants(statusNum);
}

/**
 * Get status icon using constants
 */
getStatusIcon(status: number | string | undefined | null): string | undefined {
  if (status === undefined || status === null) {
    return undefined;
  }
  // Convert string to number if needed
  const statusNum = typeof status === 'string' ? parseInt(status, 10) : status;
  if (isNaN(statusNum)) {
    return undefined;
  }
  return getStatusIconFromConstants(statusNum);
}

/**
 * Check if admin can perform actions on this status
 */
canAdminPerformAction(status: number | string | undefined | null): boolean {
  if (status === undefined || status === null) {
    return false;
  }
  // Convert string to number if needed
  const statusNum = typeof status === 'string' ? parseInt(status, 10) : status;
  if (isNaN(statusNum)) {
    return false;
  }
  return canAdminAction(statusNum);
}

/**
 * Present toast notification
 */
async presentToast(message: string, color: 'success' | 'danger' | 'warning' | 'primary' = 'primary') {
  const toast = await this.toastController.create({
    message: message,
    duration: 3000,
    color: color,
    position: 'top',
  });
  await toast.present();
}

/**
 * Get driver name by ID
 */
getDriverName(driverId: any): string {
  if (!driverId) return 'Unknown';
  const driverIdStr = driverId.toString ? driverId.toString() : driverId;
  const driver = this.drivers.find(d => d._id === driverIdStr || d._id?.toString() === driverIdStr);
  if (driver) {
    return `${driver.firstName || ''} ${driver.lastName || ''}`.trim() || 'Unknown Driver';
  }
  return 'Unknown Driver';
}

/**
 * Get all admin statuses for filter dropdown
 */
getAdminStatusOptions(): { value: string; label: string }[] {
  const allStatuses = getAdminStatuses();
  return [
    { value: '', label: 'All' },
    ...allStatuses.map(status => ({
      value: status.toString(),
      label: getStatusName(status),
    })),
  ];
}
 downloadExcelSheet(){
  let data = document.getElementById("table-data");

  const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);
  // Generate Workbook
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb,ws,"Sheet1");

  // Save To file

   XLSX.writeFile(wb,this.filename);
}
openDetailsPage(orderId:any)
{
  console.log(orderId);
  this.router.navigate(['folder','orders','view', orderId]);
  
}}

