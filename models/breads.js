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
    //ref to baker collection / model
    type: Schema.Types.ObjectID,
    ref: 'Baker'
  }
})

// helper methods 
breadSchema.methods.getBakedBy = function(){
    return `${this.name} was baked with love by ${this.baker}`
  }

breadSchema.methods.getBakedByIndex = function(){
    return `Baked with love by ${this.baker}`
}

// //static
// breadSchema.static.bakerBreads = function (inputBaker) {
//    return this.find({baker: inputBaker}).then(bakerBreads => {
//         console.log(bakerBreads);
//         res.send('BakersPage');
//     })
// }

// model and export 
const Bread = mongoose.model('Bread', breadSchema)
module.exports = Bread
