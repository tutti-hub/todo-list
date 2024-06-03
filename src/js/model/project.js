import { generateId, assert } from './utils.js';


class Project {

    constructor(opt){
        assert(opt.title, 'title is required');
        this.title = opt.title;
        this.id = opt.id || generateId();
    }

    static clone({id, title}) {
        return new Project({ id, title });
    }

    toString() {
        return `Project: {id: ${this.id}, title: ${this.title}}`;
    }
}


export { Project };
