import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ContactComponent } from '../contact/contact.component';
import { ContactService } from '../contact/contact.service';
import { StatusCode, Contact } from '../contact/contact';
import { from } from 'rxjs';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.scss']
})
export class ViewContactComponent implements OnInit {

  statusCode: any;
  contactName: string;
  contactNumber: number;
  contactId = this.route.snapshot.paramMap.get('contactId');
  id: any;
  contact: Contact;
  allContacts: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contactService: ContactService,
  ) { }

  ngOnInit() {
    this.getAllContacts();
  }

  getAllContacts() {
    this.contactService.getAllContacts()
    .subscribe(
      data => this.allContacts = data,
      errorCode =>  this.statusCode = errorCode);
    console.log("Got all contacts");
  }

}
