import mongoose = require('mongoose')
const Schema = mongoose.Schema

const counterSchema = new Schema({
  count: Number
})

// Crear modelo
const Counter = mongoose.model('counters', counterSchema)

export default Counter
