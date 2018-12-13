var fs = require('fs');
var fs = require('fs');
var args = process.argv.slice(2);

//const initialstate = '####..##.##..##..#..###..#....#.######..###########.#...#.##..####.###.#.###.###..#.####..#.#..##..#';
let initialstate = '#..#.#..##......###...###';

function read(file, callback) {
    fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        }
        callback(data);
    });
}

read(args[0], function (data) {
    var lines = data.split('\n');

   // initialstate = 'ABCDEFGHIJKLMNOPQRSTUVWZY';

    const mid = Math.floor(initialstate.length / 2) + 1;
    console.log(mid);
    console.log('   ' + initialstate);
    let plants = (initialstate.slice(mid, initialstate.length) + initialstate.slice(0, mid)).split('');
    console.log('   ' + plants.join(''));

    for (let g = 0; g < 1; g++) {
        for (let l of lines) {
            if (l.length == 0) continue;

            // LLCRR => N
            let L1 = l[0];
            let L2 = l[1];
            let C = l[2];
            let R1 = l[3];
            let R2 = l[4];
            let N = l[9];

            let nextgen = [];
            for (let i = 0; i < plants.length; i++) {
                let L1i = i - 2 < 0 ? plants.length + i - 2 : i - 2;
                let L2i = i - 1 < 0 ? plants.length + i - 1 : i - 1;
                let R1i = i + 1 > plants.length ? i + 1 - plants.length : i + 1;
                let R2i = i + 2 > plants.length ? i + 2 - plants.length : i + 2;

                //console.log({L2i, L1i, R1i, R2i});

                if (plants[L1i] == L1 && plants[L2i] == L2 &&
                    plants[i] == C &&
                    plants[R1i] == R1 && plants[R2i] == R2) {
                    //console.log(plants[L1i], plants[L2i], plants[i], plants[R1i], plants[R2i]);
                    //console.log({ L1, L2, C, R1, R2, N });
                    nextgen[i] = N;
                } else {
                    nextgen[i] = plants[i];
                }
            }
            plants = nextgen;
        }
        console.log(g + ': ' + plants.join(''));
    }


});