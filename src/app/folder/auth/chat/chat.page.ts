import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  messages: any[] = [
    {
      id: 1,
      name: 'TEst name',
      image: 'assets/icon/favicon.png',
      messaage: 'this is a message',
      date: 'Dec 15',
    },
    {
      id: 1,
      name: 'TEst name',
      image: 'assets/icon/favicon.png',
      message: 'this is a message',
      date: 'Dec 15',
    },
    {
      id: 1,
      name: 'TEst name',
      image: 'assets/icon/favicon.png',
      message: 'this is a message',
      date: 'Dec 15',
    },
    {
      id: 1,
      name: 'TEst name',
      image: 'assets/icon/favicon.png',
      message: 'this is a message',
      date: 'Dec 15',
    },
    {
      id: 1,
      name: 'TEst name',
      image: 'assets/icon/favicon.png',
      message: 'this is a message',
      date: 'Dec 15',
    },
    {
      id: 1,
      name: 'TEst name',
      image: 'assets/icon/favicon.png',
      message: 'this is a message',
      date: 'Dec 15',
    },
  ];
  constructor() {}

  ngOnInit() {}

  onSearchChange(ev: any) {}
}
