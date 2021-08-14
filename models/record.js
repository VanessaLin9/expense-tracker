const mongoose = require('mongoose')
const Schema = mongoose.Schema


const expenseSchema = new Schema ({
  name: {
    type: String, 
    required: true 
  },
  date: {
    type: Date,
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    index: true,
    required: true
  },
  categoryType: {
    type: String,
    required: true
  },
  merchant:{
   type: String
  },
  amount: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Record', expenseSchema)