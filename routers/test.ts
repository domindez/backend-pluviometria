import express = require('express')

const routerNewMail = express.Router()

routerNewMail.get('/', async (req, res) => {
  try {
    console.log('test')
    res.send('test')
  } catch (error) {
    console.log(error)
  }
})

module.exports = routerNewMail
