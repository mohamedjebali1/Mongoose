const mongoose = require('mongoose');
//Create a person having this prototype:

const PersonSchema  = mongoose.Schema({
    name : { type: String, required: true },
    age : Number,
    favoriteFoods : [String]
});

const Person = mongoose.model('Person', PersonSchema);
module.exports = Person;
