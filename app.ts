/* eslint-disable @typescript-eslint/no-var-requires */
import { connectDB } from './db'
import express = require('express')
import cors = require('cors')

const app = express()

const PUERTO = (process.env.PORT != null) || 4000

app.listen(PUERTO, () => { console.log(`Servidor escuchando en puerto ${PUERTO}...`) })
void connectDB()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const routerTest = require('./routers/test')
app.use('/api/test', routerTest)

const routerCheckWUnderground = require('./routers/checkWUnderground')
app.use('/api/check-wunderground', routerCheckWUnderground)
