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

  hotelsId:any;
  dishes:any[] =[];
  constructor(private route:ActivatedRoute,
              private loadingController: LoadingController,
              private auth:AuthService
  ) { }

  ngOnInit() {
    console.log("Dish View page");
    
  }

  ionViewDidEnter(){
    this.hotelsId = this.route.snapshot.paramMap.get("id");
    this.getAllDishById();
  }
//   {
//     "content": [
//         {
//             "_id": "666a921a3dd909c51314624b",
//             "hotelId": {
//                 "location": {
//                     "type": "Point",
//                     "coordinates": [
//                         18.520440791106495,
//                         73.8566867030584
//                     ]
//                 },
//                 "_id": "66c98a67e0ace7ee86a2f6be",
//                 "userId": "66c98a50e0ace7ee86a2f6b7",
//                 "category": [
//                     "666a8cf4fd48c92ea8979d9c",
//                     "666a8d201fd2c47f2807b4aa",
//                     "666a8d2a1fd2c47f2807b4ad",
//                     "666a8d341fd2c47f2807b4b0",
//                     "666a8d401fd2c47f2807b4b3",
//                     "666a8d501fd2c47f2807b4b6"
//                 ],
//                 "hotelName": "Akshay REstuarnt",
//                 "image_url": "https://api.dropeat.in/upload/1724484205834-852467313.png",
//                 "local_imagePath": "upload/1724484205834-852467313.png",
//                 "address": "dasdasdsdsdasdsd",
//                 "isTop": 0,
//                 "hotelStatus": 0,
//                 "isOnline": true,
//                 "createdAt": "2024-08-24T07:23:19.021Z",
//                 "updatedAt": "2024-08-27T09:58:33.764Z",
//                 "__v": 0
//             },
//             "categoryId": {
//                 "_id": "666a8cf4fd48c92ea8979d9c",
//                 "name": "Biryani",
//                 "image_url": "https://api.dropeat.in/upload/1718259495234-428355549.jpg",
//                 "local_imagePath": "upload/1718259495234-428355549.jpg",
//                 "createdAt": "2024-06-13T06:08:52.987Z",
//                 "updatedAt": "2024-06-13T06:18:15.250Z",
//                 "__v": 0
//             },
//             "name": "Tanduri Biryani ",
//             "image_url": "https://api.dropeat.in/upload/1719219182008-994098192.jpg",
//             "local_imagePath": "upload/1719219182008-994098192.jpg",
//             "dishType": "non-veg",
//             "partnerPrice": 150,
//             "userPrice": 180,
//             "spicLevel": 2,
//             "stock": 0,
//             "status": 2,
//             "createdAt": "2024-06-13T06:30:50.942Z",
//             "updatedAt": "2024-07-01T05:33:01.945Z",
//             "__v": 0
//         },
//         {
//             "_id": "66c99ac5d61b191fcf55223b",
//             "hotelId": {
//                 "location": {
//                     "type": "Point",
//                     "coordinates": [
//                         18.520440791106495,
//                         73.8566867030584
//                     ]
//                 },
//                 "_id": "66c98a67e0ace7ee86a2f6be",
//                 "userId": "66c98a50e0ace7ee86a2f6b7",
//                 "category": [
//                     "666a8cf4fd48c92ea8979d9c",
//                     "666a8d201fd2c47f2807b4aa",
//                     "666a8d2a1fd2c47f2807b4ad",
//                     "666a8d341fd2c47f2807b4b0",
//                     "666a8d401fd2c47f2807b4b3",
//                     "666a8d501fd2c47f2807b4b6"
//                 ],
//                 "hotelName": "Akshay REstuarnt",
//                 "image_url": "https://api.dropeat.in/upload/1724484205834-852467313.png",
//                 "local_imagePath": "upload/1724484205834-852467313.png",
//                 "address": "dasdasdsdsdasdsd",
//                 "isTop": 0,
//                 "hotelStatus": 0,
//                 "isOnline": true,
//                 "createdAt": "2024-08-24T07:23:19.021Z",
//                 "updatedAt": "2024-08-27T09:58:33.764Z",
//                 "__v": 0
//             },
//             "categoryId": {
//                 "_id": "666a8d201fd2c47f2807b4aa",
//                 "name": "Dosa",
//                 "image_url": "https://api.dropeat.in/upload/1718259515474-78409207.jpg",
//                 "local_imagePath": "upload/1718259515474-78409207.jpg",
//                 "createdAt": "2024-06-13T06:09:36.573Z",
//                 "updatedAt": "2024-06-13T06:18:35.497Z",
//                 "__v": 0
//             },
//             "name": "cxzcx",
//             "image_url": "https://api.dropeat.in/upload/1724488386397-89567237.jpg",
//             "local_imagePath": "_",
//             "dishType": "veg",
//             "partnerPrice": 345,
//             "userPrice": 666,
//             "spicLevel": 1,
//             "timeToPrepare": 30,
//             "stock": 1,
//             "status": 2,
//             "__v": 0,
//             "createdAt": "2024-08-24T08:33:09.972Z",
//             "updatedAt": "2024-08-24T08:33:09.972Z"
//         }
//     ],
//     "startItem": 1,
//     "endItem": 2,
//     "totalPages": 1,
//     "pagesize": 2,
//     "totalDoc": 2
// }


  async getAllDishById(){
    let loading = await this.loadingController.create({
      message:"Loading..."
    })

    await loading.present();
    
    this.auth.getDishByHotelId(this.hotelsId)
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
        this.dishes = value['data']['content'];
        await loading.dismiss();
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error);

        await loading.dismiss();
        
      }
    })
  }


  async delete(item:any){
    console.log(item);
    let loading = await this.loadingController.create({
      message:"Loading..."
    })

    await loading.present();
    
    this.auth.deleteDishById(item._id)
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
        await loading.dismiss();
        this.getAllDishById();
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error);

        await loading.dismiss();
        
      }
    })
  }
}
