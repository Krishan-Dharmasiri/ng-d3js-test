import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import * as d3 from "d3";

@Component({
  selector: 'app-stacked-area-chart',
  templateUrl: './stacked-area-chart.component.html',
  styleUrls: ['./stacked-area-chart.component.scss']
})
export class StackedAreaChartComponent {
  @ViewChild("stackedAreaChart", { static: true }) private chartContainer: ElementRef;

  //List of groups
  category_list = [
    'AAPL',
    'MSFT',
    'TSLA',
    
  ]

  chartData = [
    {date : new Date(2020, 1, 1), AAPL_close : 78, MSFT_close : 100, TSLA_close : 300},
    {date : new Date(2021, 1, 1), AAPL_close : 79, MSFT_close : 105, TSLA_close : 295},
    {date : new Date(2022, 1, 1), AAPL_close : 75, MSFT_close : 108, TSLA_close : 290},
    {date : new Date(2023, 1, 1), AAPL_close : 80, MSFT_close : 110, TSLA_close : 297},
    {date : new Date(2024, 1, 1), AAPL_close : 85, MSFT_close : 120, TSLA_close : 305}
  ]

  constructor(private renderer: Renderer2) { }

  ngOnInit(){
    this.createStackedAreaChart();
  }

  private createStackedAreaChart(){
    // set the dimensions and margins of the graph
    const margin = { top: 20, right: 20, bottom: 50, left:50 };
    const width = 900 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    this.clearSVG();

    const svg = d3.select(this.chartContainer.nativeElement)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



  }

  private clearSVG() {
    this.renderer.setProperty(
      this.chartContainer.nativeElement, "innerHTML", ""
    )
  }
}
