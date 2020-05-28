import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { EditorComponent } from '@progress/kendo-angular-editor';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit{
    @ViewChild('editor', { static: false })   protected editor: EditorComponent;
  @ViewChild('cursorEditor', { static: false }) protected cursorEditor: ElementRef;
  ngOnInit(): void {}
}
