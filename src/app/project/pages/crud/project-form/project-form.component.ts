import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Project } from 'src/app/project/models';
import { AuthService } from 'src/app/_auth/services/auth.service';
import { AlertService } from 'src/app/_shared/components/alert/alert.service';
import { DateHelper } from 'src/app/_shared/helpers/date-helper';
import { CheckRequiredField, FormHelper } from 'src/app/_shared/helpers/form.helper';
import { ProjectService } from 'src/services/project.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {

  projectForm: FormGroup;

  private checkField  = CheckRequiredField;
  check = (name: string): boolean => !this.projectForm || this.checkField(this.projectForm.get(name));
  today = DateHelper.nowString();

  constructor(private fb: FormBuilder, private projectService: ProjectService,
    private alert: AlertService, private route: Router, private authService: AuthService) {
    this.projectForm = this.fb.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      department: ["", Validators.required],
      expiresIn: ["", Validators.required],
      priority: ["", Validators.required]
    });

    this.forceDepartmentSelect();
  }

  ngOnInit(): void {
  }

  private forceDepartmentSelect(){
    const departFC = this.projectForm.get("department");
    const department = this.getDepartmentRequired();
    if(department) {
      departFC.setValue(department);
      departFC.disable({ onlySelf: true });
    }
    else {
      departFC.reset();
    }
  }

  private getDepartmentRequired(): string {
    const userLogged = this.authService.getUserData();
    return userLogged.department == "GOVERNO" ? null : userLogged.department;
  }

  saveProject(){
    if(!FormHelper.isValid(this.projectForm)) return;

    const project = this.projectForm.value as Project;
    this.projectService.save(project, r => {
      this.alert.success("Projeto salvo");
      this.route.navigate(['projects']);
    });
  }

  isAfterToday(): boolean {
    if(!this.projectForm) return true;

    const expires = DateHelper.parse(this.projectForm.get("expiresIn").value);

    if(isNaN(expires.getTime())) return true;
    return expires > DateHelper.now();
  }

}
