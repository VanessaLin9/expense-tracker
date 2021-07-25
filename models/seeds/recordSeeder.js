const db = require('../../config/mongoose')
const Expen = require('../record')
const Category = require('../category')

const sample = require('./example.json')


db.once('open', () => {
  createRecords()
  console.log('recode seeder done!')
})
  .catch(error => console.log(error))

const cateId = {}

function createRecords() {

  Category.find()
    .lean()
    .then( categories => {
      
      categories.forEach( category => {
        cateId[category.title] = category._id
      })
      
      return cateId
    })
    .then(id => {

      for( let i=0; i<4; i++){
        let Sample = sample.results[i]

        Expen.create({
          name: Sample.name,
          category: cateId[Sample.category],
          categoryType: Sample.category,
          date: Sample.date,
          amount: Sample.amount
        })
        .then( record => {
          Category.findById(cateId[Sample.category])
          .then( category => {
            category.records.push(record._id)
            category.save()
          })
        })
      }
    })
    .catch(error => console.error(error))
}
 
  
  

