import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IResults, ISkillName } from './resultscontainer';
import { FinalResultsService } from './finalresults.service';

@Component({
  selector: 'app-finalresults',
  templateUrl: './finalresults.component.html',
  styleUrls: ['./finalresults.component.css']
})
export class FinalresultsComponent implements OnInit {

  public edited = false;
  public edited2 = false;
  skillSelect: number = 0;
  skillName: string = "";
  skillDescrip: string = "";
  skillLevel: number = 0;

  digits: number = 0;
  readableWepName: string = "";

  monsterName: string = "";

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
    const MoveID = this.route.snapshot.paramMap.get('MoveID');
    const MoveName = this.route.snapshot.paramMap.get('MoveName');
    const DamageType = this.route.snapshot.paramMap.get('DamageType');
    const RawMV = this.route.snapshot.paramMap.get('RawMV');
    const EleMV = this.route.snapshot.paramMap.get('EleMV');
    const WeaponName = this.route.snapshot.paramMap.get('WeaponName');

    //page title doesn't actually have to be updated... this is just to show what we have
    // this.pageTitle += ` MoveID: ${MoveID}` + ` MoveName: ${MoveName}` + ` DamageType: ${DamageType}`
    // + ` RawMV: ${RawMV}` + ` EleMV: ${EleMV}` + ` WeaponName: ${WeaponName}`;
    
    //check that these values are not null, then add them to the mv container
    //now we can do whatever we want with them
    if (MoveID != null && MoveName != null && DamageType != null && RawMV != null && EleMV != null && WeaponName != null){
      this.mathMV.MoveID = Number(MoveID);
      this.mathMV.MoveName = MoveName;
      this.mathMV.DamageType = DamageType.toLocaleLowerCase();
      this.mathMV.RawMV = Number(RawMV);
      this.mathMV.EleMV = Number(EleMV);
      this.mathMV.WeaponName = WeaponName;
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

    this.monsterName = sessionStorage.getItem("targetMonster")!;
    this.readableWepName = this.readableWeaponName(WeaponName!);

    this.resetSavedMath();



    this.results = this.finalresultsService.doFinalCalcs(this.math, this.mathHZ, this.mathMV);  


  }


