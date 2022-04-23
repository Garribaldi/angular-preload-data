import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppInitService } from './core/services/app-init.service';
import { RouterModule } from '@angular/router';
import { CoreModule } from './core/core.module';

const loadconfigFactory = (initService: AppInitService) => {
  return () => initService.init();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: loadconfigFactory,
      deps: [AppInitService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
