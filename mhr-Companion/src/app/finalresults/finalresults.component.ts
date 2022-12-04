import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IResults, ISkillName } from './resultscontainer';
import { FinalResultsService } from './finalresults.service';
import { ParamMap } from '@angular/router';

@Component({
  selector: 'app-finalresults',
  templateUrl: './finalresults.component.html',
  styleUrls: ['./finalresults.component.css']
})
export class FinalresultsComponent implements OnInit {

  public selectedData = {
    MoveID: "",
    MoveName:"",
    DamageType: "",
    RawMV: "",
    EleMV: "",
    WeaponName: ""
  };






  public edited = false;
  public edited2 = false;
  skillSelect: number = 0;

  pageTitle: string = 'Final Results';
  imageWidth: number = 16;
  imageHeight: number = 16;

  flatraw: number = 0;
  rawsharpnessmod: number = 0;
  critchance: number = 0;
  rawcritmod: number = 1.25;

  rawtotalnocrit: number = 0;


  flatele: number = 0;
  elesharpnessmod: number = 0;
  elecritmod: number = 1;

  eletotalnocrit: number = 0;


  raw_no_crit_diff: number = 0;
  ele_no_crit_diff: number = 0;
  sum_no_crit_diff: number = 0;

  raw_crit_diff: number = 0;
  ele_crit_diff: number = 0;
  sum_crit_diff: number = 0;

  raw_avg_diff: number = 0;
  ele_avg_diff: number = 0;
  sum_avg_diff: number = 0;

  diff_per_point: number = 0;
  percentage_diff: number = 0;
  percentage_diff_per_point: number = 0;

  results: IResults = {
    "crit_chance": 0,

    "raw_no_crit": 0,
    "ele_no_crit": 0,
    "sum_no_crit": 0,

    "raw_crit": 0,
    "ele_crit": 0,
    "sum_crit": 0,

    "raw_avg": 0,
    "ele_avg": 0,
    "sum_avg": 0
  };

  results2: IResults = {
    "crit_chance": 0,

    "raw_no_crit": 0,
    "ele_no_crit": 0,
    "sum_no_crit": 0,

    "raw_crit": 0,
    "ele_crit": 0,
    "sum_crit": 0,

    "raw_avg": 0,
    "ele_avg": 0,
    "sum_avg": 0
  };

  math: BigContainer = {
    "raw": 100,
    "sharpness": "green",
    "eleType": "thunder",
    "ele": 10,
    "critchance": 10,
    "wex": 1,
    "critboost": 2,
    "criteye": 3,
    "atkboost": 5,
    "agitator": 0,
    "peakperf": 0,
    "resentment": 0,
    "resuscitate": 0,
    "maxmight": 0,
    "critele": 0,
    "offensiveguard": 0,
    "eleatkup": 0,
    "counterstrike": 0,
    "eleexploit": 0,
    "mailofhellfire": 0,
    "dereliction": 0,
    "burst": 0,
  };

  mathHZ: HZContainer = {
    "parts_name": "Antenna",
    "hit_slash": 75,
    "hit_strike": 70,
    "hit_shot": 50,
    "element_fire": 20,
    "element_water": 0,
    "element_ice": 5,
    "element_thunder": 10,
    "element_dragon": 25,
  }

  mathMV: MVContainer = {
    "MoveID": 2,
    "MoveName": "Mid Thrust I/II",
    "DamageType": "sever",
    "RawMV": 25,
    "EleMV": 1,
    "WeaponName": "LA"
  }



  constructor(private route: ActivatedRoute, private finalresultsService: FinalResultsService) { }

