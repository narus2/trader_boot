import {Component, OnInit} from '@angular/core';

import {Ticket} from "./ticket";

import {Message} from '@stomp/stompjs';
import {Subscription} from "rxjs";
import {RxStompService} from "@stomp/ng2-stompjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})

export class AppComponent {
  private topicSubscription: Subscription;
  // // Subscription status
  public subscribed: boolean;

  // Array of historic message (bodies)
  public mq: Array<string> = [];

  // A count of messages received
  public count = 0;

  private _counter = 1;
  greetings: string[] = [];
  disabled = true;

  private greeting: void;
  private bar :Ticket;

  constructor(private rxStompService: RxStompService) {

  }

  showGreeting(message) {
    if (message.source == "tbar"){
      this.bar = message.msg;
      //console.log(message);
    } else {
      this.greetings.push(message);}
  }

  onSendMessage() {
    const message = `Message generated at ${new Date}`;
    this.rxStompService.publish({destination: '/app/send/message', body: JSON.stringify({source: "start", msg: true}) });
  }
  connect() {
    this.rxStompService.watch('/topic/hi').subscribe(this.on_next);
    this.onSendMessage();
    this.subscribed = true;
  }



  disconnect(){
    this.topicSubscription.unsubscribe();
    this.subscribed = false;
  }

  /** Consume a message from the _stompService */
  public on_next = (message: Message) => {
     this.showGreeting(JSON.parse(message.body));
    this.mq.push(message.body)
     if(this.mq.length > 50){
      this.mq.splice(0,1);
    }
    // Count it
    this.count++;
    //
    // // Log it to the console
    console.log(message);
  }



}
