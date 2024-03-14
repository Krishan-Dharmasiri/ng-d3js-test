import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import * as d3 from "d3";

@Component({
  selector: 'stacked-area-chart-v1',
  templateUrl: './stacked-area-chart.component.html',
  styleUrls: ['./stacked-area-chart.component.scss']
})
export class StackedAreaChartV1Component {
  @ViewChild("stackedAreaChartV1", { static: true }) private chartContainer: ElementRef;

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
    this.createStackedAreaChart();
  }

  private createStackedAreaChart() {
    // set the dimensions and margins of the graph
    const margin = { top: 20, right: 20, bottom: 50, left: 50 };
    const width = 1000 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    this.clearSVG();

    const svg = d3.select(this.chartContainer.nativeElement)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
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
      .text("Period");

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

    const stackedData = d3.stack<any>()
      .keys(this.category_list)(this.chartData);

    const color_collection = d3.scaleOrdinal()
      .domain(this.category_list)
      .range(d3.schemeSet2);

     
    // Area generator
    const area = d3.area<any>()
      .x((d) => x(d.data.date))
      .y0((d) => y(d[0]))
      .y1((d) => y(d[1]));

    // Creating "g" tag for each data series     
    const series = svg.selectAll("g.series")
      .data(stackedData)
      .enter()
      .append("g")
      .attr("class", "series");

    // Add a path to each data series
    series.append("path")
      .style("fill", (d, i) => this.colors[i])
      .attr("d", (d) => area(d));

    // Adding legend
    const legend = svg.selectAll('.legend')
      .data(this.category_list)
      .enter().append('g')
      .attr('class', 'legend')
      .attr('transform', (d, i) => 'translate(0,' + i * 20 + ')');

    legend.append('rect')
      .attr('x', width + 10)
      .attr('y', 10)
      .attr('width', 18)
      .attr('height', 18)
      .style('fill', (d: any, i) => this.colors[i]);

    legend.append('text')
      .attr('x', width + 35)
      .attr('y', 19)
      .attr('dy', '.35em')
      .style('text-anchor', 'start')
      .text((d: any) => d);
  
    
}

  private clearSVG() {
  this.renderer.setProperty(
    this.chartContainer.nativeElement, "innerHTML", ""
  )
}
}
