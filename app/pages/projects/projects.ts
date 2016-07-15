import { Component } from '@angular/core';
import { Modal, NavController, Alert } from 'ionic-angular';
import { ProjectService } from '../../services/project/project';
import { ProjectModal } from './projectModal';

/*
  Generated class for the ProjectsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/projects/projects.html',
})
export class ProjectsPage {

  projects: any = [];
  modal: Modal;
  
  constructor(private nav: NavController) {
	this.refreshProjects();
  }
  
  refreshProjects()
  {
    this.projects = ProjectService.GetProjects();	
  }
  
  addProject()
  {
	  this.modal = Modal.create(ProjectModal, { data: {title: '', description: ''}, mode: 1, projectList: this.projects});
	  
      this.modal.onDismiss(data => {
		 
        if (data)
		{
		  try
		  {
			ProjectService.AddProject(data);  
		  }
		  catch(e)
          {
		    let alert = Alert.create({
              title: 'Add Failed',
              subTitle: e.message,
              buttons: ['OK']
            });
            this.nav.present(alert);
		  }	
		  
		  this.refreshProjects();	
		}			
      });  
	  
	  this.nav.present(this.modal);
  }
  
  editProject(project){
	  
	  this.modal = Modal.create(ProjectModal, { data: project, mode: 2, projectList: this.projects});
	  
      this.modal.onDismiss(data => {
		
        try
        {
		  ProjectService.EditProject(data.title, data.description);	
		}		
		catch(e)
        {
		  let alert = Alert.create({
            title: 'Edit Failed',
            subTitle: e.message,
            buttons: ['OK']
          });
          this.nav.present(alert);
		}		
		
		this.refreshProjects();
      });  
	  
	  this.nav.present(this.modal);
  }
  
  deleteProject(project)
  {
	  ProjectService.DeleteProject(project.title);
	  this.refreshProjects();
  }
  
}
