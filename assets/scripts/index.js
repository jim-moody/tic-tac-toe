'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
import { addEventHandlers } from './games/events'
import { addHandlers } from './auth/events'
import { addMenuHandlers } from './menu/events'

$(() => {
  setAPIOrigin(location, config)
  // onNewGame()
  addEventHandlers()
  addHandlers()
  addMenuHandlers()
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
require('./example')
