'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
import { addGameEventHandlers } from './games/events'
import { addAuthEventHandlers } from './auth/events'
import { addMenuHEventandlers } from './menu/events'

$(() => {
  setAPIOrigin(location, config)
  addGameEventHandlers()
  addAuthEventHandlers()
  addMenuHEventandlers()
})
