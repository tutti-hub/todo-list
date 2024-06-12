import { DbService } from './dbservice.js';
import { Project } from './project.js';

function findProjectIndex(id) {
    return this.items.findIndex(e => e.id === id);
}


export class ProjectRepository {

    constructor() {
        this.keyName = 'projects';
        this.dbService = new DbService();
        this.items = JSON.parse(this.dbService.getItem(this.keyName)) || [];
        if(!this.items.length){
            this.items.push(new Project({ id: '1', title: 'Default' }));
        }
    }

    findAll() {
       return this.items;
    }

    findById(id) {
        return this.items.find(e => e.id === id);
    }

    remove(projectId){
        const index = findProjectIndex.call(this, projectId);
        console.log('to remove', index);
        this.items.splice(index, 1);
        this.dbService.setItem(this.keyName, this.items);
    }

    save(project) {
        const index = findProjectIndex.call(this, project.id);

        if(index === -1){
            this.items.push(project);
        } else {
            this.items.splice(index, 1, project);
        }
        this.dbService.setItem(this.keyName, this.items);
    }
}
