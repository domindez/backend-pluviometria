import mongoose = require('mongoose')
const Schema = mongoose.Schema

const testUsersSchema = new Schema({
  barName: String,
  userMail: String
})

// Crear modelo
const testUsers = mongoose.model('tests', testUsersSchema)

export default testUsers
