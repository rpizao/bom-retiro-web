import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IndicatorService } from 'src/services/indicator.service';
import { HealthIndicator } from '../../models';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.css']
})
export class GraphicsComponent {

  indicator: HealthIndicator;

  view: any[] = [];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = false;
  xAxisLabel = 'Por dia';
  showYAxisLabel = false;
  yAxisLabel = 'Qtd. Leitos (Centenas)';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private healthService: IndicatorService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.healthService.getSource(this.activatedRoute.snapshot.params["code"])
                      .subscribe(r => this.indicator = r);
  }

  goBack(){
    this.router.navigate(["dashboard"]);
  }

}
