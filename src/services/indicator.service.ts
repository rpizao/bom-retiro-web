import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HealthIndicator } from "src/app/dashboard/models";

@Injectable()
export class IndicatorService {

  get(): Observable<HealthIndicator[]> {
    return of([
      {
        code: "1",
        title: "Ritmo de Ocupação",
        classifier: "health",
        description: "Comparativo entre a infra disponível e a ocupação média, identificando os picos ou ociosidades."
      }
    ]);
  }

  getSource(code: string): Observable<HealthIndicator> {
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
