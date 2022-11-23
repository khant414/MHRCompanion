import { Observable, of } from 'rxjs';
import { UserSettings } from './user-settings';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn:'root'
})

export class UserSettingsService {

    constructor(private http: HttpClient) { }
    private userSettingsPostUrl = 'http://localhost:5000/userSettings/recordUserSettings';
    postUserSettingsForm(userSettings: UserSettings) : Observable<any> {
        
        return this.http.post(this.userSettingsPostUrl, userSettings);
        // return of(UserSettings);
    }
}