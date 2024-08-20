import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

  id:any;
  userObj = {
    
      _id:"",
      name: "",
      profile_image: "",
      local_profileImagePath: "",
      email: "",
      phoneNumber: 0,
      isOnline: 0,
      status: 0,
      createdAt: "",
      updatedAt: "",
      "__v": 0
  
  }
  constructor(private auth:AuthService,
              private router:Router,
              private route:ActivatedRoute
  ) { 
    this.id = this.route.snapshot.paramMap.get("id");
  }

  ngOnInit() {
  }


  ionViewDidEnter(){
    this.getCustomerDetails();
  }

  async getCustomerDetails(){
    this.auth.getCustomerById(this.id)
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
        this.userObj = value['data'];
        
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error);
        
      }
    })

  }
}
