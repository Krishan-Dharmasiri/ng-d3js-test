import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

import * as d3 from "d3";

@Component({
  selector: 'area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.scss']
})
export class AreaChartComponent {
  @ViewChild("areaChart", { static: true }) private chartContainer: ElementRef;

  //Shoould come from the parent component or a service
  chartData = [
    { date: new Date(2020, 1, 1), value: 50 },
    { date: new Date(2021, 1, 1), value: 49 },
    { date: new Date(2022, 1, 1), value: 55 },
    { date: new Date(2023, 1, 1), value: 52 },
    { date: new Date(2024, 1, 1), value: 59 },
  ];

  // chartData = [
  //   {date : 0, value : 50},
  //   {date : 1, value : 49},
  //   {date : 2, value : 55},
  //   {date : 3, value : 52},
  //   {date : 4, value : 59},
  // ]; 

  constructor(private renderer: Renderer2) { }

  ngOnInit(){
    this.createAreaChart();
  }

  private createAreaChart() {
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

    const x = d3.scaleTime()
      .domain([d3.min(this.chartData, d => d.date) as Date, d3.max(this.chartData, d => d.date) as Date])
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(this.chartData, d => d.value) as number])
      .range([height, 0]);

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    svg.append("g")
      .attr("transform", "translate(0," + width + ")")
      .call(d3.axisLeft(y));

    const area = d3.area<any>()
      .x((d: any) => x(d.date))
      .y0(y(0))
      .y1((d: any) => y(d.value));

    svg.append("path")
      .datum(this.chartData)
      .style('fill', 'steelblue')
      .attr("d", area);

  }

  private clearSVG() {
    this.renderer.setProperty(
      this.chartContainer.nativeElement, "innerHTML", ""
    )
  }
}
