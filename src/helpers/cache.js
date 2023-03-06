class Cache {
    constructor(){
        this.map = new Map();
    }
    get (key) {
        return this.map.get(key)
    }
    set (key, value)  {
        return this.map.set(key, value);
    }
    has (key) {
        return this.map.has(key);
    }
    delete (key) {
        return this.map.delete(key);
    }
    clear () {
        return this.map.clear();
    }
}
module.exports = {
    cache: new Cache()
}