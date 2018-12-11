import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'aoc-letter',
  shadow: true
})
export class AocLetter {
  @Prop() x: number;
  @Prop() y: number;
  @Prop() size: number = 10;
  @Prop() scale: number = 1;

  top : number = -window.innerHeight/2;
  left: number = 0;

  hostData() {
    const s = this.size;
    const style = {
      position: 'absolute',
      font: 'normal 15px sans-serif',
      textAlign: 'center',
      cursor: 'pointer',
      width: s + 'px',
      height: s + 'px',
      left: this.left + (this.x)*s/this.scale + 'px',
      top: this.top + (this.y)*s/this.scale + 'px',
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
