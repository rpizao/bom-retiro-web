import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from 'src/services/project.service';
import { DepartmentHelper } from '../helpers/department-helper';
import { Project } from './models';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  projects: Project[];

  constructor(private projectService: ProjectService, private router: Router) {
    projectService.list(r => this.projects = r);
  }

  ngOnInit(): void {
  }


  getDepartment(classifier: string): string {
    return DepartmentHelper.getClassifierDescription(classifier);
  }

  getDepartmentIcon(classifier: string): string {
    return DepartmentHelper.getClassifierIcon(classifier);
  }

  goDetails(code: string){
    this.router.navigate(["projects/detail/", code]);
  }

  isFinished(p: Project): string {
    return p.finished ? "finished " : '';
  }

}
