import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactForm = {
    name: '',
    email: '',
    message: '',
  };

  submitForm() {
    // Handle form submission logic (e.g., send data to a backend service)
    console.log('Form submitted:', this.contactForm);
    // You can add additional logic here, such as sending the form data to a server.
  }
}
