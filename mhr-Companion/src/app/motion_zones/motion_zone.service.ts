import {Injectable } from "@angular/core";
import { IMotionzone } from "./motion_zone";
import { Observable, range, map, filter, catchError, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, } from '@angular/common/http';

@Injectable()
export class MotionZoneService {


    private motionzoneURL = 'http://localhost:5000/mvsearch/1';
    private motionzoneUrl1 = 'http://localhost:5000/mvsearch2/LA';
    constructor(private http:HttpClient) { }

    getOneMove(): Observable<IMotionzone[]>{
        return this.http.get<IMotionzone[]>(this.motionzoneURL).pipe(
            tap(data => console.log('All: ', JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    getLanceMoves(): Observable<IMotionzone[]>{
        return this.http.get<IMotionzone[]>(this.motionzoneUrl1).pipe(
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
