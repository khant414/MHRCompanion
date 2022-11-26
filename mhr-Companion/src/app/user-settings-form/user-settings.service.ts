import { Observable, of } from 'rxjs';
import { UserSettings } from './user-settings';
import { inject, Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn:'root'
})

export class UserSettingsService {

    constructor(private http: HttpClient) { 
        
    }
    
    private userSettingsPostUrl = 'http://localhost:5000/userSettings/recordUserSettings';
    private userSettingsPutUrl = 'http://localhost:5000/userSettings/overwriteUserSettings';
    private userSettingsGetUrl = 'http://localhost:5000/userSettings/';
    

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
}
