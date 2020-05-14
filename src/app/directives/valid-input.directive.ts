import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appValidInput]'
})
export class ValidInputDirective{

  @Input() appValidInput: boolean;

  constructor(private renderer: Renderer2,private el: ElementRef) { }

  @HostListener('change') ngOnChanges() {
   
    //Change layout of element based on valid status of input
    if (this.appValidInput){
      this.renderer.removeClass(this.el.nativeElement,"invalidInput"); 
    }
    else this.renderer.addClass(this.el.nativeElement,"invalidInput"); 
  }
}
