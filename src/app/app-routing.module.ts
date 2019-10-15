import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'auth', loadChildren: ()=> import('./views/auth/auth.module').then((m)=>m.AuthModule)
  },
  {
    path: 'home', loadChildren: ()=> import('./views/home/home.module').then((m)=>m.HomeModule)
  },
  {
    path: 'view', loadChildren: ()=> import('./views/view/view.module').then((m)=>m.ViewModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
