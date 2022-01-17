import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DecklistComponent } from './decklist/decklist.component';
import { CardbookComponent } from './cardbook/cardbook.component';
import { HttpClientModule } from '@angular/common/http';
import { NbThemeModule, NbSidebarModule, NbLayoutModule, NbCardModule } from '@nebular/theme';

@NgModule({
  declarations: [
    AppComponent,
    DecklistComponent,
    CardbookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbSidebarModule.forRoot(),
    NbLayoutModule,
    NbCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
