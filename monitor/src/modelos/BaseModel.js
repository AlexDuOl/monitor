export default class BaseModel {
  constructor (data) {

    if(!data) throw new Error('Invalid data payload')

    this.data = data
    this.attributes = data.attributes
    this.relations = data.relations

    this.id = data.id
  }

  getAttribute (name) {
    return (this.attributes.hasOwnProperty(name)) ? this.attributes[name] : null
  }

  getRelationData (name) {
    return (this.relations[name]) ? this.relations[name].data : null
  }
}
