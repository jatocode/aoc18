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
    var lines = data.split('\n');

    let twos = 0;
    let threes = 0;

    for (let l of lines) {
        if (l.length == 0) continue;
        let chars = l.split('');
        let counts = [];

        chars.forEach(c => {
            if(counts[c] == undefined) {
                counts[c] = 1;
            } else {
                counts[c] = counts[c] + 1;
            }
        });

        let found2 = 0;
        let found3 = 0;
        Object.keys(counts).forEach(c => {
            let count = counts[c];

            if(count == 2) found2 = 1;
            if(count == 3) found3 = 1;
        })
        twos += found2;
        threes += found3;
    }

    console.log(twos * threes);

});