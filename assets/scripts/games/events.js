'use strict'

import store from '../store'
import { determineOutcome } from './helpers'
import api from './api'
import ui from './ui'
import gameSelectors from './selectors'

const onTileClick = (event) => {
  const target = $(event.target)

  // if the cell is empty, set the text to be whatever the current play is
  if (!target.text()) {
    target.text(store.currentPlay)
    store.currentPlay = store.currentPlay === 'X'
      ? 'O'
      : 'X'

    // Show the next play to the user
    // $('#next-play').text(store.currentPlay)

    // determine if this game is over so it can be saved to db
    const over = determineOutcome().over

    // set the correct index and value for updating db
    const index = target.data('cell')
    const value = target.text()

    // create a new object with updated data for db
    const cell = {
      index,
      value
    }

    // get the current gameId from the store to save to database
    const gameId = store.currentGame.id

    // save the new data to the database
    api.updateGame(cell, gameId, over)
      .then(ui.onUpdateGameSuccess)
      .catch(ui.onUpdateGameFailure)
  }
}

// Initiated by sign in success or by page load/refresh
const onNewGame = () => {
  // whenever there is a new game, the first play is always an "X"
  store.currentPlay = 'X'

  // creates game in database
  api.createGame().then(ui.onNewGameSuccess).catch(ui.onNewGameFailure)

  // this resets the tile click events. It should really be in the
  // ui.newGameSuccess method but for some reason this wont work in that file if
  // anyone can figure out why, let me know
  gameSelectors.gameBoard.cells.off('click', onTileClick)
  gameSelectors.gameBoard.cells.on('click', onTileClick)
}

const addGameEventHandlers = () => {
  // adds the click events for the gameboard
  gameSelectors.gameBoard.cells.on('click', onTileClick)
  gameSelectors.newGame.on('click', onNewGame)
}

module.exports = {
  onNewGame,
  addGameEventHandlers,
  onTileClick
}
