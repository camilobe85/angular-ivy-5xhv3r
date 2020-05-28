import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { EditorModule } from '@progress/kendo-angular-editor';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { MentionDirective } from './mention.directive';
import 'hammerjs';
@NgModule({
  imports:      [ BrowserModule, FormsModule,EditorModule ],
  declarations: [ AppComponent, HelloComponent, MentionDirective ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
