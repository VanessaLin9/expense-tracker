const express = require('express')
const router = express.Router()

const Expen = require('../../models/record')
const Category = require('../../models/category')

//首頁
router.get('/', (req, res) => {
  const Cate = req.query.filter
  const filter = {}
  const iconList = {
    home: '<i class="fas fa-home fa-3x"></i>',
    shuttle: '<i class="fas fa-shuttle-van fa-3x"></i>',
    entertain: '<i class="fas fa-grin-beam fa-3x"></i>',
    food: '<i class="fas fa-utensils fa-3x"></i>',
    other: '<i class="fas fa-pen fa-3x"></i>'
  }

  if (Cate) { filter['categoryType'] = Cate }


  const categories = []

  Category.find()
    .lean()
    .then(category => {
      categories.push(...category)
    })
    .catch(error => console.error(error))
     
  // if (categories.length > 0) {
  //   filter['categoryId'] = categories[0]._id
  // }

  Expen.find(filter)
    .populate('Category')
    .lean()
    .then(records => {
      let totalAmount = 0
      records.forEach(record => {
        totalAmount += record.amount
        record.iconType = iconList[record.categoryType]
        console.log(record.categoryType)
      })
      res.render('index', { records, categories,totalAmount })
    })

    .catch(error => console.error(error))
})



module.exports = router