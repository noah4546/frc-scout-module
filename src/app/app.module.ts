import { APP_INITIALIZER, Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppConfigService } from './services/app-config.service';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { IonicStorageModule } from '@ionic/storage-angular';
import { OnlineStatusModule } from 'ngx-online-status';
import { SQLiteService } from './services/sqlite.service';
import { FRCDBService } from './services/frc-db.service';
import { DbnameVersionService } from './services/dbname-version.service';
import { InitializeAppService } from './services/initialize.app.service';
import { ApiModule } from './features/api/api.module';
import { SyncService } from './services/sync.service';

export function initializeApp(init: InitializeAppService) {
  return () => init.initializeApp();
}

@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {
  constructor(private readonly appConfig: AppConfigService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        event = event.clone({ body: event.body });
      }
      return event;
    }));
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, 
    HttpClientModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    OnlineStatusModule
  ],
  providers: [
    AppConfigService,
    InitializeAppService,
    SQLiteService,
    FRCDBService,
    DbnameVersionService,
    ApiModule,
    SyncService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: APP_INITIALIZER, useFactory: initializeApp, deps: [InitializeAppService], multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ApiPrefixInterceptor, multi: true }
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule {}
