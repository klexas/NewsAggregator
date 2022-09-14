import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import * as config from './app/config.json';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

let title: string  = config.default.site.name;
// Set title
document.title = title;

// TODO: Figure out how to manage Browser title dynamically here.
// Maybe some kind of event to trickle up from the components.
