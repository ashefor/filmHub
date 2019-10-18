import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesComponent } from './favorites.component';
import { SlickCarouselModule} from 'ngx-slick-carousel'
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthGuard } from 'src/app/guards/auth.guard';


@NgModule({
  declarations: [FavoritesComponent],
  imports: [
    CommonModule,
    SlickCarouselModule,
    FontAwesomeModule,
    RouterModule.forChild([
      {
        path: '', component: FavoritesComponent, canActivate: [AuthGuard]
      }
    ])
  ]
})
export class FavoritesModule { }
