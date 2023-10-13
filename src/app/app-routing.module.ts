import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MatchFormComponent } from './match-form/match-form.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {path: 'login', component: LoginComponent},
  {path: 'match-form', component: MatchFormComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
