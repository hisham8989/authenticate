const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 8000
const expressLayouts = require('express-ejs-layouts')
const db = require('./config/mongoose')
const session = require('express-session')
const path = require('path')



// serving static files & Config for redering html files
app.set('view engine','ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({extended:true}))
app.use(express.static('./assets'))

app.use(expressLayouts)

app.set('layout extractStyles',true)
app.set('layout extractScripts',true)

app.use('/',require('./routes'))

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})