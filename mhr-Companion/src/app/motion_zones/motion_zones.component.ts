import { Component, OnInit } from '@angular/core'
import { IMotionzone } from './motion_zone'
@Component({
    selector: 'pm-motion_zones',
    templateUrl: './motion_zones.component.html',
    styleUrls: ['./motion_zones.component.css']
})
export class Motion_ZoneComponent implements OnInit {
    pageTitle: string = 'Motion Zone Library'


    //getters & setters for filter
    private _motionzoneFilter: string = '';
    get motionzoneFilter(): string {
        return this._motionzoneFilter;
    }
    set motionzoneFilter(value: string) {
        this._motionzoneFilter = value;
        this.filteredMotionzones = this.performFilter(value);
    }

    filteredMotionzones: IMotionzone[] = [];

    //test Data - will be replaced with API call during onInit
    
    constructor() { }

    motionzones: IMotionzone[] = [
        {
            "_id": "7c147b4c-d276-499f-b070-803e4133b0ee",
            "moveId": 1,
            "moveName": "Overhead Slash",
            "damageType": "Sever",
            "rawMv": 52,
            "eleMv": 1,
            "weaponName": "GS"
        },
        {
            "_id": "3a0ba497-0146-4d64-94c9-396d8d17112f",
            "moveId": 2,
            "moveName": "Mid Thrust I/II",
            "damageType": "Sever",
            "rawMv": 24,
            "eleMv": 1,
            "weaponName": "LA"
        }
    ];
    
    ngOnInit(): void {
        this._motionzoneFilter = 'r'
    }
    

    //filter method
    performFilter(filterBy: string): IMotionzone[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.motionzones.filter((motionzone: IMotionzone) =>
            motionzone.moveName.toLocaleLowerCase().includes(filterBy))
    }
   
}