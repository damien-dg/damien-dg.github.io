import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CardbookComponent } from './cardbook/cardbook/cardbook.component';
import { CardbookComponent } from './cardbook/cardbook.component';
import { DecklistComponent } from './decklist/decklist.component';

@NgModule({
  declarations: [
    AppComponent,
    CardbookComponent,
    CardbookComponent,
    DecklistComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }