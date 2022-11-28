import {Injectable } from "@angular/core";
import { IHitzone } from "./hit-zone";

import { Observable, range, map, filter, catchError, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, } from '@angular/common/http';

@Injectable()
export class HitzoneService {

    private hitzoneUrl = 'http://localhost:5000/hzsearchnew/1';

    private hitzoneUrlNames = 'http://localhost:5000/hzsearchname/';

    //this.userSettingsGetUrl + `?${googleId}`

    constructor(private http:HttpClient) { }

    getGoreHitzones(): Observable<IHitzone[]>{
        return this.http.get<IHitzone[]>(this.hitzoneUrl).pipe(
            tap(data => console.log('All: ', JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    getHitzones(monster: string): Observable<IHitzone[]>{
        return this.http.get<IHitzone[]>(this.hitzoneUrlNames + `${monster}`).pipe(
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
