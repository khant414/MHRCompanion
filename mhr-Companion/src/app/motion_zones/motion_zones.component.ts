import { IMotionzone } from './motion_zone'
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, filter } from 'rxjs';
import { MotionZoneService } from './motion_zone.service';
import { ActivatedRoute } from '@angular/router';

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
    
    currentHZ: HZContainer = {
        "parts_name": "",
        "hit_slash": 0,
        "hit_strike": 0,
        "hit_shot": 0,
        "element_fire": 0,
        "element_water": 0,
        "element_ice": 0,
        "element_thunder": 0,
        "element_dragon": 0
    }

    //test Data - will be replaced with API call during onInit
    
    constructor( private motionzoneservice: MotionZoneService, private route: ActivatedRoute ) { }

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
        //router call from the previous page that stores our hitzone information
        const parts_name = this.route.snapshot.paramMap.get('parts_name');
        const hit_slash = this.route.snapshot.paramMap.get('hit_slash');
        const hit_strike = this.route.snapshot.paramMap.get('hit_strike');
        const hit_shot = this.route.snapshot.paramMap.get('hit_shot');
        const element_fire = this.route.snapshot.paramMap.get('element_fire');
        const element_water = this.route.snapshot.paramMap.get('element_water');
        const element_ice = this.route.snapshot.paramMap.get('element_ice');
        const element_thunder = this.route.snapshot.paramMap.get('element_thunder');
        const element_dragon = this.route.snapshot.paramMap.get('element_dragon');
        
        //page title doesn't actually have to be updated... this is just to show what we have
        this.pageTitle += `Part: ${parts_name}` + `Sever: ${hit_slash}` + `Blunt: ${hit_strike}` 
        + `Shot: ${hit_shot}` + `Fire: ${element_fire}` + `Water: ${element_water}` + `Ice: ${element_ice}` 
        + `Thunder: ${element_thunder}` + `Dragon: ${element_dragon}`;
        

        //check that these values are not null, then add them to the hitzone container
        //now we can do whatever we want with them
        if (parts_name != null && hit_slash != null && hit_strike != null && hit_shot != null && element_fire  != null && element_water != null && element_ice != null && element_thunder != null && element_dragon != null){
            this.currentHZ.parts_name = parts_name;
            this.currentHZ.hit_slash = Number(hit_slash);
            this.currentHZ.hit_strike = Number(hit_strike);
            this.currentHZ.hit_shot = Number(hit_shot);
            this.currentHZ.element_fire = Number(element_fire);
            this.currentHZ.element_water = Number(element_water);
            this.currentHZ.element_ice = Number(element_ice);
            this.currentHZ.element_thunder = Number(element_thunder);
            this.currentHZ.element_dragon = Number(element_dragon);
        }
        
        localStorage.setItem("hitzones", JSON.stringify(this.currentHZ));
        


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