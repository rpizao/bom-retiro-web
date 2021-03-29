import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Indicator } from "src/app/dashboard/models";
import { Project } from "src/app/project/models";

@Injectable()
export class ProjectService {

  get(): Observable<Project[]> {
    return of([
      {
        code: "1",
        title: "Construção de nova UPA no bairro Canoas",
        department: "health",
        description: "Construção de nova unidade de pronto atendimento no bairro Canoas. A sugestão veio a partir da sugestão de morador local, através do portal da prefeitura.",
        status: "in-progress",
        created: "2020-11-10",
        expiresIn: "2023-01-01"
      }
    ]);
  }

  getSource(code: string): Observable<Project> {
    return of({
      code: "1",
      title: "Construção de nova UPA no bairro Canoas",
      department: "health",
      description: "Construção de nova unidade de pronto atendimento no bairro Canoas. A sugestão veio a partir da sugestão de morador local, através do portal da prefeitura.",
      status: "in-progress",
      created: "2020-11-10",
      expiresIn: "2023-01-01",
      progress: [
        {
          state: "analyze",
          percentual: 10,
          lock: true,
          nextStates: ["in-progress"],
          comments: [
            {date: "2020-12-15", text: "Uma comissão irá tratar o assunto.", author: "Ronaldo"},
            {date: "2020-12-05", text: "Projeto entrou em discussão na câmara para debater os detalhes e aprová-lo ou não.", author: "Pedro"}
          ]
        },
        {
          state: "in-progress",
          percentual: 25,
          lock: false,
          nextStates: ["finish", "cancel"],
          /* comments: [
            {date: "2020-12-30", text: "Projeto aprovado.", author: "João"},
          ] */
        }
      ]
    });
  }

  addComment(projectCode: string, comment: string): Observable<boolean>{
    return of(true);
  }

}
