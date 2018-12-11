import { Component, State } from '@stencil/core';


@Component({
  tag: 'aoc-app',
  shadow: true
})
export class AocApp {

  @State() stars: any[];

  async componentWillLoad() {
    let data = await (await fetch('/assets/10-example.txt')).text();
    let lines = data.split('\n');
    this.stars = [];
    
    for (let l of lines) {
      if (l.length == 0) continue;
      // position=<-42346,  10806> velocity=< 4, -1>
      let m = l.match(/position=<\s*([+-]?\d+),\s*([+-]?\d+)> velocity=<\s*([+-]?\d+),\s*([+-]?\d+)/);
      let x,y,velx,vely;
      [x, y, velx, vely] = [ +m[1], +m[2], +m[3], +m[4] ];

      console.log([x,y,velx, vely]);
      this.stars.push({x:x, y:y, velx:velx, vely: vely});
    }

  }

  render() {
    return (
      <div>
        <header>
          <h1>AoC 2018.10</h1>
        </header>
        {this.stars.map((s) =>
          <aoc-letter x={s.x} y={s.y}></aoc-letter>
        )}
      </div>
    );
  }
}
