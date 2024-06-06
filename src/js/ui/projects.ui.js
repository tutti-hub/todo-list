import { Repository } from '../model/repository.js';
import { Project } from '../model/project.js';
import { DbService } from '../model/dbservice.js';

require('bootstrap');

const newProjectButton = document.querySelector('#newProjectButton');
const newProjectModal = document.querySelector('#newProjectModal');
const saveNewProjectButton = document.querySelector('#saveNewProjectButton');
const newProjectTitleInput = document.querySelector('#newProjectTitleInput');
const projects = document.querySelector('#projects');

const repo = new Repository('projects', new DbService());

saveNewProjectButton.addEventListener('click', () => {
    const proj = new Project({ title: `${newProjectTitleInput.value}` });
    repo.save(proj);
    addProjectToDOM(proj);
});

projects.addEventListener('click', (event) => {
    event.preventDefault();
    for(let btn of document.querySelectorAll('button')){
        btn.classList.remove('active');
    }
    event.target.classList.add('active');
});

export function loadProjects(){
    for(let p of repo.findAll()){
        addProjectToDOM(p);
    }
}

export function addProjectToDOM(proj) {
    const projButton =  `<button class="nav-link text-start"
             type="button"
             data-project-id="${proj.id}">
        <i class="bi bi-tag me-2"></i>
         ${proj.title}
   </button>`;
    projects.insertAdjacentHTML('beforeend', projButton);

}
