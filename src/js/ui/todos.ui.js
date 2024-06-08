import { Repository } from '../model/repository.js';
import { DbService } from '../model/dbservice.js';
import { assert } from '../model/utils.js';
import { Todo } from '../model/todo.js';


const projectsRepository = new Repository('projects', new DbService());
assert(projectsRepository);

const todosRepository = new Repository('todos', new DbService());

const newTodoButton = document.querySelector('#newTodoButton');
assert(newTodoButton);

const newTodoTitleInput = document.querySelector('#newTodoTitleInput');
assert(newTodoTitleInput);

const newTodoProjectsSelect = document.querySelector('#newTodoProjectsSelect');
assert(newTodoProjectsSelect);

const newTodoDueDate = document.querySelector('#newTodoDueDate');
assert(newTodoDueDate);

const newTodoDescription = document.querySelector('#newTodoDescription');
assert(newTodoDescription);

const newTodoPriority = document.querySelector('#newTodoPriority');
assert(newTodoPriority);

const newTodoDone = document.querySelector('#newTodoDone');
assert(newTodoDone);

const saveNewTodoButton = document.querySelector('#saveNewTodoButton');
assert(saveNewTodoButton);

const todos = document.querySelector('#todos');
assert(todos, 'todos');

newTodoButton.addEventListener('click', (event) => {
    // init projects
    newTodoProjectsSelect.innerHTML = '';

    for (let proj of projectsRepository.findAll()){
        newTodoProjectsSelect.insertAdjacentHTML('beforeend',
            `<option value="${proj.id}">${proj.title}</option>`);
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
    todosRepository.save(newTodo);

    todos.insertAdjacentHTML('beforeend', `

                            <tr data-todo-id="${newTodo.id}">
                                <th scope="row"><input class="form-check-input me-1" type="checkbox" value="" ></th>
                                <td>${newTodo.title}</td>
                                <td>${newTodo.dueDate.toISOString().slice(0,10)}</td>
                                <td><button class="btn btn-sm btn-light" type="buttom" ><i class="bi bi-pencil-square"></i></button></td>
                            </tr>`
     );

     const checkBox =  todos.querySelector(`[data-todo-id="${newTodo.id}"] [type="checkbox"]`);
     assert(checkBox, 'CheckBox Done');

     checkBox.checked = newTodo.done;

});











