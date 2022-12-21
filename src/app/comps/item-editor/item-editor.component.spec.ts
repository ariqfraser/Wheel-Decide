import { CUSTOM_ELEMENTS_SCHEMA, ElementRef, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ItemEditorComponent } from './item-editor.component';

fdescribe('ItemEditorComponent', () => {
  let component: ItemEditorComponent;
  let fixture: ComponentFixture<ItemEditorComponent>;
  let debugComp: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemEditorComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugComp = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should start', () => {
    const selector = debugComp.queryAll(By.css('input'));
    const textarea = (<HTMLTextAreaElement>component.textarea.nativeElement)

    function generateKeyUpEvent(value: string): KeyboardEvent {
      const event: KeyboardEvent = new KeyboardEvent('keyup', { bubbles: true, cancelable: true });
      Object.defineProperty(event, 'target', { value: { value } });
      return event;
    }

    textarea.dispatchEvent(generateKeyUpEvent('h'))
    textarea.value = 'hello\nworld'
    fixture.detectChanges();
    console.log(JSON.stringify(textarea.value));
    console.log(component.items)
  })
});
