import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { SlickCarouselModule} from 'ngx-slick-carousel'
import { AuthGuard } from 'src/app/guards/auth.guard';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    SlickCarouselModule,
    RouterModule.forChild([
      {
        path: '', component: HomeComponent, canActivate: [AuthGuard]
      }
    ])
  ]
})
export class HomeModule { }
