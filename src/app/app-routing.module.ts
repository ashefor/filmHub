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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
