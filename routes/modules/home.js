const express = require('express')
const router = express.Router()

const Expen = require('../../models/record')

//首頁
router.get('/', (req, res) => {
  Expen.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(expense => {
      res.render('index', { expense})
    })
    .catch(error => console.error(error))
})



module.exports = router