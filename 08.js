var fs = require('fs');
var args = process.argv.slice(2);
let meta = 0;

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
        data = l.split(' ').map(x => +x);
        let marker = 0;
        header(data, 0);
        
        console.log(meta);

        inp1 = data;
        console.log(part1());
    }

});

function header(data, marker) {
    let size = 0;
    const cn = +data[marker];
    const md = +data[marker + 1];
    console.log({cn, md});

    size += 2;

    for(i=0;i<cn;i++) {
        let cz = header(data, marker + size); 
        size += cz;
    }

    for(let i=0; i < md; i++) {
        //console.log('md = ' + data[marker + size + i]);
        meta += +data[marker + size + i];
        console.log(meta);
    }
    size += md;

    return size;
}
