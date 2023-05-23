import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { NavbarComponent } from './includes/navbar/navbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ProjectComponent } from './project/project.component';
export function Kcfactory(kcService: KeycloakService) {
  return () =>
   kcService.init({

      config: {
        url: 'http://localhost:8081/auth/',
        realm: 'ppl',
        clientId:'ppl',


      },
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe:true

      },
    });
}
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidenavComponent,
    HomeComponent,
    ProjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KeycloakAngularModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [
    {provide : APP_INITIALIZER, deps : [KeycloakService],useFactory : Kcfactory, multi : true},
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
