import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { DynamicAsideMenuService, LayoutService } from './_metronic/core';
import { MenuServices } from './_metronic/core/services/menu.service';
import { MenuConfigService } from './_metronic/core/services/menu-config.service';
import { routes } from './app.routes';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { importProvidersFrom } from '@angular/core';
import { TokenStorage } from './modules/auth/_services/token-storage.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { LayoutUtilsService } from './pages/admin/_core/utils/layout-utils.service';
import { JeeCustomerModule } from './pages/jee-customer.module';
import { LayoutRoutingModule } from './pages/layout-routing.module';
import { DatePipe } from '@angular/common';


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
    TokenStorage,
    LayoutUtilsService,
    importProvidersFrom(JeeCustomerModule),
    importProvidersFrom(LayoutRoutingModule),
    DatePipe
  ]
};
