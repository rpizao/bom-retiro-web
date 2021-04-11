import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IndicatorService } from 'src/services/indicator.service';
import { Indicator } from '../../models';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.css']
})
export class GraphicsComponent implements OnInit {

  indicator: Indicator;

  view: any[] = [];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  xAxisLabel: string;
  showYAxisLabel = false;
  yAxisLabel: string;

  colorScheme = {
    domain: ['#085f08', '#13e413', '#2812d0', 'grey', 'red', 'gold', 'brown']
  };

  constructor(private healthService: IndicatorService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.healthService.getIndicador(this.activatedRoute.snapshot.params["code"], r => this.indicator = r);
  }

}
