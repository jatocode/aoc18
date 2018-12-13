var fs = require('fs');
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
    let lines = data.split('\n');
    let carts, track;
    [carts, track] = findCartsAndTrack(lines);
 
    do {
        carts = sortCarts(carts);
    } while (runCarts(carts, track));
    printTrack(track, carts);

});

function runCarts(carts, track) {
    for (let cart of carts) {
        let nextTrack = track[cart.y + cart.vy].split('')[cart.x + cart.vx];

        if(cartPosition(cart.x + cart.vx, cart.y + cart.vy, carts)) {
            console.log('Crash at ' + (cart.x + +cart.vx) + ',' + (cart.y + +cart.vy));
            return false;
        }
        cart.x += cart.vx;
        cart.y += cart.vy;

        let vx = cart.vx;
        let vy = cart.vy;
        switch (nextTrack) {
            case '/':
            case '\\':
                [vx, vy] = turn(nextTrack, cart);
                break;
            case '-':
            case '|':
                break;
            case '+':
                [vx, vy] = intersection(cart);
                cart.turn = (cart.turn + 1) % 3;
                break;
            default: 
                console.log('?: "' + nextTrack + '"'); 
                return false;
        }
        cart.vx = vx;
        cart.vy = vy;
    }
    return true;
}

function turn(t, cart) {
    let vx = cart.vx;
    let vy = cart.vy;
    switch (t) {
        case '/':
            vx = cart.vy * -1;
            vy = cart.vx * -1;
            break;
        case '\\':
            vx = cart.vy * 1;
            vy = cart.vx * 1;
            break;
    }
    return [vx, vy];
}

function intersection(cart) {
    // left, straight, right, ...
    const rule = ['l', 's', 'r'][cart.turn];
    let vx = cart.vx;
    let vy = cart.vy;
    switch (rule) {
        case 'l':
            vx = cart.vy * 1;
            vy = cart.vx * 1;
            break;
        case 'r':
            vx = cart.vy * -1;
            vy = cart.vx * -1;
            break;
        case 's':
            break;
    }

    return [vx, vy];
}

function findCartsAndTrack(lines) {
    let carts = [];
    let track = [];
    for (let i = 0; i < lines.length; i++) {
        const l = lines[i];
        if (l.length == 0) continue;
        track[i] = lines[i];
        for (let c = 0; c < l.split('').length; c++) {
            const symbol = l[c];
            let t;
            let pos = -1;
            switch (symbol) {
                case '^': pos = c; vx = 0; vy = -1; t = '|'; break;
                case 'v': pos = c; vx = 0; vy = 1; t = '|'; break;
                case '>': pos = c; vx = 1; vy = 0; t = '-'; console.log('>'); break;
                case '<': pos = c; vx = -1; vy = 0; t = '-'; break;
            }
            if (pos > 0) {
                const cart = { x: pos, y: i, turn: 0, vx: vx, vy: vy, c: symbol };
                carts.push(cart);
                lines[i] = lines[i].substr(0, pos) + t + lines[i].substr(pos + 1);
                track[i] = lines[i];
            }
        }
    }
    return [carts, track];
}

function printTrack(track, carts) {
    console.log('\x1Bc');
    for (let y = 0; y < track.length; y++) {
        let row = '';
        for (let x = 0; x < track[y].length; x++) {
            row += cartPosition(x, y, carts) ? cartPosition(x, y, carts) : track[y][x];
        }
        console.log(row);
    }
    console.log();
}

function cartPosition(x, y, carts) {
    for (cart of carts) {
        if (cart.x == x && cart.y == y) {
            if(cart.vy == -1) return '^';
            if(cart.vy == 1) return 'v';
            if(cart.vx == -1) return '<';
            if(cart.vx == 1) return '>';
        }
    }
    return undefined;
}

function sortCarts(carts) {
    return carts.sort((a, b) => {
        return a.x - b.x;
    }).sort((a,b) => {
        return a.y - b.y;
    });
}