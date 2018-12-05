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

        console.log('Del 1. Units left: ' + reaction(l).length);
    }

    // Del 2
    for (let l of lines) {
        if (l.length == 0) continue;
        let units = 'abcdefghijklmnopqrstuvxywz';
        let polymers = [];
        const input = l;
        for (const unit of units) {
            let react = '';
            l = input.split('').filter(c => c.toLowerCase() != unit).join('');
            
            polymers.push(reaction(l).length);
        }
        console.log('Del 2. Kortast polymer: ' + Math.min(...polymers));
    }
});

function reaction(chain) {
    let reactions = true;
    let react = '';
    while (reactions) {
        react = '';
        let i = 0;
        while (i < chain.length) {
            if (Math.abs(chain.charCodeAt(i) - chain.charCodeAt(i + 1)) == 32) {
                i += 2;
            } else {
                react += chain[i++];
            }
        }
        reactions = react != chain;
        chain = react;
    }
    return react;
}