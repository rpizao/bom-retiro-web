import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Indicator } from "src/app/dashboard/models";
import { AlertService } from "src/app/_shared/components/alert/alert.service";
import { LoadingService } from "src/app/_shared/components/loading/loading.service";
import { MessageDialogService } from "src/app/_shared/components/message-dialog/confirm-dialog.service";
import { GenericHttp } from "./generic-http";

@Injectable()
export class IndicatorService extends GenericHttp{

  constructor(client: HttpClient, spinner: LoadingService, alert: AlertService){
    super(client, spinner, alert);
  }

  list(result:(r: Indicator[]) => void): void {
    this.get("/api/indicators", result);
  }

  getSource(code: string): Observable<Indicator> {
    return of({
      code: "1",
      title: "Ritmo de Ocupação",
      classifier: "health",
      description: "Comparativo entre a infra disponível e a ocupação média, identificando os picos ou ociosidades.",
      source: [
      {
        name: "2021-01-01",
        series: [
          { name: "Total", value: 300 },
          { name: "Ocupados", value: 290 }
        ]
      },
      {
        name: "2021-01-02",
        series: [
          { name: "Total", value: 300 },
          { name: "Ocupados", value: 282 }
        ]
      },
      {
        name: "2021-01-03",
        series: [
          { name: "Total", value: 300 },
          { name: "Ocupados", value: 295 }
        ]
      }]
    });
  }

}
