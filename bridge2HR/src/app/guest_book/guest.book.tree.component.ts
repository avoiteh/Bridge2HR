import { Component } from '@angular/core';
import { Input, HostListener, OnChanges, OnInit } from '@angular/core';

import { GuestBookService } from './guest.book.service';
import { MokAuthService } from './mok.auth.service';

@Component({
  selector: 'guest-book-tree',
  templateUrl: './guest.book.tree.component.html',
})
export class GuestBookTreeComponent implements OnInit{
  @Input() parent: string;

  constructor(private guestBookService: GuestBookService,
  	private mokAuthService: MokAuthService) { 
  }

  ngOnInit(){
  	console.log('GuestBookTreeComponent ngOnInit');
  	console.log('GuestBookTreeComponent parent='+this.parent);
   }


 @HostListener('click')
 onClickAnswer(id: string){
 	if(id){
 		if(this.guestBookService.timeoutSendMess===true){
 			alert('Отправка сообщений будет возможна через 10 секунд!');
 			return false;
 		}
 		console.log('onClickAnswer ', id);
		this.guestBookService.currentAnswer=id;

		this.guestBookService.timeoutSendMess = true;
		let timeoutId = setTimeout(() => {  
		  this.guestBookService.timeoutSendMess = false;
		  console.log('timeoutSendMess = false;');
		}, 10000);
	}
 }
 onClickSave(id: string){
 	if(id){
		console.log('onClickSave ', id);
		this.guestBookService.changeMess(id, this.guestBookService.currentAnswerMess);
	}
 }
 onClickSend(id: string){
 	if(id){
 		console.log('onClickSend ', id);
 		console.log(this.guestBookService.currentAnswerMess);
 		//отправить на сервер и свернуть всё
 		let timeOptions = {
			year: 'numeric',
			month: 'numeric',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			timezone: 'UTC'
		}
 		let date = (new Date()).toLocaleString("ru", timeOptions);
 		this.guestBookService.pushMess(id, this.mokAuthService.user.uid, this.mokAuthService.user.uname, date, this.guestBookService.currentAnswerMess)
 		this.guestBookService.currentAnswer="0";
 	}
 }
 changeAnswerMess(mess){
 	this.guestBookService.currentAnswerMess = mess;
 }
}
