import { AnalyticsPreset } from '../models/analytics.models';

export const DASHBOARD_DEFAULT_PRESET: AnalyticsPreset = '30d';

export const DASHBOARD_KPI_KEYS = ['orders', 'delivered', 'revenue', 'online'] as const;
