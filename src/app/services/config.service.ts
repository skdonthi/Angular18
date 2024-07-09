import { HttpClient } from '@angular/common/http';
import { Injectable, InjectionToken, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { StorageService } from './storage.service';

export function ConfigFactory(): () => Promise<XiConfig> {
  const service = inject(ConfigService);
  return async () => await service.getConfig();
}

export const API_URL = new InjectionToken<string>('');

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private config!: XiConfig;

  constructor(private http: HttpClient, private storage: StorageService) {}

  async getConfig(): Promise<XiConfig> {
    this.config = await lastValueFrom(this.http.get<XiConfig>('/config.json'));
    this.storage.set('apiUrl', this.config.apiUrl);
    return this.config;
  }

  get apiUrl() {
    return this.config.apiUrl;
  }
}

export interface XiConfig {
  apiUrl: string;
}
