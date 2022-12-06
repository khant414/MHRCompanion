import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public pageTitle = '';
  display?: boolean;
  constructor() { }

  ngOnInit(): void {
    if( sessionStorage.getItem('ID:') == null ) {
      this.display = false;
    }
    else {
      var x = sessionStorage.getItem('ID:');
      if (x != null){
      var y = sessionStorage.getItem('Name:');
      this.display = true;
    }
  }

}

}
