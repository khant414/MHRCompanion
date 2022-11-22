import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Motion_ZoneComponent } from './motion_zones/motion_zones.component';
import { HitZoneComponent } from './hit-zone/hit-zone.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FinalresultsComponent } from './finalresults/finalresults.component';
import { UserInputComponent } from './user-input/user-input.component';

@NgModule({
  declarations: [	
    AppComponent,
    Motion_ZoneComponent,
    HitZoneComponent,
    LoginComponent,
    HomeComponent,
    FinalresultsComponent,
    UserInputComponent
   ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
