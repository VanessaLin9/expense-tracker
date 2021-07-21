const db = require('../../config/mongoose')
const expense = require('../expense')

db.once('open', () =>{
  console.log('done!')
})