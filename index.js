const express =require('express');
const app = express();
const port = 3000
const Database = require('./config/database')
app.use(express.json());
app.use('/', require('./routers/person'))



app.listen(port,e=>{
    console.log(`server is running on port ${port} `)
})
Database()