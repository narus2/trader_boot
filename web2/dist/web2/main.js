(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n\n<!--<app-chart-indicator></app-chart-indicator>-->\n\n <app-tick-component></app-tick-component>\n\n  <div class=\"container\" style=\"width: 400px; margin-top: 20px;\">\n    <form class=\"form-inline\">\n      <div class=\"form-group\">\n        <label for=\"connect\">Make Connection:</label>\n        <button id=\"connect\" class=\"btn btn-default\" type=\"button\" [disabled]=\"!disabled\" (click)=\"connect()\">Connect</button>\n        <button id=\"disconnect\" class=\"btn btn-default\" type=\"submit\" [disabled]=\"disabled\" (click)=\"disconnect()\">Disconnect</button>\n      </div>\n    </form>\n\n\n    <form class=\"form-inline\" *ngIf=\"bar != null\" style=\"margin-top: 20px;\">\n      <mat-card class=\"example-card\">\n        <mat-card-header>\n          <mat-card-title>{{bar.currencyPair}}</mat-card-title>\n          <mat-card-subtitle>{{bar.last}}</mat-card-subtitle>\n        </mat-card-header>\n        <mat-card-content>\n          <p>ask: {{bar.ask}} </p>\n          <p>bid: {{bar.bid}}</p>\n\n          <p>askSize: {{bar.askSize}}</p>\n          <p>bidSize: {{bar.bidSize}}</p>\n\n          <p>high: {{bar.high}}</p>\n          <p>low: {{bar.low}}</p>\n          <p>open: {{bar.open}}</p>\n\n          <p>quoteVolume: {{bar.quoteVolume}}</p>\n          <p>timestamp: {{bar.timestamp}}</p>\n          <p>volume: {{bar.volume}}  </p>\n        </mat-card-content>\n        <mat-card-actions>\n          <button mat-button>LIKE</button>\n          <button mat-button>SHARE</button>\n        </mat-card-actions>\n      </mat-card>\n    </form>\n    <table id=\"conversation\" class=\"table table-striped\" style=\"margin-top: 40px;\">\n      <thead>\n        <tr>\n          <th>Greetings</th>\n        </tr>\n      </thead>\n      <tbody *ngFor=\"let greeting of greetings\">\n        <tr>\n          <td>S: {{greeting.source}} M:{{greeting.msg}}</td>\n        </tr>\n      </tbody>\n    </table>\n\n  </div>\n\n <span *ngIf=\"subscribed\">Subscribed</span>\n <span *ngIf=\"!subscribed\">Unsubscribed</span>\n <h2>Messages</h2>\n <p>{{count}} total</p>\n\n <h3 *ngIf=\"count\">Latest:</h3>\n <pre>{{messages | async}}</pre>\n\n <h3 *ngIf=\"mq.length\">History:</h3>\n <ol>\n   <li *ngFor=\"let m of mq\">{{m}}</li>\n </ol>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _stomp_ng2_stompjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @stomp/ng2-stompjs */ "./node_modules/@stomp/ng2-stompjs/fesm5/stomp-ng2-stompjs.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = /** @class */ (function () {
    function AppComponent(rxStompService) {
        var _this = this;
        this.rxStompService = rxStompService;
        // Array of historic message (bodies)
        this.mq = [];
        // A count of messages received
        this.count = 0;
        this._counter = 1;
        this.greetings = [];
        this.disabled = true;
        /** Consume a message from the _stompService */
        this.on_next = function (message) {
            _this.showGreeting(JSON.parse(message.body));
            _this.mq.push(message.body);
            if (_this.mq.length > 50) {
                _this.mq.splice(0, 1);
            }
            // Count it
            _this.count++;
            //
            // // Log it to the console
            console.log(message);
        };
    }
    AppComponent.prototype.showGreeting = function (message) {
        if (message.source == "tbar") {
            this.bar = message.msg;
            //console.log(message);
        }
        else {
            this.greetings.push(message);
        }
    };
    AppComponent.prototype.onSendMessage = function () {
        var message = "Message generated at " + new Date;
        this.rxStompService.publish({ destination: '/app/send/message', body: JSON.stringify({ source: "start", msg: true }) });
    };
    AppComponent.prototype.connect = function () {
        this.rxStompService.watch('/topic/hi').subscribe(this.on_next);
        this.onSendMessage();
        this.subscribed = true;
    };
    AppComponent.prototype.disconnect = function () {
        this.topicSubscription.unsubscribe();
        this.subscribed = false;
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            providers: [],
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [_stomp_ng2_stompjs__WEBPACK_IMPORTED_MODULE_1__["RxStompService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _tollbar_tollbar_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tollbar/tollbar.component */ "./src/app/tollbar/tollbar.component.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _stomp_ng2_stompjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @stomp/ng2-stompjs */ "./node_modules/@stomp/ng2-stompjs/fesm5/stomp-ng2-stompjs.js");
/* harmony import */ var _rx_stomp_config__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./rx-stomp.config */ "./src/app/rx-stomp.config.ts");
/* harmony import */ var _tick_component_tick_component_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./tick-component/tick-component.component */ "./src/app/tick-component/tick-component.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








//config socket ang7



var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
                _tollbar_tollbar_component__WEBPACK_IMPORTED_MODULE_6__["TollbarComponent"],
                _tick_component_tick_component_component__WEBPACK_IMPORTED_MODULE_10__["TickComponentComponent"],
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__["BrowserAnimationsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HttpClientModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatToolbarModule"], _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatCardModule"], _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatNativeDateModule"], _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatTableModule"]
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]],
            providers: [
                {
                    provide: _stomp_ng2_stompjs__WEBPACK_IMPORTED_MODULE_8__["InjectableRxStompConfig"],
                    useValue: _rx_stomp_config__WEBPACK_IMPORTED_MODULE_9__["myRxStompConfig"]
                },
                {
                    provide: _stomp_ng2_stompjs__WEBPACK_IMPORTED_MODULE_8__["RxStompService"],
                    useFactory: _stomp_ng2_stompjs__WEBPACK_IMPORTED_MODULE_8__["rxStompServiceFactory"],
                    deps: [_stomp_ng2_stompjs__WEBPACK_IMPORTED_MODULE_8__["InjectableRxStompConfig"]]
                }
            ]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/rx-stomp.config.ts":
/*!************************************!*\
  !*** ./src/app/rx-stomp.config.ts ***!
  \************************************/
/*! exports provided: myRxStompConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "myRxStompConfig", function() { return myRxStompConfig; });
/* harmony import */ var _environments_environment_prod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../environments/environment.prod */ "./src/environments/environment.prod.ts");

