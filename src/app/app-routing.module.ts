import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { HomeComponent } from './components/home/home.component'
import { PerfilComponent } from './components/perfil/perfil.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'games', component: HomeComponent },
  { path: 'details/:id', component: DetailsComponent},
  { path: 'perfil', component: PerfilComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
