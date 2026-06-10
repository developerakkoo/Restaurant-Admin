import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleMap } from '@angular/google-maps';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

interface MapLatLng {
  lat: number;
  lng: number;
}

interface MapStyleRule {
  elementType?: string;
  featureType?: string;
  stylers?: Array<{ color?: string }>;
}

const DEFAULT_CENTER: MapLatLng = { lat: 18.5204, lng: 73.8567 };
const GEOCODE_DEBOUNCE_MS = 400;

const MAP_DARK_STYLES: MapStyleRule[] = [
  { elementType: 'geometry', stylers: [{ color: '#242424' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#242424' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#9ca3af' }] },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#38414e' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#212a37' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#17263c' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6b7280' }],
  },
];

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnDestroy {
  @ViewChild(GoogleMap) mapComponent!: GoogleMap;

  partnerId = '';
  center: MapLatLng = { ...DEFAULT_CENTER };
  zoom = 16;
  lat: number | null = null;
  lng: number | null = null;
  formattedAddress = '';
  isGeocoding = false;
  mapReady = false;

  mapOptions: Record<string, unknown> = {
    disableDefaultUI: false,
    zoomControl: true,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    gestureHandling: 'greedy',
    styles: MAP_DARK_STYLES,
  };

  private geocodeTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private toastController: ToastController
  ) {}

  ionViewDidEnter(): void {
    this.partnerId = this.route.snapshot.paramMap.get('id') || '';
  }

  onMapInitialized(_map: unknown): void {
    this.mapReady = true;
    void this.recenterOnMe(true);
  }

  onMapIdle(): void {
    this.syncCenterFromMap();
  }

  get hasValidCoords(): boolean {
    return (
      this.mapReady &&
      this.lat != null &&
      this.lng != null &&
      !(this.lat === 0 && this.lng === 0)
    );
  }

  syncCenterFromMap(): void {
    const map = this.mapComponent?.googleMap;
    if (!map) {
      return;
    }

    const center = map.getCenter();
    if (!center) {
      return;
    }

    this.lat = center.lat();
    this.lng = center.lng();
    this.scheduleGeocode();
  }

  scheduleGeocode(): void {
    if (this.geocodeTimer) {
      clearTimeout(this.geocodeTimer);
    }
    this.geocodeTimer = setTimeout(() => {
      this.reverseGeocode();
    }, GEOCODE_DEBOUNCE_MS);
  }

  reverseGeocode(): void {
    if (this.lat == null || this.lng == null) {
      return;
    }

    this.isGeocoding = true;
    this.http
      .get<any>(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.lat},${this.lng}&key=${environment.apiKey}`
      )
      .subscribe({
        next: (value) => {
          this.isGeocoding = false;
          const result = value?.results?.[0];
          this.formattedAddress = result?.formatted_address
            ? result.formatted_address
            : 'Address lookup unavailable';
        },
        error: () => {
          this.isGeocoding = false;
          this.formattedAddress = 'Address lookup unavailable';
        },
      });
  }

  async recenterOnMe(silent = false): Promise<void> {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      this.applyFallbackCenter(silent);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.panTo(position.coords.latitude, position.coords.longitude);
        if (!silent) {
          void this.presentToast('Centered on your location', 'success');
        }
      },
      () => {
        this.applyFallbackCenter(silent);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  }

  private applyFallbackCenter(silent: boolean): void {
    if (!this.mapReady) {
      this.lat = DEFAULT_CENTER.lat;
      this.lng = DEFAULT_CENTER.lng;
      this.center = { ...DEFAULT_CENTER };
      this.scheduleGeocode();
    } else {
      this.panTo(DEFAULT_CENTER.lat, DEFAULT_CENTER.lng);
    }

    if (!silent) {
      void this.presentToast(
        'Location permission denied. Move the map to pin the exact spot.',
        'warning'
      );
    }
  }

  panTo(lat: number, lng: number): void {
    this.center = { lat, lng };
    this.lat = lat;
    this.lng = lng;

    const map = this.mapComponent?.googleMap;
    if (map) {
      map.panTo({ lat, lng });
    }

    this.scheduleGeocode();
  }

  confirmLocation(): void {
    if (!this.hasValidCoords || this.lat == null || this.lng == null) {
      return;
    }

    this.router.navigate(['folder', 'partners', 'hotels', this.partnerId], {
      state: {
        lat: this.lat,
        lng: this.lng,
        address: this.formattedAddress,
      },
    });
  }

  ngOnDestroy(): void {
    if (this.geocodeTimer) {
      clearTimeout(this.geocodeTimer);
    }
  }

  private async presentToast(message: string, color: string): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 2500,
      position: 'bottom',
      color,
    });
    await toast.present();
  }
}
