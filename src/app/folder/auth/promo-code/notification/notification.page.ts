import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  users:any[] = [];
  constructor(private auth:AuthService,private modalController:ModalController) { }

  ngOnInit() {
    this.auth.getAllCustomers("",1,10,"","","","0").subscribe((res:any) => {
      console.log(res);
      
      this.users = res?.data?.content;
    });
  }

  dismiss(){
    this.modalController.dismiss();
  }

  async selectUser(userId:any){
    await this.modalController.dismiss({userId});
  }
}
