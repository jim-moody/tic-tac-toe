'use strict'

import store from '../store'
// import {checkForWinner} from './helpers'
import api from './api'
import ui from './ui'
import { boardTiles } from './selectors'

const onTileClick = (event) => {
  console.log(store)
  const target = $(event.target)
  // if the cell is empty, set the text to be whatever the current marker is
  if (!target.text()) {
    target.text(store.currentPlay)
    store.currentPlay = store.currentPlay === 'X'
      ? 'O'
      : 'X'

    $('#next-play').text(store.currentPlay)
    const cell = {
      index: target.data('cell'),
      value: target.text()
    }
    const gameId = store.currentGame.id

    api.updateGame(cell, gameId)
      .then(ui.onUpdateGameSuccess)
      .catch(ui.onUpdateGameFailure)
  }
}

// Initiated by user action or by page load/refresh
const onNewGame = () => {
  // first play is always an "X"
  store.currentPlay = 'X'
  // create game in database, then update store
  api.createGame().then(ui.onNewGameSuccess).catch(ui.onNewGameFailure)
  // clear the board of all text
  boardTiles.text('')
  // resets the tile clicks
  boardTiles.off('click', onTileClick)
  boardTiles.on('click', onTileClick)
}

const addEventHandlers = () => {
  boardTiles.on('click', onTileClick)
  $('#new-game').on('click', onNewGame)
}

module.exports = {
  onNewGame,
  addEventHandlers,
  onTileClick
}
