import { Component, OnInit } from '@angular/core';
import {faBusinessTime, faLaptopCode, faUniversity,faMugHot} from '@fortawesome/free-solid-svg-icons';
import { ConfigService } from 'src/app/services/configService';


@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {

  faBusinessTime = faBusinessTime;
  faLaptopCode = faLaptopCode;
  faUniversity = faUniversity;
  faMugHot = faMugHot; 
  panelSelector = 'aboutMe';

  // Full-page directive variables
  config: any;
  fullpage_api: any;
  pageIndex : Number;

  ngOnInit(){

  }

  constructor(private configService : ConfigService) {


    configService.setBackgroundColor('rgb(200,250,200)');
    //Full-page configuration
    this.config = {

      // fullpage options
      licenseKey: '',
      anchors: ['aboutMe', 'Career', 'Education'],
      menu: '#menu',

      // fullpage callbacks
      afterResize: () => {
        console.log("After resize");
      },
      onLeave: (origin, destination, direction) => {
        
        this.configService.setPageIndex(destination.index);
          
      }
    };
  }

  getRef(fullPageRef) {
    this.fullpage_api = fullPageRef;
  }

  selectPage(idx : Number){
    this.configService.setPageIndex(idx);
  }

  getPageIdx(){
    this.pageIndex = this.configService.getPageIndex();
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
  }

 
}
