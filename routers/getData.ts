/* eslint-disable @typescript-eslint/no-misused-promises */
import express = require('express')
import PluvioData from '../models/pluvioData'

const routerNewMail = express.Router()

routerNewMail.get('/', async (req, res) => {
  try {
    const data = await PluvioData.find()
    res.send(data)
  } catch (error) {
    console.log(error)
  }
})

module.exports = routerNewMail
