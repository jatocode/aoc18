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
    for (let l of lines) {
        if (l.length == 0) continue;
        let match = l.match(/#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/);

        if (match.length) {
            let id = parseInt(match[1]);
            let left = parseInt(match[2]);
            let top = parseInt(match[3]);
            let width = parseInt(match[4]);
            let height = parseInt(match[5]);

            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    if (!fabric[top + y]) fabric[top + y] = [];
                    let node = fabric[top + y][x + left] || { id: id, x: left + x, y: top + y, count: 0 };
                    node.count++;
                    if(node.count == 2) overlap++;
                    fabric[top + y][x + left] = node;
                    if(top+y > maxy) maxy = top + y;
                    if(left+x > maxx) maxx = left + x;
                }
            }
        }
    }

    // Skriv ut
    // for (let y = 0; y < maxy; y++) {
    //     let row = '';
    //     for (let x = 0; x < maxx; x++) {
    //         if (fabric[y]) {
    //             let node = fabric[y][x];
    //             if (node) {
    //                 if(node.count > 1) row += 'X';
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

    console.log(overlap);

});