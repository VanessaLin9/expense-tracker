const express = require('express')
const router = express.Router()

const Expen = require('../../models/record')
const Category = require('../../models/category')

//首頁
router.get('/', (req, res) => {
  const Cate = req.query.filter
  const filter = {}
  console.log(Cate)

  if (Cate) { filter['category'] = Cate }
  console.log(filter)

  const categories = []
  Category.find()
    .lean()
    .then(category => {
      categories.push(...category)
      console.log(categories)
    })
    .catch(error => console.log(error))

  
  Expen.find(filter)
    .populate(categories)
    .lean()
    .sort({ _id: 'asc' })
    .then(records => {
      console.log(records)
      let totalAmount = 0
      records.forEach(record => totalAmount += record.amount)
      res.render('index', { records, totalAmount})
    })
    .catch(error => console.error(error))
})



module.exports = router