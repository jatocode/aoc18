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

    for (let l of lines) {
        if (l.length == 0) continue;
        let m = l.match(/\[\d+-(\d+)-(\d+) (\d+):(\d+)\](.*)/);
        var month, day, hour, minute, guard;
        [month, day, hour, minute, guard] = [+m[1], +m[2], +m[3], +m[4], m[5]];
        console.log({ month, day, hour, minute, guard });

    }

});