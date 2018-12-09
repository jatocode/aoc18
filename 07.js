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
let visited = [];
let nodes = [];

read(args[0], function (data) {
    var lines = data.split('\n');

    let t = 0;
    for (let l of lines) {
        if (l.length == 0) continue;
        const m = l.match(/Step (.) must be finished before step (.) can begin/);

        [first, next] = [m[1], m[2]];
        visited[first] = false;

        if (!nodes[first]) nodes[first] = { id: first, children: [], wait: [] };
        if (!nodes[next]) nodes[next] = { id: next, children: [], wait: [] };

        nodes[next].wait.push(first);
        nodes[first].children.push(next);

    }

    let order = '';
    let ns = Object.keys(nodes).sort();

    let i = 0;
    while(ns.length > 0)
    {
        // Hitta första utan wait
        let next = ns.find(n => nodes[n].wait.length == 0);
        order += next;

        // Ta bort den
        let i = ns.findIndex(n => n == next);
        if(i > -1) ns.splice(i, 1);

        // Ta bort den från alla wait-listor pga klar
        ns.forEach(s => {
            let wi = nodes[s].wait.findIndex(n => n == next);
            if(wi > -1) nodes[s].wait.splice(wi, 1);
        });
    }
    console.log(order);
});
