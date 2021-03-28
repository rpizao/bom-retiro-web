import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IndicatorService } from 'src/services/indicator.service';
import { DepartmentHelper } from '../helpers/department-helper';
import { HealthIndicator } from './models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  indicators: HealthIndicator[] = [];

  constructor(private healthService: IndicatorService, private router: Router) {
    healthService.get().subscribe(r => this.indicators = r);
  }

  ngOnInit() {}

  goGraphics(code: string){
    this.router.navigate(['dashboard/graphics', code]);
  }

  getClassifierIcon(classifier: string): string {
    return DepartmentHelper.getClassifierIcon(classifier);
  }

  getClassifierDescription(classifier: string): string {
    return DepartmentHelper.getClassifierDescription(classifier);
  }

}
