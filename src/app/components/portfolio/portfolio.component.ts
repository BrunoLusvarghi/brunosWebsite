import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio/portfolio.service';
import { MatDialog } from '@angular/material/dialog';
import { ProjectDialogComponent } from './project-dialog/project-dialog.component';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  projects = [];

  constructor(public dialog: MatDialog, private portfolioService: PortfolioService) {
    this.projects = portfolioService.getProjects();
  }
  openDialog(project) {
    console.log(project);
    this.dialog.open(ProjectDialogComponent, {
      
      // height: '400px',
      data: 
        project
      
    });
  }

  ngOnInit(): void {
  }

}

