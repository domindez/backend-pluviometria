/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express = require('express')
import PluvioData from '../models/pluvioData'
import Counter from '../models/counter'

const routerNewMail = express.Router()

routerNewMail.get('/', async (req, res) => {
  try {
    let counter = await Counter.findOne()
    if (counter) {
      counter.count = (counter.count || 0) + 1
      await counter.save()
    } else {
      counter = new Counter({ count: 1 })
      await counter.save()
    }

    const data = await PluvioData.find()
    const completeData = {
      data,
      counter
    }
    res.send(completeData)
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: 'An error occurred' })
  }
})

module.exports = routerNewMail
