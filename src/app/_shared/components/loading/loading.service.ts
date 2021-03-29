import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingComponent } from '../loading/loading.components';

@Injectable()
export class LoadingService {

  constructor(private modalService: NgbModal) { }

  public loading(){
    const modalRef = this.modalService.open(LoadingComponent, { size: 'lg' });
    return modalRef.result;
  }

  public unloading(){
    const modalRef = this.modalService.open(LoadingComponent, { size: 'lg' });
    return modalRef.dismiss();
  }

}
