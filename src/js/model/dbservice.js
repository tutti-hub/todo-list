export class DbService{

    #storage = {};

    setItem(name, value) {
        if(typeof localStorage !== 'undefined'){
            localStorage.setItem(name, JSON.stringify(value));
        } else {
            this.#storage[name] = JSON.stringify(value);
        }
    }


    getItem(name) {
        let val;
        if(typeof localStorage !== 'undefined'){
            val = localStorage.getItem(name);
        } else {
            val = this.#storage[name];
        }
        return val || '[]';
    }


    clear() {
        if(typeof localStorage !== 'undefined'){
            localStorage.clear();
        } else {
            for(let key in this.#storage){
                delete this.#storage[key];
            }
        }
    }

}
