'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
import { onNewGame, addEventHandlers } from './games/events'
import store from './store'

$(() => {
  setAPIOrigin(location, config)
  store.user = {
    id: 1,
    email: 'test@test.com',
    token: 'BAhJIiU0ODYzODQ2MDdlOWM4YTExMDk5MDNiNzkyNzdkYzU0MgY6BkVG--b7efdae2dfa113887146b3554a675d80586a0794'
  }
  onNewGame()
  addEventHandlers()
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
require('./example')