  //  extra feature: sets a selected skill level to 0 and reruns calculations.
  //  this is meant to give the user an idea of how valuable each skillpoint is.
  public zeroComparison(event: any, skillSelect: number){
    // console.log("function called");
    // console.log(event.target.value);

    //  run the method to reset the math object to saved user settings before messing with it.
    this.resetSavedMath();

    this.resetDiffs();



    switch (Number(event.target.value)){

      // each switch statement will first store the level of the selected skill.
      // the selected skill is then set to ZERO.
      // all calculations are rerun with this new value and stored in results2.

      case 1:
        this.skillLevel = this.math.wex;
        if (this.skillLevel > 0){
          this.skillName = "Weakness Exploit";
          this.skillDescrip = "Attacks that hit weak points (45 or over) have 15/30/50% increased critical rate.";
          this.math.wex = 0;
          this.results2 = this.finalresultsService.doFinalCalcs(this.math,this.mathHZ, this.mathMV);
          this.edited = true;
        } else {
          this.edited2 = true;
        }
        break;
      case 2:
        this.skillLevel = this.math.critboost;
        if (this.skillLevel > 0){
          this.skillName = "Critical Boost";
          this.skillDescrip = "Critical hits deal 30/35/40% increased raw damage. (note: critical hits start at 25% increased raw damage)";
          this.math.critboost = 0;
          this.results2 = this.finalresultsService.doFinalCalcs(this.math,this.mathHZ, this.mathMV);
          this.edited = true;
        } else {
          this.edited2 = true;
        }
        break;
      case 3:
        this.skillLevel = this.math.criteye;
        if (this.skillLevel > 0){
          this.skillName = "Critical Eye";
          this.skillDescrip = "5/10/15/20/25/30/40% increased critical rate.";
          this.math.criteye = 0;
          this.results2 = this.finalresultsService.doFinalCalcs(this.math,this.mathHZ, this.mathMV);
          this.edited = true;
        } else {
          this.edited2 = true;
        }        
        break;
      case 4:
        this.skillLevel = this.math.atkboost;
        if (this.skillLevel > 0){
          this.skillName = "Attack Boost";
          this.skillDescrip = "Attack +3/6/9/7 +5%/8 +6%/9 +8%/10 +10%";
          this.math.atkboost = 0;
          this.results2 = this.finalresultsService.doFinalCalcs(this.math,this.mathHZ, this.mathMV);
          this.edited = true;
        } else {
          this.edited2 = true;
        }           
        break;
      case 5:
        this.skillLevel = this.math.agitator;
        if (this.skillLevel > 0){
          this.skillName = "Agitator";
          this.skillDescrip = "Raw attack +4/8/12/16/20 and crit rate +3/5/7/10/15% when a monster is enraged.";
          this.math.agitator = 0;
          this.results2 = this.finalresultsService.doFinalCalcs(this.math,this.mathHZ, this.mathMV);
          this.edited = true;
        } else {
          this.edited2 = true;
        }        
        break;
      case 6:
        this.skillLevel = this.math.peakperf;
        if (this.skillLevel > 0){
          this.skillName = "Peak Performance";
          this.skillDescrip = "Attack +5/10/20 when health is full.";
          this.math.peakperf = 0;
          this.results2 = this.finalresultsService.doFinalCalcs(this.math,this.mathHZ, this.mathMV);
          this.edited = true;
        } else {
          this.edited2 = true;
        }
        
        break;
      case 7:
        this.skillLevel = this.math.resentment;
        if (this.skillLevel > 0){
          this.skillName = "Resentment";
          this.skillDescrip = "Attack +5/10/15/20/25 when recoverable health is exposed.";
          this.math.resentment = 0;
          this.results2 = this.finalresultsService.doFinalCalcs(this.math,this.mathHZ, this.mathMV);
          this.edited = true;
        } else {
          this.edited2 = true;
        }        
        break;
      case 8:
        this.skillLevel = this.math.resuscitate;
        if (this.skillLevel > 0){
          this.skillName = "Resuscitate";
          this.skillDescrip = "Attack +5/10/20 when suffering from an abnormal status effect.";
          this.math.resuscitate = 0;
          this.results2 = this.finalresultsService.doFinalCalcs(this.math,this.mathHZ, this.mathMV);
          this.edited = true;
        } else {
          this.edited2 = true;
        }  
       
        break;
      case 9:
        this.skillLevel = this.math.maxmight;
        if (this.skillLevel > 0){
          this.skillName = "Maximum Might";
          this.skillDescrip = "10/20/30% increased critical rate when stamina is full.";
          this.math.maxmight = 0;
          this.results2 = this.finalresultsService.doFinalCalcs(this.math,this.mathHZ, this.mathMV);
          this.edited = true;
        } else {
          this.edited2 = true;
        }  
        
        break;
      case 10:
        this.skillLevel = this.math.critele;
        if (this.skillLevel > 0){
          this.skillName = "Critical Element";
          this.skillDescrip = "5/10/15% increased elemental damage when landing a critical hit.";
          this.math.critele = 0;
          this.results2 = this.finalresultsService.doFinalCalcs(this.math,this.mathHZ, this.mathMV);
          this.edited = true;
        } else {
          this.edited2 = true;
        } 
       
        break;
      case 11:
        this.skillLevel = this.math.offensiveguard;
        if (this.skillLevel > 0){
          this.skillName = "Offensive Guard";
          this.skillDescrip = "5/10/15% increased raw damage after a perfectly timed guard.";
          this.math.offensiveguard = 0;
          this.results2 = this.finalresultsService.doFinalCalcs(this.math,this.mathHZ, this.mathMV);
          this.edited = true;
        } else {
          this.edited2 = true;
        } 

        break;
      case 12:
        this.skillLevel = this.math.eleatkup;
        if (this.skillLevel > 0){
          this.skillName = "Element Attack Up";
          this.skillDescrip = "Elemental attack up +2/3/4 +5%/4 +10%/4 +20%";
          this.math.eleatkup = 0;
          this.results2 = this.finalresultsService.doFinalCalcs(this.math,this.mathHZ, this.mathMV);
          this.edited = true;
        } else {
          this.edited2 = true;
        }

        break;
      case 13:
        this.skillLevel = this.math.counterstrike;
        if (this.skillLevel > 0){
          this.skillName = "Counterstrike";
          this.skillDescrip = "+10/15/25 increased raw damage after being knocked back.";
          this.math.counterstrike = 0;
          this.results2 = this.finalresultsService.doFinalCalcs(this.math,this.mathHZ, this.mathMV);
          this.edited = true;
        } else {
          this.edited2 = true;
        }

        break;
      case 14:
        this.skillLevel = this.math.eleexploit;
        if (this.skillLevel > 0){
          this.skillName = "Element Exploit";
          this.skillDescrip = "+10/12.5/15% increased elemental damage when hitting an elemental weak zone (20 or higher).";
          this.math.eleexploit = 0;
          this.results2 = this.finalresultsService.doFinalCalcs(this.math,this.mathHZ, this.mathMV);
          this.edited = true;
        } else {
          this.edited2 = true;
        }

        break;
      case 15:
        this.skillLevel = this.math.mailofhellfire;
        if (this.skillLevel > 0){
          this.skillName = "Mail of Hellfire";
          this.skillDescrip = "+15/25/35 raw attack and -50/75/100 defense.";
          this.math.mailofhellfire = 0;
          this.results2 = this.finalresultsService.doFinalCalcs(this.math,this.mathHZ, this.mathMV);
          this.edited = true;
        } else {
          this.edited2 = true;
        }

        break;
      case 16:
        this.skillLevel = this.math.dereliction;
        if (this.skillLevel > 0){
          this.skillName = "Dereliction";
          this.skillDescrip = "Summons up to 3 familiars over time that drain health but boost your raw attack by +12/15/20.";
          this.math.dereliction = 0;
          this.results2 = this.finalresultsService.doFinalCalcs(this.math,this.mathHZ, this.mathMV);
          this.edited = true;
        } else {
          this.edited2 = true;
        }

        break;
      case 17:
        this.skillLevel = this.math.burst;
        if (this.skillLevel > 0){
          this.skillName = "Burst";
          this.skillDescrip = "please god do not make me write a full description of this skill";
          this.math.burst = 0;
          this.results2 = this.finalresultsService.doFinalCalcs(this.math,this.mathHZ, this.mathMV);
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

    this.diff_per_point = this.sum_avg_diff/this.skillLevel;

    this.percentage_diff = (this.sum_avg_diff/this.results.sum_avg) * 100;

    this.percentage_diff_per_point = (this.percentage_diff/this.skillLevel);

    // this.edited = true;
    console.log("This skill was contributing an average of " + this.sum_avg_diff +
     " damage to your total of " + this.results.sum_avg + ", making up " + this.percentage_diff +
     "% of your total damage. The skill overall was worth " + this.diff_per_point + " damage per point, or " +
     this.percentage_diff_per_point + "% damage per level.");

  }

  resetSavedMath(){
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
    this.skillName = "";
    this.skillDescrip = "";
    this.skillLevel = 0;
    console.log(this.math);
  }

  //sets all differences to 0 to prep for another skill comparison.
  //also blanks out the percentage difference text on screen.
  resetDiffs(){
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

  chooseDigits(event: any, digits: number){
    this.digits = digits;
  }

  readableWeaponName(wep: string){
    let wepname = "";
    switch (wep){
      case "GS":
        wepname = "Greatsword";
        break;
      case "LS":
        wepname = "Longsword";
        break;
      case "SNS":
        wepname = "Sword and Shield";
        break;
      case "HA":
        wepname = "Hammer";
        break;
      case "HH":
        wepname = "Hunting Horn";
        break;
      case "LA":
        wepname = "Lance";
        break;
      case "GL":
        wepname = "Gunlance";
        break;
      case "CB":
        wepname = "Charge Blade";
        break;
      case "SA":
        wepname = "Switch Axe";
        break;
      case "DB":
        wepname = "Dual Blades";
        break;
      case "IG":
        wepname = "Insect Glaive";
        break;
      case "LBG":
        wepname = "Light Bowgun";
        break;
      case "HBG":
        wepname = "Heavy Bowgun";
        break;
      case "BOW":
        wepname = "Bow";
        break;
    }
    return wepname;
  }

}
