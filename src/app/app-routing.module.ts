import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MatchFormComponent } from './match-form/match-form.component';
import { MatchFormExpressComponent } from './match-form-express/match-form-express.component';
import { MatchResultComponent } from './match-result/match-result.component';
import { AppointmentComponent } from './appointment/appointment.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {path: 'login', component: LoginComponent},
  {path: 'match-form', component: MatchFormComponent},
  {path: 'match-form-express', component: MatchFormExpressComponent},
  {path: 'match-result', component: MatchResultComponent},
  {path: 'appointment', component: AppointmentComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
