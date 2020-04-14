import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, Injectable, NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import * as Sentry from '@sentry/browser';
import { Observable } from 'rxjs';

Sentry.init({
  dsn: 'INSERT YOUR DSN'
});

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() {}
  handleError(error) {
    // const eventId = Sentry.captureException(error.originalError || error);
    // Sentry.showReportDialog({ eventId });
    console.log('This is entered after captureException() is called prior to handleError()');
  }
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [{ provide: ErrorHandler, useClass: SentryErrorHandler }],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    new Observable<{ message: string }>(observer => {
      observer.error({ message: 'derp!' });
    }).subscribe(result => console.log(result));
  }
}
