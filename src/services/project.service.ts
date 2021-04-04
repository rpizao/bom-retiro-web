import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Project } from "src/app/project/models";
import { AuthService } from "src/app/_auth/services/auth.service";
import { AlertService } from "src/app/_shared/components/alert/alert.service";
import { LoadingService } from "src/app/_shared/components/loading/loading.service";
import { GenericHttp } from "./generic-http";

@Injectable({
  providedIn: "root"
})
export class ProjectService extends GenericHttp {

  constructor(client: HttpClient, spinner: LoadingService, alert: AlertService, private authService: AuthService){
    super(client, spinner, alert);
  }

  list(result: (r: Project[]) => void): void {
    this.get<Project[]>("/api/projects", result);
  }

  getProject(code: string, result: (r: Project) => void): void {
    this.get<Project>("/api/projects/" + code, result);
  }

  addComment(code: string, comment: string, result: (r: Project) => void): void {
    const user = this.authService.getUserData();
    this.put<Project>("/api/projects/" + code + "/comment", {author: user.fullname, text: comment}, result);
  }

  save(project: Project, result: (r: Project) => void): void {
    const user = this.authService.getUserData();
    project.author = user.fullname;
    this.post<Project>("/api/projects", project, result);
  }

  updateStatus(project: Project, result: (r: Project) => void): void {
    const user = this.authService.getUserData();
    project.author = user.fullname;
    this.put<Project>("/api/projects/" + project.code + "/state", {}, result);
  }

  cancel(project: Project, result: (r: Project) => void): void {
    const user = this.authService.getUserData();
    project.author = user.fullname;
    this.put<Project>("/api/projects/" + project.code + "/cancel", {}, result);
  }

}
