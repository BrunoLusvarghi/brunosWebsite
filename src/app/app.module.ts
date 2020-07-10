import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MDBBootstrapModule,ChartsModule, WavesModule, InputsModule, ButtonsModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';
import { ChartsComponent } from 'src/app/components/charts/charts.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MultiselectAutocompleteComponent } from './components/multiselect-autocomplete/multiselect-autocomplete.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import { HorizontalBarChartComponent } from './components/charts/horizontal-bar-chart/horizontal-bar-chart.component';
import { LineChartComponent } from './components/charts/line-chart/line-chart.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ValidInputDirective } from './directives/valid-input.directive';
import {CareerHistoryService} from './services/resume/career-history.service';
import {EducationHistoryService} from './services/resume/education-history.service';
import { EducationHistoryComponent } from './components/resume/education-history/education-history.component';
import { CareerHistoryComponent } from './components/resume/career-history/career-history.component';
import { SkillsComponent } from './components/resume/skills/skills.component';
import { ChartService } from './services/chart.service';
import { SkillsService } from './services/resume/skills.service';
import { ContactComponent } from './components/resume/contact/contact.component';
import {AboutMeComponent}  from './components/resume/about-me/about-me.component';
import {NgbModule, NgbAccordionModule} from '@ng-bootstrap/ng-bootstrap';
import {HomeComponent} from './components/home/home.component';
import {ResumeComponent} from './components/resume/resume/resume.component';
import { CovidComponent } from './components/covid/covid.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { JwtComponent } from './components/portfolio/jwt/jwt.component';
import { ApplicationFormComponent } from './components/portfolio/application-form/application-form.component';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import {MatCardModule} from '@angular/material/card';
import { ProjectDialogComponent } from './components/portfolio/project-dialog/project-dialog.component';




@NgModule({
  declarations: [
    AppComponent,
    ChartsComponent,
    MultiselectAutocompleteComponent,
    HorizontalBarChartComponent,
    LineChartComponent,
    ValidInputDirective,
    EducationHistoryComponent,
    CareerHistoryComponent,
    SkillsComponent,
    ContactComponent,
    AboutMeComponent,
    HomeComponent,
    ResumeComponent,
    CovidComponent,
    JwtComponent,
    ApplicationFormComponent,
    PortfolioComponent,
    ProjectDialogComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    ChartsModule,
    WavesModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
    InputsModule, 
    ButtonsModule,
    MatExpansionModule,
    MatDialogModule,
    FontAwesomeModule,
    NgbModule,
    NgbAccordionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxPageScrollModule,
    MatCardModule 
  ],
  exports: [ChartsComponent],
  providers: [EducationHistoryService,CareerHistoryService,ChartService,SkillsService],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
