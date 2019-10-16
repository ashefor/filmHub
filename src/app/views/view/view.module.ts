import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './view.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';



@NgModule({
  declarations: [ViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: ':id', component: ViewComponent, canActivate: [AuthGuard]
      }
    ])
  ]
})
export class ViewModule { }
