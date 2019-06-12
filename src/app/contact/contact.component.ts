import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from './contact.service';
import { StatusCode, Contact } from './contact';
declare var $: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contact: Contact;
  allContacts: any;
  statusCode: any;
  requestProcessing = false;
  contactIdToUpdate = null;
  processValidation = false;

  constructor(
    private contactService: ContactService, // object of service
    private router: Router
  ) {  }

  ngOnInit() {
    this.getAllContacts();
    // this.contactService.contactList().subscribe( r => {
    //   this.contacts = r;
    // });
  }

  //Create form
  contactForm = new FormGroup({
    firstname: new FormControl('', Validators.required),
    mobile: new FormControl('', Validators.required)	   
  });

  //Fetch all contacts
  getAllContacts() {
    this.contactService.getAllContacts()
    .subscribe(
      data => this.allContacts = data,
      errorCode =>  this.statusCode = errorCode);
  }

  //Load contact by id to edit
  loadContactToEdit(contactId: string) {
    // this.preProcessConfigurations();
    this.contactService.getContactById(contactId)
    .subscribe(contact => {
      // console.log(contact);
      this.contactIdToUpdate = contact["id"];
      console.log("Contact " + contact["id"] + " Loaded");
      this.contactForm.setValue({ firstname: contact["firstname"], mobile: contact["mobile"] });
      // this.processValidation = true;
      // this.requestProcessing = false;   
    },
    errorCode =>  this.statusCode = errorCode);   
  }


  //Handle create and update contact
  onContactFormSubmit() {
	  this.processValidation = true;   
	  if (this.contactForm.invalid) {
	       return; //Validation failed, exit from method.
    }
    console.log("onContactFormSubmit");
	  //Form is valid, now perform create or update
    // this.preProcessConfigurations();
	  let contact = this.contactForm.value;
	  if (this.contactIdToUpdate === null) {  
	    //Generate contact id then create contact
      this.contactService.getAllContacts()
      .subscribe(contacts => {
			 
      //Generate contact id	 
      let maxIndex = contacts["length"] - 1;
      let contactWithMaxIndex = contacts[maxIndex];
      let contactId = contactWithMaxIndex.id + 1;
      contact.id = contactId;
		   
      //Create contact
      this.contactService.createContact(contact)
      .subscribe(successCode => {
          // this.statusCode = successCode;
          this.statusCode = 201;
          this.getAllContacts();	
          this.backToCreateContact();
        },
        errorCode => this.statusCode = errorCode
      );
		 });		
	   } else {  
        //Handle update contact
        contact.id = this.contactIdToUpdate; 		
	      this.contactService.updateContact(contact)
        .subscribe(successCode => {
        // this.statusCode = successCode;
        this.statusCode = 200;
        this.getAllContacts();	
        this.backToCreateContact();
		},
		  errorCode => this.statusCode = errorCode);	  
    }
    $('#CreateUpdateModal').modal('hide');
  }


  //Delete contact
  deleteContact(contactId: string) {
    // this.preProcessConfigurations();
    this.contactService.deleteContactById(contactId)
      .subscribe(successCode => {
      // this.statusCode = successCode;
      //Expecting success code 204 from server
      this.statusCode = 204;
      this.getAllContacts();	
      this.backToCreateContact();
      console.log("Contact " + contactId + " Deleted");
    },
    errorCode => this.statusCode = errorCode);    
  }

  //Perform preliminary processing configurations
  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;   
  }

  //Go back from update to create
  backToCreateContact() {
    this.contactIdToUpdate = null;
    this.contactForm.reset();	  
    this.processValidation = false;
  }

}
