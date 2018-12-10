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

        header(data, 0);
        
        console.log(meta);
    }

});

function header(data, marker) {
    let size = 0;
    const cn = +data[marker];
    const md = +data[marker + 1];

    size += 2;

    for(let i=0;i<cn;i++) {
        size += header(data, marker + size); 
    }

    for(let i=0; i < md; i++) {
        meta += +data[marker + size + i];
    }
    size += md;

    return size;
}
