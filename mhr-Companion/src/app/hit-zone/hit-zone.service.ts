import {Injectable } from "@angular/core";
import { IHitzone } from "./hit-zone";
import { Observable, range, map, filter, catchError, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, } from '@angular/common/http';

@Injectable()
export class HitzoneService {
    getHitzones(): IHitzone[] {
        return [
            {
                "parts_name": "Antenna",
                "hit_slash": 75,
                "hit_strike": 70,
                "hit_shot": 50,
                "element_fire": 20,
                "element_water": 0,
                "element_ice": 5,
                "element_thunder": 10,
                "element_dragon": 25
            },
            {
                "parts_name": "Body",
                "hit_slash": 75,
                "hit_strike": 70,
                "hit_shot": 50,
                "element_fire": 20,
                "element_water": 0,
                "element_ice": 5,
                "element_thunder": 10,
                "element_dragon": 25
            },
            {
                "parts_name": "Foreleg",
                "hit_slash": 75,
                "hit_strike": 70,
                "hit_shot": 50,
                "element_fire": 20,
                "element_water": 0,
                "element_ice": 5,
                "element_thunder": 10,
                "element_dragon": 25
            },
            {
                "parts_name": "Head",
                "hit_slash": 75,
                "hit_strike": 70,
                "hit_shot": 50,
                "element_fire": 20,
                "element_water": 0,
                "element_ice": 5,
                "element_thunder": 10,
                "element_dragon": 25
            },
            {
                "parts_name": "Hind Leg",
                "hit_slash": 75,
                "hit_strike": 70,
                "hit_shot": 50,
                "element_fire": 20,
                "element_water": 0,
                "element_ice": 5,
                "element_thunder": 10,
                "element_dragon": 25
            },
            {
                "parts_name": "Neck",
                "hit_slash": 75,
                "hit_strike": 70,
                "hit_shot": 50,
                "element_fire": 20,
                "element_water": 0,
                "element_ice": 5,
                "element_thunder": 10,
                "element_dragon": 25
            },
            {
                "parts_name": "Tail",
                "hit_slash": 75,
                "hit_strike": 70,
                "hit_shot": 50,
                "element_fire": 20,
                "element_water": 0,
                "element_ice": 5,
                "element_thunder": 10,
                "element_dragon": 25
            },
            {
                "parts_name": "Wing",
                "hit_slash": 75,
                "hit_strike": 70,
                "hit_shot": 50,
                "element_fire": 20,
                "element_water": 0,
                "element_ice": 5,
                "element_thunder": 10,
                "element_dragon": 25
            },
            {
                "parts_name": "Wingclaw",
                "hit_slash": 75,
                "hit_strike": 70,
                "hit_shot": 50,
                "element_fire": 20,
                "element_water": 0,
                "element_ice": 5,
                "element_thunder": 10,
                "element_dragon": 25
            },

        ]
    }


    private hitzoneUrl = 'http://localhost:5000/hzsearchnew/1';
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