var myRxStompConfig = {
    brokerURL: _environments_environment_prod__WEBPACK_IMPORTED_MODULE_0__["environment"].ws_serverURL,
    //   headers: {
    //     login: 'guest',
    //     passcode: 'guest'
    //   },
    //
    heartbeat_in: 0,
    heartbeat_out: 20000,
    reconnect_delay: 200,
    //   // Will log diagnostics on console
    debug: function (msg) {
        console.log(new Date(), msg);
    }
};


/***/ }),

/***/ "./src/app/tick-component/tick-component.component.css":
/*!*************************************************************!*\
  !*** ./src/app/tick-component/tick-component.component.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3RpY2stY29tcG9uZW50L3RpY2stY29tcG9uZW50LmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/tick-component/tick-component.component.html":
/*!**************************************************************!*\
  !*** ./src/app/tick-component/tick-component.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<table mat-table [dataSource]=\"dataSource\" class=\"mat-elevation-z8\">\n\n  <!--- Note that these columns can be defined in any order.\n        The actual rendered columns are set as a property on the row definition\" -->\n\n  <!-- Position Column -->\n  <ng-container matColumnDef=\"position\">\n    <th mat-header-cell *matHeaderCellDef> No. </th>\n    <td mat-cell *matCellDef=\"let element\"> {{element.position}} </td>\n  </ng-container>\n\n  <!-- Name Column -->\n  <ng-container matColumnDef=\"name\">\n    <th mat-header-cell *matHeaderCellDef> Name </th>\n    <td mat-cell *matCellDef=\"let element\"> {{element.name}} </td>\n  </ng-container>\n\n  <!-- Weight Column -->\n  <ng-container matColumnDef=\"weight\">\n    <th mat-header-cell *matHeaderCellDef> Weight </th>\n    <td mat-cell *matCellDef=\"let element\"> {{element.weight}} </td>\n  </ng-container>\n\n  <!-- Symbol Column -->\n  <ng-container matColumnDef=\"symbol\">\n    <th mat-header-cell *matHeaderCellDef> Symbol </th>\n    <td mat-cell *matCellDef=\"let element\"> {{element.symbol}} </td>\n  </ng-container>\n\n  <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n  <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\n</table>\n\n"

/***/ }),

