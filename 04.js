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
    for(let g of guardroll) {
        let m = g.gi.match(/Guard #(\d+).*/);
        if(m) {
            guard = +m[1];
            //console.log(guard);
        } else {
            if(g.gi == 'falls asleep') {
                start = g.d;
                console.log(start);
            } 
            if(g.gi == 'wakes up') {
                end = g.d;
                console.log(end);
                let slept =  (end - start)/1000/60;
                console.log(start.getTimezoneOffset());
                let startmin = start.getMinutes();
                let endmin   = end.getMinutes();
                console.log({startmin, endmin});
                if(!minutes[guard]) {
                    minutes[guard] = [];
                    for(var i=0;i<60;i++) minutes[guard][i] = 0;
                }
                let sleepmin = [];
                for(t = startmin; t < endmin+60; t++) {
                    let t2 = t % 60;
                    minutes[guard][t2] = minutes[guard][t2] + 1;
                }
                //console.log(minutes[guard]);
                row = '';
                minutes[guard].forEach(x => { 
                    if(x == 1) row += '.'
                    else row += '#';
                } );
                console.log(guard + ' ' + row);
                //console.log('Slept ' + slept);
                sleep[guard] = sleep[guard] == undefined? slept : sleep[guard] + slept;
            }
        }
    }

    sleep.forEach((s, i) => {
        if(s) {
            console.log(i + ':' + s);

            let max = Math.max(...minutes[i]);
            let maxi = minutes[i].findIndex(x => x == max);

            console.log(maxi + ':' + max);
        }
    })

});