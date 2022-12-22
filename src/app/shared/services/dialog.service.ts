import { IDialogPayload } from './../interfaces/dialog.interface';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor() { }

  private _dialogOpenState$: Subject<IDialogPayload> = new Subject()

  get dialogState$() {
    return this._dialogOpenState$.asObservable();
  }

  open(message: string): void {
    this._dialogOpenState$.next({ message, state: true });
  }

  close(): void {
    this._dialogOpenState$.next({ message: '', state: false });
  }
}