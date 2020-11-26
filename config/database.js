const mongoose = require('mongoose')

const Database=()=>{
    mongoose.connect('mongodb://localhost/persons',
    { useNewUrlParser: true, useUnifiedTopology: true}) 
    .then(() => console.log('successfully connected  to the database  ! !'))
    .catch(() => console.log('cannot connect to the database'));}

    module.exports= Database
