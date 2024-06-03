import { test, expect } from 'vitest';
import { Project } from '../model/project.js';
import { DbService } from '../model/dbservice.js';

const keyName = 'projects';

test('set item', () => {
    const db = new DbService();
    const projects = [new Project({ title: 'Work' }), new Project({ title: 'Sport' })];
    db.setItem(keyName, projects);
    const storedProjects = db.getItem(keyName);

    expect(storedProjects.length).toBe(projects.length);

    db.clear();

    expect(db.getItem(keyName)).toBeNull();


});
