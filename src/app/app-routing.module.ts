import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {ResumeComponent} from './components/resume/resume/resume.component';
import {ContactComponent} from './components/resume/contact/contact.component';
import {ChartsComponent} from  './components/charts/charts.component';
import { CovidComponent } from './components/covid/covid.component';
import { JwtComponent } from './components/portfolio/jwt/jwt.component';

const routes: Routes = [
  {
    component: HomeComponent,
    path : 'home'
  },
  {
  component : CovidComponent,
  path : ''
},
{
  component : ResumeComponent,
  path : 'resume'
},
{
  component : ContactComponent,
  path : 'contact'
},
{
  component : JwtComponent,
  path : 'portfolio/jwt'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
