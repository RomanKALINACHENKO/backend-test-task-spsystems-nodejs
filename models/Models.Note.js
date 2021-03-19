const {Schema, model, Types} = require('mongoose')

const Note = new Schema({
    name: {type: String, required: true }, 
    description: {type: String, required: true },
    relevance: {type: String, required: true},
    category: {type: String, required: true }
    
},{
    
})

module.exports = model('Note', Note)
