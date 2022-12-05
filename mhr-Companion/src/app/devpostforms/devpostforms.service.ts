import { inject, Injectable } from "@angular/core";
import { Observable, range, map, filter, catchError, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, } from '@angular/common/http';
import { INewHitzone } from "./newHitzone";
import { IMove } from "./newMove";

@Injectable({
    providedIn:'root'
})

export class DevpostformsService {

    constructor(private http: HttpClient) { 
        
    }
    
    private newHitzonePostUrl = 'http://localhost:5000/postHitzone';
    private newMoveUrl = 'http://localhost:5000/postMove';

    postHitzoneForm(newhitzone: INewHitzone): Observable<any>{
        return this.http.post(this.newHitzonePostUrl, newhitzone);
    }

    postMoveForm(newmove: IMove): Observable<any>{
        return this.http.post(this.newMoveUrl, newmove);
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
