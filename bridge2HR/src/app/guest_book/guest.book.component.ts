import { Component } from '@angular/core';
import { Input, HostListener, OnChanges, OnInit } from '@angular/core';

import { GuestBookService } from './guest.book.service';
import { MokAuthService } from './mok.auth.service';

@Component({
  selector: 'guest-book',
  templateUrl: './guest.book.component.html',
 // styleUrls: ['./app.component.css'],
  providers: [GuestBookService, MokAuthService]
})
export class GuestBookComponent implements OnInit {

  private currentAnswer: string;
  private askNewMess: boolean = false;
  private newMess: string = '';

  constructor(private guestBookService: GuestBookService,
  	private mokAuthService: MokAuthService) { 
  }
  ngOnInit(){
  		//console.log('ngOnInit');
  		this.guestBookService.updateData();
  	  	//console.log(this.guestBookService.getData());
  		this.currentAnswer="0";
        this.guestBookService.updateData();
   }

    onAskNewMess(){
		if(this.guestBookService.timeoutSendMess===true){
 			alert('Отправка сообщений будет возможна через 10 секунд!');
 			return false;
 		}

		this.askNewMess = true;

		this.guestBookService.timeoutSendMess = true;
		let timeoutId = setTimeout(() => {  
		  this.guestBookService.timeoutSendMess = false;
		  console.log('timeoutSendMess = false;');
		}, 10000);
    }
	onClickNewMess(){
		console.log('onClickNewMess');
		let timeOptions = {
			year: 'numeric',
			month: 'numeric',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			timezone: 'UTC'
		}
 		let date = (new Date()).toLocaleString("ru", timeOptions);
		this.guestBookService.pushMess("0", this.mokAuthService.user.uid, this.mokAuthService.user.uname, date, this.newMess);
		this.askNewMess = false;
	}
	NewMess(mess){
		//console.log('NewMess', mess);
		this.newMess = mess;
	}
 // @HostListener('click', ['$event.target'])
 // onClickAnswer(id: number){
 // 	console.log('onClickAnswer ', id);
 //  //this.guestBookService.toggleCollapsed(id);
 // }
//  onClickCheck(id: number){
//   this.guestBookService.toggleCheck(id);
// }
}
