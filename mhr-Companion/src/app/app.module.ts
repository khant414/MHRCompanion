import { UserSettingsFormComponent } from './user-settings-form/user-settings-form.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Motion_ZoneComponent } from './motion_zones/motion_zones.component';
import { HitZoneComponent } from './hit-zone/hit-zone.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomeComponent } from './home/home.component';
import { FinalresultsComponent } from './finalresults/finalresults.component';
import { DevpostformsComponent } from './devpostforms/devpostforms.component';

@NgModule({
  declarations: [	
    AppComponent,
    Motion_ZoneComponent,
    HitZoneComponent,
    LoginComponent,
    AboutUsComponent,
    HomeComponent,
    FinalresultsComponent,
    UserSettingsFormComponent,
    DevpostformsComponent

   ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
