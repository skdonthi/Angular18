import { Inject, Injectable, InjectionToken } from '@angular/core';
export const STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => localStorage,
});
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(@Inject(STORAGE) public storage: Storage) {}
  get(key: string) {
    return this.storage.getItem(key);
  }
  set(key: string, value: string) {
    this.storage.setItem(key, value);
  }
}
