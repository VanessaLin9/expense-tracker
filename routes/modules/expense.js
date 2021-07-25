const express = require('express')
const router = express.Router()
const Expen = require('../../models/record')
const Category = require('../../models/category')
const record = require('../../models/record')


//新增
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', async(req, res) => {
  try {
    const { name, category, date, amount } = req.body
    const recode = {
      name,
      date,
      categoryType: category,
      amount
    }

    await Category.findOne({ title: category})
          .then( category => {
            console.log('find category', category)
            record.category = category._id
          })

    return Expen.create(recode)
      .then(() => res.redirect('/'))
      .catch(error => console.log(error))

  } catch (error) {
    console.log(error)
    res.render('new', {Error})
  }
  
})

//編輯
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Expen.findById(id)
    .lean()
    .then(expense => {
      const Date = expense.date.toLocaleDateString({ year: 'numeric', month: '2-digit', day: '2-digit' })
      res.render('edit', { expense, Date })
    })
    .catch(error => console.log(error))
})
router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, category, date, amount } = req.body
  return Expen.findById(id)
    .then(expense => {
      expense.name = name
      expense.categoryType = category
      expense.date = date
      expense.amount = amount
      return expense.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//刪除
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Expen.findById(id)
    .then(expense => expense.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router