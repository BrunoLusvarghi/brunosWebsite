import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';


@Directive({
  selector: '[appValidInput]'
})
export class ValidInputDirective {

 @Input('appValidInput') inputControl : FormControl;
  constructor(private renderer: Renderer2, private el: ElementRef) { }

  @HostListener('change') ngOnChanges() {

    
    if(!this.inputControl.pristine){
      //Change layout of element based on valid status of input
      if (this.inputControl.valid) {
        this.renderer.removeClass(this.el.nativeElement, "invalidInput");
      }
      else this.renderer.addClass(this.el.nativeElement, "invalidInput");
    }
    
  }
}
