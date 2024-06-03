import { assert } from './utils.js';
import { Project } from './project.js';


class Repository {

    #keyName;

    #items = [];

    #dbService;

    constructor(keyName, dbService) {
        this.#keyName = keyName;
        this.#dbService = dbService;
    }


    findById(id) {
        return this.findAll().find(p => p.id === id);
    }


    findAll() {
        if(!this.#items){
            this.#items = this.#dbService.getItem(this.#keyName);
        }

        return this.#items;
    }


    save(item) {
       this.#items.push(item);
       this.#dbService.setItem(this.#keyName, this.#items);
    }

}

export { Repository };
