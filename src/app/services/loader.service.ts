import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  isLoading = new EventEmitter<boolean>();

  constructor() { }

  public setLoading( loading: boolean): void {
    this.isLoading.emit(loading);
  }
}
