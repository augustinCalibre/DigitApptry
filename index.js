

const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const bodyParser = require('body-parser')
const routes=require('./routes/root')
const passport =require('passport')

const port=3000;

connectDB()

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport.initialize())
require('./config/passport')(passport)




app.use('/v1',routes);

app.listen(process.env.PORT || port,()=> console.log(`Server running in  ${port}`))

