import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  @HostBinding('class.open') isopen = false;
  // @HostBinding ('class') elementClass = 'open'
  constructor() { }

  @HostListener('click') toggleopen(){
    this.isopen = !this.isopen;
  }

}
