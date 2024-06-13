import { todoRepository, projectRepository } from '../model/repositories.js';
import { assert } from '../model/utils.js';
import { Todo } from '../model/todo.js';
import { loadProjects, getActiveProject } from './projects.ui.js';
import { newTodoButton,
         todoModalHeader,
         todoModalTitleInput,
         todoModalProjectsSelect,
         todoModalDueDateInput,
         todoModalDescriptionTextArea,
         todoModalPriorityInput,
         todoModalDoneInput,
         todoModalSaveButton,
         todosOut,
         projectsOut,
         showCompletedInput } from './controls.js';
import { state } from './state.js';
import * as bootstrap from 'bootstrap';


newTodoButton.addEventListener('click', (event) => {
    const projectId = getActiveProject().id;
    initTodoModal({ projectId });
});

let currentModalTodoId = undefined;

todoModalSaveButton.addEventListener('click', () => {
    const newTodo = new Todo(getTodoModalResult());
    todoRepository.save(newTodo);
    loadProjects(newTodo.projectId);

});

todosOut.addEventListener('click', (event) => {

    const tr = event.target.closest('tr');
    const todo = todoRepository.findById(tr.dataset.todoId);

    if(event.target.type === 'checkbox') {
        todoRepository.setDone(todo.id, event.target.checked);

        (event.target.checked
            ? tr.classList.add.bind(tr.classList)
            : tr.classList.remove.bind(tr.classList))('done');

    } else if(event.target.classList.contains('todo-edit') ||
              event.target.classList.contains('bi-pencil-square')) {
        initTodoModal(todo);
        const modal = new bootstrap.Modal("#todoModal");
        modal.show();
    } else if(event.target.classList.contains('todo-delete') ||
              event.target.classList.contains('bi-x-lg')) {
        const del = confirm(`Delete "${todo.title.slice(0, 30)}..."?`);

        if(del){
            todoRepository.remove(todo.id);
            tr.remove();
        }
    }
});


showCompletedInput.addEventListener('click', (event) => {
    state.showCompleted = event.target.checked;
    renderTodosByProjectId(getActiveProject().id);
});

function initTodoModal(options) {
    todoModalHeader.textContent = !options.id ? 'New Todo' : 'Edit Todo';
    todoModalTitleInput.value = options.title || '';
    renderModalProjects(options.projectId);
    const dueDate = options.dueDate || new Date();
    todoModalDueDateInput.value = dueDate.toISOString().slice(0, 10);
    todoModalDescriptionTextArea.value = options.description || '';
    todoModalPriorityInput.value = options.priority || 1;
    todoModalDoneInput.checked = options.done || false;

    currentModalTodoId = options.id;
}

function getTodoModalResult(){
    const id = currentModalTodoId;
    const title = todoModalTitleInput.value;
    const projectId = todoModalProjectsSelect.selectedOptions[0].value;
    const dueDate = new Date(todoModalDueDateInput.value);
    const description = todoModalDescriptionTextArea.value;
    const priority = Number.parseInt(todoModalPriorityInput.value);
    const done = todoModalDoneInput.checked;
    currentModalTodoId = undefined;
    return { id, title, projectId, dueDate, description, priority, done };
}

function renderModalProjects(activeProjectId) {
    todoModalProjectsSelect.innerHTML = '';

    const projects = projectRepository.findAll();

    for (let proj of projects){
        let element;
        if(activeProjectId === proj.id) {
            element = `<option value="${proj.id}" selected>${proj.title}</option>`;
        } else {
            element = `<option value="${proj.id}">${proj.title}</option>`;
        }
        todoModalProjectsSelect.insertAdjacentHTML('beforeend', element);
    }

}


function renderTodo(todo) {
    todosOut.insertAdjacentHTML('beforeend', `

                                <tr class="${todo.done ? 'done' : ''}" data-todo-id="${todo.id}">
                                <th scope="row"><input class="form-check-input me-1" type="checkbox" value="" ></th>
                                <td>${todo.title}</td>
                                <td>${todo.dueDate.toISOString().slice(0,10)}</td>
                                <td>
                                    <button class="btn todo-edit me-2" type="button">
                                        <i class="bi bi-pencil-square"></i>
                                    </button><button class="btn todo-delete" type="button">
                                        <i class="bi bi-x-lg text-danger"></i>
                                    </button>
                                </td>
                                </tr>`
                               );
                               const checkBox =  todosOut.querySelector(`[data-todo-id="${todo.id}"] [type="checkbox"]`);
                               assert(checkBox, 'CheckBox Done');

                               checkBox.checked = todo.done;

}


function renderTodosByProjectId(projectId) {
    todosOut.innerText = '';

    const readyToRender = todo => {
        let flag = todo.projectId === projectId;
        if(!state.showCompleted) {
            flag = flag && !todo.done;
        }
        return flag;
    };

    const projectTodos = todoRepository.findAll().filter(readyToRender);

    if(projectTodos){
        projectTodos.forEach(todo => {
            todo.dueDate = new Date(todo.dueDate);
            renderTodo(todo);
        });
    }
}


export { renderTodosByProjectId };




