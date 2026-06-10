import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddPage } from './add/add.page';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  query: string = "";
  cats: any[] = [];
  isRefreshing = false;
  isLoading = false;

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
    this.loadCategories();
  }

  refreshCategories() {
    this.loadCategories(true);
  }

  private getCacheKey(): string {
    return `categories_${this.query}`;
  }

  loadCategories(fromRefresh = false) {
    const cacheKey = this.getCacheKey();

    if (fromRefresh) {
      this.isRefreshing = true;
    } else {
      this.isLoading = true;
    }

    this.auth.getAllCategories(this.query).subscribe({
      next: async (value: any) => {
        this.cats = value['data']['content'] ?? [];
        await this.dataService.set(cacheKey, JSON.stringify(this.cats));
        this.isLoading = false;
        this.isRefreshing = false;
      },
      error: async (error: HttpErrorResponse) => {
        console.log(error);
        const cachedData = await this.dataService.get(cacheKey);
        if (cachedData) {
          this.cats = JSON.parse(cachedData);
        }
        this.isLoading = false;
        this.isRefreshing = false;
      },
    });
  }

  viewNotifications() {
    this.router.navigate(['folder', 'notifications']);
  }

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
    this.loadCategories();
  }

  delete(item: any) {
    this.auth.deleteCategory(item)
      .subscribe({
        next: async (value: any) => {
          console.log(value);
          this.loadCategories();
        },
        error: async (error: HttpErrorResponse) => {
          console.log(error);
        }
      });
  }
}
