var fs = require('fs');
var fs = require('fs');
var args = process.argv.slice(2);

//const initialstate = '####..##.##..##..#..###..#....#.######..###########.#...#.##..####.###.#.###.###..#.####..#.#..##..#';
const initialstate = '#..#.#..##......###...###';

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

    const plants = initialstate.split('');

    console.log(plants);
    for (let l of lines) {
        if (l.length == 0) continue;

        // LLCRR => N
        let L1 = l[0];
        let L2 = l[2];
        let R1 = l[3];
        let R2 = l[3];
        let N  = l[9];
        
        console.log({L1, L2, R1, R2, N});
        for (let i = 0; i < plants.length; i++) {
            const C = plants[i];
            
            
        }
    }

});