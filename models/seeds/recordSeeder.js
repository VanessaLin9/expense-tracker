const db = require('../../config/mongoose')
const expense = require('../record')

db.once('open', () =>{
  console.log('done!')
})