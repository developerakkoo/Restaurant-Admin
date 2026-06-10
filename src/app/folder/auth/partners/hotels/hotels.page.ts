import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

interface HotelLocationState {
  lat?: number;
  lng?: number;
  address?: string;
}

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.page.html',
  styleUrls: ['./hotels.page.scss'],
})
export class HotelsPage implements OnInit {
  form!: FormGroup;
  isHotelImageUploadModalOpen = false;
  hotelId: any;
  categories: any[] = [];
  lat: number | null = null;
  lng: number | null = null;
  pinnedAddress = '';
  partnerId: any;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private data: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {
    this.partnerId = this.route.snapshot.paramMap.get('id');
    this.form = this.formBuilder.group({
      hotelName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      categoryId: [[], [Validators.required]],
    });

    const navState = this.router.getCurrentNavigation()?.extras
      ?.state as HotelLocationState | undefined;
    if (navState) {
      this.applyLocationState(navState);
    }
  }

  ngOnInit(): void {
    if (this.lat == null || this.lng == null) {
      const historyState = history.state as HotelLocationState;
      if (historyState?.lat != null && historyState?.lng != null) {
        this.applyLocationState(historyState);
      }
    }

    if (this.lat == null || this.lng == null || !this.partnerId) {
      void this.redirectToMap('Please pin the restaurant location on the map first.');
      return;
    }

    this.loadCategory();
  }

  private applyLocationState(state: HotelLocationState): void {
    const lat = Number(state.lat);
    const lng = Number(state.lng);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      return;
    }

    this.lat = lat;
    this.lng = lng;
    this.pinnedAddress = state.address || '';

    if (this.pinnedAddress) {
      this.form.patchValue({ address: this.pinnedAddress });
    }
  }

  private async redirectToMap(message: string): Promise<void> {
    await this.presentToast(message, 2500, 'warning', 'bottom');
    await this.router.navigate(['folder', 'partners', 'map', this.partnerId]);
  }

  changeLocation(): void {
    void this.router.navigate(['folder', 'partners', 'map', this.partnerId], {
      state: {
        lat: this.lat,
        lng: this.lng,
        address: this.pinnedAddress || this.form.value.address,
      },
    });
  }

  async presentToast(
    msg: string,
    duration: any,
    color: any,
    position: any
  ): Promise<void> {
    const toast = await this.toastController.create({
      message: msg,
      duration,
      color,
      position,
    });
    await toast.present();
  }

  async uploadImage(ev: any): Promise<void> {
    const loading = await this.loadingController.create({
      message: 'Uploading image...',
      animated: true,
    });
    await loading.present();
    const file = ev.target.files[0];

    const formdata = new FormData();
    formdata.append('document', file, file.name);
    formdata.append('hotelId', this.hotelId);
    this.auth.uploadHotelImage(formdata).subscribe({
      next: async (value: any) => {
        console.log(value);
        this.isHotelImageUploadModalOpen = false;
        this.presentToast(
          'Hotel Registered Successfully',
          2000,
          'success',
          'bottom'
        );
        await loading.dismiss();
        setTimeout(() => {
          this.router.navigate(['folder', 'partners']);
        }, 1000);
      },
      error: async (error: HttpErrorResponse) => {
        console.log(error);
        this.isHotelImageUploadModalOpen = true;
        this.presentToast('Image Upload Failed', 2000, 'danger', 'bottom');
        await loading.dismiss();
      },
    });
  }

  setOpen(isOpen: boolean): void {
    this.isHotelImageUploadModalOpen = isOpen;
  }

  async onSubmit(): Promise<void> {
    if (this.lat == null || this.lng == null) {
      await this.redirectToMap('Location is missing. Please pin the hotel on the map.');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Registering hotel...',
      animated: true,
    });
    await loading.present();

    if (this.form.valid) {
      this.auth
        .hotelRegister(
          this.form.value.hotelName,
          this.form.value.address,
          this.form.value.categoryId,
          this.lng,
          this.lat,
          this.partnerId
        )
        .subscribe({
          next: async (value: any) => {
            console.log(value);
            await loading.dismiss();
            this.isHotelImageUploadModalOpen = true;
            this.hotelId = value['data']['_id'];
            await this.data.set('hotelCount', '1');
            await this.data.set('hotelId', value['data']['_id']);
          },
          error: async (error: HttpErrorResponse) => {
            console.log(error.error);
            await loading.dismiss();
            this.isHotelImageUploadModalOpen = false;
          },
        });
    } else {
      await loading.dismiss();
    }
  }

  loadCategory(): void {
    this.auth.getAllCategoriesForSelect().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.error);
      },
    });
  }
}
