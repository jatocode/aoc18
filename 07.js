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

    let steps = [];
    for (let l of lines) {
        if (l.length == 0) continue;
        const m = l.match(/Step (.) must be finished before step (.) can begin/);
        let before, after;
        [first, next] = [ m[1], m[2] ];

        if(!steps[first]) steps[first] = { children: [] };
        steps[first].children.push(next);
    }
    
    let steps2 = Object.keys(steps).map(k => { return [k, steps[k]]});

    let order = '';
    while(steps2.length) {
        const step = steps2.shift();
        console.log(step);
        order += step[0];
    }
    console.log(order);
});