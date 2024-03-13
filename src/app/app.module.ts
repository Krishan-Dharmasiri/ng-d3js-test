import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { AreaChartComponent } from './components/area-chart/area-chart.component';
import { StackedAreaChartComponent } from './components/stacked-area-chart/stacked-area-chart.component';
import { StackedAreaChartV2Component } from './components/stacked-area-chart-v2/stacked-area-chart-v2.component';

@NgModule({
  declarations: [
    AppComponent,
    PieChartComponent,
    AreaChartComponent,
    StackedAreaChartComponent,
    StackedAreaChartV2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
