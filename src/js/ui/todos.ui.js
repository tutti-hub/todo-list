import { todoRepository, projectRepository } from '../model/repositories.js';
import { assert } from '../model/utils.js';
import { Todo } from '../model/todo.js';
import { loadProjects, getActiveProject } from './projects.ui.js';
import { newTodoButton,
         newTodoTitleInput,
         newTodoProjectsSelect,
         newTodoDueDate,
         newTodoDescription,
         newTodoPriotity,
         newTodoDone,
         saveNewTodoButton,
         todosOut,
         projectsOut } from './controls.js';

newTodoButton.addEventListener('click', (event) => {
    // init projects
    newTodoProjectsSelect.innerHTML = '';

    const projects = projectRepository.findAll();
    const activeProject = getActiveProject();
    for (let proj of projects){
        let element;
        if(activeProject.id === proj.id) {
            element = `<option value="${proj.id}" selected>${proj.title}</option>`;
        } else {
            element = `<option value="${proj.id}">${proj.title}</option>`;
        }
        newTodoProjectsSelect.insertAdjacentHTML('beforeend', element);
    }

    // init Due Date
    newTodoDueDate.value = new Date().toISOString().slice(0, 10);

    newTodoPriority.value = '1';

});

saveNewTodoButton.addEventListener('click', () => {
    const title = newTodoTitleInput.value;
    const projectId = newTodoProjectsSelect.selectedOptions[0].value;
    const dueDate = new Date(newTodoDueDate.value);
    const description = newTodoDescription.value;
    const priority = Number.parseInt(newTodoPriority.value);
    const done = newTodoDone.checked;
    const todoOptions = { title, projectId, dueDate, description, priority, done };

    const newTodo = new Todo(todoOptions);
    todoRepository.save(newTodo);
    loadProjects(projectId);

});

todosOut.addEventListener('click', (event) => {

    if(event.target.type === 'checkbox') {
         const tr = event.target.closest('tr');

        todoRepository.setDone(tr.dataset.todoId, event.target.checked);

         (event.target.checked
            ? tr.classList.add.bind(tr.classList)
            : tr.classList.remove.bind(tr.classList))('done');

    }
});

function renderTodo(todo) {
    todosOut.insertAdjacentHTML('beforeend', `

                            <tr class="${todo.done ? 'done' : ''}" data-todo-id="${todo.id}">
                                <th scope="row"><input class="form-check-input me-1" type="checkbox" value="" ></th>
                                <td>${todo.title}</td>
                                <td>${todo.dueDate.toISOString().slice(0,10)}</td>
                                <td><button class="btn btn-sm btn-light" type="buttom" ><i class="bi bi-pencil-square"></i></button></td>
                            </tr>`
     );
     const checkBox =  todosOut.querySelector(`[data-todo-id="${todo.id}"] [type="checkbox"]`);
     assert(checkBox, 'CheckBox Done');

     checkBox.checked = todo.done;

}

function renderTodosByProjectId(projectId) {
    todosOut.innerText = '';
    const projectTodos = todoRepository.findAll().filter(t => t.projectId === projectId);

    if(projectTodos){
        projectTodos.forEach(todo => {
            todo.dueDate = new Date(todo.dueDate);
            renderTodo(todo);
        });
    }
}


export { renderTodosByProjectId };




