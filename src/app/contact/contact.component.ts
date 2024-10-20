import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms'; // Import FormsModule and NgForm
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser'; // Import EmailJS


@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  imports: [FormsModule], // Import FormsModule here
})
export class ContactComponent {
  name: string = '';
  email: string = '';
  message: string = '';
  isSubmitted: boolean = false;
  successMessage: string = ''; // Fixed typo and updated variable name
  errorMessage: string = ''; // Fixed typo and updated variable name

  // EmailJS Configuration
  serviceID: string = 'service_ibrahimox22pdw'; // Replace with your EmailJS service ID
  templateID: string = 'template_bt0okth'; // Replace with your EmailJS template ID
  userID: string = 'i_I7cFBJMquifDGLh'; // Replace with your EmailJS user ID

  onSubmit(form: NgForm): void {
    console.log('Form submitted:', form.valid); // Log the form's validity
    if (form.valid) {
      const emailParams = {
        name: this.name,
        email: this.email,
        message: this.message,
      };

      emailjs.send(this.serviceID, this.templateID, emailParams, this.userID)
        .then((response: EmailJSResponseStatus) => {
          console.log('Email sent successfully!', response.status, response.text);
          this.isSubmitted = true; // Show confirmation message
          form.resetForm(); // Reset form after successful submission
          this.successMessage = 'Message sent successfully!'; // Fixed typo
        })
        .catch((error) => {
          console.error('Failed to send email:', error);
          this.errorMessage = 'Something went wrong! Please try again.'; // Updated error message
        });
    } else {
      console.log('Form is invalid'); // Log if the form is invalid
    }
  }
}
