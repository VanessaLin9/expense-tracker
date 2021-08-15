const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')
const dateStyle = require('../../tools/helper')

//首頁
router.get('/', (req, res) => {
  const selectedCategory = req.query.filter
  const selectedMonth = Number(req.query.month)
  const userId = req.user._id

  //filter
  const filter = {}
  const filterMonth = {}

  filter.userId = userId
  
  console.log(selectedMonth)
  if (selectedCategory) { filter.categoryType = selectedCategory }
  if (selectedMonth) { filterMonth.month = selectedMonth }
  console.log(filter)
  
    Promise.all([
      Category.find().lean(),
      Record.find(filter).populate('category', { icon: 1 }).lean(),
      Record.aggregate([
          { $project: { name: 1, category: 1, categoryType: 1, date: 1, amount: 1, merchant: 1, userId: 1, month: { $month: '$date' } } },
          { $match: filterMonth }
        ])
    ])
      .then(values => {
        console.log(values)
        const [categories, records, months] = values
        let totalAmount = 0
        records.forEach(record => {
          totalAmount += record.amount
        })

        res.render('index', { records, totalAmount, categories, months})
      })
      .catch (error => console.log(error))
  
  
})


  module.exports = router