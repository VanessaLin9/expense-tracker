const express = require('express')
const router = express.Router()

const Expen = require('../../models/expense')

//首頁
router.get('/', (req, res) => {
  Expen.find()
      .lean()
      .sort({_id: 'asc'})
      .then( expense => res.render('index', {expense}))
      .catch( error => console.error(error))
})

//新增
router.get('/expense/new', (req, res) => {
  res.render('new')
})

router.post('/expense', (req, res) => {
  const { name, category, date, amount } = req.body

  return Expen.create({ name, category, date, amount })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router