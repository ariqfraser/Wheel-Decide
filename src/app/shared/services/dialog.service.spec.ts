import { IDialogPayload } from './../interfaces/dialog.interface';
import { TestBed } from '@angular/core/testing';

import { DialogService } from './dialog.service';

describe('DialogService', () => {
  let service: DialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('open() should change state to true', () => {
    service.open('HELLO WORLD');
    let state: IDialogPayload = { message: '', state: false };
    expect(state.state).toBe(false);
    service.dialogState$.subscribe((data) => {
      state = data;
      expect(state.state).toBe(true);
      expect(state.message).toBe('HELLO WORLD');
    });
  });

  it('close() should change state to false', () => {
    service.open('HELLO WORLD');
    let state: IDialogPayload = { message: '', state: true };
    expect(state.state).toBe(true);
    service.dialogState$.subscribe((data) => {
      state = data;
      expect(state.state).toBe(false);
      expect(state.message).toBe('');
    });
  });

  describe('close()', () => {
    it('should change subject state to false', () => {
      let state: boolean = true;
      service.dialogState$.subscribe((newState) => {
        state = newState.state;
      });
      service.close();
      expect(state).toBe(false);
    });
  });
});
