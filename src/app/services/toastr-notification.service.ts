import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastrNotificationService {

  constructor(public toastr: ToastrService) { }

  successToaster(message: string, title?: string){
    this.toastr.success(message, title, {enableHtml: true, closeButton: true})
  }
  warningToaster(message: string, title?: string){
    this.toastr.warning(message, title)
  }
  errorToaster(message: string, title?: string){
    this.toastr.error(message, title, {enableHtml: true, closeButton: true})
  }
}
