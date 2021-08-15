const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const Record = require('../record')
const Category = require('../category')
const User = require('../user')

const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678',
  record:[
    ['出乃玩', '2020-01-01', 'entertain', '123', '大魯閣'],
    ['午餐', '2020-01-02', 'food', '105', '大麥克'],
    ['飛向日本GOGO', '2020-01-06', 'shuttle', '18000', '蜜桃航空'],
    ['吃土養房東', '2020-01-15', 'home', '8500', '房東']
  ]
}

db.once('open', () => {
  createRecords()
})
  .catch(error => console.log(error))



function createRecords() {

  const categoryList = {}

  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      Category.find()
        .lean()
        .then(categories => {
          categories.forEach(category => {
            categoryList[category.title] = category._id
            console.log(categoryList)
          })
          return SEED_USER.record.map(record => ({
            name: record[0],
            date: record[1],
            category: categoryList[record[2]],
            categoryType: record[2],
            amount: record[3],
            merchant: record[4],
            userId: user._id
          }))
        })
        .then(recordSeedData => {
          Record.create(recordSeedData)
            .then(() => {
              console.log('Record seeder done.')
              return db.close()
            })
        })
    })
    
    
  
    .catch(error => console.error(error))
}
 
  
  

