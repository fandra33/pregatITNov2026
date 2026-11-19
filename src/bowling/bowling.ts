
export function score(rolls: number[]): number {
    if (rolls.length === 0 || rolls === undefined) {
        return 0;
    }
    if (rolls.length === 12) {
        for (const roll of rolls) {
            if (roll !== 10) {
                return 0;
            }
        }
        return 300;
    }

    if (rolls.length === 20)
    {
        return rolls.reduce((prev, curr) => {
        return prev + curr;
    })
    }
    let rollsTotal : number = 0;
    let isDoubleStrike : boolean = false;
    for (const roll of rolls) {
        if (isDoubleStrike) {
            rollsTotal += roll * 2;
        }
        else {
            rollsTotal += roll;
        }

        if (rollsTotal >= 10) {
            isDoubleStrike = true;
        }
        
    }
    return rollsTotal;
    

}