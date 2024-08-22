import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataService } from './data.service';
import { Form } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userAuthState: BehaviorSubject<any> = new BehaviorSubject(false);
  accessToken: BehaviorSubject<string> = new BehaviorSubject('');
  userId: BehaviorSubject<string> = new BehaviorSubject('');
  address: BehaviorSubject<string> = new BehaviorSubject('');
  constructor(private http: HttpClient, private data: DataService) {
    this.init();
  }

  async init() {
    let token = await this.data.get('accessToken');
    let userId = await this.data.get('userId');

    this.accessToken.next(token);
    this.userId.next(userId);
  }

  register(body: {}) {
    return this.http.post(environment.URL + 'auth/admin/register', body);
  }

  login(body: {}) {
    return this.http
      .post(environment.URL + 'auth/admin/login', body)
      .pipe(map((value: any) => value['data']));
  }

  registerPartner(body: {}) {
    return this.http.post(environment.URL + 'auth/partner/register', body);
  }

  registerDeliveryBoy(body: {}) {
    return this.http.post(environment.URL + 'auth/delivery-boy/register', body);
  }

  getPartnerById(partnerId:any) {
    return this.http.get(
      environment.URL + `partner/get/byId/${partnerId}`,
      {
        headers: {
          'x-access-token': this.accessToken.value,
        },
      }
    );
  }

  getPartnerCompensationTable(hotelId:any, startDate:any, endDate:any, page:any, paidStatus:number) {
    //paid = 1, 0 = unpaid
    return this.http.get(
      environment.URL + `admin/order/get-all?hotelId=${hotelId}&startDate=${startDate}&endDate=${endDate}&populate=1&pageSize=50&page=${page}&ps=${paidStatus}`,
      {
        headers: {
          'x-access-token': this.accessToken.value,
        },
      }
    );
  }
  getDeliveryBoyCompensationTable(boyId:any, startDate:any, endDate:any, page:any,paidStatus:number) {
    return this.http.get(
      environment.URL + `admin/order/get-all?deliveryBoyId=${boyId}&startDate=${startDate}&endDate=${endDate}&populate=1&pageSize=50&page=${page}&ds=${paidStatus}`,
      {
        headers: {
          'x-access-token': this.accessToken.value,
        },
      }
    );
  }
  updatePartnerById(body: {}) {
    return this.http.put(
      environment.URL + `partner/update/${this.userId.value}`,
      body,
      {
        headers: {
          'x-access-token': this.accessToken.value,
        },
      }
    );
  }

  updateSettlements(body: {}) {
    return this.http.put(
      environment.URL + `admin/order/settlement`,
      body,
      {
        headers: {
          'x-access-token': this.accessToken.value,
        },
      }
    );
  }
  hotelRegister(name: any, address: any, category: any[], lng: any, lat: any) {
    return this.http.post(
      environment.URL + `partner/hotel/register`,
      {
        hotelName: name,
        userId: this.userId.value,
        address: address,
        category,
        lat,
        lng,
      },
      {
        headers: {
          'x-access-token': this.accessToken.value,
        },
      }
    );
  }

  uploadHotelImage(formdata: any) {
    return this.http.post(
      environment.URL + `partner/hotel/upload/image`,
      formdata,
      {
        headers: {
          'x-access-token': this.accessToken.value,
        },
      }
    );
  }
  addProduct(body:any){
    console.log("Body in logic");
    
    console.log(body);
    
    return this.http.post(environment.URL + `hotel/dish/bulk/add`, {
    dishes:body['dishes']
    },{
      headers: {
        'x-access-token': this.accessToken.value,
      },})
  }
  uploadDishImage(formdata: any) {
    return this.http.post(
      environment.URL + `partner/hotel/dish/upload-image`,
      formdata,
      {
        headers: {
          'x-access-token': this.accessToken.value,
        },
      }
    );
  }

  uploadCategoryImage(formdata: any) {
    return this.http.post(
      environment.URL + `admin/category/upload/image`,
      formdata,
      {
        headers: {
          'x-access-token': this.accessToken.value,
        },
      }
    );
  }
  setHotelLiveStatus(isOnline: number, hotelId: any) {
    return this.http.put(
      environment.URL + `admin/hotel/update`,
      {
        hotelId: hotelId,
        isOnline: isOnline,
      },
      {
        headers: {
          'x-access-token': this.accessToken.value,
        },
      }
    );
  }
  getDashboardData(sort: any,startDate:any,endDate:any) {
    return this.http.get(
      environment.URL + `admin/get/dashboard-data?sort=${sort}`,
      {
        headers: {
          'x-access-token': this.accessToken.value,
        },
      }
    );
  }
  getRevenueChartData(sort: any) {
    return this.http.get(
      environment.URL + `admin/get/revenueChartData?sort=${sort}`,
      {
        headers: {
          'x-access-token': this.accessToken.value,
        },
      }
    );
  }

  getAllHotelsPartner(partnerId:any){
    return this.http.get(environment.URL + `partner/get/hotels/${partnerId}`,{
      headers:{
        'x-access-token': this.accessToken.value.toString()
      }
    })
  }


  getOrderChartData(sort: any) {
    return this.http.get(
      environment.URL + `admin/get/orderChartData?sort=${sort}`, 
      {
        headers: {
          'x-access-token': this.accessToken.value,
        },
      }
    );
  }
  getAllPartners(
    query: string,
    pageNumber: any,
    pageSize: any,
    startDate: any,
    endDate: any,
    status: any
  ) {
    return this.http.get(
      environment.URL +
        `admin/get/all-partners?q=${query}&page=${pageNumber}&pageSize=${pageSize}&startDate=${startDate}&endDate=${endDate}&populate=1&status=${status}`,
      {
        headers: {
          'x-access-token': this.accessToken.value,
        },
      }
    );
  }

  getAllCustomers(
    query: string,
    pageNumber: any,
    pageSize: any,
    startDate: any,
    endDate: any,
    status: any,
    isBlocked:any
  ) {
    return this.http.get(
      environment.URL +
        `admin/get/all-users?q=${query}&page=${pageNumber}&pageSize=${pageSize}&startDate=${startDate}&endDate=${endDate}&populate=1&status=${status}&isBlocked=${isBlocked}`,
      {
        headers: {
          'x-access-token': this.accessToken.value,
        },
      }
    );
  }

  blockUnblockCustomer(body: {}) {
    return this.http.put(
      environment.URL + `admin/update/user/status`,
      body,
      {
        headers: {
          'x-access-token': this.accessToken.value,
        },
      }
    );
  }
  getAllCategories(query: string) {
    return this.http.get(
      environment.URL + `admin/category/get/all?search=${query}&pageSize=100`,
      {
        headers: {
          'x-access-token': this.accessToken.value,
        },
      }
    );
  }
  getAllDeliveryBoys(
    query: string,
    pageNumber: any,
    pageSize: any,
    startDate: any,
    endDate: any,
    status: any
  ) {
    return this.http.get(
      environment.URL +
        `admin/get/all-deliveryBoy?q=${query}&page=${pageNumber}&pageSize=${pageSize}&startDate=${startDate}&endDate=${endDate}&populate=1`,
      {
        headers: {
          'x-access-token': this.accessToken.value,
        },
      }
    );
  }

  getAllHotels(
    query: string,
    pageNumber: any,
    pageSize: any,
    startDate: any,
    endDate: any,
    status: any
  ) {
    return this.http.get(
      environment.URL +
        `admin/get/all-hotels?page=${pageNumber}&pageSize=1&q=${pageSize}&startDate=${startDate}&endDate=${endDate}&populate=1`,
      {
        headers: {
          'x-access-token': this.accessToken.value,
        },
      }
    );
  }

  getAllOrders(
    query: string,
    pageNumber: any,
    pageSize: any,
    status: any,
    hotelId: any,
    startDate: any,
    endDate: any,
  ) {
    return this.http.get(
      environment.URL +
        `admin/order/get-all?populate=1&pageSize=${pageSize}&page=${pageNumber}&hotelId=${hotelId}&q=${query}&status=${status}&startDate=${startDate}&endDate=${endDate}`,
      {
        headers: {
          'x-access-token': this.accessToken.value,
        },
      }
    );
  }

  getOrderById(orderId: any) {
    return this.http.get(
      environment.URL +
        `order/get/order-by-id/${orderId}`,
      {
        headers: {
          'x-access-token': this.accessToken.value,
        },
      }
    );
  }

  getCustomerById(userId: any) {
    return this.http.get(
      environment.URL +
        `user/get/user/${userId}`,
      {
        headers: {
          'x-access-token': this.accessToken.value,
        },
      }
    );
  }


  getDeliveryBoyById(orderId: any) {
    return this.http.get(
      environment.URL +
        `order/get/order-by-id/${orderId}`,
      {
        headers: {
          'x-access-token': this.accessToken.value,
        },
      }
    );
  }
  getAllPromos(isActive: string, codeType: any) {
    return this.http.get(
      environment.URL +
        `admin/promoCode/get-all?codeType=${codeType}&isActive=${isActive}`,
      {
        headers: {
          'x-access-token': this.accessToken.value,
        },
      }
    );
  }

  getCharges() {
    return this.http.get(environment.URL + `admin/get/data`, {
      headers: {
        'x-access-token': this.accessToken.value,
      },
    });
  }

  getAllChats() {
    return this.http.get(
      environment.URL + `admin/get/chat-list/666979f2983fa6cd5cf79d08`,
      {
        headers: {
          'x-access-token': this.accessToken.value,
        },
      }
    );
  }

  getMessagesByChatId(chatId: any) {
    return this.http.get(environment.URL + `admin/get/chat/${chatId}`, {
      headers: {
        'x-access-token': this.accessToken.value,
      },
    });
  }

  getDeliveryCharges() {
    return this.http.get(environment.URL + `admin/get/deliveryCharges/data`, {
      headers: {
        'x-access-token': this.accessToken.value,
      },
    });
  }

  updateCharges(handling: string, gst: any, id: any) {
    return this.http.put(
      environment.URL + `admin/update/data/${id}`,
      {
        gstPercentage: gst,
        platformFee: handling,
      },
      {
        headers: {
          'x-access-token': this.accessToken.value,
        },
      }
    );
  }

  updateGstToggleStatus(value: boolean) {
    return this.http.put(
      environment.URL + `admin/update/data/66785354755cf19b149aa305`,
      {
        gstIsActive: value,
      },
      {
        headers: {
          'x-access-token': this.accessToken.value,
        },
      }
    );
  }

  updateDeliveryCharges(body: any, id: any) {
    return this.http.put(
      environment.URL + `admin/update/deliveryCharges/data/${id}`,
      body,
      {
        headers: {
          'x-access-token': this.accessToken.value,
        },
      }
    );
  }
  setDeliveryCharges(body: {}) {
    return this.http.post(
      environment.URL + `admin/add/deliveryCharges/data`,
      body,
      {
        headers: {
          'x-access-token': this.accessToken.value,
        },
      }
    );
  }
  setCharges(handling: string, delivery: any) {
    return this.http.post(
      environment.URL + `admin/add/data`,
      {
        gstPercentage: '5',
        deliveryCharges: delivery,
        platformFee: handling,
      },
      {
        headers: {
          'x-access-token': this.accessToken.value,
        },
      }
    );
  }

  sendMessage(
    chatId: any,
    senderId: any,
    receiverId: any,
    orderId: any,
    message: any
  ) {
    return this.http.post(
      environment.URL + `admin/send`,
      {
        chatId,
        senderId,
        receiverId,
        message,
        orderId,
      },
      {
        headers: {
          'x-access-token': this.accessToken.value,
        },
      }
    );
  }

  addPromo(body: {}) {
    return this.http.post(environment.URL + `admin/promoCode/add`, body, {
      headers: {
        'x-access-token': this.accessToken.value,
      },
    });
  }

  addCategory(body: {}) {
    return this.http.post(environment.URL + `admin/category/add`, body, {
      headers: {
        'x-access-token': this.accessToken.value,
      },
    });
  }
  AcceptRejectOrder(orderId: any, status: any) {
    return this.http.put(
      environment.URL + `order/accept-reject`,
      {
        orderId,
        status,
      },
      {
        headers: {
          'x-access-token': this.accessToken.value.toString(),
        },
      }
    );
  }

  assignDeliveryBoy(orderId: any, deliveryBoyId: any) {
    return this.http.put(
      environment.URL + `admin/order/update`,
      {
        orderId,
        status: '2',
        deliveryBoyId,
      },
      {
        headers: {
          'x-access-token': this.accessToken.value.toString(),
        },
      }
    );
  }

  assignMultipleDeliveryBoy(orderId: any, deliveryBoyIds: any) {
    return this.http.post(
      environment.URL + `admin/send/order/pickup/request`,
      {
        orderId,
        deliveryBoyIds,
      },
      {
        headers: {
          'x-access-token': this.accessToken.value.toString(),
        },
      }
    );
  }
 


  deleteCategory(categoryId: any) {
    return this.http.delete(
      environment.URL + `admin/category/delete/${categoryId}`,
      {
        headers: {
          'x-access-token': this.accessToken.value.toString(),
        },
      }
    );
  }
  getAllCategory() {
    return this.http.get(environment.URL + `admin/category/get/all`, {
      headers: {
        'x-access-token': this.accessToken.value.toString(),
      },
    });
  }

  uploadImageForMultipleDish(formdata:FormData){
    return this.http.post(environment.URL + `admin/upload/image`,formdata,{
      headers: {
        'x-access-token': this.accessToken.value.toString(),
      },
    })
  }

  blockDeliveryBoy(deliveryBoyId:any, status:any ){
    return this.http.put(environment.URL + `admin/update/delivery-boy/status`,{
      deliveryBoyId, status 
    },{
      headers: {
        'x-access-token': this.accessToken.value.toString(),
      },
    })
  }
}
