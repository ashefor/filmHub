import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedinGuard } from './guards/loggedin.guard';


const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'auth', loadChildren: ()=> import('./views/auth/auth.module').then((m)=>m.AuthModule), canActivate: [LoggedinGuard]
  },
  {
    path: 'home', loadChildren: ()=> import('./views/home/home.module').then((m)=>m.HomeModule)
  },
  {
    path: 'view', loadChildren: ()=> import('./views/view/view.module').then((m)=>m.ViewModule)
  },
  {
    path: 'favorites', loadChildren: ()=> import('./views/favorites/favorites.module').then((m)=>m.FavoritesModule)
  },
  {
    path: 'search', loadChildren: ()=> import('./views/search/search.module').then((m)=>m.SearchModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
