import { NgModule, Optional, SkipSelf, ErrorHandler, LOCALE_ID, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Http } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TranslateModule, TranslateService, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthHttp } from 'angular2-jwt';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';

import { environment } from '../../environments/environment';
import { ModuleImportGuard } from './module-import-guard';
import { Logger } from './logger.service';
import { StorageService } from './storage.service';
import { errorHandlerFactory } from './app-error-handler';
import { apiTranslateLoaderFactory } from './api-translate-loader';
import { AuthenticationModule } from '../authentication/authentication.module';
import { TranslateResolver } from './translate-resolver';
import { MAT_DATE_LOCALE } from '@angular/material';

// Translate options
export function translateFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/');
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateFactory,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    AuthenticationModule.forRoot()
  ],
  declarations: [
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpModule,
    TranslateModule
  ],
  providers: [
    Logger,
    StorageService,
    TranslateResolver,
    {
      provide: ErrorHandler,
      useFactory: errorHandlerFactory,
      deps: [Logger]
    }
  ]
})
export class CoreModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        {provide: LOCALE_ID, useValue: 'fr-FR'},
        {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'}
      ]
    };
  }

  constructor( @Optional() @SkipSelf()
    parentModule: CoreModule,
    translateService: TranslateService,
    titleService: Title,
    storageService: StorageService
  ) {
    ModuleImportGuard.throwIfAlreadyLoaded(parentModule, 'CoreModule');

    registerLocaleData(localeFr, 'fr');
    const locale = storageService.getItem<string>(environment.language.key) || environment.language.default;
    translateService.use(locale);

    // set default application language.
    // translateService.setDefaultLang('fr');

    // set the document title
    translateService.get(environment.title).subscribe((title) => titleService.setTitle(title));
  }
}
