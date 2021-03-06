import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  email= 'info@cor2tect.com';
  pass= 'asdf';
  isSent: boolean = false;
  isError: boolean = false;

  form: FormGroup = this.formBuilder.group({
    email: ['', [
      Validators.required,
      Validators.email,
      Validators.maxLength(255)]
    ],
    password: ['', [
      Validators.required,
      Validators.maxLength(255)]
    ]
  });

  get formControls() {
    return this.form.controls;
  }

  constructor( private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() { 
    //console.log(this.form.value.email);
    if((this.form.value.email==this.email) && (this.form.value.password==this.pass)){
      this.router.navigate(['./gallery']);
    }
    else {
      this.isError = true;
      setTimeout(() => {
        this.isError = false;
        this.form.reset();
      }, 5000)
    }
  }

}
