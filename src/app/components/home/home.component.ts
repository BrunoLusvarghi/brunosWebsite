import { Component, OnInit, NgModule } from '@angular/core';
import {faLaptop, faEnvelope} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']})

export class HomeComponent implements OnInit {
  faLaptop = faLaptop;
  faEnvelope = faEnvelope;
  constructor() { }

  ngOnInit(): void {
  }

}
