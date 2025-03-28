import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { Position, Geolocation } from '@capacitor/geolocation';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-pincode',
  templateUrl: './pincode.page.html',
  styleUrls: ['./pincode.page.scss'],
})
export class PincodePage implements OnInit, AfterViewInit {
  @ViewChild('map', { static: false }) mapElement!: ElementRef;
  map: any;
  circle: any;
  // Default radius in meters
  radius: number = 1000;
  location!: Position;
  savedMarkers: any[] = [];
  draggableMarker: any = null;
  geocoder: any;
  constructor(private alertController: AlertController) {}

  ngOnInit() {}

  ngAfterViewInit() {
    // First load the Google Maps script, then get the location
    this.loadGoogleMaps()
      .then(() => this.getCurrentLocation())
      .catch((err) => console.error('Error loading Google Maps:', err));
  }

  // Dynamically load the Google Maps script if not already loaded
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
      console.log(position.coords);
      this.location = position;
      this.loadMap();
    } catch (e: any) {
      console.error(e);
      // Handle specific error if needed
      if (e?.message === 'Location services are not enabled') {
        // Handle error here
      }
    }
  }

  loadMap() {
    if (!google.maps || !google.maps.LatLng) {
      console.error('Google Maps API not loaded correctly.');
      return;
    }
    // Use the current location as the center for the map
    const latLng = new google.maps.LatLng(
      this.location.coords.latitude,
      this.location.coords.longitude
    );

    const mapOptions = {
      center: latLng,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };

    // Create the map
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.geocoder = new google.maps.Geocoder();
    // Create a circle with editable and draggable options
    // this.circle = new google.maps.Circle({
    //   map: this.map,
    //   center: latLng,
    //   radius: this.radius,
    //   fillColor: '#AA0000',
    //   fillOpacity: 0.35,
    //   strokeColor: '#AA0000',
    //   strokeOpacity: 0.8,
    //   strokeWeight: 2,
    //   editable: true,
    //   draggable: true,
    // });

    // // Listen for changes to the circle's radius
    // google.maps.event.addListener(this.circle, 'radius_changed', () => {
    //   this.radius = this.circle.getRadius();
    //   console.log(this.circle.getRadius());
    // });
    // google.maps.event.addListener(this.circle, 'center_changed', () => {
    //   const newCenter = this.circle.getCenter();
    //   console.log('New center:', newCenter.lat(), newCenter.lng());
    // });
  }

  // Update circle when the input value changes
  // updateCircleRadius() {
  //   if (this.circle) {
  //     this.circle.setRadius(Number(this.radius));
  //   }
  // }

  // Create a draggable marker when user clicks "Add Pincode".
  createDraggableMarker() {
    if (this.draggableMarker) {
      // Only allow one draggable marker at a time.
      return;
    }
    const center = this.map.getCenter();
    this.draggableMarker = new google.maps.Marker({
      position: center,
      map: this.map,
      draggable: true,
      icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png', // Blue icon for new marker.
    });

    // When the marker is dragged, update its address.
    google.maps.event.addListener(this.draggableMarker, 'dragend', () => {
      const pos = this.draggableMarker.getPosition();
      console.log(pos + "DragEnd");
      
      this.getAddressFromLatLng(pos.lat(), pos.lng());
    });

    // Immediately get the address at the starting position.
    this.getAddressFromLatLng(center.lat(), center.lng());

    // Open an info window with an "Add Pincode" button.
    const infoWindow = new google.maps.InfoWindow({
      content: `<div id="infoWindowContent">
                  <p id="address"></p>
                  <button id="addButton">Add Pincode</button>
                </div>`,
    });
    infoWindow.open(this.map, this.draggableMarker);

    // Add event listener for the "Add Pincode" button after the info window renders.
    google.maps.event.addListener(infoWindow, 'domready', () => {
      document.getElementById('addButton')?.addEventListener('click', () => {
        this.addPincodeAtMarker();
        infoWindow.close();
      });
    });
  }

  // Use reverse geocoding to get address details (including pincode) from lat/lng.
  getAddressFromLatLng(lat: number, lng: number) {
    const latlng = { lat, lng };
    this.geocoder.geocode({ location: latlng }, (results: any, status: any) => {
      if (status === 'OK' && results[0]) {
        const address = results[0].formatted_address;
        // Extract pincode from address_components.
        let pincode = '';
        for (const comp of results[0].address_components) {
          if (comp.types.includes('postal_code')) {
            pincode = comp.long_name;
            break;
          }
        }
        // Update the info window content if it exists.
        const addrElem = document.getElementById('address');
        if (addrElem) {
          addrElem.innerText = `Address: ${address}\nPincode: ${pincode}`;
        }
      } else {
        console.error('Geocoder failed due to: ' + status);
      }
    });
  }

  // When user confirms adding the pincode.
  addPincodeAtMarker() {
    if (!this.draggableMarker) return;
    const pos = this.draggableMarker.getPosition();
    const lat = pos.lat();
    const lng = pos.lng();
    // Reverse geocode to obtain pincode.
    this.geocoder.geocode(
      { location: { lat, lng } },
      (results: any, status: any) => {
        if (status === 'OK' && results[0]) {
          let pincode = '';
          for (const comp of results[0].address_components) {
            if (comp.types.includes('postal_code')) {
              pincode = comp.long_name;
              break;
            }
          }
          // Prepare data to save.
          const data = {
            pincode: pincode,
            address: results[0].formatted_address,
            lat: lat,
            lng: lng,
          };
          // Save data to your database via an API call.
          this.savePincodeToDB(data);
        } else {
          console.error('Geocoder failed: ' + status);
        }
      }
    );
  }

  // Dummy method to save the pincode data to the database.
  // Replace this with your actual API call.
  savePincodeToDB(data: any) {
    console.log(data);
    
    // For demonstration, simulate a successful save and add a non-draggable marker.
    this.addSavedMarker(data);
    // Remove the draggable marker.
    if (this.draggableMarker) {
      this.draggableMarker.setMap(null);
      this.draggableMarker = null;
    }
  }

  // Add a non-draggable marker (with a green icon) for a saved pincode.
  addSavedMarker(data: {
    pincode: string;
    address: string;
    lat: number;
    lng: number;
  }) {
    var marker = new google.maps.Marker({
      position: { lat: data.lat, lng: data.lng },
      map: this.map,
      draggable: false,
      icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png', // Green icon for saved marker.
    });
    // Attach the data to the marker for later use.
    (marker as any)['pincodeData'] = data;
    // Add a click event to allow removal.
    google.maps.event.addListener(marker, 'click', () => {
      this.confirmRemoval(marker);
    });
    this.savedMarkers.push(marker);
  }
  loadSavedMarkers() {
    // Replace this with an actual API call to fetch saved pincodes.
    // For demonstration, we assume an empty array.
    const savedPincodes: any[] = []; // e.g., [{pincode:'123456', address:'...', lat:.., lng:..}, ...]
    savedPincodes.forEach((data: any) => {
      this.addSavedMarker(data);
    });
  }

  // Ask the user for confirmation before removing a marker.
  async confirmRemoval(marker: any) {
    const alert = await this.alertController.create({
      header: 'Remove Pincode',
      message: 'Do you want to remove this pincode?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Remove',
          handler: () => {
            // Call your API to remove the marker from your database.
            // Then remove the marker from the map.
            marker.setMap(null);
            this.savedMarkers = this.savedMarkers.filter((m) => m !== marker);
          },
        },
      ],
    });
    await alert.present();
  }
}
