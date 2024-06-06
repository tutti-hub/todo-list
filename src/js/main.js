import { generateId, assert } from './model/utils.js';
import { Project } from './model/project.js';
import { loadProjects } from './ui/projects.ui.js';

require('./ui/projects.ui.js');
require('../scss/main.scss');

const _ = require('lodash');



loadProjects();

