function generateId(){
    return (Date.now() * Math.random()).toString().replace('.', '_');
}


function assert(condition, message) {
    if(!condition){
        throw Error(message || 'assertion failed');
    }
}


export { generateId, assert };
