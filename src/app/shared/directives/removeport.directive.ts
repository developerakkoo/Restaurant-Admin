import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appRemoveport]',
  standalone: false
})
export class RemoveportDirective implements OnChanges {

  // Bind the directive to the source URL.
  @Input() appRemoveport!: string;

  constructor(private el: ElementRef<HTMLImageElement>) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appRemoveport'] && this.appRemoveport) {
      try {
        // Parse the URL using the browser's URL API
        const url = new URL(this.appRemoveport);

        // If a port is specified, clear it
        if (url.port) {
          url.port = '';
          // The URL object's toString() method generates a URL without a port if it's empty.
          this.el.nativeElement.src = url.toString();
        } else {
          // Otherwise, just use the original URL
          this.el.nativeElement.src = this.appRemoveport;
        }
      } catch (error) {
        console.error('Error in RemovePortDirective while parsing URL:', error);
        // Fallback to using the original URL in case of error
        this.el.nativeElement.src = this.appRemoveport;
      }
    }
  }

}
