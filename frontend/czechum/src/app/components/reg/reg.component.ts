import { Component } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})
export class RegComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  hide=true;
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Az email nem érvényes';
    }

    return this.email.hasError('email') ? 'Az email nem érvényes' : '';
  }
}