  ngOnInit(): void {
    //router call from the previous page that stores our motion value information
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.selectedData.MoveID = String(params.get('MoveID'));
      this.selectedData.MoveName = String(params.get('MoveName'));
      this.selectedData.DamageType = String(params.get('DamageType'));
      this.selectedData.RawMV = String(params.get('RawMV'));
      this.selectedData.EleMV = String(params.get('EleMV'));
      this.selectedData.WeaponName = String(params.get('WeaponName'));
    });


    //page title doesn't actually have to be updated... this is just to show what we have
    this.pageTitle += ` MoveID: ${this.selectedData.MoveID}` + ` MoveName: ${this.selectedData.MoveName}` + ` DamageType: ${this.selectedData.DamageType}`
      + ` RawMV: ${this.selectedData.RawMV}` + ` EleMV: ${this.selectedData.EleMV}` + ` WeaponName: ${this.selectedData.WeaponName}`;

    //check that these values are not null, then add them to the mv container
    //now we can do whatever we want with them
    if (this.selectedData.MoveID != "" && this.selectedData.MoveName != "" && this.selectedData.DamageType != "" && this.selectedData.RawMV != "" && this.selectedData.EleMV != "" && this.selectedData.WeaponName != "") {      this.mathMV.MoveID = Number(this.selectedData.MoveID);
      this.mathMV.MoveName = this.selectedData.MoveName;
      this.mathMV.DamageType = this.selectedData.DamageType.toLocaleLowerCase();
      this.mathMV.RawMV = Number(this.selectedData.RawMV);
      this.mathMV.EleMV = Number(this.selectedData.EleMV);
      this.mathMV.WeaponName = this.selectedData.WeaponName;
    }

    //saved settings
    let importedHZ = JSON.parse(localStorage.getItem("hitzones")!);
    this.mathHZ.parts_name = importedHZ.parts_name;
    this.mathHZ.hit_slash = Number(importedHZ.hit_slash);
    this.mathHZ.hit_strike = Number(importedHZ.hit_strike);
    this.mathHZ.hit_shot = Number(importedHZ.hit_shot);
    this.mathHZ.element_fire = Number(importedHZ.element_fire);
    this.mathHZ.element_water = Number(importedHZ.element_water);
    this.mathHZ.element_ice = Number(importedHZ.element_ice);
    this.mathHZ.element_thunder = Number(importedHZ.element_thunder);
    this.mathHZ.element_dragon = Number(importedHZ.element_dragon);

    this.resetSavedMath();







    //this is where we'd call the service











    // this.flatraw = this.math.raw;
    // this.critchance = this.math.critchance;

    // //finding the correct sharpness modifier
    // switch (this.math.sharpness){
    //   case "red":{
    //     this.rawsharpnessmod = 0.5;
    //     this.elesharpnessmod = 0.25;
    //     break;
    //   }
    //   case "orange":{
    //     this.rawsharpnessmod = 0.75;
    //     this.elesharpnessmod = 0.5;
    //     break;
    //   } 
    //   case "yellow":{
    //     this.rawsharpnessmod = 1;
    //     this.elesharpnessmod = 0.75;
    //     break;
    //   } 
    //   case "green":{
    //     this.rawsharpnessmod = 1.05;
    //     this.elesharpnessmod = 1;
    //     break;
    //   } 
    //   case "blue":{
    //     this.rawsharpnessmod = 1.2;
    //     this.elesharpnessmod = 1.0625;
    //     break;
    //   } 
    //   case "white":{
    //     this.rawsharpnessmod = 1.32;
    //     this.elesharpnessmod = 1.15;
    //     break;
    //   } 
    //   case "purple":{
    //     this.rawsharpnessmod = 1.39;
    //     this.elesharpnessmod = 1.25;
    //     break;
    //   } 
    // }



    // //flat modifiers

    // //AGITATOR AFFECTS BOTH RAW AND CRIT
    // switch (this.math.agitator){
    //   case 0: {
    //     break;
    //   }
    //   case 1: {
    //     this.flatraw += 4;
    //     this.critchance += 3;
    //     break;
    //   }
    //   case 2: {
    //     this.flatraw += 8;
    //     this.critchance += 5;
    //     break;
    //   }
    //   case 3: {
    //     this.flatraw += 12;
    //     this.critchance += 7;
    //    break; 
    //   }
    //   case 4: {
    //     this.flatraw += 16;
    //     this.critchance += 10;
    //     break;
    //   }
    //   case 5: {
    //     this.flatraw += 20;
    //     this.critchance += 15;
    //     break;
    //   }
    // }

    // switch (this.math.peakperf){
    //   case 0: {
    //     break;
    //   }
    //   case 1: {
    //     this.flatraw += 5;
    //     break;
    //   }
    //   case 2: {
    //     this.flatraw += 10;
    //     break;
    //   }
    //   case 3: {
    //     this.flatraw += 20;
    //     break;
    //   }
    // }

    // switch (this.math.resentment){
    //   case 0: {
    //     break;
    //   }
    //   case 1: {
    //     this.flatraw += 5;
    //     break;
    //   }
    //   case 2: {
    //     this.flatraw += 10;
    //     break;
    //   }
    //   case 3: {
    //     this.flatraw += 15;
    //     break;
    //   }
    //   case 4: {
    //     this.flatraw += 20;
    //     break;
    //   }
    //   case 5: {
    //     this.flatraw += 25;
    //     break;
    //   }
    // }

    // switch (this.math.resuscitate){
    //   case 0: {
    //     break;
    //   }
    //   case 1: {
    //     this.flatraw += 5;
    //     break;
    //   }
    //   case 2: {
    //     this.flatraw += 10;
    //     break;
    //   }
    //   case 3: {
    //     this.flatraw += 20;
    //     break;
    //   }
    // }

    // switch (this.math.counterstrike){
    //   case 0: {
    //     break;
    //   }
    //   case 1: {
    //     this.flatraw += 10;
    //     break;
    //   }
    //   case 2: {
    //     this.flatraw += 15;
    //     break;
    //   }
    //   case 3: {
    //     this.flatraw += 25;
    //     break;
    //   }
    // }

    // switch (this.math.mailofhellfire){
    //   case 0: {
    //     break;
    //   }
    //   case 1: {
    //     this.flatraw += 15;
    //     break;
    //   }
    //   case 2: {
    //     this.flatraw += 25;
    //     break;
    //   }
    //   case 3: {
    //     this.flatraw += 35;
    //     break;
    //   }
    // }

    // switch (this.math.dereliction){
    //   case 0: {
    //     break;
    //   }
    //   case 1: {
    //     this.flatraw += 25;
    //     break;
    //   }
    //   case 2: {
    //     this.flatraw += 30;
    //     break;
    //   }
    //   case 3: {
    //     this.flatraw += 35;
    //     break;
    //   }
    // }

    // switch (this.math.burst){
    //   case 0: {
    //     break;
    //   }
    //   case 1: {
    //     this.flatraw += 10;
    //     break;
    //   }
    //   case 2: {
    //     this.flatraw += 12;
    //     break;
    //   }
    //   case 3: {
    //     this.flatraw += 15;
    //     break;
    //   }
    // }

    // //it's fine to multiply now since flat boosts are done
    // switch (this.math.atkboost){
    //   case 0: {
    //     break;
    //   }
    //   case 1: {
    //     this.flatraw += 3;
    //     break;
    //   }
    //   case 2: {
    //     this.flatraw += 6;
    //     break;
    //   }
    //   case 3: {
    //     this.flatraw += 9;
    //     break;
    //   }
    //   case 4: {
    //     this.flatraw += 7;
    //     this.flatraw *= 1.05;
    //     break;
    //   }
    //   case 5: {
    //     this.flatraw += 8;
    //     this.flatraw *= 1.06;
    //     break;
    //   }
    //   case 6: {
    //     this.flatraw += 9;
    //     this.flatraw *= 1.08;
    //     break;
    //   }
    //   case 7: {
    //     this.flatraw += 10;
    //     this.flatraw *= 1.1;
    //     break;
    //   }

    // }

    // //raw percentage modifers (done after attack boost)

    // switch (this.math.offensiveguard){
    //   case 0: {
    //     break;
    //   }
    //   case 1: {
    //     this.flatraw *= 1.05;
    //     break;
    //   }
    //   case 2: {
    //     this.flatraw *= 1.1;
    //     break;
    //   }
    //   case 3: {
    //     this.flatraw *= 1.15;
    //     break;
    //   }
    // }

    // //crit chance calculation

    // //check if move is blunt AND target is blunt weakspot or sever AND sever weakspot then wex calculations are done
    // switch ((this.mathMV.DamageType == "blunt" && this.mathHZ.hit_strike >= 45) || (this.mathMV.DamageType == "sever" && this.mathHZ.hit_slash >= 45) ){
    //   case false: {
    //     break;
    //   }
    //   case true: {
    //     switch (this.math.wex){
    //       case 0: {
    //         break;
    //       }
    //       case 1: {
    //         this.critchance += 15;
    //         break;
    //       }
    //       case 2: {
    //         this.critchance += 30;
    //         break;
    //       }
    //       case 3: {
    //         this.critchance += 50;
    //         break;
    //       }
    //     }
    //     break;
    //   }
    // }


    // switch (this.math.critboost){
    //   case 0: {
    //     break;
    //   }
    //   case 1: {
    //     this.rawcritmod += 0.05;
    //     break;
    //   }
    //   case 2: {
    //     this.rawcritmod += 0.1;
    //     break;
    //   }
    //   case 3: {
    //     this.rawcritmod += 0.15;
    //     break;
    //   }
    // }

    // switch (this.math.criteye){
    //   case 0: {
    //     break;
    //   }
    //   case 1: {
    //     this.critchance += 5;
    //     break;
    //   }
    //   case 2: {
    //     this.critchance += 10;
    //     break;
    //   }
    //   case 3: {
    //     this.critchance += 15;
    //     break;
    //   }
    //   case 4: {
    //     this.critchance += 20;
    //     break;
    //   }
    //   case 5: {
    //     this.critchance += 25;
    //     break;
    //   }
    //   case 6: {
    //     this.critchance += 30;
    //     break;
    //   }
    //   case 7: {
    //     this.critchance += 40;
    //     break;
    //   }

    // }

    // switch (this.math.maxmight){
    //   case 0: {
    //     break;
    //   }
    //   case 1: {
    //     this.critchance += 10;
    //     break;
    //   }
    //   case 2: {
    //     this.critchance += 20;
    //     break;
    //   }
    //   case 3: {
    //     this.critchance += 30;
    //     break;
    //   }
    // }

    // //crit maxes out at 100% chance, so set to 100 if over that
    // switch (this.critchance > 100) {
    //   case false: {
    //     break;
    //   }
    //   case true: {
    //     this.critchance = 100;
    //     break;
    //   }
    // }

    // //elemental calculations
    // this.flatele = this.math.ele;


    // //burst goes first as it is a complete flat bonus

    // if (this.mathMV.WeaponName == "DB"){
    //   //db ele values
    //   switch (this.math.burst){
    //     case 0: {
    //       break;
    //     }
    //     case 1: {
    //       this.flatele += 6;
    //       break;
    //     }
    //     case 2: {
    //       this.flatele += 8;
    //       break;
    //     }
    //     case 3: {
    //       this.flatele += 12;
    //       break;
    //     }
    //   }
    // }
    // else {
    //   //other weapon ele values
    //   switch (this.math.burst){
    //     case 0: {
    //       break;
    //     }
    //     case 1: {
    //       this.flatele += 8;
    //       break;
    //     }
    //     case 2: {
    //       this.flatele += 10;
    //       break;
    //     }
    //     case 3: {
    //       this.flatele += 15;
    //       break;
    //     }
    //   }
    // }


    // //element attack up must be applied before other percentages
    // switch (this.math.eleatkup){
    //   case 0: {
    //     break;
    //   }
    //   case 1: {
    //     this.flatele += 2;
    //     break;
    //   }
    //   case 2: {
    //     this.flatele += 3;
    //     break;
    //   }
    //   case 3: {
    //     this.flatele += 4;
    //     this.flatele *= 1.05;
    //     break;
    //   }
    //   case 4: {
    //     this.flatele += 4;
    //     this.flatele *= 1.1;
    //     break;
    //   }
    //   case 5: {
    //     this.flatele += 4;
    //     this.flatele *= 1.2;
    //     break;
    //   }
    // }

    // //checks for element exploit, probably not the most efficient method but w/e
    // switch (this.math.eleType){
    //   case "fire":{
    //     if (this.mathHZ.element_fire >= 20){
    //       switch (this.math.eleexploit){
    //         case 0: {
    //           break;
    //         }
    //         case 1: {
    //           this.flatele *= 1.1;
    //           break;
    //         }
    //         case 2: {
    //           this.flatele *= 1.125;
    //           break;
    //         }
    //         case 3: {
    //           this.flatele *= 1.15;
    //           break;
    //         }
    //       }
    //     }
    //     break;
    //   }
    //   case "water":{
    //     if (this.mathHZ.element_fire >= 20){
    //       switch (this.math.eleexploit){
    //         case 0: {
    //           break;
    //         }
    //         case 1: {
    //           this.flatele *= 1.1;
    //           break;
    //         }
    //         case 2: {
    //           this.flatele *= 1.125;
    //           break;
    //         }
    //         case 3: {
    //           this.flatele *= 1.15;
    //           break;
    //         }
    //       }
    //     }
    //     break;
    //   }
    //   case "ice":{
    //     if (this.mathHZ.element_fire >= 20){
    //       switch (this.math.eleexploit){
    //         case 0: {
    //           break;
    //         }
    //         case 1: {
    //           this.flatele *= 1.1;
    //           break;
    //         }
    //         case 2: {
    //           this.flatele *= 1.125;
    //           break;
    //         }
    //         case 3: {
    //           this.flatele *= 1.15;
    //           break;
    //         }
    //       }
    //     }
    //     break;
    //   }
    //   case "thunder":{
    //     if (this.mathHZ.element_fire >= 20){
    //       switch (this.math.eleexploit){
    //         case 0: {
    //           break;
    //         }
    //         case 1: {
    //           this.flatele *= 1.1;
    //           break;
    //         }
    //         case 2: {
    //           this.flatele *= 1.125;
    //           break;
    //         }
    //         case 3: {
    //           this.flatele *= 1.15;
    //           break;
    //         }
    //       }
    //     }
    //     break;
    //   }
    //   case "dragon":{
    //     if (this.mathHZ.element_fire >= 20){
    //       switch (this.math.eleexploit){
    //         case 0: {
    //           break;
    //         }
    //         case 1: {
    //           this.flatele *= 1.1;
    //           break;
    //         }
    //         case 2: {
    //           this.flatele *= 1.125;
    //           break;
    //         }
    //         case 3: {
    //           this.flatele *= 1.15;
    //           break;
    //         }
    //       }
    //     }
    //     break;
    //   }
    // }

    // switch (this.math.critele){
    //   case 0: {
    //     break;
    //   }
    //   case 1: {
    //     this.elecritmod += 0.05;
    //     break;
    //   }
    //   case 2: {
    //     this.elecritmod += 0.1;
    //     break;
    //   }
    //   case 3: {
    //     this.elecritmod += 0.15;
    //     break;
    //   }
    // }



    // this.results.crit_chance = this.critchance;

    // //damage before crits
    // switch (this.mathMV.DamageType){
    //   case "sever": {
    //     //raw damage before crits
    //     this.results.raw_no_crit = this.flatraw * (this.mathMV.RawMV/100) * this.rawsharpnessmod * (this.mathHZ.hit_slash/100);
    //     //raw damage with guaranteed crit
    //     this.results.raw_crit = this.results.raw_no_crit * (this.rawcritmod);
    //     //raw damage normalized for critical chance
    //     this.results.raw_avg = this.results.raw_no_crit + ((this.results.raw_crit - this.results.raw_no_crit) * (this.critchance/100));

    //     //elemental damage before crits
    //     switch (this.math.eleType){
    //       case "fire":{
    //         this.results.ele_no_crit = this.flatele * (this.mathMV.EleMV) * this.elesharpnessmod * (this.mathHZ.element_fire/100);
    //         break;
    //       }
    //       case "water":{
    //         this.results.ele_no_crit = this.flatele * (this.mathMV.EleMV) * this.elesharpnessmod * (this.mathHZ.element_water/100);
    //         break;
    //       }
    //       case "ice":{
    //         this.results.ele_no_crit = this.flatele * (this.mathMV.EleMV) * this.elesharpnessmod * (this.mathHZ.element_ice/100);
    //         break;
    //       }
    //       case "thunder":{
    //         this.results.ele_no_crit = this.flatele * (this.mathMV.EleMV) * this.elesharpnessmod * (this.mathHZ.element_thunder/100);
    //         break;
    //       }
    //       case "dragon":{
    //         this.results.ele_no_crit = this.flatele * (this.mathMV.EleMV) * this.elesharpnessmod * (this.mathHZ.element_dragon/100);
    //         break;
    //       }        
    //     }

    //     //elemental damage with guaranteed crit
    //     this.results.ele_crit = this.results.ele_no_crit * (this.elecritmod);
    //     //elemental damage normalized for critical chance
    //     this.results.ele_avg = this.results.ele_no_crit + ((this.results.ele_crit - this.results.ele_no_crit) * (this.critchance/100));


    //     break;
    //   }    

    //   case "blunt": {

    //     //raw damage before crits
    //     this.results.raw_no_crit = this.flatraw * (this.mathMV.RawMV/100) * this.rawsharpnessmod * (this.mathHZ.hit_strike/100);
    //     //raw damage with guaranteed crit
    //     this.results.raw_crit = this.results.raw_no_crit * (this.rawcritmod);
    //     //raw damage normalized for critical chance
    //     this.results.raw_avg = this.results.raw_no_crit + ((this.results.raw_crit - this.results.raw_no_crit) * (this.critchance/100));

    //     //elemental damage before crits
    //     switch (this.math.eleType){
    //       case "fire":{
    //         this.results.ele_no_crit = this.flatele * (this.mathMV.EleMV) * this.elesharpnessmod * (this.mathHZ.element_fire/100);
    //         break;
    //       }
    //       case "water":{
    //         this.results.ele_no_crit = this.flatele * (this.mathMV.EleMV) * this.elesharpnessmod * (this.mathHZ.element_water/100);
    //         break;
    //       }
    //       case "ice":{
    //         this.results.ele_no_crit = this.flatele * (this.mathMV.EleMV) * this.elesharpnessmod * (this.mathHZ.element_ice/100);
    //         break;
    //       }
    //       case "thunder":{
    //         this.results.ele_no_crit = this.flatele * (this.mathMV.EleMV) * this.elesharpnessmod * (this.mathHZ.element_thunder/100);
    //         break;
    //       }
    //       case "dragon":{
    //         this.results.ele_no_crit = this.flatele * (this.mathMV.EleMV) * this.elesharpnessmod * (this.mathHZ.element_dragon/100);
    //         break;
    //       }        
    //     }

    //     //elemental damage with guaranteed crit
    //     this.results.ele_crit = this.results.ele_no_crit * (this.elecritmod);
    //     //elemental damage normalized for critical chance
    //     this.results.ele_avg = this.results.ele_crit * (this.critchance/100);


    //     break;
    //   }

    // }
    // console.log(this.results);
    // console.log(this.flatele);
    // console.log(this.elecritmod);

    // this.results.sum_no_crit = this.results.raw_no_crit + this.results.ele_no_crit;
    // this.results.sum_crit = this.results.raw_crit + this.results.ele_crit;
    // this.results.sum_avg = this.results.raw_avg + this.results.ele_avg;

    this.results = this.finalresultsService.doFinalCalcs(this.math, this.mathHZ, this.mathMV);

    // this.results.sum_no_crit = Math.round(this.results.sum_no_crit);
    // this.results.raw_no_crit = Math.round(this.results.raw_no_crit);
    // this.results.ele_no_crit = Math.round(this.results.ele_no_crit);
    // this.results.sum_crit = Math.round(this.results.sum_crit);
    // this.results.raw_crit = Math.round(this.results.raw_crit);
    // this.results.ele_crit = Math.round(this.results.ele_crit);
    // this.results.sum_avg = Math.round(this.results.sum_avg);
    // this.results.raw_avg = Math.round(this.results.raw_avg);
    // this.results.ele_avg = Math.round(this.results.ele_avg);





  }


  //  extra feature: sets a selected skill level to 0 and reruns calculations.
  //  this is meant to give the user an idea of how valuable each skillpoint is.
  public zeroComparison(event: any, skillSelect: number) {
    // console.log("function called");
    // console.log(event.target.value);

    //  run the method to reset the math object to saved user settings before messing with it.
    this.resetSavedMath();

    this.resetDiffs();

    //  declare variable to save the level of the skill you're going to zero.
    let storedLevel = 0;


    switch (Number(event.target.value)) {

      // each switch statement will first store the level of the selected skill.
      // the selected skill is then set to ZERO.
      // all calculations are rerun with this new value and stored in results2.

      case 1:
        storedLevel = this.math.wex;
        if (storedLevel > 0) {
          this.math.wex = 0;
          this.results2 = this.finalresultsService.doFinalCalcs(this.math, this.mathHZ, this.mathMV);
          this.edited = true;
        } else {
          this.edited2 = true;
        }
        break;
      case 2:
        storedLevel = this.math.critboost;
        if (storedLevel > 0) {
          this.math.critboost = 0;
          this.results2 = this.finalresultsService.doFinalCalcs(this.math, this.mathHZ, this.mathMV);
          this.edited = true;
        } else {
          this.edited2 = true;
        }
        break;
      case 3:
        storedLevel = this.math.criteye;
        if (storedLevel > 0) {
          this.math.criteye = 0;
          this.results2 = this.finalresultsService.doFinalCalcs(this.math, this.mathHZ, this.mathMV);
          this.edited = true;
        } else {
          this.edited2 = true;
        }
        break;
      case 4:
        storedLevel = this.math.atkboost;
        if (storedLevel > 0) {
          this.math.atkboost = 0;
          this.results2 = this.finalresultsService.doFinalCalcs(this.math, this.mathHZ, this.mathMV);
          this.edited = true;
        } else {
          this.edited2 = true;
        }
        break;
      case 5:
        storedLevel = this.math.agitator;
        if (storedLevel > 0) {
          this.math.agitator = 0;
          this.results2 = this.finalresultsService.doFinalCalcs(this.math, this.mathHZ, this.mathMV);
          this.edited = true;
        } else {
          this.edited2 = true;
        }
        break;
      case 6:
        storedLevel = this.math.peakperf;
        if (storedLevel > 0) {
          this.math.peakperf = 0;
          this.results2 = this.finalresultsService.doFinalCalcs(this.math, this.mathHZ, this.mathMV);
          this.edited = true;
        } else {
          this.edited2 = true;
        }

        break;
      case 7:
        storedLevel = this.math.resentment;
        if (storedLevel > 0) {
          this.math.resentment = 0;
          this.results2 = this.finalresultsService.doFinalCalcs(this.math, this.mathHZ, this.mathMV);
          this.edited = true;
        } else {
          this.edited2 = true;
        }
        break;
      case 8:
        storedLevel = this.math.resuscitate;
        if (storedLevel > 0) {
          this.math.resuscitate = 0;
          this.results2 = this.finalresultsService.doFinalCalcs(this.math, this.mathHZ, this.mathMV);
          this.edited = true;
        } else {
          this.edited2 = true;
        }

        break;
      case 9:
        storedLevel = this.math.maxmight;
        if (storedLevel > 0) {
          this.math.maxmight = 0;
          this.results2 = this.finalresultsService.doFinalCalcs(this.math, this.mathHZ, this.mathMV);
          this.edited = true;
        } else {
          this.edited2 = true;
        }

        break;
      case 10:
        storedLevel = this.math.critele;
        if (storedLevel > 0) {
          this.math.critele = 0;
          this.results2 = this.finalresultsService.doFinalCalcs(this.math, this.mathHZ, this.mathMV);
          this.edited = true;
        } else {
          this.edited2 = true;
        }

        break;
      case 11:
        storedLevel = this.math.offensiveguard;
        if (storedLevel > 0) {
          this.math.offensiveguard = 0;
          this.results2 = this.finalresultsService.doFinalCalcs(this.math, this.mathHZ, this.mathMV);
          this.edited = true;
        } else {
          this.edited2 = true;
        }

        break;
      case 12:
        storedLevel = this.math.eleatkup;
        if (storedLevel > 0) {
          this.math.eleatkup = 0;
          this.results2 = this.finalresultsService.doFinalCalcs(this.math, this.mathHZ, this.mathMV);
          this.edited = true;
        } else {
          this.edited2 = true;
        }

        break;
      case 13:
        storedLevel = this.math.counterstrike;
        if (storedLevel > 0) {
          this.math.counterstrike = 0;
          this.results2 = this.finalresultsService.doFinalCalcs(this.math, this.mathHZ, this.mathMV);
          this.edited = true;
        } else {
          this.edited2 = true;
        }

        break;
      case 14:
        storedLevel = this.math.eleexploit;
        if (storedLevel > 0) {
          this.math.eleexploit = 0;
          this.results2 = this.finalresultsService.doFinalCalcs(this.math, this.mathHZ, this.mathMV);
          this.edited = true;
        } else {
          this.edited2 = true;
        }

        break;
      case 15:
        storedLevel = this.math.mailofhellfire;
        if (storedLevel > 0) {
          this.math.mailofhellfire = 0;
          this.results2 = this.finalresultsService.doFinalCalcs(this.math, this.mathHZ, this.mathMV);
          this.edited = true;
        } else {
          this.edited2 = true;
        }

        break;
      case 16:
        storedLevel = this.math.dereliction;
        if (storedLevel > 0) {
          this.math.dereliction = 0;
          this.results2 = this.finalresultsService.doFinalCalcs(this.math, this.mathHZ, this.mathMV);
          this.edited = true;
        } else {
          this.edited2 = true;
        }

        break;
      case 17:
        storedLevel = this.math.burst;
        if (storedLevel > 0) {
          this.math.burst = 0;
          this.results2 = this.finalresultsService.doFinalCalcs(this.math, this.mathHZ, this.mathMV);
          this.edited = true;
        } else {
          this.edited2 = true;
        }

        break;
    }
    console.log(this.results2);
    this.raw_no_crit_diff = this.results.raw_no_crit - this.results2.raw_no_crit;
    this.ele_no_crit_diff = this.results.ele_no_crit - this.results2.ele_no_crit;
    this.sum_no_crit_diff = this.results.sum_no_crit - this.results2.sum_no_crit;

    this.raw_crit_diff = this.results.raw_crit - this.results2.raw_crit;
    this.ele_crit_diff = this.results.ele_crit - this.results2.ele_crit;
    this.sum_crit_diff = this.results.sum_crit - this.results2.sum_crit;

    this.raw_avg_diff = this.results.raw_avg - this.results2.raw_avg;
    this.ele_avg_diff = this.results.ele_avg - this.results2.ele_avg;
    this.sum_avg_diff = this.results.sum_avg - this.results2.sum_avg;

    this.diff_per_point = this.sum_avg_diff / storedLevel;

    this.percentage_diff = (this.sum_avg_diff / this.results.sum_avg) * 100;

    this.percentage_diff_per_point = (this.percentage_diff / storedLevel);

    // this.edited = true;
    console.log("This skill was contributing an average of " + this.sum_avg_diff +
      " damage to your total of " + this.results.sum_avg + ", making up " + this.percentage_diff +
      "% of your total damage. The skill overall was worth " + this.diff_per_point + " damage per point, or " +
      this.percentage_diff_per_point + "% damage per level.");

  }

  resetSavedMath() {
    let importedUser = JSON.parse(localStorage.getItem("savedSettings")!);
    this.math.raw = Number(importedUser.raw);
    this.math.sharpness = importedUser.sharpness.toLocaleLowerCase();
    this.math.eleType = importedUser.eleType.toLocaleLowerCase();
    this.math.ele = Number(importedUser.ele);
    this.math.critchance = Number(importedUser.critchance);
    this.math.wex = Number(importedUser.wex);
    this.math.critboost = Number(importedUser.critboost);
    this.math.criteye = Number(importedUser.criteye);
    this.math.atkboost = Number(importedUser.atkboost);
    this.math.agitator = Number(importedUser.agitator);
    this.math.peakperf = Number(importedUser.peakperf);
    this.math.resentment = Number(importedUser.resentment);
    this.math.resuscitate = Number(importedUser.resuscitate);
    this.math.maxmight = Number(importedUser.maxmight);
    this.math.critele = Number(importedUser.critele);
    this.math.offensiveguard = Number(importedUser.offensiveguard);
    this.math.eleatkup = Number(importedUser.eleatkup);
    this.math.counterstrike = Number(importedUser.counterstrike);
    this.math.eleexploit = Number(importedUser.eleexploit);
    this.math.mailofhellfire = Number(importedUser.mailofhellfire);
    this.math.dereliction = Number(importedUser.dereliction);
    this.math.burst = Number(importedUser.burst);
    console.log(this.math);
  }

  //sets all differences to 0 to prep for another skill comparison.
  //also blanks out the percentage difference text on screen.
  resetDiffs() {
    this.raw_no_crit_diff = 0;
    this.ele_no_crit_diff = 0;
    this.sum_no_crit_diff = 0;

    this.raw_crit_diff = 0;
    this.ele_crit_diff = 0;
    this.sum_crit_diff = 0;

    this.raw_avg_diff = 0;
    this.ele_avg_diff = 0;
    this.sum_avg_diff = 0;

    this.diff_per_point = 0;
    this.percentage_diff = 0;
    this.percentage_diff_per_point = 0;

    this.edited = false;
    this.edited2 = false;
  }

}
