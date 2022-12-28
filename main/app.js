'use strict'
const express = require('express')
const app = express()
app.use(express.static('./scr/public'))
module.exports = app