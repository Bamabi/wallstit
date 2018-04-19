import { ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Http, BaseRequestOptions } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MockBackend } from '@angular/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AuthHttp } from 'angular2-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from './src/app/shared/shared.module';
import { AuthorizationService } from './src/app/authentication/authorization.service';
import { AuthorizationHttp } from './src/app/authentication/authorization-http';
import { StorageService } from './src/app/core/storage.service';
import { AppErrorHandler } from './src/app/core/app-error-handler';
import { Logger } from './src/app/core/logger.service';

import { environment } from './src/environments/environment';

/**
 * Define the common testing imports module.
 */
export const TESTING_IMPORTS = [
  RouterTestingModule,
  CommonModule,
  HttpModule,
  FormsModule,
  ReactiveFormsModule,
  TranslateModule.forRoot(),
  SharedModule.forRoot(),
  BrowserAnimationsModule,
];

/**
 * Define the common testing providers
 */
export const TESTING_PROVIDERS = [
  MockBackend,
  BaseRequestOptions,
  Logger,
  StorageService,
  AuthorizationService,
  {
    provide: Http,
    useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
      return new Http(backend, defaultOptions);
    },
    deps: [MockBackend, BaseRequestOptions]
  },
  {
    provide: TranslateLoader,
    useFactory: (http: HttpClient) => new TranslateHttpLoader(http, 'assets/i18n', '.json'),
    deps: [Http]
  },
  {
    provide: ErrorHandler,
    useFactory: (logger: Logger) => new AppErrorHandler(logger, !environment.production),
    deps: [Logger]
  },
  {
    provide: AuthHttp,
    useClass: (authorizationService: AuthorizationService, http: Http) =>
      new AuthorizationHttp(authorizationService, http, {
        globalHeaders: [{ 'Accept': 'application/json' }],
        tokenGetter: (() => authorizationService.token)
      }),
    deps: [AuthorizationService, Http]
  }
];
