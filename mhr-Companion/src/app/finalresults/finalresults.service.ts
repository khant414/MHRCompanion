import {Injectable } from "@angular/core";
import { Observable, range, map, filter, catchError, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, } from '@angular/common/http';
import { IResults } from './resultscontainer';

@Injectable({
    providedIn:'root'
})
export class FinalResultsService {
    constructor(){}


    doFinalCalcs(math: BigContainer, mathHZ: HZContainer, mathMV: MVContainer){
        let results: IResults = {
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

        let flatraw = 0;
        let rawsharpnessmod = 0;
        let critchance = 0;
        let rawcritmod = 1.25;      
            
        let flatele = 0;
        let elesharpnessmod = 0;
        let elecritmod = 1;      

        flatraw = math.raw;
        critchance = math.critchance;

        
    //finding the correct sharpness modifier
    switch (math.sharpness){
        case "red":{
          rawsharpnessmod = 0.5;
          elesharpnessmod = 0.25;
          break;
        }
        case "orange":{
          rawsharpnessmod = 0.75;
          elesharpnessmod = 0.5;
          break;
        } 
        case "yellow":{
          rawsharpnessmod = 1;
          elesharpnessmod = 0.75;
          break;
        } 
        case "green":{
          rawsharpnessmod = 1.05;
          elesharpnessmod = 1;
          break;
        } 
        case "blue":{
          rawsharpnessmod = 1.2;
          elesharpnessmod = 1.0625;
          break;
        } 
        case "white":{
          rawsharpnessmod = 1.32;
          elesharpnessmod = 1.15;
          break;
        } 
        case "purple":{
          rawsharpnessmod = 1.39;
          elesharpnessmod = 1.25;
          break;
        } 
      }
  
  
  
      //flat modifiers
  
      //AGITATOR AFFECTS BOTH RAW AND CRIT
      switch (math.agitator){
        case 0: {
          break;
        }
        case 1: {
          flatraw += 4;
          critchance += 3;
          break;
        }
        case 2: {
          flatraw += 8;
          critchance += 5;
          break;
        }
        case 3: {
          flatraw += 12;
          critchance += 7;
         break; 
        }
        case 4: {
          flatraw += 16;
          critchance += 10;
          break;
        }
        case 5: {
          flatraw += 20;
          critchance += 15;
          break;
        }
      }
  
      switch (math.peakperf){
        case 0: {
          break;
        }
        case 1: {
          flatraw += 5;
          break;
        }
        case 2: {
          flatraw += 10;
          break;
        }
        case 3: {
          flatraw += 20;
          break;
        }
      }
  
      switch (math.resentment){
        case 0: {
          break;
        }
        case 1: {
          flatraw += 5;
          break;
        }
        case 2: {
          flatraw += 10;
          break;
        }
        case 3: {
          flatraw += 15;
          break;
        }
        case 4: {
          flatraw += 20;
          break;
        }
        case 5: {
          flatraw += 25;
          break;
        }
      }
  
      switch (math.resuscitate){
        case 0: {
          break;
        }
        case 1: {
          flatraw += 5;
          break;
        }
        case 2: {
          flatraw += 10;
          break;
        }
        case 3: {
          flatraw += 20;
          break;
        }
      }
  
      switch (math.counterstrike){
        case 0: {
          break;
        }
        case 1: {
          flatraw += 10;
          break;
        }
        case 2: {
          flatraw += 15;
          break;
        }
        case 3: {
          flatraw += 25;
          break;
        }
      }
  
      switch (math.mailofhellfire){
        case 0: {
          break;
        }
        case 1: {
          flatraw += 15;
          break;
        }
        case 2: {
          flatraw += 25;
          break;
        }
        case 3: {
          flatraw += 35;
          break;
        }
      }
  
      switch (math.dereliction){
        case 0: {
          break;
        }
        case 1: {
          flatraw += 25;
          break;
        }
        case 2: {
          flatraw += 30;
          break;
        }
        case 3: {
          flatraw += 35;
          break;
        }
      }
  
      switch (math.burst){
        case 0: {
          break;
        }
        case 1: {
          flatraw += 10;
          break;
        }
        case 2: {
          flatraw += 12;
          break;
        }
        case 3: {
          flatraw += 15;
          break;
        }
      }
  
      //it's fine to multiply now since flat boosts are done
      switch (math.atkboost){
        case 0: {
          break;
        }
        case 1: {
          flatraw += 3;
          break;
        }
        case 2: {
          flatraw += 6;
          break;
        }
        case 3: {
          flatraw += 9;
          break;
        }
        case 4: {
          flatraw += 7;
          flatraw *= 1.05;
          break;
        }
        case 5: {
          flatraw += 8;
          flatraw *= 1.06;
          break;
        }
        case 6: {
          flatraw += 9;
          flatraw *= 1.08;
          break;
        }
        case 7: {
          flatraw += 10;
          flatraw *= 1.1;
          break;
        }
        
      }
  
      //raw percentage modifers (done after attack boost)
  
      switch (math.offensiveguard){
        case 0: {
          break;
        }
        case 1: {
          flatraw *= 1.05;
          break;
        }
        case 2: {
          flatraw *= 1.1;
          break;
        }
        case 3: {
          flatraw *= 1.15;
          break;
        }
      }
  
      //crit chance calculation
  
      //check if move is blunt AND target is blunt weakspot or sever AND sever weakspot then wex calculations are done
      switch ((mathMV.DamageType == "blunt" && mathHZ.hit_strike >= 45) || (mathMV.DamageType == "sever" && mathHZ.hit_slash >= 45) ){
        case false: {
          break;
        }
        case true: {
          switch (math.wex){
            case 0: {
              break;
            }
            case 1: {
              critchance += 15;
              break;
            }
            case 2: {
              critchance += 30;
              break;
            }
            case 3: {
              critchance += 50;
              break;
            }
          }
          break;
        }
      }
  
  
      switch (math.critboost){
        case 0: {
          break;
        }
        case 1: {
          rawcritmod += 0.05;
          break;
        }
        case 2: {
          rawcritmod += 0.1;
          break;
        }
        case 3: {
          rawcritmod += 0.15;
          break;
        }
      }
  
      switch (math.criteye){
        case 0: {
          break;
        }
        case 1: {
          critchance += 5;
          break;
        }
        case 2: {
          critchance += 10;
          break;
        }
        case 3: {
          critchance += 15;
          break;
        }
        case 4: {
          critchance += 20;
          break;
        }
        case 5: {
          critchance += 25;
          break;
        }
        case 6: {
          critchance += 30;
          break;
        }
        case 7: {
          critchance += 40;
          break;
        }
        
      }
  
      switch (math.maxmight){
        case 0: {
          break;
        }
        case 1: {
          critchance += 10;
          break;
        }
        case 2: {
          critchance += 20;
          break;
        }
        case 3: {
          critchance += 30;
          break;
        }
      }
  
      //crit maxes out at 100% chance, so set to 100 if over that
      switch (critchance > 100) {
        case false: {
          break;
        }
        case true: {
          critchance = 100;
          break;
        }
      }
  
      //elemental calculations
      flatele = math.ele;
  
  
      //burst goes first as it is a complete flat bonus
  
      if (mathMV.WeaponName == "DB"){
        //db ele values
        switch (math.burst){
          case 0: {
            break;
          }
          case 1: {
            flatele += 6;
            break;
          }
          case 2: {
            flatele += 8;
            break;
          }
          case 3: {
            flatele += 12;
            break;
          }
        }
      }
      else {
        //other weapon ele values
        switch (math.burst){
          case 0: {
            break;
          }
          case 1: {
            flatele += 8;
            break;
          }
          case 2: {
            flatele += 10;
            break;
          }
          case 3: {
            flatele += 15;
            break;
          }
        }
      }
  
  
      //element attack up must be applied before other percentages
      switch (math.eleatkup){
        case 0: {
          break;
        }
        case 1: {
          flatele += 2;
          break;
        }
        case 2: {
          flatele += 3;
          break;
        }
        case 3: {
          flatele += 4;
          flatele *= 1.05;
          break;
        }
        case 4: {
          flatele += 4;
          flatele *= 1.1;
          break;
        }
        case 5: {
          flatele += 4;
          flatele *= 1.2;
          break;
        }
      }
  
      //checks for element exploit, probably not the most efficient method but w/e
      switch (math.eleType){
        case "fire":{
          if (mathHZ.element_fire >= 20){
            switch (math.eleexploit){
              case 0: {
                break;
              }
              case 1: {
                flatele *= 1.1;
                break;
              }
              case 2: {
                flatele *= 1.125;
                break;
              }
              case 3: {
                flatele *= 1.15;
                break;
              }
            }
          }
          break;
        }
        case "water":{
          if (mathHZ.element_fire >= 20){
            switch (math.eleexploit){
              case 0: {
                break;
              }
              case 1: {
                flatele *= 1.1;
                break;
              }
              case 2: {
                flatele *= 1.125;
                break;
              }
              case 3: {
                flatele *= 1.15;
                break;
              }
            }
          }
          break;
        }
        case "ice":{
          if (mathHZ.element_fire >= 20){
            switch (math.eleexploit){
              case 0: {
                break;
              }
              case 1: {
                flatele *= 1.1;
                break;
              }
              case 2: {
                flatele *= 1.125;
                break;
              }
              case 3: {
                flatele *= 1.15;
                break;
              }
            }
          }
          break;
        }
        case "thunder":{
          if (mathHZ.element_fire >= 20){
            switch (math.eleexploit){
              case 0: {
                break;
              }
              case 1: {
                flatele *= 1.1;
                break;
              }
              case 2: {
                flatele *= 1.125;
                break;
              }
              case 3: {
                flatele *= 1.15;
                break;
              }
            }
          }
          break;
        }
        case "dragon":{
          if (mathHZ.element_fire >= 20){
            switch (math.eleexploit){
              case 0: {
                break;
              }
              case 1: {
                flatele *= 1.1;
                break;
              }
              case 2: {
                flatele *= 1.125;
                break;
              }
              case 3: {
                flatele *= 1.15;
                break;
              }
            }
          }
          break;
        }
      }
  
      switch (math.critele){
        case 0: {
          break;
        }
        case 1: {
          elecritmod += 0.05;
          break;
        }
        case 2: {
          elecritmod += 0.1;
          break;
        }
        case 3: {
          elecritmod += 0.15;
          break;
        }
      }
  
  
  
      results.crit_chance = critchance;
  
      //damage before crits
      switch (mathMV.DamageType){
        case "sever": {
          //raw damage before crits
          results.raw_no_crit = flatraw * (mathMV.RawMV/100) * rawsharpnessmod * (mathHZ.hit_slash/100);
          //raw damage with guaranteed crit
          results.raw_crit = results.raw_no_crit * (rawcritmod);
          //raw damage normalized for critical chance
          results.raw_avg = results.raw_no_crit + ((results.raw_crit - results.raw_no_crit) * (critchance/100));
  
          //elemental damage before crits
          switch (math.eleType){
            case "fire":{
              results.ele_no_crit = flatele * (mathMV.EleMV) * elesharpnessmod * (mathHZ.element_fire/100);
              break;
            }
            case "water":{
              results.ele_no_crit = flatele * (mathMV.EleMV) * elesharpnessmod * (mathHZ.element_water/100);
              break;
            }
            case "ice":{
              results.ele_no_crit = flatele * (mathMV.EleMV) * elesharpnessmod * (mathHZ.element_ice/100);
              break;
            }
            case "thunder":{
              results.ele_no_crit = flatele * (mathMV.EleMV) * elesharpnessmod * (mathHZ.element_thunder/100);
              break;
            }
            case "dragon":{
              results.ele_no_crit = flatele * (mathMV.EleMV) * elesharpnessmod * (mathHZ.element_dragon/100);
              break;
            }        
          }
  
          //elemental damage with guaranteed crit
          results.ele_crit = results.ele_no_crit * (elecritmod);
          //elemental damage normalized for critical chance
          results.ele_avg = results.ele_no_crit + ((results.ele_crit - results.ele_no_crit) * (critchance/100));
  
  
          break;
        }    
  
        case "blunt": {
  
          //raw damage before crits
          results.raw_no_crit = flatraw * (mathMV.RawMV/100) * rawsharpnessmod * (mathHZ.hit_strike/100);
          //raw damage with guaranteed crit
          results.raw_crit = results.raw_no_crit * (rawcritmod);
          //raw damage normalized for critical chance
          results.raw_avg = results.raw_no_crit + ((results.raw_crit - results.raw_no_crit) * (critchance/100));
  
          //elemental damage before crits
          switch (math.eleType){
            case "fire":{
              results.ele_no_crit = flatele * (mathMV.EleMV) * elesharpnessmod * (mathHZ.element_fire/100);
              break;
            }
            case "water":{
              results.ele_no_crit = flatele * (mathMV.EleMV) * elesharpnessmod * (mathHZ.element_water/100);
              break;
            }
            case "ice":{
              results.ele_no_crit = flatele * (mathMV.EleMV) * elesharpnessmod * (mathHZ.element_ice/100);
              break;
            }
            case "thunder":{
              results.ele_no_crit = flatele * (mathMV.EleMV) * elesharpnessmod * (mathHZ.element_thunder/100);
              break;
            }
            case "dragon":{
              results.ele_no_crit = flatele * (mathMV.EleMV) * elesharpnessmod * (mathHZ.element_dragon/100);
              break;
            }        
          }
  
          //elemental damage with guaranteed crit
          results.ele_crit = results.ele_no_crit * (elecritmod);
          //elemental damage normalized for critical chance
          results.ele_avg = results.ele_crit * (critchance/100);
  
  
          break;
        }
  
      }
      console.log(results);
      console.log(flatele);
      console.log(elecritmod);
  
      results.sum_no_crit = results.raw_no_crit + results.ele_no_crit;
      results.sum_crit = results.raw_crit + results.ele_crit;
      results.sum_avg = results.raw_avg + results.ele_avg;
  
    //   results.sum_no_crit = Math.round(results.sum_no_crit);
    //   results.raw_no_crit = Math.round(results.raw_no_crit);
    //   results.ele_no_crit = Math.round(results.ele_no_crit);
    //   results.sum_crit = Math.round(results.sum_crit);
    //   results.raw_crit = Math.round(results.raw_crit);
    //   results.ele_crit = Math.round(results.ele_crit);
    //   results.sum_avg = Math.round(results.sum_avg);
    //   results.raw_avg = Math.round(results.raw_avg);
    //   results.ele_avg = Math.round(results.ele_avg);

      return results;
    }
}