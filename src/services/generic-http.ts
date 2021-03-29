import { HttpClient } from '@angular/common/http';
import { classToPlain } from 'class-transformer';
import { Observable } from 'rxjs';
import { AlertService } from 'src/app/_shared/components/alert/alert.service';
import { LoadingService } from 'src/app/_shared/components/loading/loading.service';

export abstract class GenericHttp {

  private isLoading: boolean;
  protected useLoading: boolean = false;

  constructor(private client: HttpClient, private spinner: LoadingService, private alert: AlertService){}

  protected static readonly URL: string = "http://localhost:8008";

  protected getUrl():string{
    return GenericHttp.URL;
  }

  protected post<T>(partialUrl: string, body: any, then:(result: T) => void, fail?:(error: any) => void): void {
    this.prepareRequest<T>(this.client.post<T>(this.getUrl() + partialUrl, classToPlain(body)), then, fail);
  }

  protected get<T>(partialUrl: string, then:(result: T) => void, fail?:(error: any) => void): void {
    this.prepareRequest<T>(this.client.get<T>(this.getUrl() + partialUrl), then, fail);
  }

  protected put<T>(partialUrl: string, body: any, then:(result: T) => void, fail?:(error: any) => void): void {
    this.prepareRequest<T>(this.client.put<T>(this.getUrl() + partialUrl, classToPlain(body)), then, fail);
  }

  private prepareRequest<T>(observable: Observable<T>, then:(result: T) => void, fail:(error: any) => void): void{
    if(this.useLoading){
      this.presentLoading(() => {
        this.invokeApi(observable, then, fail);
      });
    }
    else this.invokeApi(observable, then, fail);
  }

  private invokeApi<T>(observable: Observable<T>, then:(result: T) => void, fail:(error: any) => void){
    observable.subscribe(
      (result: T) => {
        this.dismiss();
        then(result);
      },
      error => {
        this.dismiss();
        console.log(error);
        if(!fail) this.alert.warn("Ocorreu um erro!<br>Caso se repita, entre em contato com o administrador.")
        else fail(error);
      }
    );
  }

  private async presentLoading(callAfter:() => void) {
    if(this.isLoading) this.dismiss();

    this.isLoading = true;

    return this.spinner.loading();
  }

  private dismiss() {
    if(!this.useLoading) return;

    this.isLoading = false;
    this.spinner.unloading();
  }

}
