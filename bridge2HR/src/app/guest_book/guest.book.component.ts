import { Component } from '@angular/core';
import { Input, HostListener, OnChanges } from '@angular/core';

import { GuestBookService } from './guest.book.service';

@Component({
  selector: 'guest-book',
  templateUrl: './guest.book.component.html',
 // styleUrls: ['./app.component.css'],
  providers: [GuestBookService]
})
export class GuestBookComponent {
  private guestBookService: GuestBookService;
  @Input() parent: string;

  constructor(private _guestBookService: GuestBookService) { 
  	this.guestBookService = _guestBookService;
  	//console.log(this.guestBookService);
  }

 @HostListener('click', ['$event.target'])
 onClickCollapse(id: number){
  this.guestBookService.toggleCollapsed(id);
 }
 onClickCheck(id: number){
  this.guestBookService.toggleCheck(id);
}
}
