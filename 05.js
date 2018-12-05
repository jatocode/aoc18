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
        let react = '';
        let reactions = true;
        while (reactions) {
            react = '';
            let i = 0;
            while (i < l.length) {
                if (Math.abs(l.charCodeAt(i) - l.charCodeAt(i + 1)) == 32) {
                    i += 2;
                } else {
                    react += l[i++];
                }
            }
            reactions = react != l;
            l = react;
        }
        console.log('Del 1. Units left: ' + react.length);
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

            let reactions = true;
            while (reactions) {
                react = '';
                let i = 0;
                while (i < l.length) {
                    if (Math.abs(l.charCodeAt(i) - l.charCodeAt(i + 1)) == 32) {
                        i += 2;
                    } else {
                        react += l[i++];
                    }
                }
                reactions = react != l;
                l = react;
            }
            polymers.push(react.length);
        }
        console.log('Del 2. Kortast polymer: ' + Math.min(...polymers));
    }
});