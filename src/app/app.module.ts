import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {SkillsPopupComponent} from './thinking-talents-main/skills-popup/skills-popup.component';
import {TeamChartComponent} from './thinking-talents-main/team-chart/team-chart.component';
import {ThinkingTalentsMainComponent} from './thinking-talents-main/thinking-talents-main.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DisplayTeammateComponent} from './thinking-talents-main/display-teammate/display-teammate.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SkillsPopupComponent,
    TeamChartComponent,
    ThinkingTalentsMainComponent,
    DisplayTeammateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
