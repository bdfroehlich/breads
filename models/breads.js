// require mongoose 
const mongoose = require('mongoose')
// creating shorthand for the Schema constructor 
const { Schema } = mongoose 

// schema
const breadSchema = new Schema({
  name: { type: String, required: true },
  hasGluten: Boolean,
  image: { type: String, default: 'http://placehold.it/500x500.png' },
  baker: {
    //ref to Baker exported in baker.js model
    type: Schema.Types.ObjectID,
    ref: 'Baker'
  }
})

// helper methods 
breadSchema.methods.getBakedBy = function(){
  return `${this.name} was baked with love by ${this.baker.name}, who has been with us since ${this.baker.startDate.getFullYear()}. ${this.baker.name} ${this.baker.bio} `
}

breadSchema.methods.getBakedByIndex = function(){
    return `Baked by ${this.baker.name}`
}

// model and export 
const Bread = mongoose.model('Bread', breadSchema)
module.exports = Bread
