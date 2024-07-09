import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  http = inject(HttpClient);
  apiUrl = inject(API_URL);
  widgetUrl: string = `${this.apiUrl}/widget`;

  getNoOfBookings(filter: Filter) {
    return this.http.post<ApiRes<WidgetData>>(
      `${this.widgetUrl}/numberOfBookings`,
      {
        filter: { ...filter, bookingType: 'A' },
      }
    );
  }

  getRevenueVsRefundRes(filter: Filter) {
    return this.http.post<ApiRes<WidgetData>>(
      `${this.widgetUrl}/revenueVsRefund`,
      {
        filter: { ...filter, bookingType: 'A' },
      }
    );
  }

  getTopPlansByRevenue(numberOfPlans: number, filter: Filter) {
    return this.http.post<ApiRes<WidgetData>>(
      `${this.widgetUrl}/topPlans/number/${numberOfPlans}`,
      {
        filter: { ...filter, bookingType: 'B' },
      }
    );
  }

  getTopPlansByRefund(numberOfPlans: number, filter: Filter) {
    return this.http.post<ApiRes<WidgetData>>(
      `${this.widgetUrl}/topPlans/number/${numberOfPlans}`,
      {
        filter: { ...filter, bookingType: 'R' },
      }
    );
  }

  getTopPlansByAge(numberOfPlans: number, filter: Filter) {
    return this.http.post<ApiRes<WidgetData>>(
      `${this.widgetUrl}/topPlansByAge/number/${numberOfPlans}`,
      {
        filter: { ...filter, bookingType: 'A' },
        ageGroups: [
          { from: 18, to: 24, label: '18 to 24' },
          { from: 25, to: 34, label: '25 to 34' },
          { from: 35, to: 44, label: '35 to 44' },
          { from: 45, to: 54, label: '45 to 54' },
          { from: 55, to: 64, label: '55 to 65' },
          { from: 65, label: '65 and older' },
        ],
      }
    );
  }
}

export interface DashboardFilter {
  body: Filter;
  display: Record<string, Object>;
}

export interface Filter {
  productType?: string;
  bookingType?: string; // A=Any; B=Booking; R=Refound;
  afterOrEqualDateTime?: string;
  beforeOrEqualDateTime?: string;
  personTypeIds?: number[];
  shipCodes?: string[];
  voyageIds?: number[];
}

export interface ApiRes<T> {
  data: T;
  success: boolean;
  messages: string[];
}

export interface WidgetData {
  labels: string[];
  datasets: WidgetDataset[];
}

export interface WidgetDataset {
  data: number[];
  label: string;
}
