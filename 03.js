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
        let match = l.match(/#(\d+) @ (\d+),(\d+): (\d+)x(\d)/);

        if(match.length == 5) {
            let id = match[1];
            let left = match[2];
            let top = match[3];
            let width = match[4];
            let height = match[5];

            

        }
    }

});