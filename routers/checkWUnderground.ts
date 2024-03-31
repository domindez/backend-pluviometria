/* eslint-disable @typescript-eslint/no-misused-promises */
// Importa las dependencias necesarias
import express = require('express')
import puppeteer from 'puppeteer'

const routerCheckWUnderground = express.Router()

routerCheckWUnderground.get('/', async (req, res) => {
  try {
    // Lanza Puppeteer
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    // Navega a la página web
    await page.goto('https://www.wunderground.com/dashboard/pws/ICASTI60', {
      waitUntil: 'networkidle2' // Espera a que la red esté inactiva (sin peticiones durante 500 ms).
    })

    // Espera a que el selector del valor de precipitación acumulada esté presente
    await page.waitForSelector('.weather__data .weather__text .wu-unit-rain .wu-value', { timeout: 10000 })

    // Extrae el texto del elemento que contiene el valor de precipitación acumulada
    const precipAccumValue = await page.evaluate(() => {
      const precipAccumSpan = document.querySelector('.weather__data .weather__text .wu-unit-rain .wu-value')
      // Utiliza el operador de encadenamiento opcional con un fallback a una cadena vacía.
      return precipAccumSpan?.textContent?.trim() ?? null
    })

    console.log('Valor de precipitación acumulada:', precipAccumValue)
    await browser.close() // Cierra el navegador

    const depuredValue = precipAccumValue ?? 0 * 2.54
    // Envía el valor extraído como respuesta
    res.send({ value: depuredValue })
  } catch (error) {
    console.error('Error al realizar la petición:', error)
    res.status(500).send('Error interno del servidor')
  }
})

module.exports = routerCheckWUnderground
