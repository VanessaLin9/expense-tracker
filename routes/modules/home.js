const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

//首頁
router.get('/', async(req, res) => {
  const selectedCategory = req.query.filter
  const userId = req.user._id
  const filter = {}

  filter.userId = userId
  if (selectedCategory) { filter.categoryType = selectedCategory }
  
  try {
    await Record.find(filter)
      .populate('category', { icon: 1 })
      .lean()
      .sort({ _id: 'asc' })
      .then(records => {
        let totalAmount = 0
        records.forEach(record => {
          totalAmount += record.amount
        })

        res.render('index', { records, totalAmount })
      })
  } catch (error){
    console.log(error)
  }
  
})


  module.exports = router