import { Directive, effect, ElementRef, input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCurrentlyReading]',
})
export class CurrentlyReading {
  status = input<string>('');

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {
    effect(() => {
      const isCurrentlyReading = this.status() === 'Currently Reading';

      if (isCurrentlyReading) {
        this.renderer.addClass(
          this.elementRef.nativeElement,
          'currently-reading'
        );
      } else {
        this.renderer.removeClass(
          this.elementRef.nativeElement,
          'currently-reading'
        );
      }
    });
  }
}
