import {Injectable, OnInit} from '@angular/core';

//import {environment} from "../environments/environment";
import {Ticket} from "./ticket";
import {Observable} from "rxjs";
import * as Rx from 'rxjs/Rx';
import {Message} from "@stomp/stompjs";
//import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ServiseService {
  //private subscription: Subscription;
  public messages: Observable<Message>;

  private  result: Ticket[] = [];
  private subject: Rx.Subject<MessageEvent>;

  constructor(){};


  public connect(url): Rx.Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log("Successfully connected: " + url);
    }
    return this.subject;
  }

  private create(url): Rx.Subject<MessageEvent> {
    let ws = new WebSocket(url);

    let observable = Rx.Observable.create(
      (obs: Rx.Observer<MessageEvent>) => {
        ws.onmessage = obs.next.bind(obs);
        ws.onerror = obs.error.bind(obs);
        ws.onclose = obs.complete.bind(obs);
        return ws.close.bind(ws);
      })
    let observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
    }
    return Rx.Subject.create(observer, observable);
  }

public on_next = (message: Message) => {
    let mess = JSON.parse(message.body);
    if( mess.source == "tbar" ){
      this.result.push(new Ticket(mess.msg.beginTime, mess.msg.openPrice,mess.msg.maxPrice, mess.msg.minPrice, mess.msg.closePrice, mess.msg.amount));
      }
     else if (mess.source == "tickets" ) {
       console.log("!!!!!!!!!!!!!!!!!!!", mess.msg);
    }

    }

  public  getGoog(): any {

//    this.connect();
     this.result.push(
       new Ticket(new Date(2018, 0 , 31).getDate() , 1170.57, 1173.00, 1159.13, 1169.94, 1538688 )
     );
    return this.result;
  }

  public sendMessage(){
//    this.ws.send(JSON.stringify("test"));
    //  this._stompService.send("/app/topic", JSON.stringify("test") )
    // this._stompService.send("/app/changeMessage", {}, JSON.stringify("test"))

  }

}
