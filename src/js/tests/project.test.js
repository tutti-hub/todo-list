import { test, expect, expectTypeOf } from 'vitest';
import { Project } from '../model/project.js';
import { generateId, idToFloat } from '../model/utils.js';

test('create project with id and title', () => {
    const id = '1234324';
    const title = 'Work';
    const project = new Project({ title, id });
    expect(project.title).toBe(title);
    expect(project.id).toBe(id);
});

test('create project without id', () => {
    const title = 'Personal';
    const project = new Project({ title });
    expect(project.id).toBeTypeOf('string');
    expect(project.id).toBeDefined();
});

test('clone project', () => {
    const title = 'Work';
    const project = new Project({ title });
    const clone = Project.clone(project);

    expect(project).not.toBe(clone);
    expectTypeOf(project).toEqualTypeOf(clone);
    expect(project.id).toBe(clone.id);
    expect(project.title).toBe(clone.title);
});

