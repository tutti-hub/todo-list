import { generateId } from './utils.js';
import { assert } from './utils.js';


class Todo {

    constructor(options) {
        assert(options.projectId, 'project id is required');
        assert(options.title, 'todo title is required');

        this.id = options.id || generateId();
        this.projectId = options.projectId;
        this.title = options.title;
        this.description = options.description;
        this.priority = options.priority || 1;
        this.dueDate = options.dueDate || new Date();
        this.done = options.done || false;
    }

}

export { Todo };
