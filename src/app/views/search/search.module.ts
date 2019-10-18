import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';



@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: SearchComponent, canActivate: [AuthGuard]
      }
    ])
  ]
})
export class SearchModule { }
