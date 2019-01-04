import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-counter',
  templateUrl: './game-counter.component.html',
  styleUrls: ['./game-counter.component.scss']
})
export class GameCounterComponent {
  @Input() value: number;
  @Input() displayLength: number;

  digits(): string[] {
    return this.digitsArray(this.value, this.displayLength);
  }

  /**
   * Format number as array for top bar counter & timer:
   * - cap value to max value for length
   * - add leading zeroes
   * - put the minus sign in front
   *
   * @param value number to be formatted
   * @param length output length
   */
  private digitsArray(value: number, length: number): string[] {
    let prefix = '';
    if (value < 0) {
      length--;
      prefix = '-';
      value = Math.abs(value);
    }
    const max = Math.pow(10, length) - 1;
    if (value > max) {
      value = max;
    }
    let output = '' + value;
    while (output.length < length) {
      output = '0' + output;
    }
    return (prefix + output).split('');
  }
}
