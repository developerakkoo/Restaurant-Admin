import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Position, Geolocation } from '@capacitor/geolocation';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

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

  constructor(private alertController: AlertController, private http: HttpClient) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.loadGoogleMaps()
      .then(() => this.getCurrentLocation())
      .catch((err) => console.error('Error loading Google Maps:', err));
  }

  ngOnDestroy() {
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

  loadGoogleMaps(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof google !== 'undefined' && google.maps) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        resolve();
      };
      script.onerror = (error: any) => {
        reject(error);
      };
      document.body.appendChild(script);
    });
  }

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

  // savePincodeToServer(data: { pincode: string; address: string; lat: number; lng: number }) {
  //   const url = 'https://your-api-endpoint.com/pincodes';
  //   this.http.post(url, data).subscribe({
  //     next: (response) => {
  //       console.log('Pincode saved successfully:', response);
  //     },
  //     error: (error) => {
  //       console.error('Error saving pincode:', error);
  //     },
  //   });
  // }

  addPincode(data: { pincode: string; address: string; lat: number; lng: number }) {
    this.savedPincodes.push(data);
  }

  deletePincode(pincode: any) {
    this.savedPincodes = this.savedPincodes.filter((item) => item !== pincode);
  }
}
