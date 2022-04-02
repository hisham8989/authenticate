const express = require('express')
const app = express()
const port = process.env.PORT || 8000
const path = require('path')

// serving static files & Config for redering html files
app.set('view engine','ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({extended:true}))
app.use(express.static('assets'))


app.use('/',require('./routes'))

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})