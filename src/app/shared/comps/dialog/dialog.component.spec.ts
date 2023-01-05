import { DialogService } from './../../services/dialog.service';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { DialogComponent } from './dialog.component';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  let de: DebugElement;
  let dialogService: DialogService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "hello world"', () => {
    const message = 'hello world';
    component.message = message;

    const cardBody: HTMLDivElement =
      de.nativeElement.querySelector('.card-body');

    fixture.detectChanges();
    expect(cardBody.innerHTML.trim()).toBe(message);
  });

  it('should call DialogService.close() when close method gets called', fakeAsync(() => {
    dialogService = TestBed.inject(DialogService);
    spyOn(dialogService, 'close');
    component.close();
    tick(999);
    expect(dialogService.close).not.toHaveBeenCalled();
    tick(1);
    expect(dialogService.close).toHaveBeenCalled();
  }));

  describe('overlayClose()', () => {
    it('should close if targets match', () => {
      const $event = new Event('');
      spyOn(component, 'close');
      component.overlayClose($event);
      expect(component.close).toHaveBeenCalled();
    });
  });
});
