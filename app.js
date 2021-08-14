//express 框架
const express = require('express')
const app = express()


//畫面, 資料
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const dateStyle = require('./tools/helper')

app.use(express.static('public'))
require('./config/mongoose')

//連線
const methOverride = require('method-override')
const routes = require('./routes')
const PORT = process.env.PORT || 3000

//模板引擎
app.engine('handlebars', exphbs({ 
  defaultLayout: 'main',
  helpers: { dateStyle }
}))
app.set('view engine', 'handlebars') //啟用模板引擎



//每筆資料前處理使用body-parser
app.use(bodyParser.urlencoded({ extended: true}))

//每筆資料都通過method override前處理
app.use(methOverride('_method'))

app.use(routes)

app.listen(PORT, () => {
  console.log(`Express is listen on localhost${PORT}`)
})