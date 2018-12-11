import { Component, State } from '@stencil/core';


@Component({
  tag: 'aoc-app',
  shadow: true
})
export class AocApp {

  @State() stars;
  intervalID: number;
  ticks: number = 0;
  scale: number = 3;
  stop: boolean = false;

  async componentWillLoad() {
    //let data = await (await fetch('/assets/10-example.txt')).text();
    let data = await (await fetch('/assets/10-input.txt')).text();
    let lines = data.split('\n');
    this.stars = [];


    for (let l of lines) {
      if (l.length == 0) continue;
      // position=<-42346,  10806> velocity=< 4, -1>
      let m = l.match(/position=<\s*([+-]?\d+),\s*([+-]?\d+)> velocity=<\s*([+-]?\d+),\s*([+-]?\d+)/);
      let x, y, velx, vely;
      [x, y, velx, vely] = [+m[1], +m[2], +m[3], +m[4]];

      this.stars.push({ x: x, y: y, velx: velx, vely: vely });
    }

    // Kör lite i förväg, verkar hända grejor > 10600
    for (let index = 0; index < 10630; index++) {
      for (const star of this.stars) {
        star.x = star.x + star.velx;
        star.y = star.y + star.vely;
      }
      this.ticks++;
    }

    var tick: Function = this.tick.bind(this);
    this.intervalID = setInterval(tick, 1000);

  }

  tick() {
    if (!this.stop) {
      let updated = [];
      for (const star of this.stars) {
        updated.push({ x: star.x + star.velx, y: star.y + star.vely, velx: star.velx, vely: star.vely });
      }
      this.stars = updated;
    }
  }

  mousedown() {
    this.stop = ! this.stop;
  }

  hostData() {
    return {
      onmousedown: this.mousedown.bind(this),
    };
  }

  render() {
    return (
      <div>
        <header>
          <h1>AoC 2018.10</h1>
        </header>
        {this.stars.map((s) =>
          <aoc-letter x={s.x} y={s.y} scale={this.scale}></aoc-letter>
        )}
      </div>
    );
  }
}
