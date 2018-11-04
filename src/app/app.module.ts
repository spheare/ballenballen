import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PatternComponent } from './pattern/pattern.component';
import { StitchComponent } from './stitch/stitch.component';

@NgModule({
  declarations: [
    AppComponent,
    PatternComponent,
    StitchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
