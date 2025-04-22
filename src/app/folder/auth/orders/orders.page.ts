import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import * as XLSX from 'xlsx';
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
pageSize: number = 10;
currentPage: number = 1;
totalPages: number = 1;


  drivers:any[] = [];
  query:string = "";
  status:string = "";

  startDate:any = "";
  endDate:any = "";


  filename:any= "new-sheet.xlsx";
  constructor(private auth:AuthService,
    private router:Router,
    private actionSheetController: ActionSheetController,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {}

  onSearchChange(ev: any) {
    console.log(ev.detail.value);
    this.query = ev.detail.value;
    this.getAllOrders();
    this.getAllDeliveryBoys();

  }

  ionViewDidEnter(){
    this.getAllOrders();
    this.getAllDeliveryBoys();
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
    this.auth.getAllOrders(this.query, 1, 50, this.status,"",this.startDate,this.endDate)
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
        this.orders = value['data']['content'];
        this.filteredOrders = [...this.orders];
        this.updatePagination();
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error.error);
        
      }
    })
  }

  acceptOrder(orderId:any){
    this.auth.AcceptRejectOrder(orderId, 4)
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
    this.auth.AcceptRejectOrder(orderId, 5)
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
  console.log(ev.detail.value);
  console.log(orderId);

  let value = ev.detail.value;
  console.log(value.length);

  if(value.length == 1){
    this.auth.assignDeliveryBoy(orderId, ev.detail.value)
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
        this.getAllOrders();
        this.getAllDeliveryBoys();
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error.error);
        
      }
    })
  }
  else{
    this.auth.assignMultipleDeliveryBoy(orderId, ev.detail.value)
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
        this.getAllOrders();
        this.getAllDeliveryBoys();
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error.error);
        
      }
    })
  }
  

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

getStatusText(status: number): string {
  const statuses = ['Received', 'Being Prepared', 'Delivery Assigned', 'Delivered', 'Accepted', 'Cancelled', 'Pickup Confirmed'];
  return statuses[status] || 'Unknown';
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

