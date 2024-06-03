import { test, expect } from 'vitest';
import { Todo } from '../model/todo.js';

const projectId = 1;
const title = 'do something cool';

test('throws title is required', () => {
    expect(() => new Todo({ projectId })).toThrowError('todo title is required');
});

test('throws project id is required', () => {
    expect(() => new Todo({ title })).toThrowError('project id is required');
});

test('new todo id generated', () => {
    expect(new Todo({projectId, title}).id)
        .toBeTypeOf('string')
        .toContain('_');
});

test('new todo has default values', () => {
    const todo = new Todo({ projectId, title });
    expect(todo.priority).toBe(1);
    expect(todo.dueDate.getTime()).toBeLessThanOrEqual(Date.now());
    expect(todo.done).toBeFalsy();
});

test('all constructor staff', () => {
    const id = '2346787_456';
    const description = 'something abot this';
    const priority = 11;
    const dueDate =  Date.parse('2024-05-31');
    const done = true;
    const todo = new Todo({id, projectId, title, description, priority, dueDate, done});

    expect(todo.id).toBe(id);
    expect(todo.projectId).toBe(projectId);
    expect(todo.title).toBe(title);
    expect(todo.description).toBe(description);
    expect(todo.priority).toBe(priority);
    expect(todo.dueDate).toBe(dueDate);
    expect(todo.done).toBe(done);

});
