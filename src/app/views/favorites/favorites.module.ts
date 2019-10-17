import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesComponent } from './favorites.component';
import { SlickCarouselModule} from 'ngx-slick-carousel'
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [FavoritesComponent],
  imports: [
    CommonModule,
    SlickCarouselModule,
    RouterModule.forChild([
      {
        path: '', component: FavoritesComponent
      }
    ])
  ]
})
export class FavoritesModule { }
