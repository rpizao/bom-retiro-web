import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentHelper } from 'src/app/helpers/department-helper';
import { ProjectProgressHelper } from 'src/app/helpers/progress-project-helper';
import { MessageDialogService } from 'src/app/_shared/components/message-dialog/confirm-dialog.service';
import { CheckRequiredField, FormHelper } from 'src/app/_shared/helpers/form.helper';
import { ProjectService } from 'src/services/project.service';
import { Progress, Project } from '../../models';

@Component({
  selector: 'app-details-project',
  templateUrl: './details-project.component.html',
  styleUrls: ['./details-project.component.scss']
})
export class DetailsProjectComponent implements OnInit {

  project: Project;
  progressSelected: Progress;
  addCommentShow: boolean = false;
  loading: boolean = false;

  commentForm: FormGroup;
  private checkField  = CheckRequiredField;

  constructor(private router: Router, private projectService: ProjectService, private activatedRoute: ActivatedRoute,
    private fb: FormBuilder, private dialogService: MessageDialogService) {

    this.commentForm = fb.group({
      comment: ["", Validators.required]
    });

    projectService.getSource(this.activatedRoute.snapshot.params["code"])
                  .subscribe(r => this.project = r);
  }

  ngOnInit(): void {
  }

  goBack(){
    this.router.navigate(["projects"]);
  }

  getDepartment(classifier: string): string {
    return DepartmentHelper.getClassifierDescription(classifier);
  }

  getDepartmentIcon(classifier: string): string {
    return DepartmentHelper.getClassifierIcon(classifier);
  }

  getProgress(progress: string): string {
    return ProjectProgressHelper.getProgressDescription(progress);
  }

  isProgressSelected(pg: Progress){
    return this.progressSelected != null && pg.state == this.progressSelected.state ? "selected" : "";
  }

  check(name: string): boolean{
    return !this.commentForm || this.checkField(this.commentForm.get(name));
  }

  addComment(){
    if(!FormHelper.isValid(this.commentForm)) return;

    this.loading = true;
    this.projectService.addComment(this.project.code, this.commentForm.get("comment").value)
        .subscribe(ok => {
          this.loading = false;
          this.addCommentShow = false;
        });
  }

  get lastProgress(): Progress {
    if(!this.project.progress) return null;
    return this.project.progress[this.project.progress.length - 1];
  }

  confirmProgress(){
    this.dialogService.confirm('Prosseguir?',
      'Deseja ir para o próximo estágio e tornar o projeto <b>' + this.getProgress(this.lastProgress.nextStates[0]) + '</b>?')
    .then((confirmed) => console.log('User confirmed:', confirmed))
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  cancelProject(){
    this.dialogService.confirm('Cancelar?',
      'Deseja cancelar o projeto <b>' + this.project.title + '</b>?')
    .then((confirmed) => console.log('User confirmed:', confirmed))
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

}
