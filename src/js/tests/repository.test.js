import { test, expect } from 'vitest';
import { generateId } from '../model/utils.js';
import { Project } from '../model/project.js';
import { Todo } from '../model/todo.js';
import { DbService } from '../model/dbservice.js';
import { Repository } from '../model/repository.js';

const projectOpt1 = { id: generateId(), title: 'Work' };
const projectOpt2 = { id: generateId(), title: 'Sport' };
const projects = [new Project(projectOpt1), new Project(projectOpt2)];

const todoOpt1 = {
    id:          generateId(),
    projectId:   projects[0].id,
    title:       'Do something important',
    description: 'Realy important'
};

const todos = [new Todo(todoOpt1)];

test('projects repository', () => {
    const projectRepo = new Repository('projects', new DbService());
    const project = projects[0];

    projectRepo.save(project);

    const projectFromRepo = projectRepo.findById(projectOpt1.id);
    expect(projectFromRepo.id).toBe(project.id);

    const projectsFromRepo = projectRepo.findAll();
    expect(projectsFromRepo.length).toBe(1);
    expect(projectsFromRepo[0].id).toBe(project.id);
});

test('todos repository', () => {
    const todoRepo = new Repository('todos', new DbService());
    const todo = todos[0];

    todoRepo.save(todo);
    const foundTodo = todoRepo.findById(todoOpt1.id);
    expect(foundTodo.id).toBe(todoOpt1.id);


    const foundTodos = todoRepo.findAll();
    expect(foundTodos.length).toBe(1);
    expect(foundTodos[0].id).toBe(todoOpt1.id);

});
