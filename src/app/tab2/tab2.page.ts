import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Contacts,Contact, ContactName, ContactField } from '@ionic-native/contacts/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  createContacts: FormGroup;

  constructor(private fb: FormBuilder, private contacts: Contacts,private route:Router) {
    this.initializeForm();
  }

  initializeForm() {
    this.createContacts = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      contactNumber: ['', [Validators.required]]
    });
  }

  resetForm(){
    this.createContacts.patchValue({
      firstName:'',
      lastName:'',
      contactNumber:''
    })
  }

  add() {
    if(!this.createContacts.valid){
      return;
    }
    let contact:Contact = this.contacts.create();
    contact.name = new ContactName(null, 
                                  this.createContacts.controls.lastName.value, 
                                  this.createContacts.controls.firstName.value);
    contact.phoneNumbers = [new ContactField('mobile', this.createContacts.controls.contactNumber.value)];  
    contact.save().then(
      () =>{ 
        this.resetForm();
        this.route.navigate(['tabs/tab3']) 
      },
      (error: any) => console.error('Error saving contact.', error)
    );  
  }
}
