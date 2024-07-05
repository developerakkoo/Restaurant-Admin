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

//   {
//     "_id": "6683a8a3c1d1a7ebf8648d14",
//     "members": [
//         {
//             "_id": "6677c354290578ee9350b322",
//             "name": "Akshay Jadhav",
//             "profile_image": "_",
//             "isOnline": false
//         }
//     ],
//     "lastMessage": {
//         "_id": "6683ad77fb49e3a1f3554f46",
//         "chatId": "6683a8a3c1d1a7ebf8648d14",
//         "orderId": "667fc160d29207d3dcae19ce",
//         "senderId": "6677c354290578ee9350b322",
//         "receiverId": "666979f2983fa6cd5cf79d08",
//         "message": "Whre is my order ",
//         "isImage": false,
//         "read": false,
//         "createdAt": "2024-07-02T07:34:15.388Z",
//         "updatedAt": "2024-07-02T07:34:15.388Z",
//         "__v": 0
//     }
// }
  openChat(chatId:any){
    console.log(chatId);
    this.orderId = chatId.lastMessage.orderId;
    this.receiverId = chatId.members[0]._id;
    this.chatId = chatId._id;
    this.chatName = chatId.members[0].name;
    this.getMessagesByChatId(chatId._id);
    // this.interval = setInterval(() =>{
    //   this.getMessagesByChatId(chatId._id);
  
    // },2000)
  }


  getMessagesByChatId(chatId:any){
    this.auth.getMessagesByChatId(chatId)
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
