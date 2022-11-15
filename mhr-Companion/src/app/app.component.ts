//Install Font-Awesome and BootStrap
//npm install bootstrap font-awesome
import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //template: "<pm-motion_zones></pm-motion_zones><app-hit-zone></app-hit-zone>",
  styleUrls: ['./app.component.css','../styles.css']
})
export class AppComponent {
  title = 'Monster Hunter Rising Companion';
  welcomeMessage = sessionStorage.getItem('Name:');
}


