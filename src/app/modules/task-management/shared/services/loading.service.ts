import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  IsLoadingObservable!: Observable<boolean>;
  IsLoadingSubject!: BehaviorSubject<boolean>;

  constructor() {
    this.IsLoadingSubject = new BehaviorSubject<boolean>(true);
    this.IsLoadingObservable = this.IsLoadingSubject.asObservable();
  }
}
