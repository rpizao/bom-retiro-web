import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Indicator } from "src/app/dashboard/models";
import { AlertService } from "src/app/_shared/components/alert/alert.service";
import { LoadingService } from "src/app/_shared/components/loading/loading.service";
import { GenericHttp } from "./generic-http";

@Injectable({
  providedIn: "root"
})
export class IndicatorService extends GenericHttp{

  constructor(client: HttpClient, spinner: LoadingService, alert: AlertService){
    super(client, spinner, alert);
  }

  list(result:(r: Indicator[]) => void): void {
    this.get("/api/indicators", result);
  }

  getIndicador(code: string, result:(r: Indicator) => void): void {
    this.get("/api/indicators/" + code, result);
  }

}
