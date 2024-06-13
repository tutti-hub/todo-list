import { DbService } from './dbservice.js';

function reviver (key, value) {
    if(key === 'dueDate') {
        return new Date(value);
    }

    return value;
}


export class TodoRepository {

    constructor() {
        this.keyName = 'todos';
        this.dbService = new DbService();
        this.items =
            JSON.parse(this.dbService.getItem(this.keyName, reviver)) || [];
    }

    findAll() {
       return this.items;
    }

    findById(id) {
        return this.findAll().find(e => e.id === id);
    }

    findByProjectId(projectId) {
        return this.findAll().filter(e => e.projectId === projectId);
    }

    setDone(id, done) {
        const todo = this.findById(id);
        if(todo) {
            todo.done = done;
            this.save(todo);
        }
    }

    remove(id) {
       const index = this.findAll().findIndex(e => e.id === id);
       this.items.splice(index, 1);
       this.dbService.setItem(this.keyName, this.items);
    }

    removeByProjectId(projectId) {
        const toRemove = this.findByProjectId(projectId);
        toRemove.forEach(todo => this.remove(todo.id));
    }

    save(todo) {
        // todo: check argument
        const index = this.items.findIndex(e => e.id === todo.id);
        if(index == -1){
            this.items.push(todo);
        } else {
            this.items.splice(index, 1, todo);
        }

        this.dbService.setItem(this.keyName, this.items);
    }
}
