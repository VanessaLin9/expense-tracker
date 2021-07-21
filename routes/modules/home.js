const express = require('express')
const router = express.Router()

const Expen = require('../../models/expense')

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

//編輯
router.get('/expense/:id/edit', (req, res) => {
  const id = req.params.id
  return Expen.findById(id)
    .lean()
    .then(expense => {
      const Date = expense.date.toLocaleDateString({ year: 'numeric', month: '2-digit', day: '2-digit' })
      res.render('edit', { expense, Date })
    })
    .catch(error => console.log(error))
})
router.post('/expense/:id', (req, res) => {
  const id = req.params.id
  const { name, category, date, amount } = req.body
  return Expen.findById(id)
    .then(expense => {
      expense.name = name
      expense.category = category
      expense.date = date
      expense.amount = amount
      return expense.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//刪除
router.delete('/expense/:id', (req, res) => {
  const id = req.params.id
  return Expen.findById(id)
    .then( expense => expense.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router