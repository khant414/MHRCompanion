import { IMotionzone } from './motion_zone'
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, filter } from 'rxjs';
import { MotionZoneService } from './motion_zone.service';

@Component({
    selector: 'pm-motion_zones',
    templateUrl: './motion_zones.component.html',
    styleUrls: ['./motion_zones.component.css'],
    providers: [MotionZoneService]
})
export class Motion_ZoneComponent implements OnInit {
    pageTitle: string = 'Motion Value Library';


    //getters & setters for filter
    private _motionzoneFilter: string = '';
    get motionzoneFilter(): string {
        return this._motionzoneFilter;
    }
    set motionzoneFilter(value: string) {
        this._motionzoneFilter = value;
        this.filteredMotionzones = this.performFilter(value);
    }

    errorMessage: string = '';

    filteredMotionzones: IMotionzone[] = [];

    motionzones: IMotionzone[] = [];
    sub: Subscription | undefined;

    //test Data - will be replaced with API call during onInit
    
    constructor( private motionzoneservice: MotionZoneService ) { }

    // motionzones: IMotionzone[] = [
    //     {
    //         "moveId": 1,
    //         "moveName": "Overhead Slash",
    //         "damageType": "Sever",
    //         "rawMv": 52,
    //         "eleMv": 1,
    //         "weaponName": "GS"
    //     },
    //     {
    //         "moveId": 2,
    //         "moveName": "Mid Thrust I/II",
    //         "damageType": "Sever",
    //         "rawMv": 24,
    //         "eleMv": 1,
    //         "weaponName": "LA"
    //     }
    // ];
    
    ngOnInit(): void {
        this.sub = this.motionzoneservice.getLanceMoves().subscribe({
            next: motionzones => {
                this.motionzones = motionzones;
                this.filteredMotionzones = motionzones;
            },
            error: err => this.errorMessage = err
        });
    }

    ngOnDestroy() {
        this.sub?.unsubscribe();
    }
    

    //filter method
    performFilter(filterBy: string): IMotionzone[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.motionzones.filter((motionzone: IMotionzone) =>
            motionzone.MoveName.toLocaleLowerCase().includes(filterBy))
        // console.log(this.motionzones);
        // return this.motionzones;
    }
   
}