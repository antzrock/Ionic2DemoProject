import {Component} from '@angular/core';
import {Modal, NavController,ViewController, NavParams} from 'ionic-angular';
import { FormBuilder, ControlGroup, Validators } from '@angular/common';
import { ProjectService } from '../../services/project/project';

@Component({
	templateUrl: 'build/pages/projects/projectModal.html'
})

export class ProjectModal {
  
  projectForm: ControlGroup;
  titleChanged: boolean = false;
  submitAttempt: boolean = false;
  mode: number = 1;
  projectsList: any = [];
  
  titleDisabled: boolean = false;
  
  constructor(inputData: NavParams, private viewCtrl: ViewController, private formBuilder: FormBuilder) {
	
	var tempProject = inputData.get('data');
	this.mode = inputData.get('mode');
	this.projectsList = inputData.get('projectList');
		
	if (this.mode == 1)
	{
	  this.titleDisabled = false;
	  
	  this.projectForm = formBuilder.group({
		title: [tempProject.title, Validators.compose([Validators.required, ProjectService.projectNameValidator])],
		description: [tempProject.description]
	  });	
	}
	else
	{
	  this.titleDisabled = true;
	  
	  this.projectForm = formBuilder.group({
		title: [tempProject.title, Validators.compose([Validators.required])],
		description: [tempProject.description]
	  });	
	}
	
  }
  
  save() {
	this.submitAttempt = true;

    if(this.projectForm.valid)
	{
	  this.viewCtrl.dismiss(this.projectForm.value);
	}
  }
  
  close() {
    this.viewCtrl.dismiss();  
  }

  elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }  
}