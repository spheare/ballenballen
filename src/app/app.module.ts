import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PatternComponent } from './pattern/pattern.component';
import { StitchComponent } from './stitch/stitch.component';
import { PaletteComponent } from './palette/palette.component';
import { RendererComponent } from './renderer/renderer.component';

@NgModule({
  declarations: [
    AppComponent,
    PatternComponent,
    StitchComponent,
    PaletteComponent,
    RendererComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
