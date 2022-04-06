const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 8000
const expressLayouts = require('express-ejs-layouts')
const db = require('./config/mongoose')
const path = require('path')

// use for session cookie
const session = require('express-session')
const passport = require('passport')
const passportLocal = require('./config/passport-local-strategy')



/** 
 * Settings for Views and View - helpers
 */
app.use(express.urlencoded({extended:true}))

app.use(cookieParser())

app.use(express.static('./assets'))

app.use(expressLayouts)

app.set('layout extractStyles',true)
app.set('layout extractScripts',true)

/** End of Views settings */


app.use('/',require('./routes'))

// serving static files & Config for redering html files
app.set('view engine','ejs')
app.set('views', path.join(__dirname, 'views'))

/** Sessions settings or decrypting middleware */

app.use(session({
  name:'auth',
  // TODO changes in secret
  secret:'menibataunga',
  saveUninitialized:true,
  resave:false,
  cookie:{
    maxAge:(1000*60*100)
  }
}))

app.use(passport.initialize())
app.use(passport.session())

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})