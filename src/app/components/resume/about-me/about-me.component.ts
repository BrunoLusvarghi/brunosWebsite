import { Component, OnInit } from '@angular/core';
import {faLaptop, faEnvelope} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit {
  faLaptop = faLaptop;
  faEnvelope = faEnvelope;
  constructor() { }

  ngOnInit(): void {
  }

}
