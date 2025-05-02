import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

  partnerId:any;
  hotelId:any;
  startDate:any = "";
  endDate:any = "";
  page:any = 1;
  partnerDetails:any = {};
  hotelDetails:any = {};
  compensationTable:any[] = [];
  partnerSettlements:any[] = [];
  partnerSettlementsAnalytics:any[] = [];
 
  paidStatus:number = 1;
  selectedItems = new Set<string>();
  totalPartnerPrice = 0;
  constructor(private auth:AuthService,
              private route: ActivatedRoute,
              private loadingController: LoadingController,
              private http:HttpService,
              private router:Router,
              private toastController: ToastController
  ) {

    this.partnerId = this.route.snapshot.paramMap.get("id");
   }

  ngOnInit() {
  }


  ionViewDidEnter(){
    this.getPartnerDetails();
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
    
    console.log(this.startDate);
    console.log(this.endDate);
    this.getTable();
    
    

    
  }

  async getPartnerDetails(){
    const loading = await this.loadingController.create({
      message:"Loading...",
      duration:3000
    
    })

    await loading.present();
    this.auth.getPartnerById(this.partnerId)
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
        this.partnerDetails = value['data'];

        if (value && value.data && value.data.length > 0) {
          this.partnerDetails = value.data[0];
          await this.getHotelByPartner();
        } else {
          this.showToast('Partner details not found', 'warning');
        }
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error);
        await loading.dismiss();
        this.showToast('Failed to load partner details', 'danger');
      }
    })
  }


  getHotelByPartner(){
    this.auth.getAllHotelsPartner(this.partnerId)
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
        if (value && value.data && value.data.length > 0) {
          this.hotelDetails = value.data[0];
          this.hotelId = value.data[0]._id;
        } else {
          this.showToast('Hotel details not found', 'warning');
        }
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error);
        this.showToast('Failed to load hotel details', 'danger');
      }
    })
  }

  viewSettlements(){
    this.router.navigate(['folder','partners','settle',this.hotelId]);  
  }

  getTable(){
    this.auth.getPartnerCompensationTable(this.hotelId,this.startDate, this.endDate,this.page,this.paidStatus)
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
this.compensationTable = value['data']['content'];
    
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error);
        
      }
    })
  }

  onCheckboxChange(checked: boolean, orderId: string) {
    if (checked) {
      this.selectedItems.add(orderId);
    } else {
      this.selectedItems.delete(orderId);
    }

    console.log(this.selectedItems);
    
    this.calculateTotalPartnerPrice();
  }

  calculateTotalPartnerPrice() {
    this.totalPartnerPrice = 0;
    this.compensationTable.forEach(order => {
      if (this.selectedItems.has(order._id)) {
        order.productDetails.forEach((product:any) => {
          this.totalPartnerPrice += product.partnerPrice;
        });
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
