import { Component, ElementRef, Input, ViewChild } from '@angular/core';

import * as D3 from 'd3';
import { IPiechartData } from 'src/app/interfaces/piechart-data.interface';
import { PiechartDataService } from 'src/app/services/piechart-data.service';

@Component({
  selector: 'pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent {

  @ViewChild('pieChartContainer') private element: ElementRef;
  @Input() private data: any[];

  private host : D3.Selection<d3.BaseType, {}, d3.BaseType, any>;
  private svg : any;
  private width: number;
  private height: number;
  private radius : number;
  private htmlElement : HTMLElement;

  constructor(private dataService : PiechartDataService){}

  private mockData : any[] = [
    {
      label : 'Stocks',
      value : 5
    },
    {
      label : 'Bonds',
      value : 12
    },
    {
      label : 'Derivatives',
      value : 8
    }
  ]
 
  ngAfterViewInit(){

  }

  ngOnInit(){
    this.data = this.mockData;
    this.setup();
    this.buildSVG();
    this.buildPieChart();
  }

  private setup(){
    this.width = 250;
    this.height = 250;
    this.radius = Math.min(this.width, this.height)/2;
  }

  private buildSVG(){
    this.host.html("");
    this.svg = this.host.append("svg")
        .attr("viewbox", `0 0 ${this.width} ${this.height}`)
        .append("g")
        .attr("transform", `translate(${this.width / 2},${this.height / 2})`);
  }
  
  private buildPieChart(){
    let pie_chart = D3.pie();
    let values = this.data.map(data => data.value);

    let arcSelection = this.svg.selectAll(".arc")
        .data(pie_chart(values))
        .enter()
        .append("g")
        .attr("class", "arc");
    
    this.populatePieChart(arcSelection);    
  }

  private populatePieChart(arcSelection : any){
    let innerRadius = this.radius - 50;
    let outerRadius = this.radius - 10;
    let pieColor = D3.scaleOrdinal(D3.schemeCategory10);
    // Generate the arcs
    let arc = D3.arc().innerRadius(0).outerRadius(outerRadius);
    // Draw arc paths
    arcSelection.append("path")
        .attr("d", arc)
        .attr("fill", (datum : any, index : any) => {
          return pieColor(this.data[index].label);
        });


    arcSelection.append("text")
        .attr("transform", (datum : any) => {
          datum.innerRadius = 0;
          datum.outerRadius = outerRadius;
          return "translate(" + arc.centroid(datum) + ")";
        })
        .attr((datum : any, index : any) => this.data[index].label)
        .style("text-anchor", "middle");    
  }

}
