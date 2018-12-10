import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'aoc-letter',
  shadow: true
})
export class AocLetter {
  @Prop() x: number;
  @Prop() y: number;

  render() {
    return (
    <div>
      <p>*</p>
    </div>
    );
  }
}
