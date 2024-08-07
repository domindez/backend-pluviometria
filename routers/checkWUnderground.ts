/* eslint-disable @typescript-eslint/no-misused-promises */
import express = require('express')
import puppeteer, { type Browser } from 'puppeteer'
import PluvioData from '../models/pluvioData'
import * as moment from 'moment-timezone'

const routerCheckWUnderground = express.Router()

routerCheckWUnderground.get('/', async (req, res) => {
  let browser: Browser | null = null
  try {
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    const page = await browser.newPage()
    await page.goto('https://www.wunderground.com/dashboard/pws/ICASTI60', {
      waitUntil: 'networkidle2'
    })

    await page.waitForSelector('.weather__data .weather__text .wu-unit-rain .wu-value', { timeout: 10000 })

    const precipAccumValue = await page.evaluate(() => {
      const precipAccumSpan = document.querySelector('.weather__data .weather__text .wu-unit-rain .wu-value')
      return precipAccumSpan?.textContent?.trim() ?? null
    })

    console.log('Valor de precipitación acumulada:', precipAccumValue)

    const depuredValue = parseFloat((parseFloat(precipAccumValue ?? '0') * 25.4).toFixed(1))

    if (depuredValue > 1) {
      const today = moment.tz('Europe/Madrid').startOf('day').toISOString()

      const filter = { fecha: new Date(today) }
      const update = { $set: { litros: depuredValue } }
      const options = { upsert: true, new: true }

      const updatedDocument = await PluvioData.findOneAndUpdate(filter, update, options)
      console.log('Documento actualizado:', updatedDocument)
      res.sendStatus(200)
    } else {
      console.log('El valor de precipitación acumulada es menor o igual a 1, no se actualiza/crea en la base de datos.')
      res.sendStatus(200)
    }
  } catch (error) {
    console.error('Error al realizar la petición:', error)
    res.status(500).send('Error interno del servidor')
  } finally {
    if (browser !== null) {
      await browser.close()
    }
  }
})

module.exports = routerCheckWUnderground
