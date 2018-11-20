import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SetsMenuComponent } from './sets-menu/sets-menu.component';
import { CreateNewSetComponent } from './create-new-set/create-new-set.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SetsMenuComponent,
    CreateNewSetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
