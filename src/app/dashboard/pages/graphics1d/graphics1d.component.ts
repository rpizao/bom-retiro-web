import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IndicatorService } from 'src/services/indicator.service';
import { Indicator } from '../../models';

@Component({
  selector: 'app-graphics-1d',
  templateUrl: './graphics1d.component.html',
  styleUrls: ['./graphics1d.component.css']
})
export class Graphics1dComponent {

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
  yMaxValue: string;

  colorScheme = {
    domain: ['#0a58ab']
  };

  constructor(private healthService: IndicatorService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.healthService.getIndicador(
      this.activatedRoute.snapshot.params["code"], r => this.indicator = r);
  }

  goBack(){
    this.router.navigate(["dashboard"]);
  }

}
