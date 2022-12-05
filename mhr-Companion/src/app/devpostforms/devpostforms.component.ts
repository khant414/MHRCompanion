import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DevpostformsService } from './devpostforms.service';
import { INewHitzone } from './newHitzone';
import { IMove } from './newMove';

@Component({
  selector: 'app-devpostforms',
  templateUrl: './devpostforms.component.html',
  styleUrls: ['./devpostforms.component.css']
})
export class DevpostformsComponent implements OnInit {

  newHitzone: INewHitzone = {
    MonsterID: 0,
    MonsterName: "",
    parts_name: "",
    hit_slash: 0,
    hit_strike: 0,
    hit_shot: 0,
    element_fire: 0,
    element_water: 0,
    element_ice: 0,
    element_thunder: 0,
    element_dragon: 0
  }

  newMove: IMove = {
    MoveID: 0,
    MoveName: "",
    DamageType: "",
    RawMV: 0,
    EleMV: 0,
    WeaponName: ""
  }

  constructor(private devpostformsService: DevpostformsService, private router: Router) { }

  ngOnInit(): void {


  }

  onSubmit(form:NgForm) {
    console.log('in onSubmit: ', form.valid)

    if (this.newHitzone.parts_name != ""){
      this.devpostformsService.postHitzoneForm(this.newHitzone).subscribe(
        result => {
          console.log('success: ', result);
        },
        error => {
          console.log('error: ', error) 
          this.handleError(error) 
        }  
    )
    this.newHitzone.parts_name = "";
  
    };

    if (this.newMove.MoveName != ""){
      this.devpostformsService.postMoveForm(this.newMove).subscribe(
        result => {
          console.log('success: ', result);
        },
        error => {
          console.log('error: ', error) 
          this.handleError(error) 
        }  
    )
    this.newMove.MoveName = "";
    this.newMove.MoveID++;
    
    }


   }

  private handleError(err: HttpErrorResponse){
    let errorMessage = '';
    if (err.error instanceof ErrorEvent){
        errorMessage = `An error occurred: ${err.error.message}`;
    } else {
        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(()=>errorMessage);
  }

}
