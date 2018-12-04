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

    let guardinfo = [];
    for (let l of lines) {
        if (l.length == 0) continue;
        let m = l.match(/\[(.*)\] (.*)/);
        var ds, guard;
        [ds, guard] = [m[1], m[2]];
        let d = new Date(ds + ' GMT+0000'); // I FUCKING HATE JAVASCRIPT DATE
        guardinfo.push({ d: d, gi: guard });
    }

    guardinfo.sort((a, b) => a.d - b.d);
    console.log(guardinfo);

});