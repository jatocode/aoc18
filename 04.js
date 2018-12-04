const fs = require('fs');
const setTZ = require('set-tz');

setTZ('UTC');
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

    let guardroll = [];
    for (let l of lines) {
        if (l.length == 0) continue;
        let m = l.match(/\[(.*)\] (.*)/);
        let ds, guard;
        [ds, guard] = [m[1], m[2]];
        let d = new Date(ds); // I FUCKING HATE JAVASCRIPT DATE
        guardroll.push({ d: d, gi: guard });
    }

    guardroll.sort((a, b) => a.d - b.d);

    let guard = 0;
    let start, end;
    let sleep = [];
    let minutes = [];
    for (let g of guardroll) {
        let m = g.gi.match(/Guard #(\d+).*/);
        if (m) {
            guard = +m[1];
            //console.log(guard);
        } else {
            if (g.gi == 'falls asleep') {
                start = g.d;
            }
            if (g.gi == 'wakes up') {
                end = g.d;
                let slept = (end - start) / 1000 / 60;
                let startmin = start.getMinutes();
                let endmin = end.getMinutes();

                if (!minutes[guard]) {
                    minutes[guard] = [];
                    for (var i = 0; i < 60; i++) minutes[guard][i] = 0;
                }

                endmin = endmin < startmin ? endmin + 60 : endmin;
                for (t = startmin; t < endmin; t++) {
                    let t2 = t % 60;
                    minutes[guard][t2] += 1;
                }

                row = '';
                minutes[guard].forEach(x => {
                    if (x == 0) row += '.'
                    else row += x;
                });
                //console.log(guard + ' ' + row);
                sleep[guard] = sleep[guard] == undefined ? slept : sleep[guard] + slept;
            }
        }
    }

    let wg = -1;
    let max = 0;
    for (let i = 0; i < sleep.length; i++) {
        const s = sleep[i];

        if (s) {
            if (s > max) {
                max = s;
                wg = i;
            }
        }
    }

    let wm = Math.max(...minutes[wg]);
    let maxi = minutes[wg].findIndex(x => x == wm);

    console.log('Worst guard ' + wg + ' in minute ' + maxi + ' -> ' + wg * maxi);

});