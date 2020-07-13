import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {ResumeComponent} from './components/resume/resume/resume.component';
import {ContactComponent} from './components/contact/contact.component';
import { CovidComponent } from './components/covid/covid.component';
import { JwtComponent } from './components/portfolio/jwt/jwt.component';
import { ApplicationFormComponent } from './components/portfolio/application-form/application-form.component';

const routes: Routes = [
  {
    component: HomeComponent,
    path : '',
  },
  {
  component : CovidComponent,
  path : 'covid19Info'
},
{
  component : ResumeComponent,
  path : 'resume'
},
{
  component : ContactComponent,
  path : 'contact'
},{
  component: ApplicationFormComponent,
  path : 'portfolio/form'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
