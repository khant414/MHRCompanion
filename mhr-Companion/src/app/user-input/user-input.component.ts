import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MongoContainer } from './user-input';


@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css']
})
export class UserInputComponent implements OnInit {
  display: boolean = true;

  inputMongoData: MongoContainer[] = [];
  
  

  SaveCharData():void {
    /*
    

    googleId = sessionStorage.getItem('ID:')
    inputMongoData.append(googleId);
    foreach var (item) in inputFormData {
      inputMongoData.append(item)
    }
    

    */
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

  ngOnInit(): void {
    this.CheckForDisplay();
  }

  
}
