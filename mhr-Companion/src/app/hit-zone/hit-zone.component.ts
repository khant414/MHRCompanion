import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IHitzone } from './hit-zone'
import { HitzoneService } from './hit-zone.service';

@Component({
  selector: 'app-hit-zone',
  templateUrl: './hit-zone.component.html',
  styleUrls: ['./hit-zone.component.css'],
  providers: [HitzoneService]
})
export class HitZoneComponent implements OnInit, OnDestroy {
  
  
  pageTitle: string = 'Hit Zone Library'
  imageWidth: number = 16;
  imageHeight: number = 16;

  filteredHitzones: IHitzone[] = [];

  errorMessage: string = '';

  hitzones: IHitzone[] = [];
  sub: Subscription | undefined;


  //test Data - will be replaced with API call during onInit
// hitzones2: IHitzone[] = [
//   {
//     "parts_name": "Head",
//     "hit_slash": 88,
//     "hit_strike": 77,
//     "hit_shell": 25,
//     "element_fire": 54,
//     "element_water": 42,
//     "element_ice": 6,
//     "element_dragon": 61
//   },
//   {
//     "parts_name": "Neck",
//     "hit_slash": 52,
//     "hit_strike": 52,
//     "hit_shell": 31,
//     "element_fire": 43,
//     "element_water": 91,
//     "element_ice": 62,
//     "element_dragon": 0
//   },
//   {
//     "parts_name": "Body",
//     "hit_slash": 64,
//     "hit_strike": 58,
//     "hit_shell": 58,
//     "element_fire": 20,
//     "element_water": 75,
//     "element_ice": 39,
//     "element_dragon": 31
//   },
//   {
//     "parts_name": "Wingclaw",
//     "hit_slash": 93,
//     "hit_strike": 2,
//     "hit_shell": 22,
//     "element_fire": 40,
//     "element_water": 12,
//     "element_ice": 37,
//     "element_dragon": 95
//   },
//   {
//     "parts_name": "Foreleg",
//     "hit_slash": 50,
//     "hit_strike": 57,
//     "hit_shell": 75,
//     "element_fire": 12,
//     "element_water": 53,
//     "element_ice": 57,
//     "element_dragon": 4
//   },
//   {
//     "parts_name": "Hind Leg",
//     "hit_slash": 97,
//     "hit_strike": 43,
//     "hit_shell": 57,
//     "element_fire": 15,
//     "element_water": 83,
//     "element_ice": 95,
//     "element_dragon": 87
//   },
//   {
//     "parts_name": "Wing",
//     "hit_slash": 18,
//     "hit_strike": 47,
//     "hit_shell": 57,
//     "element_fire": 60,
//     "element_water": 90,
//     "element_ice": 67,
//     "element_dragon": 51
//   },
//   {
//     "parts_name": "Tail",
//     "hit_slash": 28,
//     "hit_strike": 9,
//     "hit_shell": 70,
//     "element_fire": 8,
//     "element_water": 48,
//     "element_ice": 72,
//     "element_dragon": 35
//   },
//   {
//     "parts_name": "Antenna", 
//     "hit_slash": 18,
//     "hit_strike": 6,
//     "hit_shell": 43,
//     "element_fire": 50,
//     "element_water": 54,
//     "element_ice": 68,
//     "element_dragon": 89
//   }
// ]

  constructor( private hitzoneService: HitzoneService) {  }

  ngOnInit(): void {
    
    //this.hitzones = this.hitzoneService.getHitzones();
    //call the HitzoneService to fill "hitzones" array with data
    this.sub = this.hitzoneService.getGoreHitzones().subscribe({
      next: hitzones => this.hitzones = hitzones,
      error: err => this.errorMessage = err
    });


    //this.hitzones = this.hitzoneService.getHitzones();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  performFilter(filterBy: string): IHitzone[] {
    
    filterBy = filterBy.toLocaleLowerCase();
    return this.hitzones.filter((hitzone: IHitzone) =>
        hitzone.parts_name.toLocaleLowerCase().includes(filterBy))
  }

  //getters & setters
  private _hitzoneFilter: string = '';
  get hitzoneFilter(): string {
    return this._hitzoneFilter;
  }
  set hitzoneFilter(value: string) {
    this._hitzoneFilter = value;
    this.filteredHitzones = this.performFilter(value);
  }



}