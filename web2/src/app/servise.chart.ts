import { Injectable } from '@angular/core';
// import * as Stomp from 'stompjs';
// import * as SockJS from 'sockjs-client';
import { ServiseService } from './servise.service';
import {Subject} from "rxjs";

//const CHAT_URL = 'ws://http://127.0.0.1:8080/app-ta4j-server-1.1-SNAPSHOT/';
const CHAT_URL = 'ws://127.0.0.1:8080/app-ta4j-server-1.1-SNAPSHOT/topic/hi';

export interface Message {
  author: string,
  message: string
}

@Injectable()
export class ServiceChart {
  public messages: Subject<Message>;

  constructor(wsService: ServiseService) {
    this.messages = <Subject<Message>>wsService
      .connect(CHAT_URL)
      .map((response: MessageEvent): Message => {
        let data = JSON.parse(response.data);
        return {
          author: data.author,
          message: data.message
        }
      });
  }
}