/***/ "./src/app/tick-component/tick-component.component.ts":
/*!************************************************************!*\
  !*** ./src/app/tick-component/tick-component.component.ts ***!
  \************************************************************/
/*! exports provided: TickComponentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TickComponentComponent", function() { return TickComponentComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ELEMENT_DATA = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
var TickComponentComponent = /** @class */ (function () {
    function TickComponentComponent() {
        this.displayedColumns = ['position', 'name', 'weight', 'symbol'];
        this.dataSource = ELEMENT_DATA;
    }
    TickComponentComponent.prototype.ngOnInit = function () {
    };
    TickComponentComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-tick-component',
            template: __webpack_require__(/*! ./tick-component.component.html */ "./src/app/tick-component/tick-component.component.html"),
            styles: [__webpack_require__(/*! ./tick-component.component.css */ "./src/app/tick-component/tick-component.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], TickComponentComponent);
    return TickComponentComponent;
}());



/***/ }),

/***/ "./src/app/tollbar/tollbar.component.css":
/*!***********************************************!*\
  !*** ./src/app/tollbar/tollbar.component.css ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3RvbGxiYXIvdG9sbGJhci5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/tollbar/tollbar.component.html":
/*!************************************************!*\
  !*** ./src/app/tollbar/tollbar.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-toolbar color=\"primary\"> Trading\n  </mat-toolbar>\n"

/***/ }),

/***/ "./src/app/tollbar/tollbar.component.ts":
/*!**********************************************!*\
  !*** ./src/app/tollbar/tollbar.component.ts ***!
  \**********************************************/
/*! exports provided: TollbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TollbarComponent", function() { return TollbarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TollbarComponent = /** @class */ (function () {
    function TollbarComponent() {
    }
    TollbarComponent.prototype.ngOnInit = function () {
    };
    TollbarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-tollbar',
            template: __webpack_require__(/*! ./tollbar.component.html */ "./src/app/tollbar/tollbar.component.html"),
            styles: [__webpack_require__(/*! ./tollbar.component.css */ "./src/app/tollbar/tollbar.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], TollbarComponent);
    return TollbarComponent;
}());



/***/ }),

/***/ "./src/environments/environment.prod.ts":
/*!**********************************************!*\
  !*** ./src/environments/environment.prod.ts ***!
  \**********************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
var environment = {
    production: true,
    serverURL: 'http://127.0.0.1:8080/app-ta4j-server-1.1-SNAPSHOT/greeting',
    ws_serverURL: 'ws://127.0.0.1:8080/app-ta4j-server-1.1-SNAPSHOT/greeting'
};


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false,
    serverURL: "http://localhost:8080/gkz-stomp-endpoint",
    subscribeURL: "/topic/hi",
    subscribe_snd_URL: "/gkz/hello"
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_4__);





if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! d:\workspace\traiding\web2\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map