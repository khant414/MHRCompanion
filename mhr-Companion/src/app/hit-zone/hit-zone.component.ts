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
  
  constructor( private hitzoneService: HitzoneService) {  }
  
  ngOnInit(): void {



    let monsterName = sessionStorage.getItem("targetMonster");
    console.log(monsterName)

    //this.hitzones = this.hitzoneService.getHitzones();
    //call the HitzoneService to fill "hitzones" array with data
    // this.sub = this.hitzoneService.getGoreHitzones().subscribe({
    //   next: hitzones => this.hitzones = hitzones,
    //   error: err => this.errorMessage = err
    // });

    this.pageTitle += ` Monster: ${monsterName}`;

    this.sub = this.hitzoneService.getHitzones(monsterName!).subscribe({
      next: hitzones =>{
        this.hitzones = hitzones,
        this.filteredHitzones = hitzones;
      },
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