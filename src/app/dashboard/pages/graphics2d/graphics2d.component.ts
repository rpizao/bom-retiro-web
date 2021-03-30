import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IndicatorService } from 'src/services/indicator.service';
import { Indicator } from '../../models';

@Component({
  selector: 'app-graphics-2d',
  templateUrl: './graphics2d.component.html',
  styleUrls: ['./graphics2d.component.css']
})
export class Graphics2dComponent implements OnInit {

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
    domain: ['#b8cee4', '#0a58ab']
  };

  constructor(private healthService: IndicatorService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.healthService.getIndicador(this.activatedRoute.snapshot.params["code"], r => this.indicator = r);
  }

  goBack(){
    this.router.navigate(["dashboard"]);
  }

}
