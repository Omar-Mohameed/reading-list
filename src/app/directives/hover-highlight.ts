import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHoverHighlight]',
})
export class HoverHighlight {
  constructor(private elementRef: ElementRef,
              private renderer: Renderer2
  ) {
    this.renderer.setStyle(
          this.elementRef.nativeElement,
          'transition',
          'transform 0.2s ease, box-shadow 0.2s ease'
        );

  }


  @HostListener('mouseenter')
  onMouseEnter() {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'transform',
      'translateY(-4px)'
    );
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'box-shadow',
      '0 4px 12px rgba(0, 0, 0, 0.15)'
    );
  }
  @HostListener('mouseleave')
  onMouseLeave() {
    this.renderer.removeStyle(
      this.elementRef.nativeElement,
      'transform'
    );

    this.renderer.removeStyle(
      this.elementRef.nativeElement,
      'box-shadow'
    );
  }
}
