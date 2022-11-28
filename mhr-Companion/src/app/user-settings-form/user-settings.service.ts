import { UserSettings } from './user-settings';
import { inject, Injectable } from "@angular/core";
import { IMonsterName } from './monstername';
import { Observable, range, map, filter, catchError, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, } from '@angular/common/http';

@Injectable({
    providedIn:'root'
})

export class UserSettingsService {

    constructor(private http: HttpClient) { 
        
    }
    
    private userSettingsPostUrl = 'http://localhost:5000/userSettings/recordUserSettings';
    private userSettingsPutUrl = 'http://localhost:5000/userSettings/overwriteUserSettings';
    private userSettingsGetUrl = 'http://localhost:5000/userSettings/';

    private monsternameUrl = 'http://localhost:5000/monsternames';
    

    postUserSettingsForm(userSettings: UserSettings) : Observable<any> {
        return this.http.post(this.userSettingsPostUrl, userSettings);
    }
    

    getUserSettingsForm() : Observable<any> {
        const googleId = sessionStorage.getItem('ID:');
        return this.http.get(this.userSettingsGetUrl + `?${googleId}`);
        // return of(UserSettings);
    }

    putUserSettingsForm(userSettings: UserSettings) : Observable<any> {
        return this.http.post(this.userSettingsPutUrl, userSettings);
    }


    getMonsterNames(): Observable<IMonsterName[]>{
        return this.http.get<IMonsterName[]>(this.monsternameUrl).pipe(
            tap(data => console.log('All: ', JSON.stringify(data))),
            catchError(this.handleError)
        );
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
