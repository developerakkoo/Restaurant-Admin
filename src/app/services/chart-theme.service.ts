import { Injectable } from '@angular/core';
import Chart, { ChartConfiguration, ChartType } from 'chart.js/auto';

const BRAND = '#ff4c5a';
const BRAND_LIGHT = 'rgba(255, 76, 90, 0.15)';
const TEAL = 'rgba(75, 192, 192, 0.75)';
const AMBER = 'rgba(255, 159, 64, 0.75)';
const BLUE = 'rgba(54, 162, 235, 0.75)';
const PURPLE = 'rgba(153, 102, 255, 0.75)';

@Injectable({ providedIn: 'root' })
export class ChartThemeService {
  private initialized = false;

  initDefaults(): void {
    if (this.initialized) return;
    Chart.defaults.color = '#6b7280';
    Chart.defaults.borderColor = '#e5e7eb';
    Chart.defaults.font.family = 'Barlow, sans-serif';
    this.initialized = true;
  }

  baseOptions(): ChartConfiguration['options'] {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: '#374151', font: { family: 'Barlow' } } },
      },
      scales: {
        x: { grid: { color: '#e5e7eb' }, ticks: { color: '#6b7280' } },
        y: { grid: { color: '#e5e7eb' }, ticks: { color: '#6b7280' } },
      },
    };
  }

  createChart(
    canvas: HTMLCanvasElement,
    type: ChartType,
    labels: string[],
    datasets: ChartConfiguration['data']['datasets'],
    options?: ChartConfiguration['options']
  ): Chart {
    this.initDefaults();
    return new Chart(canvas, {
      type,
      data: { labels, datasets },
      options: { ...this.baseOptions(), ...options },
    });
  }

  lineChart(canvas: HTMLCanvasElement, labels: string[], data: number[], label: string): Chart {
    return this.createChart(canvas, 'line', labels, [
      {
        label,
        data,
        borderColor: BRAND,
        backgroundColor: BRAND_LIGHT,
        fill: true,
        tension: 0.35,
      },
    ]);
  }

  barChart(canvas: HTMLCanvasElement, labels: string[], data: number[], label: string): Chart {
    return this.createChart(canvas, 'bar', labels, [
      {
        label,
        data,
        backgroundColor: BRAND_LIGHT,
        borderColor: BRAND,
        borderWidth: 1,
      },
    ]);
  }

  horizontalBarChart(
    canvas: HTMLCanvasElement,
    labels: string[],
    data: number[],
    label: string
  ): Chart {
    return this.createChart(
      canvas,
      'bar',
      labels,
      [{ label, data, backgroundColor: BLUE, borderWidth: 0 }],
      { indexAxis: 'y' }
    );
  }

  doughnutChart(
    canvas: HTMLCanvasElement,
    labels: string[],
    data: number[]
  ): Chart {
    return this.createChart(canvas, 'doughnut', labels, [
      {
        data,
        backgroundColor: [BRAND, TEAL, AMBER, BLUE, PURPLE, '#94a3b8'],
        borderWidth: 0,
      },
    ], { scales: undefined });
  }

  stackedBarChart(
    canvas: HTMLCanvasElement,
    labels: string[],
    datasets: { label: string; data: number[]; color: string }[]
  ): Chart {
    return this.createChart(
      canvas,
      'bar',
      labels,
      datasets.map((d) => ({
        label: d.label,
        data: d.data,
        backgroundColor: d.color,
        stack: 'stack',
      })),
      { scales: { x: { stacked: true }, y: { stacked: true } } }
    );
  }

  destroy(chart: Chart | null | undefined): void {
    chart?.destroy();
  }
}
