import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import * as d3 from "d3";

@Component({
  selector: 'stacked-area-chart-v2',
  templateUrl: './stacked-area-chart-v2.component.html',
  styleUrls: ['./stacked-area-chart-v2.component.scss']
})
export class StackedAreaChartV2Component {

  @ViewChild("stackedAreaChartV2", { static: true }) private chartContainer: ElementRef;

  chartOptions = {
    background_color: 'pink',
    x_axis_unit: 'TIME',
    x_axis_title: 'Period',
    y_axis_title: '% Cars',
    svg_width: 1000,
    svg_height: 600
  }

  //List of groups
  category_list = [
    'AAPL',
    'MSFT',
    'TSLA',

  ]

  colors = ["red", "green", "blue"];

  chartData = [
    { date: new Date(2020, 1, 1), AAPL: 75, MSFT: 100, TSLA: 300 },
    { date: new Date(2021, 1, 1), AAPL: 100, MSFT: 105, TSLA: 100 },
    { date: new Date(2022, 1, 1), AAPL: 50, MSFT: 108, TSLA: 150 },
    { date: new Date(2023, 1, 1), AAPL: 150, MSFT: 110, TSLA: 297 },
    { date: new Date(2024, 1, 1), AAPL: 125, MSFT: 120, TSLA: 75 }
  ]

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.createStackedAreaChartV2();
  }

  private createStackedAreaChartV2() {
    // set the dimensions and margins of the graph
    const margin = { top: 20, right: 20, bottom: 50, left: 50 };

    this.clearSVG();

    const svg = d3.select(this.chartContainer.nativeElement)
      .append("svg")
      .attr("width", this.chartOptions.svg_width)
      .attr("height", this.chartOptions.svg_height)
      .style('background', this.chartOptions.background_color)

    const width = +svg.attr('width') - margin.left - margin.right;
    const height = +svg.attr('height') - margin.top - margin.bottom;

    // console.log('width : ', width);
    // console.log('height : ', height);

    svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Add X axis  dimensions
    const x = d3.scaleTime()
      .domain([d3.min(this.chartData, d => d.date) as Date, d3.max(this.chartData, d => d.date) as Date])
      .range([0, width]);

    // Add X axis to the chart
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(10))

    // Add X axis label
    svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height + 40)
      .text(this.chartOptions.x_axis_title);


    // Add Y axis
    const y = d3.scaleLinear()
      .domain([0, 500])
      .range([height, 0]);

    // Add Y axis to the chart
    svg.append("g")
      .call(d3.axisLeft(y).ticks(5))

    // Add Y axis label:
    svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", 0)
      .attr("y", -5)
      .text("% Cars")
      .attr("text-anchor", "start")
  }

  private clearSVG() {
    this.renderer.setProperty(
      this.chartContainer.nativeElement, "innerHTML", ""
    )

  }

}
