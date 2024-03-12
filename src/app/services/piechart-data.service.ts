import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { IPiechartData } from '../interfaces/piechart-data.interface';

@Injectable({
  providedIn: 'root'
})
export class PiechartDataService {

  constructor() { }

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

  getData(){
    return this.getData;
  }
}
