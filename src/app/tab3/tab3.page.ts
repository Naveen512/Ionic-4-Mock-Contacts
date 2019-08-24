import { Component, OnInit } from '@angular/core';
import { Contacts, ContactFieldType, IContactFindOptions, Contact } from '@ionic-native/contacts/ngx';

import { BehaviorSubject, from } from 'rxjs';
import { switchMap, map } from 'rxjs/operators'


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {


  fields: ContactFieldType[] = ['addresses' , 'birthday' , 'categories' , 'country' , 'department' , 'displayName' , 'emails' , 'name.familyName' , 'name.formatted' , 'name.givenName' , 'name.honorificPrefix' , 'name.honorificSuffix' , 'id' , 'ims' , 'locality' , 'name.middleName' , 'name' , 'nickname' , 'note' , 'organizations' , 'phoneNumbers' , 'photos' , 'postalCode' , 'region' , 'streetAddress' , 'title' , 'urls'];
  options: IContactFindOptions = {
    filter: '',
    multiple: true,
  };
  searchSubscriber: BehaviorSubject<string> = new BehaviorSubject('');
  contactResultSubscriber:BehaviorSubject<Contact[]> = new BehaviorSubject<Contact[]>(null);

  constructor(private contacts: Contacts) { }

  ngOnInit() {
    this.contactsSource();
  }

  contactsSource() {
    this.searchSubscriber.
      pipe(
      switchMap((key) => {
        this.options.filter = key;
        return this.contacts.find(this.fields, this.options);
      }),
      map((value) => value)
      ).subscribe(
      (data) => { this.contactResultSubscriber.next(data); },
      (eror) => { console.log(eror) }
      );
  }

  searchText(e) {
    this.searchSubscriber.next(e.target.value);
  }

}
