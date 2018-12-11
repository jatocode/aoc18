const serial = 9798;

let maxpower = 0;
let max;
for (let y = 1; y < 301; y++) {
    for (let x = 1; x < 301; x++) {
        const tp = power3x3(x,y);
        if(tp > maxpower) {
            maxpower = tp;
            max = {x,y}
        }
    }
}
print5x5(max.x, max.y);
console.log(max);

function power3x3(sx, sy) {
    let tp = 0;
    for (let y = sy; y < sy + 3; y++) {
        for (let x = sx; x < sx + 3; x++) {
            const p = powerlevel(x, y);
            tp += p;
        }
    }
    return tp;
}

function print5x5(sx, sy) {
    for (let y = sy - 1; y < sy + 4; y++) {
        let row = ''
        for (let x = sx - 1; x < sx + 4; x++) {
            const p = powerlevel(x, y);
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