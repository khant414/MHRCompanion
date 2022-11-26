import { UserSettingsService } from './user-settings.service';
          import { Component, OnInit } from '@angular/core';
          import { NgForm, NgModel } from '@angular/forms';
          import { UserSettings } from './user-settings';
        import { HttpErrorResponse } from '@angular/common/http';
          import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

          @Component({
          selector: 'app-user-settings-form',
          templateUrl: './user-settings-form.component.html',
          styleUrls: ['./user-settings-form.component.css']
          })
          export class UserSettingsFormComponent implements OnInit {
            display: boolean = false;
            userSettings: UserSettings = {
              //sessionStorage.getItem('ID:')
              googleid: null,
              raw: null,
              sharpness: null,
              eleType: null,
              ele: null,
              critchance: null,
              wex: null,
              critboost: null,
              criteye: null,
              atkboost: null,
              agitator: null,
              peakperf: null,
              resentment: null,
              resuscitate: null,
              maxmight: null,
              critele: null,
              offensiveguard: null,
              eleatkup: null,
              counterstrike: null,
              eleexploit: null,
              mailofhellfire: null,
              dereliction: null,
              burst: null
            };
            
            
            
            

          
          constructor(private userSettingsService: UserSettingsService,
              private router: Router) { }

          ngOnInit(): void {
            this.CheckForDisplay();
            this.FillInputBoxes();
          }
            FillInputBoxes() {
              this.userSettingsService.getUserSettingsForm().subscribe(
                result => {
                  console.log('success: ', result);
                  this.userSettings.googleid = result[0].googleid;
                  this.userSettings.raw = result[0].raw;
                  this.userSettings.sharpness = result[0].sharpness;
                  this.userSettings.eleType = result[0].eleType;
                  this.userSettings.ele = result[0].ele;
                  this.userSettings.critchance = result[0].critchance;
                  this.userSettings.wex = result[0].wex;
                  this.userSettings.critboost = result[0].critboost;
                  this.userSettings.criteye = result[0].criteye;
                  this.userSettings.atkboost = result[0].atkboost;
                  this.userSettings.agitator = result[0].agitator;
                  this.userSettings.peakperf = result[0].peakperf;
                  this.userSettings.resentment = result[0].resentment;
                  this.userSettings.resuscitate = result[0].resuscitate;
                  this.userSettings.maxmight = result[0].maxmight;
                  this.userSettings.critele = result[0].critele;
                  this.userSettings.offensiveguard = result[0].offensiveguard;
                  this.userSettings.eleatkup = result[0].eleatkup;
                  this.userSettings.counterstrike = result[0].counterstrike;
                  this.userSettings.eleexploit = result[0].eleexploit;
                  this.userSettings.mailofhellfire = result[0].mailofhellfire;
                  this.userSettings.dereliction = result[0].dereliction;
                  this.userSettings.burst = result[0].burst;
              },
                error => {
                console.log('error: ', error) 
                this.handleError(error) 
              }
              )
            }
          OnBlur(field : NgModel) {
            console.log('in onBlur: ', field.valid)
          }
        
          onSubmit(form:NgForm) {
            console.log('in onSubmit: ', form.valid)
            //window.location.href = '/app-hit-zone'
            

           if(this.userSettings.atkboost != null) {
              this.userSettingsService.putUserSettingsForm(this.userSettings).subscribe(
                result => { console.log('result:', result);
                this.router.navigate(['/app-hit-zone']);
                },
                error => {
                  console.log('error: ', error) 
                  this.handleError(error) 
                }
              );
            }
            else {
              this.userSettingsService.postUserSettingsForm(this.userSettings).subscribe(
                result => {
                  console.log('success: ', result);
                  this.router.navigate(['/app-hit-zone']);
                },
                error => {
                  console.log('error: ', error) 
                  this.handleError(error) 
                }
              );
            }
            
            
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
