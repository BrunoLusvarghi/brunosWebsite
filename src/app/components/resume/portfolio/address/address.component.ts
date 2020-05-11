import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  formArray = [];
  constructor(private fmBuilder : FormBuilder) {
    this.formArray.push(this.getAddressFormGRoup());
   }

  ngOnInit(): void {
  }


  addNewForm(){
    this.formArray.push(this.getAddressFormGRoup());
  }

  getAddressFormGRoup(){
    return this.fmBuilder.group({
      street : ['',Validators.required],
      aptUnit : ['',Validators.required],
      city : ['',Validators.required],
      provinceState :['',Validators.required],
      postalCode :['',Validators.required],
    })
  }


}
