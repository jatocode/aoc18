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

    var fabric = [];
    var overlap = 0;
    var maxx = 0;
    var maxy = 0;

    var claims = [];
    for (let l of lines) {
        if (l.length == 0) continue;
        let match = l.match(/#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/);

        if (match.length) {
            var id, left, top, width, height;
            // + istället för parseInt
            [id, left, top, width, height] = [+match[1], +match[2], +match[3], +match[4], +match[5]];
  
            claims[id] = true;

            for (let y = top; y < top+height; y++) {
                for (let x = left; x < left+width; x++) {
                    if (!fabric[y]) fabric[y] = [];

                    let node = fabric[y][x] || { id: [], count: 0 };
                    node.id.push(id);
                    node.count++;
                    fabric[y][x] = node;
                    
                    if (node.count == 2) overlap++;

                    if (y > maxy) maxy = y;
                    if (x > maxx) maxx = x;
                }
            }
        }
    }

    // Skriv ut
    // for (let y = 0; y <= maxy + 1; y++) {
    //     let row = '';
    //     for (let x = 0; x <= maxx + 1; x++) {
    //         if (fabric[y]) {
    //             let node = fabric[y][x];
    //             if (node) {
    //                 if (node.count > 1) row += 'X';
    //                 else row += node.id;
    //             } else {
    //                 row += '.';
    //             }
    //         } else {
    //             row += '.';
    //         }
    //     }
    //     console.log(row);
    // }

    console.log('Del 1: ' + overlap);

    for (let y = 0; y <= maxy; y++) {
        for (let x = 0; x <= maxx; x++) {
            if (fabric[y]) {
                let node = fabric[y][x];
                if (node) {
                    // Ta bort alla claims som delar nod
                    if(node.id.length > 1) node.id.map(x => claims[x] = false);
                }
            }
        }
    }
    claims.forEach((x,i) => { 
        if(x) console.log('Del 2: '+ i) 
    });
});