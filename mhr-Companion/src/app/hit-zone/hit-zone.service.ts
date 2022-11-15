import {Injectable } from "@angular/core";
import { IHitzone } from "./hit-zone";
import { Observable, range, map, filter, catchError, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, } from '@angular/common/http';

@Injectable()
export class HitzoneService {
    getHitzones(): IHitzone[] {
        return [
            {
                "parts_name": "asd",
                "hit_slash": 1,
                "hit_strike": 1,
                "hit_shell": 1,
                "element_fire": 1,
                "element_water": 1,
                "element_ice": 1,
                "element_dragon": 1
            },
            {
                "parts_name": "asd",
                "hit_slash": 1,
                "hit_strike": 1,
                "hit_shell": 1,
                "element_fire": 1,
                "element_water": 1,
                "element_ice": 1,
                "element_dragon": 1
            }
        ]
    }


    private hitzoneUrl = 'http://localhost:5000/hzsearch/1';
    constructor(private http:HttpClient) { }

    getGoreHitzones(): Observable<IHitzone[]>{
        return this.http.get<IHitzone[]>(this.hitzoneUrl).pipe(
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
