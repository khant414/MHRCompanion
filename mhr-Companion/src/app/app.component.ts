//Install Font-Awesome and BootStrap
//npm install bootstrap font-awesome
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //template: "<pm-motion_zones></pm-motion_zones><app-hit-zone></app-hit-zone>",
  styleUrls: ['./app.component.css', '../styles.css']
})
export class AppComponent implements OnInit {
  title = 'Monster Hunter Rise Companion App';
  constructor(
    private router: Router,
  ) { }
  ngOnInit() {
  }
  /**
   * Check if the router url contains the specified route
   *
   * @param {string} route
   * @returns
   * @memberof MyComponent
   */
   hasRoute(route: string) {
    return this.router.url.match(route)
  }
}


