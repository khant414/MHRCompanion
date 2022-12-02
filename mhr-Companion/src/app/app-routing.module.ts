import { UserSettingsFormComponent } from './user-settings-form/user-settings-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FinalresultsComponent } from './finalresults/finalresults.component';
import { HitZoneComponent } from './hit-zone/hit-zone.component';
import { LoginComponent } from './login/login.component';
import { Motion_ZoneComponent } from './motion_zones/motion_zones.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { DevpostformsComponent } from './devpostforms/devpostforms.component';

const routes: Routes = [
{ path: '', redirectTo: '/', pathMatch: 'full' },
{ path: 'pm-motion_zone', component: Motion_ZoneComponent },
{ path: 'pm-motion_zone/:parts_name/:hit_slash/:hit_strike/:hit_shot/:element_fire/:element_water/:element_ice/:element_thunder/:element_dragon', component: Motion_ZoneComponent },
{ path: 'app-home', component: HomeComponent},
{ path: 'app-hit-zone', component: HitZoneComponent },
{ path: 'login-logout', component: LoginComponent },
{ path: 'app-user-settings-form', component: UserSettingsFormComponent },
{ path: 'app-finalresults', component: FinalresultsComponent },
{ path: 'app-finalresults/:MoveID/:MoveName/:DamageType/:RawMV/:EleMV/:WeaponName', component: FinalresultsComponent },
{ path: 'app-about-us', component: AboutUsComponent},
{ path: 'app-devpostforms', component: DevpostformsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
