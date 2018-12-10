import { Component, State } from '@stencil/core';


@Component({
  tag: 'aoc-app',
  shadow: true
})
export class AocApp {

  @State() letters:any[];

  componentWillLoad() {
    this.letters = ['F','A','K'];
    console.log(this.letters);
  }

  render() {
    return (
      <div>
        <header>
          <h1>AoC 2018.10</h1>
        </header>
        {this.letters.map((l) =>
          <aoc-letter>{l}</aoc-letter>
        )}
      </div>
    );
  }
}
