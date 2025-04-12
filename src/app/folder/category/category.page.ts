import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddPage } from './add/add.page';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse, HttpParameterCodec } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  query: string = "";
  cats: any[] = [];

  constructor(
    private router: Router,
    private auth: AuthService,
    private modalController: ModalController,
    private dataService: DataService // Inject DataService
  ) {}

  ngOnInit() {
    console.log("Initalzed category page");
  }

  ionViewDidEnter() {
    this.getAllCategory();
  }

  viewNotifications() {}

  async add() {
    const modal = await this.modalController.create({
      component: AddPage,
      canDismiss: true,
      backdropDismiss: false,
      animated: true,
      mode: 'ios',
      componentProps: { value: 123 },
    });

    await modal.present();

    const data = await modal.onDidDismiss();
    console.log(data);
    const cacheKey = `categories_${this.query}`;
    await this.dataService.remove(cacheKey); // Invalidate cache after deletion
    this.getAllCategory();
  }

  async getAllCategory() {
    const cacheKey = `categories_${this.query}`;
    const cachedData = await this.dataService.get(cacheKey);

    if (cachedData) {
      console.log('Using cached data');
      this.cats = JSON.parse(cachedData);
      return;
    }

    this.auth.getAllCategories(this.query)
      .subscribe({
        next: async (value: any) => {
          console.log(value);
          this.cats = value['data']['content'];
          await this.dataService.set(cacheKey, JSON.stringify(this.cats)); // Cache the response
        },
        error: async (error: HttpErrorResponse) => {
          console.log(error);
        }
      });
  }

  delete(item: any) {
    this.auth.deleteCategory(item)
      .subscribe({
        next: async (value: any) => {
          console.log(value);
          const cacheKey = `categories_${this.query}`;
          await this.dataService.remove(cacheKey); // Invalidate cache after deletion
          this.getAllCategory();
        },
        error: async (error: HttpErrorResponse) => {
          console.log(error);
        }
      });
  }
}
