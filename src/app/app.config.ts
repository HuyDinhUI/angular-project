import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { DynamicAsideMenuService, LayoutService } from './_metronic/core';
import { MenuServices } from './_metronic/core/services/menu.service';
import { MenuConfigService } from './_metronic/core/services/menu-config.service';
import { routes } from './app.routes';
import { TranslateModule } from '@ngx-translate/core';
import { importProvidersFrom } from '@angular/core';
import { TokenStorage } from './modules/auth/_services/token-storage.service';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(TranslateModule.forRoot()),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(),
    MenuConfigService,
    DynamicAsideMenuService,
    MenuServices,
    LayoutService,
    TokenStorage
  ]
};
