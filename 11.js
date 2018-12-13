const serial = 9798;
//const serial = 42;

// https://en.wikipedia.org/wiki/Summed-area_table

let grid = [];
let sumtable = [];

// Bygg grid
for (let y = 1; y < 301; y++) {
    for (let x = 1; x < 301; x++) {
        grid[gp(x, y)] = powerlevel(x, y);
    }
}

// grid[gp(1, 1)] = 31;
// grid[gp(2, 1)] = 2;
// grid[gp(3, 1)] = 4;
// grid[gp(1, 2)] = 12;
// grid[gp(2, 2)] = 26;
// grid[gp(3, 2)] = 9;
// grid[gp(1, 3)] = 13;
// grid[gp(2, 3)] = 17;
// grid[gp(3, 3)] = 21;

// Bygg summarytable
for (let y = 1; y < 301; y++) {
    for (let x = 1; x < 301; x++) {
        // I(x,y)= i(x,y) + I(x,y-1) + I(x-1,y) - I(x-1,y-1)
        let A = grid[gp(x, y)];
        let B = sumtable[gp(x, y - 1)];
        let C = sumtable[gp(x - 1, y)];
        let D = sumtable[gp(x - 1, y - 1)];

        A = A ? A : 0;
        B = B ? B : 0;
        C = C ? C : 0;
        D = D ? D : 0;

        let sum = A + B + C - D;
        //console.log({x,y,A,B,C,D, sum});

        sumtable[gp(x, y)] = sum;
    }
}

let maxpower = 0;
let maxsize = 0;
let max;

console.log(sumArea(1, 1, 1) + ' 31');
console.log(sumArea(1, 1, 3) + ' 135');
console.log(sumArea(3, 3, 3) + ' 21');
console.log(sumArea(3, 3, 1) + ' 21');
console.log(sumArea(2, 2, 2) + ' 73');
console.log(sumArea(2, 1, 2) + ' == (2,1,2) -> 41');
console.log(sumArea(1, 2, 2) + ' == (1,2,2) -> 68');
// Testar lite 
//print5x5(2, 2);
print5x5sumtable(21, 61);
console.log('Total på 21, 61: ' + sumArea(21,61,3) + ' ska vara 30');

console.log(sumArea(47,37,3) + ' ska vara 30');

// Del 1
let size = 3;
for (let y = 1; y < 301; y++) {
    for (let x = 1; x < 301; x++) {
        const tp = sumArea(x, y, size);
        if (tp > maxpower) {
            maxpower = tp;
            max = { x, y, size }
        }
    }
}
console.log('Del 1: ' + max.x + ',' + max.y);

// for (size = 0; size < 301; size++) {
//     for (let y = 1; y < 301; y++) {
//         for (let x = 1; x < 301; x++) {
//             const tp = sumArea(x, y, size);
//             if (tp > maxpower) {
//                 maxpower = tp;
//                 max = { x, y, size }
//             }
//         }
//     }
//     console.log(size);
// }

// print5x5(max.x, max.y);
// console.log('Del 2: ' + max.x + ',' + max.y + ',' + max.size);

function sumArea(x, y, size) {
    let sum = 0;
    size += -1;
    // if (x == 1 && y == 1) {
    //     sum = sumtable[gp(x + size, y + size)];
    // } else if (x != 1 && y == 1) {
    //     let L = sumtable[gp(x + size, y  + size)];
    //     sum = sumtable[gp(x + size, y + size)] + L;
    // } else if (x == 1 && y != 1) {
    //     let T = sumtable[gp(x, y + size)];
    //     sum = sumtable[gp(x + size, y + size)] + T;
    // } else {
        let A = sumtable[gp(x - 1, y - 1)];
        let B = sumtable[gp(x + size, y - 1)];
        let C = sumtable[gp(x - 1, y + size)];
        let D = sumtable[gp(x + size, y + size)];

        A = A ? A : 0;
        B = B ? B : 0;
        C = C ? C : 0;
        D = D ? D : 0;

        sum = A + D - B - C;
    //}
    //console.log({x,y, size, A,B,C,D,sum});

    return sum;
}

function print5x5(sx, sy) {
    for (let y = sy - 1; y < sy + 4; y++) {
        let row = ''
        for (let x = sx - 1; x < sx + 4; x++) {
            const p = grid[gp(x, y)];
            row += p < 0 ? p + ' ' : ' ' + p + ' ';
        }
        console.log(row);
    }
    console.log();
}

function print5x5sumtable(sx, sy) {
    for (let y = sy - 1; y < sy + 4; y++) {
        let row = ''
        for (let x = sx - 1; x < sx + 4; x++) {
            const p = sumtable[gp(x, y)];
            row += p < 0 ? p + ' ' : ' ' + p + ' ';
        }
        console.log(row);
    }
    console.log();
}

function powerlevel(x, y) {
    const rackID = x + 10;
    let power = y * rackID;
    power += serial;
    power *= rackID;
    const hundred = Math.floor(power / 100) % 10;
    power = hundred - 5;
    return power;
}

// Hjälpfunktion
function gp(x, y) { return `${x}:${y}` };
