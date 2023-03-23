import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { HomeComponent } from './components/home/home.component';
import { PerfilComponent } from './components/perfil/perfil.component';

import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/compat/auth-guard';
import { PresentationComponent } from './presentation/presentation.component';

const redirectUnauthorizedToHome = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToAccount = () => redirectLoggedInTo(['perfil']);

const routes: Routes = [
  {
    path: '',
    component: PresentationComponent,
    data: { authGuardPipe: redirectLoggedInToAccount },
  },
  { path: 'games', component: HomeComponent },
  { path: 'details/:id', component: DetailsComponent },
  {
    path: 'perfil',
    canActivate: [AngularFireAuthGuard],
    component: PerfilComponent,
    data: { authGuardPipe: redirectUnauthorizedToHome },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
