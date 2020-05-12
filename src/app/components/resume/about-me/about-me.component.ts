import { Component, OnInit } from '@angular/core';
import { faLaptop, faEnvelope, faMapMarkerAlt, faBirthdayCake, faFileCode } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit {
  faLaptop = faLaptop;
  faEnvelope = faEnvelope;
  faMapMarkerAlt = faMapMarkerAlt ;
  faBirthdayCake = faBirthdayCake;
  faCode = faFileCode;

  constructor() { }

  ngOnInit(): void {
  }

}
