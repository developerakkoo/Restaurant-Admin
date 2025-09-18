import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pincode',
  templateUrl: './pincode.page.html',
  styleUrls: ['./pincode.page.scss'],
})
export class PincodePage implements OnInit, OnDestroy {
  savedPincodes: any[] = [];
  filteredPincodes: any[] = [];
  searchTerm: string = '';
  private subscriptions: Subscription = new Subscription();

  constructor(
    private alertController: AlertController, 
    private auth: AuthService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private data: DataService
  ) {}

  ngOnInit() {
    console.log('PincodePage initialized');
    this.getAllPincodes();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

  async addNewPincode() {
    const alert = await this.alertController.create({
      header: 'Add New Pincode',
      inputs: [
        {
          name: 'pincode',
          type: 'text',
          placeholder: 'Enter pincode',
          attributes: {
            maxlength: 10,
            inputmode: 'numeric'
          }
        },
        {
          name: 'address',
          type: 'text',
          placeholder: 'Enter address',
          attributes: {
            maxlength: 200
          }
        },
        {
          name: 'latitude',
          type: 'number',
          placeholder: 'Latitude (optional)',
          attributes: {
            step: 'any'
          }
        },
        {
          name: 'longitude',
          type: 'number',
          placeholder: 'Longitude (optional)',
          attributes: {
            step: 'any'
          }
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Add',
          handler: (data) => {
            if (data.pincode && data.address) {
              const pincodeData = {
                pincode: data.pincode,
                address: data.address,
                lat: data.latitude ? parseFloat(data.latitude) : undefined,
                lng: data.longitude ? parseFloat(data.longitude) : undefined
              };
              this.addPincode(pincodeData);
            } else {
              this.showToast('Please enter both pincode and address');
            }
          },
        },
      ],
    });

    await alert.present();
  }

  addPincode(data: { pincode: string; address: string; lat?: number; lng?: number }) {
    console.log('Pincode added:', data);
    
    this.subscriptions.add(
      this.auth.addPincode(data).subscribe({
        next: (response: any) => {
          console.log('Pincode saved to server:', response);
          this.showToast('Pincode added successfully');
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

    this.subscriptions.add(
      this.auth.getAllPincode().subscribe({
        next: (response: any) => {
          console.log("response" + response);
          console.log(response['data']);
          this.savedPincodes = response['data'];
          this.filteredPincodes = [...this.savedPincodes];
          loading.dismiss();
        },
        error: (error: any) => {
          console.error('Error fetching pincodes:', error);
          this.showToast('Error loading pincodes');
          loading.dismiss();
        },
      })
    );
  }

  filterPincodes() {
    if (!this.searchTerm.trim()) {
      this.filteredPincodes = [...this.savedPincodes];
    } else {
      const searchLower = this.searchTerm.toLowerCase();
      this.filteredPincodes = this.savedPincodes.filter(pincode => 
        pincode.pincode.toLowerCase().includes(searchLower) ||
        pincode.address.toLowerCase().includes(searchLower)
      );
    }
  }

  async deletePincodeWithToast(pincodeId: any) {
    console.log('pincode to delete:', pincodeId);
    
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

            this.subscriptions.add(
              this.auth.deletePincode(pincodeId).subscribe({
                next: (value: any) => {
                  console.log('Pincode deleted:', value);
                  loading.dismiss();
                  this.getAllPincodes(); // Refresh the list of pincodes
                  this.showToast('Pincode deleted successfully');
                },
                error: (error: any) => {
                  console.error('Error deleting pincode:', error);
                  this.showToast('Error deleting pincode');
                  loading.dismiss();
                },
              })
            );
          },
        },
      ],
    });

    await alert.present();
  }
}
