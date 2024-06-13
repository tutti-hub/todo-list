class State {
    static KEY_NAME = 'state';

    constructor(){
        const opt = this.restore() || {};
        this._showCompleted = opt._showCompleted || false;
    }

    set showCompleted(showCompleted) {
        this._showCompleted = showCompleted;
        this.save();
    }

    get showCompleted() {
        return this._showCompleted;
    }

    save() {
        localStorage.setItem(State.KEY_NAME, JSON.stringify(this));
    }

    restore() {
        return JSON.parse(localStorage.getItem(State.KEY_NAME));
    }
}

const state = new State();

export { state };
