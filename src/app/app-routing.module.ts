import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { HomeComponent } from './components/home/home.component'
import { PerfilComponent } from './components/perfil/perfil.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

import  { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/compat/auth-guard';

const redirectUnauthorizedToHome = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToAccount = () => redirectLoggedInTo(['perfil']);

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'games', component: HomeComponent },
  { path: 'details/:id', component: DetailsComponent},
  { path: 'perfil', canActivate: [AngularFireAuthGuard], component: PerfilComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
