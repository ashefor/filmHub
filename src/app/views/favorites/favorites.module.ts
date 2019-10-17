import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesComponent } from './favorites.component';
import { SlickCarouselModule} from 'ngx-slick-carousel'
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [FavoritesComponent],
  imports: [
    CommonModule,
    SlickCarouselModule,
    FontAwesomeModule,
    RouterModule.forChild([
      {
        path: '', component: FavoritesComponent
      }
    ])
  ]
})
export class FavoritesModule { }
