import { Component } from '@angular/core';
import {Router, NavigationEnd} from '@angular/router'; // import Router and NavigationEnd
import { ConfigService } from './services/configService';

  // declare ga as a function to set and sent the events
 declare let ga: Function;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  backgroundColor = '';

  constructor(public router: Router, private configService : ConfigService) {


    // subscribe to router events and send page views to Google Analytics
    this.router.events.subscribe(event => {

      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');

      }
      this.getBackgroundColor();

    });
  }

  getBackgroundColor(){
    console.log(this.configService.backgroundColor);
    this.backgroundColor = this.configService.backgroundColor;
  }
 
}




