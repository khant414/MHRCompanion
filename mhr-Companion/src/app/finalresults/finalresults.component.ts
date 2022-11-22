import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IResults } from './resultscontainer';

@Component({
  selector: 'app-finalresults',
  templateUrl: './finalresults.component.html',
  styleUrls: ['./finalresults.component.css']
})
export class FinalresultsComponent implements OnInit {

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
    "DamageType": "Sever",
    "RawMV": 25,
    "EleMV": 1,
    "WeaponName": "LA"
  }

  

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    //router call from the previous page that stores our motion value information
    const MoveID = this.route.snapshot.paramMap.get('MoveID');
    const MoveName = this.route.snapshot.paramMap.get('MoveName');
    const DamageType = this.route.snapshot.paramMap.get('DamageType');
    const RawMV = this.route.snapshot.paramMap.get('RawMV');
    const EleMV = this.route.snapshot.paramMap.get('EleMV');
    const WeaponName = this.route.snapshot.paramMap.get('WeaponName');

    //page title doesn't actually have to be updated... this is just to show what we have
    this.pageTitle += ` MoveID: ${MoveID}` + ` MoveName: ${MoveName}` + ` DamageType: ${DamageType}`
    + ` RawMV: ${RawMV}` + ` EleMV: ${EleMV}` + ` WeaponName: ${WeaponName}`;
    
    //check that these values are not null, then add them to the mv container
    //now we can do whatever we want with them
    if (MoveID != null && MoveName != null && DamageType != null && RawMV != null && EleMV != null && WeaponName != null){
      this.mathMV.MoveID = Number(MoveID);
      this.mathMV.MoveName = MoveName;
      this.mathMV.DamageType = DamageType;
      this.mathMV.RawMV = Number(RawMV);
      this.mathMV.EleMV = Number(EleMV);
      this.mathMV.WeaponName = WeaponName;
    }




    this.flatraw = this.math.raw;
    this.critchance = this.math.critchance;

    //finding the correct sharpness modifier
    switch (this.math.sharpness){
      case "red":{
        this.rawsharpnessmod = 0.5;
        this.elesharpnessmod = 0.25;
        break;
      }
      case "orange":{
        this.rawsharpnessmod = 0.75;
        this.elesharpnessmod = 0.5;
        break;
      } 
      case "yellow":{
        this.rawsharpnessmod = 1;
        this.elesharpnessmod = 0.75;
        break;
      } 
      case "green":{
        this.rawsharpnessmod = 1.05;
        this.elesharpnessmod = 1;
        break;
      } 
      case "blue":{
        this.rawsharpnessmod = 1.2;
        this.elesharpnessmod = 1.0625;
        break;
      } 
      case "white":{
        this.rawsharpnessmod = 1.32;
        this.elesharpnessmod = 1.15;
        break;
      } 
      case "purple":{
        this.rawsharpnessmod = 1.39;
        this.elesharpnessmod = 1.25;
        break;
      } 
    }



    //flat modifiers

    //AGITATOR AFFECTS BOTH RAW AND CRIT
    switch (this.math.agitator){
      case 0: {
        break;
      }
      case 1: {
        this.flatraw += 4;
        this.critchance += 3;
        break;
      }
      case 2: {
        this.flatraw += 8;
        this.critchance += 5;
        break;
      }
      case 3: {
        this.flatraw += 12;
        this.critchance += 7;
       break; 
      }
      case 4: {
        this.flatraw += 16;
        this.critchance += 10;
        break;
      }
      case 5: {
        this.flatraw += 20;
        this.critchance += 15;
        break;
      }
    }

    switch (this.math.peakperf){
      case 0: {
        break;
      }
      case 1: {
        this.flatraw += 5;
        break;
      }
      case 2: {
        this.flatraw += 10;
        break;
      }
      case 3: {
        this.flatraw += 20;
        break;
      }
    }

    switch (this.math.resentment){
      case 0: {
        break;
      }
      case 1: {
        this.flatraw += 5;
        break;
      }
      case 2: {
        this.flatraw += 10;
        break;
      }
      case 3: {
        this.flatraw += 15;
        break;
      }
      case 4: {
        this.flatraw += 20;
        break;
      }
      case 5: {
        this.flatraw += 25;
        break;
      }
    }

    switch (this.math.resuscitate){
      case 0: {
        break;
      }
      case 1: {
        this.flatraw += 5;
        break;
      }
      case 2: {
        this.flatraw += 10;
        break;
      }
      case 3: {
        this.flatraw += 20;
        break;
      }
    }

    switch (this.math.counterstrike){
      case 0: {
        break;
      }
      case 1: {
        this.flatraw += 10;
        break;
      }
      case 2: {
        this.flatraw += 15;
        break;
      }
      case 3: {
        this.flatraw += 25;
        break;
      }
    }

    switch (this.math.mailofhellfire){
      case 0: {
        break;
      }
      case 1: {
        this.flatraw += 15;
        break;
      }
      case 2: {
        this.flatraw += 25;
        break;
      }
      case 3: {
        this.flatraw += 35;
        break;
      }
    }

    switch (this.math.dereliction){
      case 0: {
        break;
      }
      case 1: {
        this.flatraw += 25;
        break;
      }
      case 2: {
        this.flatraw += 30;
        break;
      }
      case 3: {
        this.flatraw += 35;
        break;
      }
    }

    switch (this.math.burst){
      case 0: {
        break;
      }
      case 1: {
        this.flatraw += 10;
        break;
      }
      case 2: {
        this.flatraw += 12;
        break;
      }
      case 3: {
        this.flatraw += 15;
        break;
      }
    }

    //it's fine to multiply now since flat boosts are done
    switch (this.math.atkboost){
      case 0: {
        break;
      }
      case 1: {
        this.flatraw += 3;
        break;
      }
      case 2: {
        this.flatraw += 6;
        break;
      }
      case 3: {
        this.flatraw += 9;
        break;
      }
      case 4: {
        this.flatraw += 7;
        this.flatraw *= 1.05;
        break;
      }
      case 5: {
        this.flatraw += 8;
        this.flatraw *= 1.06;
        break;
      }
      case 6: {
        this.flatraw += 9;
        this.flatraw *= 1.08;
        break;
      }
      case 7: {
        this.flatraw += 10;
        this.flatraw *= 1.1;
        break;
      }
      
    }

    //raw percentage modifers (done after attack boost)

    switch (this.math.offensiveguard){
      case 0: {
        break;
      }
      case 1: {
        this.flatraw *= 1.05;
        break;
      }
      case 2: {
        this.flatraw *= 1.1;
        break;
      }
      case 3: {
        this.flatraw *= 1.15;
        break;
      }
    }

    //crit chance calculation

    //check if move is blunt AND target is blunt weakspot or sever AND sever weakspot then wex calculations are done
    switch ((this.mathMV.DamageType == "Blunt" && this.mathHZ.hit_strike >= 45) || (this.mathMV.DamageType == "Sever" && this.mathHZ.hit_slash >= 45) ){
      case false: {
        break;
      }
      case true: {
        switch (this.math.wex){
          case 0: {
            break;
          }
          case 1: {
            this.critchance += 15;
            break;
          }
          case 2: {
            this.critchance += 30;
            break;
          }
          case 3: {
            this.critchance += 50;
            break;
          }
        }
        break;
      }
    }


    switch (this.math.critboost){
      case 0: {
        break;
      }
      case 1: {
        this.rawcritmod += 0.05;
        break;
      }
      case 2: {
        this.rawcritmod += 0.1;
        break;
      }
      case 3: {
        this.rawcritmod += 0.15;
        break;
      }
    }

    switch (this.math.criteye){
      case 0: {
        break;
      }
      case 1: {
        this.critchance += 5;
        break;
      }
      case 2: {
        this.critchance += 10;
        break;
      }
      case 3: {
        this.critchance += 15;
        break;
      }
      case 4: {
        this.critchance += 20;
        break;
      }
      case 5: {
        this.critchance += 25;
        break;
      }
      case 6: {
        this.critchance += 30;
        break;
      }
      case 7: {
        this.critchance += 40;
        break;
      }
      
    }

    switch (this.math.maxmight){
      case 0: {
        break;
      }
      case 1: {
        this.critchance += 10;
        break;
      }
      case 2: {
        this.critchance += 20;
        break;
      }
      case 3: {
        this.critchance += 30;
        break;
      }
    }

    //crit maxes out at 100% chance, so set to 100 if over that
    switch (this.critchance > 100) {
      case false: {
        break;
      }
      case true: {
        this.critchance = 100;
        break;
      }
    }

    //elemental calculations
    this.flatele = this.math.ele;


    //burst goes first as it is a complete flat bonus

    if (this.mathMV.WeaponName == "DB"){
      //db ele values
      switch (this.math.burst){
        case 0: {
          break;
        }
        case 1: {
          this.flatele += 6;
          break;
        }
        case 2: {
          this.flatele += 8;
          break;
        }
        case 3: {
          this.flatele += 12;
          break;
        }
      }
    }
    else {
      //other weapon ele values
      switch (this.math.burst){
        case 0: {
          break;
        }
        case 1: {
          this.flatele += 8;
          break;
        }
        case 2: {
          this.flatele += 10;
          break;
        }
        case 3: {
          this.flatele += 15;
          break;
        }
      }
    }


    //element attack up must be applied before other percentages
    switch (this.math.eleatkup){
      case 0: {
        break;
      }
      case 1: {
        this.flatele += 2;
        break;
      }
      case 2: {
        this.flatele += 3;
        break;
      }
      case 3: {
        this.flatele += 4;
        this.flatele *= 1.05;
        break;
      }
      case 4: {
        this.flatele += 4;
        this.flatele *= 1.1;
        break;
      }
      case 5: {
        this.flatele += 4;
        this.flatele *= 1.2;
        break;
      }
    }

    //checks for element exploit, probably not the most efficient method but w/e
    switch (this.math.eleType){
      case "fire":{
        if (this.mathHZ.element_fire >= 20){
          switch (this.math.eleexploit){
            case 0: {
              break;
            }
            case 1: {
              this.flatele *= 1.1;
              break;
            }
            case 2: {
              this.flatele *= 1.125;
              break;
            }
            case 3: {
              this.flatele *= 1.15;
              break;
            }
          }
        }
        break;
      }
      case "water":{
        if (this.mathHZ.element_fire >= 20){
          switch (this.math.eleexploit){
            case 0: {
              break;
            }
            case 1: {
              this.flatele *= 1.1;
              break;
            }
            case 2: {
              this.flatele *= 1.125;
              break;
            }
            case 3: {
              this.flatele *= 1.15;
              break;
            }
          }
        }
        break;
      }
      case "ice":{
        if (this.mathHZ.element_fire >= 20){
          switch (this.math.eleexploit){
            case 0: {
              break;
            }
            case 1: {
              this.flatele *= 1.1;
              break;
            }
            case 2: {
              this.flatele *= 1.125;
              break;
            }
            case 3: {
              this.flatele *= 1.15;
              break;
            }
          }
        }
        break;
      }
      case "thunder":{
        if (this.mathHZ.element_fire >= 20){
          switch (this.math.eleexploit){
            case 0: {
              break;
            }
            case 1: {
              this.flatele *= 1.1;
              break;
            }
            case 2: {
              this.flatele *= 1.125;
              break;
            }
            case 3: {
              this.flatele *= 1.15;
              break;
            }
          }
        }
        break;
      }
      case "dragon":{
        if (this.mathHZ.element_fire >= 20){
          switch (this.math.eleexploit){
            case 0: {
              break;
            }
            case 1: {
              this.flatele *= 1.1;
              break;
            }
            case 2: {
              this.flatele *= 1.125;
              break;
            }
            case 3: {
              this.flatele *= 1.15;
              break;
            }
          }
        }
        break;
      }
    }

    switch (this.math.critele){
      case 0: {
        break;
      }
      case 1: {
        this.elecritmod += 0.05;
        break;
      }
      case 2: {
        this.elecritmod += 0.1;
        break;
      }
      case 3: {
        this.elecritmod += 0.15;
        break;
      }
    }



    this.results.crit_chance = this.critchance;

    //damage before crits
    switch (this.mathMV.DamageType){
      case "Sever": {
        //raw damage before crits
        this.results.raw_no_crit = this.flatraw * (this.mathMV.RawMV/100) * this.rawsharpnessmod * (this.mathHZ.hit_slash/100);
        //raw damage with guaranteed crit
        this.results.raw_crit = this.results.raw_no_crit * (this.rawcritmod);
        //raw damage normalized for critical chance
        this.results.raw_avg = this.results.raw_no_crit + ((this.results.raw_crit - this.results.raw_no_crit) * (this.critchance/100));

        //elemental damage before crits
        switch (this.math.eleType){
          case "fire":{
            this.results.ele_no_crit = this.flatele * (this.mathMV.EleMV) * this.elesharpnessmod * (this.mathHZ.element_fire/100);
            break;
          }
          case "water":{
            this.results.ele_no_crit = this.flatele * (this.mathMV.EleMV) * this.elesharpnessmod * (this.mathHZ.element_water/100);
            break;
          }
          case "ice":{
            this.results.ele_no_crit = this.flatele * (this.mathMV.EleMV) * this.elesharpnessmod * (this.mathHZ.element_ice/100);
            break;
          }
          case "thunder":{
            this.results.ele_no_crit = this.flatele * (this.mathMV.EleMV) * this.elesharpnessmod * (this.mathHZ.element_thunder/100);
            break;
          }
          case "dragon":{
            this.results.ele_no_crit = this.flatele * (this.mathMV.EleMV) * this.elesharpnessmod * (this.mathHZ.element_dragon/100);
            break;
          }        
        }

        //elemental damage with guaranteed crit
        this.results.ele_crit = this.results.ele_no_crit * (this.elecritmod);
        //elemental damage normalized for critical chance
        this.results.ele_avg = this.results.ele_no_crit + ((this.results.ele_crit - this.results.ele_no_crit) * (this.critchance/100));


        break;
      }    

      case "Blunt": {

        //raw damage before crits
        this.results.raw_no_crit = this.flatraw * (this.mathMV.RawMV/100) * this.rawsharpnessmod * (this.mathHZ.hit_strike/100);
        //raw damage with guaranteed crit
        this.results.raw_crit = this.results.raw_no_crit * (this.rawcritmod);
        //raw damage normalized for critical chance
        this.results.raw_avg = this.results.raw_no_crit + ((this.results.raw_crit - this.results.raw_no_crit) * (this.critchance/100));

        //elemental damage before crits
        switch (this.math.eleType){
          case "fire":{
            this.results.ele_no_crit = this.flatele * (this.mathMV.EleMV) * this.elesharpnessmod * (this.mathHZ.element_fire/100);
            break;
          }
          case "water":{
            this.results.ele_no_crit = this.flatele * (this.mathMV.EleMV) * this.elesharpnessmod * (this.mathHZ.element_water/100);
            break;
          }
          case "ice":{
            this.results.ele_no_crit = this.flatele * (this.mathMV.EleMV) * this.elesharpnessmod * (this.mathHZ.element_ice/100);
            break;
          }
          case "thunder":{
            this.results.ele_no_crit = this.flatele * (this.mathMV.EleMV) * this.elesharpnessmod * (this.mathHZ.element_thunder/100);
            break;
          }
          case "dragon":{
            this.results.ele_no_crit = this.flatele * (this.mathMV.EleMV) * this.elesharpnessmod * (this.mathHZ.element_dragon/100);
            break;
          }        
        }

        //elemental damage with guaranteed crit
        this.results.ele_crit = this.results.ele_no_crit * (this.elecritmod);
        //elemental damage normalized for critical chance
        this.results.ele_avg = this.results.ele_crit * (this.critchance/100);


        break;
      }

    }

    this.results.sum_no_crit = this.results.raw_no_crit + this.results.ele_no_crit;
    this.results.sum_crit = this.results.raw_crit + this.results.ele_crit;
    this.results.sum_avg = this.results.raw_avg + this.results.ele_avg;


    


  }

}
