import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

import {MatToolbarModule, MatCardModule, MatNativeDateModule,MatTableModule} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';


import { TollbarComponent } from './tollbar/tollbar.component';
import {HttpClientModule} from "@angular/common/http";

//config socket ang7
import {InjectableRxStompConfig, RxStompService, rxStompServiceFactory} from "@stomp/ng2-stompjs";
import { myRxStompConfig } from './rx-stomp.config';
import { TickComponentComponent } from './tick-component/tick-component.component';


@NgModule({
  declarations: [
    AppComponent,
    TollbarComponent,
    TickComponentComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule, MatCardModule,MatNativeDateModule, MatTableModule

  ],
  bootstrap: [AppComponent],
  providers: [

    {
      provide: InjectableRxStompConfig,
      useValue: myRxStompConfig
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig]
    }
    ]
})
export class AppModule { }
