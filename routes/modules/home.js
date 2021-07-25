const express = require('express')
const router = express.Router()

const Expen = require('../../models/record')
const Category = require('../../models/category')

//首頁
router.get('/', (req, res) => {
  const Cate = req.query.filter
  const filter = {}


  if (Cate) { filter['category'] = Cate }

  console.log(filter)

  const categories = []

  Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(category => categories.push(...category))
    .catch(error => console.error(error))

  Expen.find(filter)
    .populate('Category')
    .lean()
    .then(records => {
      let totalAmount = 0
      records.forEach(record => totalAmount += record.amount)
      res.render('index', { records, totalAmount })
    })

    .catch(error => console.error(error))
})



module.exports = router