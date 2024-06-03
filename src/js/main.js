import { generateId, assert } from './model/utils.js';
import { Project } from './model/project.js';

require('../scss/main.scss');

const _ = require('lodash');

const id = generateId();
const title = 'Work';

const project = new Project({ id, title });
console.log(project);

const clone = Project.clone(project);
console.log(clone);

console.log(Object.prototype.toString.call(project));
console.log(Object.prototype.toString.call(clone));
console.log(project instanceof Project);
console.log(clone instanceof Project);
console.log(clone === project);

clone.title = 'New Title';

console.log(project);
console.log(clone);

