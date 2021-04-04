import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_auth/services/auth.service';
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

  commentForm: FormGroup;
  private checkField  = CheckRequiredField;
  check = (name: string): boolean => !this.commentForm || this.checkField(this.commentForm.get(name));

  constructor(private router: Router, private projectService: ProjectService, private activatedRoute: ActivatedRoute,
    private fb: FormBuilder, private dialogService: MessageDialogService, private authService: AuthService) {

    this.commentForm = fb.group({
      comment: ["", Validators.required]
    });

    projectService.getProject(this.activatedRoute.snapshot.params["code"], r => this.project = r);
  }

  ngOnInit(): void {
  }

  goBack(){
    this.router.navigate(["projects"]);
  }

  isProgressSelected(pg: Progress){
    return this.progressSelected != null && pg.state == this.progressSelected.state ? "selected" : "";
  }

  isActualProgress(pg: Progress): string{
    if(!this.project) return null;

    if(this.project.progress[this.project.progress.length - 1].state == pg.state) {
      return this.project.status;
    }
    return "old";
  }

  progressIsLock(): boolean {
    if(!this.project) return null;
    return this.project.progress[this.project.progress.length - 1].lock;
  }

  addComment(){
    if(!FormHelper.isValid(this.commentForm)) return;

    this.projectService.addComment(
      this.project.code,
      this.commentForm.get("comment").value,
      ok => {
        this.addCommentShow = false;
        this.projectService.getProject(this.project.code, r => {
          this.progressSelected = null;
          this.project = r;
        });
      });
  }

  get lastProgress(): Progress {
    if(!this.project || !this.project.progress) return null;
    return this.project.progress[this.project.progress.length - 1];
  }

  confirmProgress(){
    this.dialogService.confirm('Prosseguir?',
      'Deseja ir para o próximo estágio e tornar o projeto <strong>' + this.project.nextState + '</strong>?')
    .then((confirmed) => {
      if(confirmed) this.projectService.updateStatus(this.project,
        r => {
          this.project = r;
          this.progressSelected = null;
        });
    })
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  cancelProject(){
    this.dialogService.confirm('Cancelar?',
      'Deseja cancelar o projeto <b>' + this.project.title + '</b>?')
    .then((confirmed) => {
      if(confirmed) this.projectService.cancel(this.project,
        r => {
          this.project = r;
          this.progressSelected = null;
        });
    })
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case "high": return "chevron-double-up";
      case "medium-high": return "chevron-up";
      case "medium": return "dash";
      case "medium-low": return "chevron-down";
      case "low": return "chevron-double-down";
    }
  }

  isAuthStateChange(): boolean {
    const user = this.authService.getUserData();
    return user.department == "GOVERNO";
  }
}
