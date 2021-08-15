//express 框架
const express = require('express')
const app = express()
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

//登出登入
const session = require('express-session')
const usePassport = require('./config/passport')

//畫面, 資料
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const dateStyle = require('./tools/helper')
const flash = require('connect-flash')

app.use(express.static('public'))
require('./config/mongoose')

//連線
const methOverride = require('method-override')
const routes = require('./routes')
const PORT = process.env.PORT

//模板引擎
app.engine('handlebars', exphbs({ 
  defaultLayout: 'main',
  helpers: { dateStyle }
}))
app.set('view engine', 'handlebars') //啟用模板引擎

//認證結果處理
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

//每筆資料前處理使用body-parser
app.use(bodyParser.urlencoded({ extended: true}))

//每筆資料都通過method override前處理
app.use(methOverride('_method'))

usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use(routes)

app.listen(PORT, () => {
  console.log(`Express is listen on localhost${PORT}`)
})