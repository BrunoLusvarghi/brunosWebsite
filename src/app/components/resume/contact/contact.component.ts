import { Component, OnInit } from '@angular/core';
import  { FormBuilder, Validators} from '@angular/forms';
import {faFacebook, faLinkedin} from '@fortawesome/free-brands-svg-icons';
import { ContactService } from 'src/app/services/resume/contact.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  
  formContact;
  faFacebook = faFacebook;
  faLinkedin = faLinkedin;
  messageSent = false;
  
  constructor(private fb: FormBuilder,private contactService : ContactService) {
    this.formContact = fb.group({
      name: ['',Validators.required],
      emailAddress: ['',[Validators.required,Validators.email]],
      subject: ['',Validators.maxLength(25)],
      body: ['',[Validators.maxLength(2000),Validators.required]],
      phone: ['',[Validators.required]]
    })
   }

  ngOnInit(): void {
  }

  onSubmit(){
    
    this.contactService.sendEmail(this.formContact.value).subscribe({
      next: data => {
        this.messageSent = true;
      },
      error: error => console.error('There was an error!', error)
    });
  }

}
