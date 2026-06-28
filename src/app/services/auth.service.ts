import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, map, of, switchMap } from 'rxjs';
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

    console.log("Auth Service Initialized");
    console.log(this.accessToken.value, this.userId.value);
    
    
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

  getPartnerById(partnerId: any) {
    return this.http.get(environment.URL + `partner/get/byId/${partnerId}`, {
      headers: {
        'x-access-token': this.accessToken.value,
      },
    });
  }

  getPartnerCompensationTable(
    hotelId: any,
    startDate: any,
    endDate: any,
    page: any,
    paidStatus: number
  ) {
    //paid = 1, 0 = unpaid
    return this.http.get(
      environment.URL +
        `admin/order/get-all?hotelId=${hotelId}&startDate=${startDate}&endDate=${endDate}&populate=1&pageSize=50&page=${page}&ps=${paidStatus}`,
      {
        headers: {
          'x-access-token': this.accessToken.value,
        },
      }
    );
  }
  getDeliveryBoyCompensationTable(
    boyId: any,
    startDate: any,
    endDate: any,
    page: any,
    paidStatus: number
  ) {
    return this.http.get(
      environment.URL +
        `admin/order/get-all?deliveryBoyId=${boyId}&startDate=${startDate}&endDate=${endDate}&populate=1&pageSize=50&page=${page}&ds=${paidStatus}`,
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
    return this.http.put(environment.URL + `admin/order/settlement`, body, {
      headers: {
        'x-access-token': this.accessToken.value,
      },
    });
  }
  hotelRegister(
    name: any,
    address: any,
    category: any[],
    lng: any,
    lat: any,
    partnerId: any
  ) {
    return this.http.post(
      environment.URL + `admin/hotel/register`,
      {
        hotelName: name,
        userId: partnerId,
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
  addProduct(body: any) {
    console.log('Body in logic');

    console.log(body);

    return this.http.post(
      environment.URL + `hotel/dish/bulk/add`,
      {
        dishes: body['dishes'],
      },
      {
        headers: {
          'x-access-token': this.accessToken.value,
        },
      }
    );
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

  getDishByHotelId(hotelId: any) {
    return this.http.get(environment.URL + `hotel/dish/get/${hotelId}`, {
      headers: {
        'x-access-token': this.accessToken.value,
      },
    });
  }
  getAllHotelsPartner(partnerId: any) {
    return this.http.get(environment.URL + `partner/get/hotels/${partnerId}`, {
      headers: {
        'x-access-token': this.accessToken.value.toString(),
      },
    });
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
    startDate: any = "",
    endDate: any = "",
    status: any = "",
    isBlocked: any
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

  sendFirebaseNotification(body: {
    userIds: string[];
    notificationTitle: string;
    description: string;
    type?: string;
    sendToAll?: boolean;
  }) {
    return this.http.post(
      environment.URL + 'admin/send/firebaseNotification',
      body,
      {
        headers: {
          'x-access-token': this.accessToken.value,
        },
      }
    );
  }

  blockUnblockCustomer(body: {}) {
    return this.http.put(environment.URL + `admin/update/user/status`, body, {
      headers: {
        'x-access-token': this.accessToken.value,
      },
    });
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
    status: any,
    isOnline?: boolean | string,
    verificationStatus?: string
  ) {
    let url =
      environment.URL +
      `admin/get/all-deliveryBoy?q=${query}&page=${pageNumber}&pageSize=${pageSize}&startDate=${startDate}&endDate=${endDate}&populate=1`;

    if (status !== undefined && status !== null && status !== '') {
      url += `&status=${status}`;
    }
    if (isOnline !== undefined && isOnline !== null && isOnline !== '') {
      url += `&isOnline=${isOnline}`;
    }
    if (
      verificationStatus !== undefined &&
      verificationStatus !== null &&
      verificationStatus !== ''
    ) {
      url += `&verificationStatus=${verificationStatus}`;
    }

    return this.http.get(url, {
      headers: {
        'x-access-token': this.accessToken.value,
      },
    });
  }

  deleteDeliveryBoy(deliveryBoyId: any) {
    return this.http.delete(
      environment.URL + `admin/delete/delivery-boy/${deliveryBoyId}`,
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

  getPopulatedOrder(){
    return this.http.get(
      environment.URL + `admin/get/populated-order`,
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
    status: any = '',
    hotelId: any,
    startDate: any = '',
    endDate: any = ''
  ) {
    const params: string[] = [
      `page=${pageNumber}`,
      `pageSize=${pageSize}`,
      'populate=1',
    ];

    if (query) {
      params.push(`q=${encodeURIComponent(query)}`);
    }
    if (status !== undefined && status !== null && status !== '') {
      params.push(`status=${status}`);
    }
    if (hotelId) {
      params.push(`hotelId=${hotelId}`);
    }
    if (startDate) {
      params.push(`startDate=${startDate}`);
    }
    if (endDate) {
      params.push(`endDate=${endDate}`);
    }

    return this.http.get(
      environment.URL + `admin/order/get-all?${params.join('&')}`,
      {
        headers: {
          'x-access-token': this.accessToken.value,
        },
      }
    );
  }

  getOrderById(orderId: any) {
    return this.http.get(environment.URL + `order/get/order-by-id/${orderId}`, {
      headers: {
        'x-access-token': this.accessToken.value,
      },
    });
  }

  updateOrderRefund(orderId: string, body: { refundStatus: string; refundMessage?: string }) {
    return this.http.put(
      environment.URL + `admin/order/${orderId}/refund`,
      body,
      {
        headers: {
          'x-access-token': this.accessToken.value,
        },
      }
    );
  }

  getCustomerById(userId: any) {
    return this.http.get(environment.URL + `user/get/user/${userId}`, {
      headers: {
        'x-access-token': this.accessToken.value,
      },
    });
  }

  getDeliveryBoyById(orderId: any) {
    return this.http.get(environment.URL + `order/get/order-by-id/${orderId}`, {
      headers: {
        'x-access-token': this.accessToken.value,
      },
    });
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
  // 666979f2983fa6cd5cf79d08

  getAllChats() {
    return this.http.get(
      environment.URL + `chat/active`,
      {
        headers: {
          'x-access-token': this.accessToken.value,
        },
      }
    );
  }

  getMessagesByChatId(userId: any) {
    const adminId = this.userId.value;
    return this.http.get(environment.URL + `chat/history/admin/${userId}/${adminId}`, {
      headers: {
        'x-access-token': this.accessToken.value,
      },
    });
  }

  markChatAsRead(userId: string) {
    return this.http.put(
      environment.URL + `chat/read/${userId}`,
      {},
      {
        headers: {
          'x-access-token': this.accessToken.value,
        },
      }
    );
  }

  getDeliveryCharges() {
    return this.http.get(environment.URL + `admin/get/deliveryCharges/data`, {
      headers: {
        'x-access-token': this.accessToken.value,
      },
    });
  }

  updateCharges(handling: string, gst: any, id: any, gstIsActive?: boolean) {
    const body: Record<string, unknown> = {
      gstPercentage: gst,
      platformFee: handling,
    };
    if (gstIsActive !== undefined) {
      body['gstIsActive'] = gstIsActive;
    }
    return this.http.put(
      environment.URL + `admin/update/data/${id}`,
      body,
      {
        headers: {
          'x-access-token': this.accessToken.value,
        },
      }
    );
  }

  updateGstToggleStatus(value: boolean, id: string) {
    return this.http.put(
      environment.URL + `admin/update/data/${id}`,
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
      environment.URL + `chat/send`,
      {
        isUser: false,
        adminId: senderId,
        userId: receiverId,
        text:message,
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

  updatePromo(promoCodeId: string, body: {}) {
    return this.http.put(
      environment.URL + `admin/promoCode/update/${promoCodeId}`,
      body,
      {
        headers: {
          'x-access-token': this.accessToken.value,
        },
      }
    );
  }

  deletePromo(promoCodeId: string) {
    return this.http.delete(
      environment.URL + `admin/promoCode/delete/${promoCodeId}`,
      {
        headers: {
          'x-access-token': this.accessToken.value,
        },
      }
    );
  }

  sendPromoNotification(promoCodeId: string, userId: string) {
    return this.http.post(
      environment.URL + `admin/promoCode/notify/${promoCodeId}`,
      { userId },
      {
        headers: {
          'x-access-token': this.accessToken.value,
        },
      }
    );
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

  deletePartnerComplete(partnerId: any) {
    return this.http.delete(
      environment.URL + `partner/delete-all/${partnerId}`,
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

  getAllCategoriesForSelect() {
    const headers = {
      'x-access-token': this.accessToken.value.toString(),
    };
    const fetchPage = (page: number) =>
      this.http.get<any>(
        `${environment.URL}admin/category/get/all?pageSize=100&page=${page}`,
        { headers }
      );

    return fetchPage(1).pipe(
      switchMap((first) => {
        const data = first?.data ?? {};
        const content = [...(data.content ?? [])];
        const totalPages = data.totalPages ?? 1;

        if (totalPages <= 1) {
          return of(
            content.sort((a, b) => (a.name ?? '').localeCompare(b.name ?? ''))
          );
        }

        const remainingPages = Array.from(
          { length: totalPages - 1 },
          (_, index) => fetchPage(index + 2)
        );

        return forkJoin(remainingPages).pipe(
          map((pages) => {
            for (const page of pages) {
              content.push(...(page?.data?.content ?? []));
            }
            return content.sort((a, b) =>
              (a.name ?? '').localeCompare(b.name ?? '')
            );
          })
        );
      })
    );
  }

  uploadImageForMultipleDish(formdata: FormData) {
    return this.http.post(environment.URL + `admin/upload/image`, formdata, {
      headers: {
        'x-access-token': this.accessToken.value.toString(),
      },
    });
  }

  uploadBannerImage(formdata: FormData) {
    return this.http.post(environment.URL + `admin/banner/add`, formdata, {
      headers: {
        'x-access-token': this.accessToken.value.toString(),
      },
    });
  }
  getAllBannerImageByType() {
    // enum: [0, 1, 2, 3], // home, cart, fav, profile

    return this.http.get(environment.URL + `admin/banner/get`, {
      headers: {
        'x-access-token': this.accessToken.value.toString(),
      },
    });
  }

  deleteBannerImage(bannerId: any) {
    return this.http.delete(
      environment.URL + `admin/banner/delete/${bannerId}`,
      {
        headers: {
          'x-access-token': this.accessToken.value.toString(),
        },
      }
    );
  }

  blockDeliveryBoy(deliveryBoyId: any, status: any) {
    return this.http.put(
      environment.URL + `admin/update/delivery-boy/status`,
      {
        deliveryBoyId,
        status,
      },
      {
        headers: {
          'x-access-token': this.accessToken.value.toString(),
        },
      }
    );
  }

  getDeliveryBoyDocuments(deliveryBoyId: string) {
    return this.http.get(
      environment.URL +
        `admin/get-all/delivery-boy/documents-deliveryBoyId?userId=${deliveryBoyId}`,
      {
        headers: {
          'x-access-token': this.accessToken.value.toString(),
        },
      }
    );
  }

  approveDriverVerification(deliveryBoyId: string) {
    return this.http.put(
      environment.URL + `admin/delivery-boy/verification/approve`,
      { deliveryBoyId },
      {
        headers: {
          'x-access-token': this.accessToken.value.toString(),
        },
      }
    );
  }

  rejectDriverVerification(
    deliveryBoyId: string,
    rejectionType: 'reupload' | 'permanent',
    reason: string
  ) {
    return this.http.put(
      environment.URL + `admin/delivery-boy/verification/reject`,
      { deliveryBoyId, rejectionType, reason },
      {
        headers: {
          'x-access-token': this.accessToken.value.toString(),
        },
      }
    );
  }

  deleteDishById(dishId: any) {
    return this.http.delete(
      environment.URL + `admin/hotel/dish/delete?dishId=${dishId}`,
      {}
    );
  }

  //#TODO All Pincode Routes

  addPincode(body: any) {
    return this.http.post(environment.URL + `admin/add/pinCode`, body, {
      headers: {
        'x-access-token': this.accessToken.value.toString(),
      },
    });
  }

  updatePincode(pincodeId: any, body: any) {
    return this.http.put(
      environment.URL + `admin/pincode/update/${pincodeId}`,
      body,
      {
        headers: {
          'x-access-token': this.accessToken.value.toString(),
        },
      }
    );
  }

  deletePincode(pincode: any) {
    return this.http.delete(
      environment.URL + `admin/delete/pinCode/${pincode}`,
      {
        headers: {
          'x-access-token': this.accessToken.value.toString(),
        },
      }
    );
  }

  getAllPincode() {
    return this.http.get(environment.URL + `admin/pinCode/get`, {
      headers: {
        'x-access-token': this.accessToken.value.toString(),
      },
    });
  }

  checkLocationIsDeliverable(pincode: string) {
    return this.http.get(
      environment.URL + `/check/delivery-available/${pincode}`,
      {
        headers: {
          'x-access-token': this.accessToken.value.toString(),
        },
      }
    );
  }
}
