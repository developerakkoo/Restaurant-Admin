import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

function loadGoogleMapsScript(apiKey: string): Promise<void> {
  if ((window as any).google?.maps) {
    return Promise.resolve();
  }

  const existing = document.querySelector('script[data-google-maps-loader]');
  if (existing) {
    return new Promise((resolve, reject) => {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () =>
        reject(new Error('Failed to load Google Maps'))
      );
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&loading=async&libraries=maps,geocoding`;
    script.async = true;
    script.defer = true;
    script.dataset['googleMapsLoader'] = 'true';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Google Maps'));
    document.head.appendChild(script);
  });
}

loadGoogleMapsScript(environment.apiKey)
  .then(() => platformBrowserDynamic().bootstrapModule(AppModule))
  .catch((err) => console.error(err));
