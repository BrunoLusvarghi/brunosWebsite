import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css']
})
export class ApplicationFormComponent implements OnInit {

  appForm;

  constructor(private formBuilder : FormBuilder) {
    this.appForm = formBuilder.group({
      lastName : ['',Validators.required],
      firstName : ['',Validators.required],
      email : ['',Validators.required, Validators.email],
      dateOfBirth : [''],
      gender : ['', Validators.required],
      optInCB : ['']
    })
   }

  ngOnInit(): void {
  }

}
