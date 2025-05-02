import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  messages: any[] = [
   
  ];
  chatMessages: any[] = [
   
  ];
  chatName:string = "";
  message:string = "";
  orderId:any = "";
  senderId:string = "666979f2983fa6cd5cf79d08";
  receiverId:string = "";
  chatId:any = "";
  interval:any;
  constructor(private auth:AuthService,
              private loadingController: LoadingController
  ) {}

  ngOnInit() {}


  ionViewDidEnter(){
this.getAllChats();

  }

  ionViewDidLeave(){
    clearInterval(this.interval);
  }
  onSearchChange(ev: any) {}


  getAllChats(){
    this.auth.getAllChats()
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
        this.messages = value['data'];
        
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error.error);
        
      }
    })
  }



  openChat(chatId:any){
    console.log(chatId);
    this.orderId = chatId.lastMessage.orderId;
    this.receiverId = chatId.user._id;
    this.chatId = chatId._id;
    this.chatName = chatId.user.phoneNumber;
    this.getMessagesByChatId(chatId._id);
    // this.interval = setInterval(() =>{
    //   this.getMessagesByChatId(chatId._id);
  
    // },2000)
  }


  getMessagesByChatId(chatId:any){
    this.auth.getAllChats()
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
        this.chatMessages = value['data'];
        
      },
      error:async(error:HttpErrorResponse) =>{
        console.log(error.error);
        
      }
    })
  }
  sendMessage(){
    this.auth.sendMessage(this.chatId, this.senderId, this.receiverId, this.orderId, this.message)
    .subscribe({
      next:async(value:any) =>{
        console.log(value);
        this.getMessagesByChatId(this.chatId);
      },
      error:(error:HttpErrorResponse) =>{
        console.log(error.error);
        
      }
    })
  }
}
