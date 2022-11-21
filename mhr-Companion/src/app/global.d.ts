export {};

declare global {
  /**
   * Now declare things that go in the global namespace,
   * or augment existing declarations in the global namespace.
   */
//   interface Employee {
//     id: number;
//     name: string;
//     salary: number;
//   }

//   type Person = {
//     name: string;
//     age: number;
//   };
    interface BigContainer{
        raw: number;
        sharpness: string;
        eleType: string;
        ele: number;
        critchance: number;
        wex: number;
        critboost: number;
        criteye: number;
        atkboost: number;
        agitator: number;
        peakperf: number;
        resentment: number;
        resuscitate: number;
        maxmight: number;
        critele: number;
        offensiveguard: number;
        eleatkup: number;
        counterstrike: number;
        eleexploit: number;
        mailofhellfire: number;
        dereliction: number;
        burst: number;

        parts_name: string;
        hit_slash: number;
        hit_strike: number;
        hit_shot: number;
        element_fire: number;
        element_water: number;
        element_ice: number;
        element_thunder: number;
        element_dragon: number;

        MoveID: number;
        MoveName: string;
        DamageType: string;
        RawMV: number;
        EleMV: number;
        WeaponName: string;
    }

    interface HZContainer{
        parts_name: string;
        hit_slash: number;
        hit_strike: number;
        hit_shot: number;
        element_fire: number;
        element_water: number;
        element_ice: number;
        element_thunder: number;
        element_dragon: number;

    }

    interface MVContainer{
        MoveID: number;
        MoveName: string;
        DamageType: string;
        RawMV: number;
        EleMV: number;
        WeaponName: string;
    }
    

}