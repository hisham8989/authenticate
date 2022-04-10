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
const passportGoogle = require('./config/passport-google-oauth2-strategy')
const MongoStore = require('connect-mongo')

const flash = require('connect-flash')
const customM = require('./config/middleware')

/**
 * Settings for Views and View - helpers
 */
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

app.use(express.static('./assets'))

app.use(expressLayouts)

app.set('layout extractStyles', true)
app.set('layout extractScripts', true)

/** End of Views settings */

// serving static files & Config for redering html files
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

/** Sessions settings or decrypting middleware */

app.use(
  session({
    name: 'auth',
    // TODO changes in secret
    secret: 'menibataunga',
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create({
      mongoUrl: db._connectionString,
      autoRemove: 'disabled',
    },function (err) {
      console.log.log(err || 'connect mongo setup ok')
    }),
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.use(passport.setAuthenticatedUser)

/** Using suctom middleware for flashing messages */
app.use(flash())
app.use(customM.setFlash)

app.use('/', require('./routes'))

app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`)
})
