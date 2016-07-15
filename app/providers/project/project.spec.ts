import {beforeEachProviders, it, describe, expect, inject} from '@angular/core/testing';
import {ProjectService} from '../../services/project/project';

describe('Project Service', () => {
 
  var store = {};
    
  beforeEach(function() {
    // setUp.

    // LocalStorage mock.
    spyOn(localStorage, 'getItem').and.callFake(function(key) {
        return store[key];
    });
    Object.defineProperty(sessionStorage, "setItem", { writable: true });
	
    spyOn(localStorage, 'setItem').and.callFake(function(key, value) {
        store[key] = value;
    });
  });
  
  afterEach(function () {
    store = [];
  });

  /*describe('Test to print out jasmine version', function() {
    it('prints jasmine version', function() {
      console.log('jasmine-version:');
      console.log(jasmine.version || (jasmine.getEnv().versionString && jasmine.getEnv().versionString()));
    });
  });*/
  
  it('project service should return an empty array of projects', () => {
	  console.log("TEST: project service should return an empty array of projects");
	  store = [];
	  localStorage.setItem('projectsList', JSON.stringify(store));
	  let projects = ProjectService.GetProjects();
	  
	  expect(Array.isArray(projects)).toBeTruthy;
	  expect(projects.length).toEqual(0);
  });
  
  it('project service should return a non empty array of projects', () => {
	console.log("TEST: project service should return a non empty array of projects");
    store = [
	          {"title":"Metallica","description":"Black Album"},
			  {"title":"Megadeth","description":"Countdown To Extinction"},
			  {"title":"Joe Satriani","description":"Engines Of Creation"}
			];
	  
	localStorage.setItem('projectsList', JSON.stringify(store));
	
	let projects = ProjectService.GetProjects();
	
	expect(Array.isArray(projects)).toBeTruthy;
	expect(projects.length).toEqual(3);
	expect(projects[0].title).toEqual("Metallica");
	expect(projects[0].description).toEqual("Black Album");
	
  });
  
  it('add one project to empty projects', () => {
	  console.log("TEST: add one project to empty projects");
	  store = [];
	  localStorage.setItem('projectsList', JSON.stringify(store));
	  
	  let project = {
		  "title": "Metallica",
		  "description": "Black Album"
	  };
	  
	  ProjectService.AddProject(project);
	  
	  let projects = ProjectService.GetProjects();
	  
	  expect(Array.isArray(projects)).toBeTruthy;
	  expect(projects.length).toEqual(1);
	  expect(projects[0].title).toEqual("Metallica");
	  expect(projects[0].description).toEqual("Black Album");
	  
  });
  
  it('add null project to projects', () => {
	console.log("TEST: add null project to projects");
	  
	store = [
	  {"title":"Metallica","description":"Black Album"},
	  {"title":"Megadeth","description":"Countdown To Extinction"},
	  {"title":"Joe Satriani","description":"Engines Of Creation"}
	];
	  
	localStorage.setItem('projectsList', JSON.stringify(store));
	expect( function(){ ProjectService.AddProject(null); } ).toThrow(new Error("Empty or null project cannot be added to projects!"));
	  
  });
  
  it('edit project description', () => {
	console.log("TEST: edit project description");

	store = [
	  {"title":"Metallica","description":"Black Album"},
	  {"title":"Megadeth","description":"Countdown To Extinction"},
	  {"title":"Joe Satriani","description":"Engines Of Creation"}
	];
	  
	localStorage.setItem('projectsList', JSON.stringify(store));
	ProjectService.EditProject('Joe Satriani','Extremist');
	
	let projects = ProjectService.GetProjects();
	
	expect(projects.length).toEqual(3);
	expect(projects[2].title).toEqual("Joe Satriani");
	expect(projects[2].description).toEqual("Extremist");
		
  });
  
  it('edit project passing empty name as parameter', () => {
	console.log("TEST: edit project passing empty name as parameter");
	  
	store = [
	  {"title":"Metallica","description":"Black Album"},
	  {"title":"Megadeth","description":"Countdown To Extinction"},
	  {"title":"Joe Satriani","description":"Engines Of Creation"}
	];
	  
	localStorage.setItem('projectsList', JSON.stringify(store));
	expect( function(){ ProjectService.EditProject('',''); } ).toThrow(new Error("Cannot edit project with empty or null name!"));
	  
  });
  
  it('edit non-existing project', () => {
	console.log("TEST: edit non-existing project");
	
	store = [
	  {"title":"Metallica","description":"Black Album"},
	  {"title":"Megadeth","description":"Countdown To Extinction"},
	  {"title":"Joe Satriani","description":"Engines Of Creation"}
	];
	  
	localStorage.setItem('projectsList', JSON.stringify(store));
	expect( function(){ ProjectService.EditProject('Alice In Chains','Dirt'); } ).toThrow(new Error("Cannot edit a non-existing project"));
	  
  });
  
  it('delete project from projects', () => {
	console.log("TEST: delete project from projects");
    
	store = [
	  {"title":"Metallica","description":"Black Album"},
	  {"title":"Megadeth","description":"Countdown To Extinction"},
	  {"title":"Joe Satriani","description":"Engines Of Creation"}
	];
	  
	localStorage.setItem('projectsList', JSON.stringify(store));
	
	let projects = ProjectService.GetProjects();
	
	expect(projects.length).toEqual(3);
	
	ProjectService.DeleteProject("Megadeth");
	
	projects = ProjectService.GetProjects();
	
	expect(projects.length).toEqual(2);
	
  });
  
  it('delete project passing empty name as parameter', () => {
	console.log("TEST: delete project passing empty name as parameter");
     
	store = [
	  {"title":"Metallica","description":"Black Album"},
	  {"title":"Megadeth","description":"Countdown To Extinction"},
	  {"title":"Joe Satriani","description":"Engines Of Creation"}
	];
	  
	localStorage.setItem('projectsList', JSON.stringify(store));
	expect( function(){ ProjectService.DeleteProject(''); } ).toThrow(new Error("Cannot delete a project with empty or null name!"));
	
  });
  
  it('delete project passing null as parameter', () => {
	console.log("TEST: delete project passing null as parameter");
     
	store = [
	  {"title":"Metallica","description":"Black Album"},
	  {"title":"Megadeth","description":"Countdown To Extinction"},
	  {"title":"Joe Satriani","description":"Engines Of Creation"}
	];
	  
	localStorage.setItem('projectsList', JSON.stringify(store));
	expect( function(){ ProjectService.DeleteProject(null); } ).toThrow(new Error("Cannot delete a project with empty or null name!"));
	
  });
  
  it('get project with name parameter', () => {
	console.log("TEST: get project with name parameter");
     
	store = [
	  {"title":"Metallica","description":"Black Album"},
	  {"title":"Megadeth","description":"Countdown To Extinction"},
	  {"title":"Joe Satriani","description":"Engines Of Creation"}
	];
	  
	localStorage.setItem('projectsList', JSON.stringify(store));
    let projects = ProjectService.GetProjects();
	
	let MetallicaProject = ProjectService.GetProjectByTitle("Metallica", projects);
	
	expect(MetallicaProject).not.toBe(null);
	expect(MetallicaProject.title).toEqual("Metallica");
	expect(MetallicaProject.description).toEqual("Black Album");
	
  });
  
  it('get project with empty name parameter', () => {
	console.log("TEST: get project with empty name parameter");
    
	store = [
	  {"title":"Metallica","description":"Black Album"},
	  {"title":"Megadeth","description":"Countdown To Extinction"},
	  {"title":"Joe Satriani","description":"Engines Of Creation"}
	];
	  
	localStorage.setItem('projectsList', JSON.stringify(store));
    let projects = ProjectService.GetProjects();
	
	expect( function(){ ProjectService.GetProjectByTitle('', projects); } ).toThrow(new Error("Cannot get project with empty or null name!"));
	
  });
  
  it('get project with null name parameter', () => {
	console.log("TEST: get project with null name parameter");
    
	store = [
	  {"title":"Metallica","description":"Black Album"},
	  {"title":"Megadeth","description":"Countdown To Extinction"},
	  {"title":"Joe Satriani","description":"Engines Of Creation"}
	];
	  
	localStorage.setItem('projectsList', JSON.stringify(store));
    let projects = ProjectService.GetProjects();
	
	expect( function(){ ProjectService.GetProjectByTitle(null, projects); } ).toThrow(new Error("Cannot get project with empty or null name!"));
	
  });

  it('get project from null projects array', () => {
	console.log("TEST: get project from null projects array"); 

    store = [];
	localStorage.setItem('projectsList', JSON.stringify(store));
	let projects = ProjectService.GetProjects();
	
	expect( function(){ ProjectService.GetProjectByTitle("Metallica", null); } ).toThrow(new Error("Cannot get project from an empty collection!"));
	
  });

  it('get project from empty projects array', () => {
	console.log("TEST: get project from empty projects array"); 

    store = [];
	localStorage.setItem('projectsList', JSON.stringify(store));
	let projects = ProjectService.GetProjects();
	 
    let project = ProjectService.GetProjectByTitle("Metallica", projects);
	
	expect(project).toBe(null);
	 
  });  
  
});