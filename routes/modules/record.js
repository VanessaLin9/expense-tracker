const express = require('express')
const router = express.Router()

const Category = require('../../models/category')
const Record = require('../../models/record')


//新增
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', async(req, res) => {
  try {
    const { name, category, date, amount, merchant } = req.body
    const userId = req.user._id
    const recode = {
      name,
      date,
      categoryType: category,
      amount,
      merchant,
      userId
    }

    await Category.findOne({ title: category})
          .then( category => {
            recode.category = category._id 
          })
          

    return Record.create(recode)
      .then(() => res.redirect('/'))
      .catch(error => console.log(error))

  } catch (error) {
    console.log(error)
    res.render('new', {Error})
  }
  
})

//編輯
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .lean()
    .then(expense => {
      const Date = expense.date.toLocaleDateString({ year: 'numeric', month: '2-digit', day: '2-digit' })
      res.render('edit', { expense, Date })
    })
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, category, date, amount, merchant } = req.body
  return Record.findOne({ _id, userId })
    .then(expense => {
      expense.name = name
      expense.categoryType = category
      expense.date = date
      expense.amount = amount
      expense.merchant = merchant
      return expense.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//刪除
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then(expense => expense.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router