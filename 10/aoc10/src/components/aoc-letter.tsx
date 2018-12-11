import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'aoc-letter',
  shadow: true
})
export class AocLetter {
  @Prop() x: number;
  @Prop() y: number;
  @Prop() size: number = 10;

  hostData() {
    const s = this.size;
    const style = {
      position: 'absolute',
      font: 'normal 15px sans-serif',
      textAlign: 'center',
      cursor: 'pointer',
      width: s + 'px',
      height: s + 'px',
      left: 50 + (this.x) + 'px',
      top: 50 + (this.y) + 'px',
      borderRadius: (s / 2) + 'px',
      lineHeight: (s) + 'px',
    };

    return {
      style: style,
    };
  }

  render() {
    
    return (
    <div>
      <p>*</p>
    </div>
    );
  }
}
