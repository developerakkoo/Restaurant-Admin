import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  fb!:FormGroup;
  file!:File;
  categoryId:any;
  isCategoryAdded:boolean = false;
  constructor(private modalController: ModalController,
              private auth: AuthService,
              private formBuilder: FormBuilder
  ) { 
    this.fb = this.formBuilder.group({
      categoryName: [,[Validators.required]]
    })
  }

  ngOnInit() {
  }

  close(){
    this.modalController.dismiss();
  }

  fileEvent(ev:any){
    console.log(ev.target.files[0]);
    this.file = ev.target.files[0];
    let formdata = new FormData();
    formdata.append("document", this.file, this.file.name);
    formdata.append("categoryId",this.categoryId);
    this.auth.uploadCategoryImage(formdata)
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
        this.modalController.dismiss();
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error);
        
      }
    })
  }

  async add(){
    this.auth.addCategory(this.fb.value)
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
        this.categoryId = value['data']['_id'];
        this.isCategoryAdded = true;
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error);
        this.isCategoryAdded = false;

        
      }
    })
  }
}
