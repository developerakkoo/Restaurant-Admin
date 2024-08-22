import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

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
  compensationTable:any[] = [];

  paidStatus:number = 1;
  selectedItems = new Set<string>();
  totalPartnerPrice = 0;
  constructor(private auth:AuthService,
              private route: ActivatedRoute,
              private loadingController: LoadingController
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
    let loading = await this.loadingController.create({
      message:"Loading...",
      duration:5000
    
    })

    await loading.present();
    this.auth.getPartnerById(this.partnerId)
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
      //   [
      //     {
      //         "_id": "666a81fa1fd2c47f2807b43e",
      //         "name": "Samantha Yost",
      //         "profile_image": "_",
      //         "email": "Shanie75@hotmail.com",
      //         "phoneNumber": "595-409-2750",
      //         "status": 1,
      //         "createdAt": "2024-06-13T05:22:02.372Z",
      //         "updatedAt": "2024-07-01T07:40:11.356Z",
      //         "__v": 0
      //     }
      // ]
        await loading.dismiss();
        this.getHotelByPartner();
        
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error);
        await loading.dismiss();
      }
    })
  }


  getHotelByPartner(){
    this.auth.getAllHotelsPartner(this.partnerId)
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
        this.hotelId = value['data'][0]['_id'];
//          [
//     {
//       "location": {
//           "type": "Point",
//           "coordinates": [
//               73.73005619167388,
//               18.596867766576516
//           ]
//       },
//       "_id": "666a83ec1fd2c47f2807b46f",
//       "userId": "666a81fa1fd2c47f2807b43e",
//       "hotelName": "The Ritz-Carlton, Pune",
//       "image_url": "https://api.dropeat.in/upload/1718257736431-476611290.jpg",
//       "local_imagePath": "upload/1718257736431-476611290.jpg",
//       "address": "Golf Course Square, Airport Road, Yerwada, Pune, Maharashtra 411006",
//       "hotelStatus": 0,
//       "createdAt": "2024-06-13T05:30:20.944Z",
//       "updatedAt": "2024-07-01T04:04:43.154Z",
//       "__v": 0,
//       "isTop": 1,
//       "category": [
//           "666a8cf4fd48c92ea8979d9c",
//           "666a8d341fd2c47f2807b4b0"
//       ],
//       "isOnline": false
//   }
// ]

this.getTable();
        
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error);
        
      }
    })
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
  updateSettelment(){
    const myArray = [...this.selectedItems];
console.log(myArray); 
   let body =  {
      orderIds: myArray,
      compensationPaidToHotelPartner: true
  }

  console.log(body);
  

  this.auth.updateSettlements(body)
  .subscribe({
    next:async(value:any) =>{
      console.log(value);
      this.getPartnerDetails();
    },
    error:async(error:HttpErrorResponse) =>{
      console.log(error);
      
    }
  })
  }
}
