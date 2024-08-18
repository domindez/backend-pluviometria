/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express = require('express')
import PluvioData from '../models/pluvioData'
import * as dotenv from 'dotenv'
dotenv.config()

const routerInsertData = express.Router()

// Endpoint para insertar o actualizar datos
routerInsertData.post('/', async (req, res) => {
  const { fecha, litros, clave } = req.body
  // Verificar la clave
  if (clave !== process.env.CLAVE) {
    return res.status(403).send({ error: 'Clave incorrecta' })
  }

  try {
    // Intentar encontrar un documento con la misma fecha
    const existingRecord = await PluvioData.findOne({ fecha })
    console.log(existingRecord)
    if (existingRecord) {
      // Si el documento existe, actualizar el valor de litros
      existingRecord.litros = litros
      await existingRecord.save()
      res.send({ message: 'Datos actualizados correctamente', data: existingRecord })
    } else {
      // Si el documento no existe, crear uno nuevo
      const newRecord = new PluvioData({ fecha, litros })
      await newRecord.save()
      res.send({ message: 'Datos insertados correctamente', data: newRecord })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: 'An error occurred' })
  }
})

module.exports = routerInsertData
