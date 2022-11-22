import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css']
})
export class UserInputComponent implements OnInit {
  display: boolean = true;

  SaveCharData():void {

  }

  CheckForDisplay():void {
    if( sessionStorage.getItem('ID:') == null ) {
      this.display = false;
    }
    else {
      var x = sessionStorage.getItem('ID:');
      if (x != null){
      this.display = true;
    }
  }
  }
  constructor() { }

  ngOnInit(): void {
    this.CheckForDisplay();
  }

  
}
