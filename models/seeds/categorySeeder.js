const db = require('../../config/mongoose')
const Category = require('../category')


const categorySeed = [
  ['home', 'fa-home'],
  ['shuttle', 'fa-shuttle-van'],
  ['entertain', 'fa-grin-beam'],
  ['food', 'fa-utensils'],
  ['other', 'fa-pen']
].map(category => ({
  title: category[0],
  icon: `fas ${category[1]}`
}))


db.once('open', () => {

  Category.create(categorySeed)
    .then(() => {
      console.log('category seeder is done!')
      return db.close()
    })
})
  .catch(error => console.log(error))