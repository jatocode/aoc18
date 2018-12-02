var fs = require('fs');
var args = process.argv.slice(2);

function read(file, callback) {
    fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        }
        callback(data);
    });
}

read(args[0], function (data) {
    // Del 2
    var lines = data.split('\n');

    let splitlines = [];
    for (let l of lines) {
        if (l.length == 0) continue;
        let chars = l.split('');
        splitlines.push(chars);
    }

    for (let li = 0; li < splitlines.length; li++) {
        const l1 = splitlines[li];
        let mis = 0;

        for (let l2i = li + 1; l2i < splitlines.length; l2i++) {
            const l2 = splitlines[l2i];
            mis = 0;
            res = '';
            for (let index = 0; index < l1.length; index++) {
                const c1 = l1[index];
                const c2 = l2[index];
                if(c1 != c2) { 
                    mis++;
                } else {
                    res += c1;
                }
                if(mis > 1) continue;
            }
            if(mis == 1) {
                console.log('Del 2: ' + res);
                break;
            }
        }
    }
});

read(args[0], function (data) {
    var lines = data.split('\n');

    let twos = 0;
    let threes = 0;

    for (let l of lines) {
        if (l.length == 0) continue;
        let chars = l.split('');
        let counts = [];

        chars.forEach(c => {
            if (counts[c] == undefined) {
                counts[c] = 1;
            } else {
                counts[c] = counts[c] + 1;
            }
        });
        let found2 = 0;
        let found3 = 0;
        Object.keys(counts).forEach(c => {
            let count = counts[c];

            if (count == 2) found2 = 1;
            if (count == 3) found3 = 1;
        })
        twos += found2;
        threes += found3;
    }

    console.log('Del 1: ' + twos * threes);

});