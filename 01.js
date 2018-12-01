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
    let freq = 0;
    let found = [];
    let foundtwice = false;

    while (!foundtwice) {
        for (let l of lines) {
            if (l.length == 0) continue;
            f = parseInt(l);
            freq += f;
            if(found[freq]) {
                foundtwice = true;
                break;
            }
            found[freq] = true;
        }
    }
    console.log(freq);
});