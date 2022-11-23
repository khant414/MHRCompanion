import { UserSettingsService } from './user-settings.service';
          import { Component, OnInit } from '@angular/core';
          import { NgForm, NgModel } from '@angular/forms';
          import { UserSettings } from './user-settings';
        import { HttpErrorResponse } from '@angular/common/http';
          import { throwError } from 'rxjs';

          @Component({
          selector: 'app-user-settings-form',
          templateUrl: './user-settings-form.component.html',
          styleUrls: ['./user-settings-form.component.css']
          })
          export class UserSettingsFormComponent implements OnInit {
            display: boolean = false;
            originalUserSettings: UserSettings = {
              googleid: 118168332553407893271,
              raw: 2,
              sharpness: 'Green',
              eleType: 'lightning',
              ele: 1,
              critchance: 1,
              wex: 0,
              critboost: 0,
              criteye: 1,
              atkboost: 0,
              agitator: 1,
              peakperf: 1,
              resentment: 0,
              resuscitate: 0,
              maxmight: 2,
              critele: 1,
              offensiveguard: 1,
              eleatkup: 1,
              counterstrike: 2,
              eleexploit: 1,
              mailofhellfire: 0,
              dereliction: 2,
              burst: 1
            };
            userSettings: UserSettings = {
              ...this.originalUserSettings
            };
            
            
            

          
          constructor(private userSettingsService: UserSettingsService) { }

          ngOnInit(): void {
            this.CheckForDisplay();
          }
          OnBlur(field : NgModel) {
            console.log('in onBlur: ', field.valid)
          }
        
          onSubmit(form:NgForm) {
            console.log('in onSubmit: ', form.valid)
            //window.location.href = '/app-hit-zone'
            this.userSettingsService.postUserSettingsForm(this.userSettings).subscribe(
              result => console.log('success: ', result),
              error => {
                console.log('error: ', error) 
                this.handleError(error) 
              }
            );
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
