import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ratingStars',
})
export class RatingStarsPipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): number[] {
      return Array(5)
      .fill(0)
      .map((_, index) => index < value ? 1 : 0);
  }
}
