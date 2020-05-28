import { Directive, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[lefMention]'
})
export class MentionDirective {
  @Input()
  editor: Array<any>;
  @Input()
  cursorEditor: any;private snippetRegex: RegExp;
  mentionSelected = [];
  ESCAPE_KEYCODE = 27;
  UP_KEYCODE = 38;
  DOWN_KEYCODE = 40;

  constructor(
    // private popupDirective: PopupDirective
  ) {
    this.snippetRegex = /@[a-zA-Z0-9]/g;  // Match on given string with a following `
  }

  @HostListener('input', ['$event'])
  onInput($event: any): void {
    // console.log('cursorEditor', this.cursorEditor);
    const getTextPosition = this.getTextPosition($event);
    console.log('getTextPosition', getTextPosition);
    const position = this.getCaretPosition($event.target);
      this.cursorEditor.style.left = position.x + 'px';
      this.cursorEditor.style.top = position.y + 'px';
    if (getTextPosition.match(this.snippetRegex) !== null) {
      // target position
      // console.log('$event.target', $event.target.firstChild.firstChild);
      
    }
  }

  getTextPosition($event: any) {
    const el = $event; 
    const val = el.target.value || el.target.innerText;
    let position = 0;
    const cursorPosition = el.target.selectionEnd || window.getSelection().getRangeAt(0).endOffset;
    for (let i = cursorPosition; i > 0; i--) {
      const word = val.substring(i - 1, i);
      if (word === ' ') {
        position = i;
        break;
      }
    }
    const subStr = val.substring(position, cursorPosition);
    return subStr;
    console.log('subStr', subStr);

  }

  valueChangeEditor($event) {
    /// defined text
    const text = $event;
    const editor = this.editor;

    this.mentionSelected = [];
    this.mentionItems.filter(
      s => {
        if (s.code.toLowerCase().indexOf(text.toLowerCase().substr(1)) !== -1) {
          this.mentionSelected.push(s);
        }
      });
    return this.mentionSelected;
  }

  protected onPopupOpen(popupRef: PopupRef) {
    console.log('onPopupOpen');
    this.popupRef = popupRef;
   
  }

  protected onPopupClose(popupRef: PopupRef) {
    if (popupRef) {
      popupRef.close();
      this.popupRef = null;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('$event', changes);
  }

  onChange($event) {
    console.log('$event', $event);
    if ($event.target.value.match(this.snippetRegex) !== null) {
      $event.target.value = this._getValue($event.target.value);
    }
  }

  private _getValue(value: string) {
    const snippets = value.match(this.snippetRegex);
    snippets.forEach(snippet => {
      value = value.replace(snippet, this._getSnippetContent(snippet));
    });

    return value;
  }

  private _getSnippetContent(snippet) {
    // this.mentionItems.forEach(s => {
    //   console.log('testForEach');
    //   if (s.name.toLowerCase() === snippet.trim().replace('`', '').toLowerCase()) {
    //     snippet = s.content;
    //   }
    // });

    return 'test'; // snippet;
  }

  createCopy(textArea) {
    const copy = document.createElement('div');
    copy.textContent = textArea.value;
    const style = getComputedStyle(textArea);
    [
      'fontFamily',
      'fontSize',
      'fontWeight',
      'wordWrap',
      'whiteSpace',
      'borderLeftWidth',
      'borderTopWidth',
      'borderRightWidth',
      'borderBottomWidth',
    ].forEach((key) => {
      copy.style[key] = style[key];
    });
    copy.style.overflow = 'auto';
    copy.style.width = textArea.offsetWidth + 'px';
    copy.style.height = textArea.offsetHeight + 'px';
    copy.style.position = 'absolute';
    copy.style.left = textArea.offsetLeft + 'px';
    copy.style.top = textArea.offsetTop + 'px';
    console.log('copy.style', copy.style);
    document.body.appendChild(copy);
    return copy;
  }

  getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY
    };
  }

  getCaretPosition(textArea) {
    let start = 0, end = 0;
    if(textArea.tagName === 'TEXTAREA') {
      start = textArea.selectionStart;
      end = textArea.selectionEnd ;
    } else {
start = window.getSelection().getRangeAt(0).startOffset;
      end = window.getSelection().getRangeAt(0).endOffset;
    }
    const copy = this.createCopy(textArea);
    const range = document.createRange();
    const firstChild = copy.firstChild || window.getSelection().anchorNode.parentNode.firstChild;
    range.setStart(firstChild, start);
    range.setEnd(firstChild, end);
    const selection = document.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    const rect = range.getBoundingClientRect();
    document.body.removeChild(copy);
    textArea.selectionStart = start;
    textArea.selectionEnd = end;
    textArea.focus();
    return {
      x: rect.left - textArea.scrollLeft,
      y: rect.top - textArea.scrollTop
    };
  }

}