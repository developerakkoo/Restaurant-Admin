import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

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

  createPerOrderEarnings(data:any){
    return this.http.post(environment.URL + `delivery-settings/create`,data);    
  }

  updatePerOrderEarnings(data:any){
    return this.http.put(environment.URL + `delivery-settings/update`,data);
  }

  getPerOrderEarnings(){
    return this.http.get(environment.URL + `delivery-settings/get`);
  }


  //Delivery Boy Earnings API

  getDeliveryBoyEarnings(boyId:any,startDate:string = '',endDate:string = ''){
    return this.http.get(environment.URL + `delivery-earnings/list?driverId=${boyId}`);
  }

  markDeliveryBoyEarningsSettled(data:any){
    // let body = {
    //   driverId:boyId,
    //   earningIds:earningIds,
    //   note:note
    // }
    return this.http.post(environment.URL + `delivery-settlement/settle`,data);
  }

  getDeliveryBoyOrdersSettled(boyId:any,startDate:string = '',endDate:string = ''){
    return this.http.get(environment.URL + `delivery-earnings/list?driverId=${boyId}?startDate=${startDate}?endDate=${endDate}`);
  }

  getDeliveryBoy(boyId:any){
    return this.http.get(environment.URL + `deliver-boy/profile?userId=${boyId}`);
  }

//Partner API
getPartnerSettlements(hotelId:any,isSettled:any){
  return this.http.get(environment.URL + `partner-settlement/partner-settlements?hotelId=${hotelId}`);
}

markPartnerSettlemetsPaid(settlementIds:any[]){
  return this.http.put(environment.URL + `partner-settlement/partner-settlements/settle`,{settlementIds});
}

getPartnerDetails(partnerId:any){
  return this.http.get(environment.URL + `partner/get/byId/${partnerId}`);
}

getProfitAnalytics(){
  return this.http.get(environment.URL + `analytics/admin-earnings`);
}
getEarningsBreakdown(){
  return this.http.get(environment.URL + `analytics/admin-earnings-breakdown`);
}
//Admin Analytics API
getPartnerSettlementsAnalytics(hotelId:any){
  return this.http.get(environment.URL + `partner-settlement/partner-settlements/analytics`);
}



//Promo Code API

sendPromoNotification(data:any){
  return this.http.post(environment.URL + `custom-notifications/notifications`,data);
}


}
