const db = require('../../config/mongoose')
const Category = require('../category')


const categorySeed = [
  ['home', '<i class="fas fa-home fa-3x"></i>'],
  ['shuttle', '<i class="fas fa-shuttle-van fa-3x"></i>'],
  ['entertain', '<i class="fas fa-grin-beam fa-3x"></i>'],
  ['food', '<i class="fas fa-utensils fa-3x"></i>'],
  ['other', '<i class="fas fa-pen fa-3x"></i>']
].map(category => ({
  title: category[0],
  icon: `${category[1]}`
}))


db.once('open', () => {

  Category.create(categorySeed)
    .then(() => {
      console.log('category seeder is done!')
      return db.close()
    })
})
  .catch(error => console.log(error))