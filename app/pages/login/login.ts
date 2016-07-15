import { Component } from '@angular/core';
import { Alert, NavController, Storage, LocalStorage } from 'ionic-angular';
import { FormBuilder, ControlGroup, Validators } from '@angular/common';
import { AuthenticationService } from '../../services/auth/auth';
import { ProjectsPage } from '../projects/projects';

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {
  
  loginForm: ControlGroup;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;
  local: Storage = new Storage(LocalStorage);
  
  constructor(private nav: NavController, private formBuilder: FormBuilder) {
    this.loginForm = formBuilder.group({
		email: ['antzrock@tudskee.com', Validators.compose([AuthenticationService.emailValidator, Validators.required])],
		password: ['1234', Validators.compose([AuthenticationService.passwordValidator, Validators.required])]
	});
  }
  
  submit()
  {
	this.submitAttempt = true;
	
	if(this.loginForm.valid)
	{
		this.local.set('username', this.loginForm.value.email);
		this.nav.push(ProjectsPage);
	}
  }
  
  elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }
}
