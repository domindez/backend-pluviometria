import mongoose = require('mongoose')
const Schema = mongoose.Schema

const pluvioDataSchema = new Schema({
  fecha: Date,
  litros: Number
})

// Crear modelo
const PluvioData = mongoose.model('castillolluvias', pluvioDataSchema)

export default PluvioData
