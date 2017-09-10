import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GuestBookComponent } from './guest_book/guest.book.component';
import { GuestBookTreeComponent } from './guest_book/guest.book.tree.component';
import { ParentPipe} from './guest_book/parent.pipe';

@NgModule({
  declarations: [
    AppComponent,
    GuestBookComponent,
    GuestBookTreeComponent,
	ParentPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
