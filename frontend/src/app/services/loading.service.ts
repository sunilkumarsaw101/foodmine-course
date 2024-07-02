import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
 private isLoadingSubjet= new BehaviorSubject<boolean>(false);
  constructor() { }

  showLoading(){
    this.isLoadingSubjet.next(true);
  }

  hideLoading(){
    this.isLoadingSubjet.next(false);
  }

  get isLoading(){
    return this.isLoadingSubjet.asObservable();
  }
}
