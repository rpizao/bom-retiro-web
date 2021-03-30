import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IndicatorService } from 'src/services/indicator.service';
import { DepartmentHelper } from '../helpers/department-helper';
import { AlertService } from '../_shared/components/alert/alert.service';
import { Indicator } from './models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isLoading: boolean = true;

  indicators: Indicator[] = [];
  options = {
    autoClose: false,
    keepAfterRouteChange: false
  };

  constructor(private healthService: IndicatorService, private router: Router, public alert: AlertService) {
    this.healthService.list(r => this.indicators = r);
  }

  ngOnInit() {}

  goGraphics(indicator: Indicator){
    if(indicator.configuration.dimension == "1d") this.router.navigate(['dashboard/graphics1d', indicator.code]);
    else this.router.navigate(['dashboard/graphics2d', indicator.code]);
  }

  getClassifierIcon(classifier: string): string {
    return DepartmentHelper.getClassifierIcon(classifier);
  }

  getClassifierDescription(classifier: string): string {
    return DepartmentHelper.getClassifierDescription(classifier);
  }

}
