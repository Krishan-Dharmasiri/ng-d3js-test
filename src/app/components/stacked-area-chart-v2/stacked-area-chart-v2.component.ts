import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import * as d3 from "d3";

@Component({
  selector: 'stacked-area-chart',
  templateUrl: './stacked-area-chart-v2.component.html',
  styleUrls: ['./stacked-area-chart-v2.component.scss']
})
export class StackedAreaChartComponent {

  @ViewChild("stackedAreaChart", { static: true }) private chartContainer: ElementRef;

  chartOptions = {
    background_color: 'pink',
    x_axis_unit: 'TIME',
    x_axis_title: 'Period',
    y_axis_title: '% Cars',
    svg_width: 1000,
    svg_height: 600,
    margin: { top: 50, right: 100, bottom: 50, left: 50 }
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
    this.createStackedAreaChart();
  }

  private createStackedAreaChart() {
    // set the dimensions and margins of the graph
    const width = this.chartOptions.svg_width - this.chartOptions.margin.left - this.chartOptions.margin.right;
    const height = this.chartOptions.svg_height - this.chartOptions.margin.top - this.chartOptions.margin.bottom;

    this.clearSVG();

    const svg = d3.select(this.chartContainer.nativeElement)
      .append("svg")
      .attr("width", this.chartOptions.svg_width)
      .attr("height", this.chartOptions.svg_height)
      .style('background', this.chartOptions.background_color)
      .append("g")
      .attr("transform", "translate(" + this.chartOptions.margin.left + "," + this.chartOptions.margin.top + ")");

    // Add X axis  dimensions
    const xScale = d3.scaleTime()
      .domain([d3.min(this.chartData, d => d.date) as Date, d3.max(this.chartData, d => d.date) as Date])
      .range([0, width]);

    // Add X axis to the chart
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale).ticks(10))

    // Add X axis label
    svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height + 40)
      .text(this.chartOptions.x_axis_title);

    const stackedData = d3.stack<any>()
      .keys(this.category_list)(this.chartData);

    // Calculate the max value for the Y axis  
    const yScale_Max: any = d3.max(stackedData[stackedData.length - 1], (d) => d[1]);

    // Add Y axis
    const yScale = d3.scaleLinear()
      .domain([0, yScale_Max])
      .range([height, 0]);

    // Add Y axis to the chart
    svg.append("g")
      .call(d3.axisLeft(yScale).ticks(5))

    // Add Y axis label:
    svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", 0)
      .attr("y", -5)
      .text(this.chartOptions.y_axis_title)
      .attr("text-anchor", "start")

    // Area generator
    const area = d3.area<any>()
      .x((d) => xScale(d.data.date))
      .y0((d) => yScale(d[0]))
      .y1((d) => yScale(d[1]));

    // Creating "g" tag for each data series     
    const series = svg.selectAll("g.series")
      .data(stackedData)
      .enter()
      .append("g")
      .attr("class", "series")
      .on('mouseover', (event, d) => {
        tooltip.transition().duration(200).style('opacity', 0.9);
        tooltip
          .html(`Period: <br/>`)
          .style('left', `${event.pageX + 5}px`)
          .style('top', `${event.pageY - 28 }px`)
          .style('position', 'absolute');
        console.log('event', event);
        console.log('d', d);
      })
      .on('mouseout', () => {
        tooltip.transition().duration(500).style('opacity', 0);
      });

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

    // Create Tooltip
    const tooltip = d3.select(this.chartContainer.nativeElement)
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)
      .style('text-align', 'center')
      .style('width', '120px')
      .style('padding', '8px')
      .style('font', '12px sans-serif')
      .style('background', 'lightsteelblue')
      .style('border', '0px')
      .style('border-radius', '8px')
      .style('pointer-events', 'none')  

  }

  private clearSVG() {
    this.renderer.setProperty(
      this.chartContainer.nativeElement, "innerHTML", ""
    )

  }

}
