import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleMap } from '@capacitor/google-maps';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { HotelsPage } from '../hotels/hotels.page';
import {Position } from '@capacitor/geolocation';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  @ViewChild('map')

  partnerId:any;
  mapRef!: ElementRef<HTMLElement>;
  newMap!: GoogleMap;
  lng:any;
  lon:any;
  coordinates!: Position;
  location:any;

  // lng:any = "18.5204303";
  // lon:any = "73.8567437";
  formattedAddress:any;

  reverseGeocodeAddressList:any[] = [];
  constructor(private route: ActivatedRoute,
    private router: Router,
              private http: HttpClient,
              private modalController: ModalController,
              private geolocation: Geolocation,
  ) { 
  

  
    
    this.location = {lat: this.lng, lng: this.lon}
    this.reverseGeocoding(this.lng, this.lon);
  }

  ngOnInit() {
  }
  ionViewDidEnter(){
    this.partnerId = this.route.snapshot.paramMap.get("id");
    console.log(this.partnerId);
    this.loadCurrentPosition()
  }
  async loadCurrentPosition() {
    

    const coordinates = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
    });

    console.log('Current position:', coordinates);
    console.log(coordinates);
    this.createMap();

    this.coordinates = coordinates;
    this.lng = coordinates.coords.latitude;
    this.lon = coordinates.coords.longitude;
  }

  async createMap() {
    this.newMap = await GoogleMap.create({
      id: 'my-cool-map',
      element: document.getElementById("map")!,
      apiKey: environment.apiKey,
      language:"en",
      config: {
        draggableCursor:"true",

        draggable:true,
        center: {
          lat: parseFloat(this.lng),
          lng:  parseFloat(this.lon)
        },
        zoom: 25,
        
      },
    });
// Enable marker clustering
await this.newMap.enableClustering();
// Handle marker click
await this.newMap.setOnMarkerClickListener((event) => {
  console.log(event);
  
});

// Handle marker click
await this.newMap.setOnMarkerDragEndListener((event) => {
  console.log(event);
  this.lng = event['latitude'];
  this.lon = event['longitude'];
  this.reverseGeocoding(event['latitude'], event['longitude']);
  
});
await this.newMap.enableCurrentLocation(true);
    const marker = await this.newMap.addMarker({
      draggable:true,
      title:"My Location",
      iconUrl:"assets/gps.png",
      iconSize:{
        width:50,
        height:50
      },
      iconAnchor:{
        x:25,
        y:50
      },
      isFlat: true,
      coordinate:{
        lat: parseFloat(this.lng),
        lng: parseFloat(this.lon)
      }
    })
   
    
  
  }

  reverseGeocoding(lat:any, lng:any){
    this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${environment.apiKey}`)
    .subscribe({
      next:(value:any) =>{
        console.log(value);
        this.reverseGeocodeAddressList = value['results'];
        this.formattedAddress = value['results'][0]['formatted_address'];
        this.location = value['results'][0]['geometry']['location'];
      },
      error(err:any) {
            console.log(err);
            
      },
    })
  }

  async presentModal() {
    
  
  }
  async openAddAddressPage(){
    const modal = await this.modalController.create({
      component: HotelsPage,
      componentProps: { value: this.formattedAddress,location:this.location }
      });
    
      await modal.present();
    
      const data = await modal.onDidDismiss();
      console.log(data);
  }

  setAddress(){
    console.log(this.partnerId);
    
    this.router.navigate(['folder','partners','hotels', this.lng, this.lon, this.partnerId])
  }

}
