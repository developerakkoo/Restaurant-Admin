import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Position, Geolocation } from '@capacitor/geolocation';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pincode',
  templateUrl: './pincode.page.html',
  styleUrls: ['./pincode.page.scss'],
})
export class PincodePage implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('map', { static: false }) mapElement!: ElementRef;
  map: any;
  circle: any;
  radius: number = 1000;
  location!: Position;
  savedPincodes: any[] = [];
  draggableMarker: any = null;
  geocoder: any;
  private pincodeCacheKey = 'cachedPincodes';
  private subscriptions: Subscription = new Subscription();
  constructor(private alertController: AlertController, 
    private auth:AuthService,
  private loadingController: LoadingController,
private toastController: ToastController,
private data : DataService) {}

  ngOnInit() {
    console.log('PincodePage initialized');
    this.getAllPincodes();

  }

  // ionViewDidEnter() {
  //   this.getAllPincodes();
  // }
  ngAfterViewInit() {
    this.getCurrentLocation()
 
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    if (this.map) {
      google.maps.event.clearInstanceListeners(this.map);
      this.map = null;
    }

    if (this.draggableMarker) {
      google.maps.event.clearInstanceListeners(this.draggableMarker);
      this.draggableMarker.setMap(null);
      this.draggableMarker = null;
    }

    this.savedPincodes.forEach((marker) => {
      google.maps.event.clearInstanceListeners(marker);
      marker.setMap(null);
    });
    this.savedPincodes = [];

    if (this.circle) {
      google.maps.event.clearInstanceListeners(this.circle);
      this.circle.setMap(null);
      this.circle = null;
    }
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

  // loadGoogleMaps(): Promise<void> {
  //   return new Promise((resolve, reject) => {
  //     if (typeof google !== 'undefined' && google.maps) {
  //       resolve();
  //       return;
  //     }
  //     const script = document.createElement('script');
  //     script.src = 'https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY';
  //     script.async = true;
  //     script.defer = true;
  //     script.onload = () => {
  //       resolve();
  //     };
  //     script.onerror = (error: any) => {
  //       reject(error);
  //     };
  //     document.body.appendChild(script);
  //   });
  // }

  async getCurrentLocation() {
    try {
      const options: PositionOptions = {
        maximumAge: 3000,
        timeout: 10000,
        enableHighAccuracy: true,
      };

      const position = await Geolocation.getCurrentPosition(options);
      this.location = position;
      this.loadMap();
    } catch (e: any) {
      console.error(e);
    }
  }

  loadMap() {
    const latLng = new google.maps.LatLng(
      this.location.coords.latitude,
      this.location.coords.longitude
    );

    const mapOptions = {
      center: latLng,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.geocoder = new google.maps.Geocoder();

  }

  createDraggableMarker() {
    if (this.draggableMarker) {
      return;
    }
    const center = this.map.getCenter();
    this.draggableMarker = new google.maps.Marker({
      position: center,
      map: this.map,
      draggable: true,
      icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
    });

    google.maps.event.addListener(this.draggableMarker, 'dragend', async () => {
      const pos = this.draggableMarker.getPosition();
      const lat = pos.lat();
      const lng = pos.lng();
      const addressData = await this.getAddressFromLatLng(lat, lng);
      if (addressData) {
        this.confirmAddPincode(addressData);
      }
    });
  }

  async confirmAddPincode(data: { pincode: string; address: string; lat: number; lng: number }) {
    const alert = await this.alertController.create({
      header: 'Add Pincode',
      message: `Do you want to add this location?\nAddress: ${data.address}\nPincode:${data.pincode}`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Add',
          handler: () => {
            this.addPincode(data);
            // this.savePincodeToServer(data);
          },
        },
      ],
    });

    await alert.present();
  }

  getAddressFromLatLng(lat: number, lng: number): Promise<{ pincode: string; address: string; lat: number; lng: number } | null> {
    return new Promise((resolve, reject) => {
      const latlng = { lat, lng };
      this.geocoder.geocode({ location: latlng }, (results: any, status: any) => {
        if (status === 'OK' && results[0]) {
          const address = results[0].formatted_address;
          let pincode = '';
          for (const comp of results[0].address_components) {
            if (comp.types.includes('postal_code')) {
              pincode = comp.long_name;
              break;
            }
          }
          resolve({ pincode, address, lat, lng });
        } else {
          console.error('Geocoder failed due to: ' + status);
          resolve(null);
        }
      });
    });
  }

  

  addPincode(data: { pincode: string; address: string; lat: number; lng: number }) {
    console.log('Pincode added:', data);
    this.createCircle(data.lat, data.lng);

    // // Add the pincode to the savedPincodes array immediately
    // this.savedPincodes.push(data);
    // this.cachePincodes(this.savedPincodes); // Update cache after adding
    this.subscriptions.add(

    this.auth.addPincode(data).subscribe({
      next: (response: any) => {
        console.log('Pincode saved to server:', response);
        this.showToast('Pincode added successfully');
        
        // Update the savedPincodes array with the server response if needed
        this.getAllPincodes(); // Refresh the list of pincodes
      },
      error: (error: any) => {
        console.error('Error saving pincode to server:', error);
        this.showToast('Error adding pincode');
      },
    })
    );
  }

  async getAllPincodes() {
    const loading = await this.loadingController.create({
      message: 'Loading pincodes...',
    });
    await loading.present();

    // const cachedPincodes = await this.getCachedPincodes();
    // if (cachedPincodes) {
    //   this.savedPincodes = cachedPincodes;
    //   loading.dismiss();
    // } else {
      this.subscriptions.add(
        this.auth.getAllPincode().subscribe({
          next: (response: any) => {
            console.log("response" + response);
            
            console.log(response['data']);
            this.savedPincodes = response['data'];
            
            this.savedPincodes = response['data'];
            // this.cachePincodes(response['data']);
            loading.dismiss();
          },
          error: (error: any) => {
            console.error('Error fetching pincodes:', error);
            this.showToast('Error loading pincodes');
            loading.dismiss();
          },
        })
      );
    // }
  }

  async cachePincodes(pincodes: any[]) {
    try {
      await this.data.set(this.pincodeCacheKey, pincodes);
      console.log('Pincodes cached successfully');
    } catch (error) {
      console.error('Error caching pincodes:', error);
    }
  }

  async getCachedPincodes(): Promise<any[] | null> {
    try {
      const cachedPincodes = await this.data.get(this.pincodeCacheKey);
      return cachedPincodes || null;
    } catch (error) {
      console.error('Error retrieving cached pincodes:', error);
      return null;
    }
  }

  async deletePincodeWithToast(pincode: any) {
    console.log('pincode to delete:', pincode);
    
    const alert = await this.alertController.create({
      header: 'Delete Pincode',
      message: `Are you sure you want to delete this pincode?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          handler: async () => {
            const loading = await this.loadingController.create({
              message: 'Deleting pincode...',
            });
            await loading.present();

            this.subscriptions.add(this.auth.deletePincode(pincode).subscribe({
              next: (value:any) => {
                console.log('Pincode deleted:', value);
                
             //   this.showToast('Pincode deleted successfully');
                loading.dismiss();
                this.getAllPincodes(); // Refresh the list of pincodes
                this.showToast('Pincode deleted successfully');
              },
              error: (error: any) => {
                console.error('Error deleting pincode:', error);
                this.showToast('Error deleting pincode');
                loading.dismiss();
              },
            }) );
          },
        },
      ],
    });

    await alert.present();
  }

  createCircle(lat: number, lng: number) {
    if (this.circle) {
      this.circle.setMap(null);
    }

    const center = new google.maps.LatLng(lat, lng);
    this.circle = new google.maps.Circle({
      center: center,
      radius: this.radius,
      map: this.map,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
    });

    this.map.setCenter(center);
  }

  
}
