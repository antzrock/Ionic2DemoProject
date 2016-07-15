import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage, LocalStorage  } from 'ionic-angular';
import { Control } from '@angular/common';

@Injectable()
export class ProjectService {
	
	static local: Storage = new Storage(LocalStorage);
	
	static GetProjects() {
	
      try
      {
        if (localStorage.getItem("projectsList") === null)
          return [];
        else
          return JSON.parse(localStorage.getItem("projectsList"));
      }
      catch(e)
      {
        throw new Error("Error in getting projects from local storage!");	
      } 
	  
	}
	
	static AddProject(project: any) {
		
	  if (project)
	  {
		var projects: any = [];
		projects = ProjectService.GetProjects();
		
		if (projects)
		{
		  console.log('With Projects');
		  projects.push(project);
		}
		else
		{
		  console.log('No Projects');
		  projects = [];
		  projects.push(project);
		}
		
		ProjectService.UpdateProjectsList(JSON.stringify(projects));	
	  }
	  else
		throw new Error("Empty or null project cannot be added to projects!");
	}
	
	static EditProject(title: string, description : string)
	{
	  if (title)
	  {
		console.log('Edit Project: ' + title);
		
		var projects: any = [];
		projects = ProjectService.GetProjects();
		
		var project: any;
	    project = ProjectService.GetProjectByTitle(title, projects);
		
		if(project)
		{
		  var index: number = projects.indexOf(project);   
          
		  console.log("Index: " + index.toString());
		  
		  if(index > -1){
		    projects[index].description = description;
		    ProjectService.UpdateProjectsList(JSON.stringify(projects));
          }
		}
        else
          throw new Error("Cannot edit a non-existing project");			
	  }
	  else
		throw new Error("Cannot edit project with empty or null name!");  
		
	}
	
	static DeleteProject(title: string)
	{
	  if(title)
      {
		console.log('Delete Project: ' + title);
	  
	    var projects: any = [];
   	    projects = ProjectService.GetProjects();
	
	    var project = ProjectService.GetProjectByTitle(title, projects);
	  
	    if (project)
	    {
		  var index: number = projects.indexOf(project);    
	
	      console.log("Index: " + index.toString());
	
	      if(index > -1){
            projects.splice(index, 1);
		    ProjectService.UpdateProjectsList(JSON.stringify(projects));
          }    
	    }
	  }
      else
        throw new Error("Cannot delete a project with empty or null name!");  	  
	}
	
	static GetProjectByTitle(title: string, projects: any[])
	{
	  if(title)
	  {
		  console.log('GetProjectByTitle: ' + title);	
	  	  if (projects)
	      {
		    var projectFound: boolean = false;
		  
		    console.log("Searching projects...");
		    for (var j = 0; j < projects.length; j++)
	        {
			  console.log("Name: " + projects[j].title);
		      if (projects[j].title == title)
		      {
			    console.log("Project " + projects[j].title + " found!");
                return projects[j];
		      }
	        }

            if (!projectFound)
				return null;			
	      }
          else
            throw new Error("Cannot get project from an empty collection!");		
	  }		
      else
        throw new Error("Cannot get project with empty or null name!"); 	
	}
	
	static UpdateProjectsList(projects: string)
	{
	  try
      {
		localStorage.removeItem('projectsList');
        localStorage.setItem('projectsList', projects);		
	  }
      catch(e)
      {
		throw new Error("Error in trying to save projects to local storage!");  
	  }
	}
	
	static projectNameValidator(control: Control)
	{
		var projects: any = [];
		var found: boolean = false;
		
		projects = ProjectService.GetProjects();
		
		if (projects)
		{
		  for (var j = 0; j < projects.length; j++)
		  {
			if (projects[j].title == control.value)
		    {
			  found = true;
			  break;
		    }
		  }	
        }
		
		if (found)
			return {"projectnameexists": true};	
    }	
}