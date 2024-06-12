import { projectRepository, todoRepository } from '../model/repositories.js';
import { Project } from '../model/project.js';
import { renderTodosByProjectId } from './todos.ui.js';
import { assert } from '../model/utils.js';
import { newProjectButton,
    projectModal,
    projectModalSaveButton,
    projectModalTitleInput,
    projectsOut,
    deleProjectButton } from './controls.js';

require('bootstrap');

projectModalSaveButton.addEventListener('click', () => {
    const proj = new Project({ title: `${projectModalTitleInput.value}` });
    projectRepository.save(proj);
    //addProjectToDOM(proj);
    loadProjects(proj.id);
});

projectsOut.addEventListener('click', (event) => {
    event.preventDefault();
    for(let btn of document.querySelectorAll('button')){
        btn.classList.remove('active');
    }
    event.target.classList.add('active');

    renderTodosByProjectId(event.target.dataset.projectId);

});

deleteProjectButton.addEventListener('click', (event) => {
    const activeProject = getActiveProject();

    if(activeProject.id === '1') {
        alert(`Can't remove "Default" project`);
        return;
    }

    const del =
        confirm(`Delete project "${activeProject.title}" and all its todos?`);

    if(del) {
        todoRepository.removeByProjectId(activeProject.id);
        projectRepository.remove(activeProject.id);
        loadProjects('1');
    }


});

function getActiveProject() {
    const activeProjectElement = projectsOut.querySelector('.active');
    const activeProject =
        projectRepository.findById(activeProjectElement.dataset.projectId);
    return activeProject;
}

function clearProjects() {
    projectsOut.innerText = '';
}

function loadProjects(activeProjectId){
    clearProjects();
    const compare = (a,b) => {
        if(a.id === '1') return -1;
        else if(b.id === '1') return 1;
        else if(a.title < b.title) return -1;
        else if(a.title > b.title) return 1;
       return 0;
    };
    const projects = projectRepository.findAll().toSorted(compare);
    for(let p of projects){
        addProjectToDOM(p, activeProjectId);
    }
}

function addProjectToDOM(proj, activeProjectId) {
    const classList = "nav-link text-start" + (proj.id === activeProjectId ? " active" : "");
    const projButton =  `<button class="${classList}"
             type="button"
             data-project-id="${proj.id}">
        <i class="bi bi-tag me-2"></i>
         ${proj.title}
   </button>`;
    projectsOut.insertAdjacentHTML('beforeend', projButton);
    if(proj.id === '1'){
        projectsOut.insertAdjacentHTML('beforeend', '<hr>');
    }

    renderTodosByProjectId(activeProjectId);
}


export { getActiveProject, loadProjects, addProjectToDOM };


