export default class {
  pool = new Set()
  getRandomId (prefix) {
    const id = prefix + (Math.random() + '').substr(2)
    // Recreate random numbers if duplicate data is generated
    if (this.pool.has(id)) {
      return this.getRandomId(prefix)
    }
    this.pool.add(id)
    return id
  }
}
