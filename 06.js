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

    let grid = [];
    let nodes = [];
    let maxx = 0;
    let maxy = 0;
    let i = 0;
    for (const l of lines) {
        if (l.length == 0) continue;
        let m = l.match(/(\d+),.*(\d+)/);
        let x, y;
        [x, y] = [+m[1], +m[2]];
        let node = { id: i++, x: x, y: y, finite: true, dist: [] };
        grid[`${x}${y}`] = node;
        nodes[node.id] = node;
        if (x > maxx) maxx = x;
        if (y > maxy) maxy = y;
    }

    for (const node of nodes) {
        calculateDistances(grid, node, maxx, maxy);
    }

    checkGrid(grid, maxx, maxy);
});

function calculateDistances(grid, node, sx, sy) {
    for (let y = 0; y <= sy + 1; y++) {
        for (let x = 0; x <= sx + 1; x++) {
            if (!grid[`${x}${y}`]) grid[`${x}${y}`] = { id: -1, dist: [] };
            let dist = Math.abs(node.x - x) + Math.abs(node.y - y);
            grid[`${x}${y}`].dist[node.id] = dist;
        }
    }
}
function checkGrid(grid, sx, sy) {
    for (let y = 0; y <= sy + 1; y++) {
        let row = '';
        for (let x = 0; x <= sx + 1; x++) {
            const node = grid[`${x}${y}`];
            if (node.id > -1) {
                row += String.fromCharCode(node.id + 65);
            } else {
                let mindist = Math.min(...node.dist);
                let single = node.dist.indexOf(mindist) == node.dist.lastIndexOf(mindist);
                if (single == true) {
                    let id = node.dist.findIndex(x => x == mindist);
                    row += String.fromCharCode(id + 97);
                } else {
                    row += '.';
                }
            }
        }
        console.log(row);
    }
}