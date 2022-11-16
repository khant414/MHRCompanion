import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HitZoneComponent } from './hit-zone/hit-zone.component';
import { LoginComponent } from './login/login.component';
import { Motion_ZoneComponent } from './motion_zones/motion_zones.component';

const routes: Routes = [
{ path: '', redirectTo: '/', pathMatch: 'full' },
{path: 'pm-motion_zone', component: Motion_ZoneComponent },
{ path: 'app-hit-zone', component: HitZoneComponent },
{ path: 'login-logout', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
