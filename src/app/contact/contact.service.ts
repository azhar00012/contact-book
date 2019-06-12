import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, from } from 'rxjs';
import { Contact } from './contact';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class ContactService {
    //URL for CRUD operations
    contactUrl = "http://localhost:3000/contacts";

    //Create constructor to get Http instance
    constructor(
        private http: HttpClient // client
    ) {  }
    
    // fetching products
    // listProducts() {
    //     return this.http.get(environment.serverAPI + 'products'); // product-list
    // }
    getAllContacts() {
        return this.http.get(this.contactUrl);
	    // .map(this.extractData)
	    // .catch(this.handleError);
    }

    //Fetch contact by id
    getContactById(contactId: string) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let options = { headers: headers }
        // console.log(this.contactUrl +"/"+ contactId);
        return this.http.get(this.contactUrl +"/"+ contactId, options);
        // .map(this.extractData)
        // .catch(this.handleError);
    }

    //Create contact
    createContact(contact: Contact) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let options = { headers: headers }
        return this.http.post(this.contactUrl, contact, options)
        // .map(success => success.status)
        // .catch(this.handleError);
    }

    //Update contact
    updateContact(contact: Contact) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let options = { headers: headers }
        console.log("Update Contact");
        return this.http.put(this.contactUrl +"/"+ contact.id, contact, options)
        // .map(success => success.status)
        // .catch(this.handleError);
    }

    //Delete contact	
    deleteContactById(contactId: string) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let options = { headers: headers }
        return this.http.delete(this.contactUrl +"/"+ contactId, options)
        // .map(success => success.status)
        // .catch(this.handleError);
    }

    private extractData(res: Response) {
    let body = res.json();
        return body;
    }
    private handleError (error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.status);
    }
} 