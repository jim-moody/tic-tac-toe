'use strict'

import store from '../store'
import {determineOutcome} from './helpers'
import api from './api'
import gameSelectors from './selectors'
import ui from './ui'

const onTileClick = (event) => {
  const target = $(event.target)

  // if the cell is empty, continue, else dont do anything
  if (!target.text()) {
    // set the text to be whatever the current play is
    target.text(store.currentPlay)
    store.currentPlay = store.currentPlay === 'X'
      ? 'O'
      : 'X'

    // turn off the click events until we have finished our api call
    if (determineOutcome().over) {
      gameSelectors.gameBoard.cells.off('click')
    }

    // highlight the current play for the user so they know if the next
    // play is an X or an O
    ui.highlightCurrentPlay(store.currentPlay)

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
    .then(ui.onUpdateGameSuccess).catch(ui.onUpdateGameFailure)
  }
}

// Initiated by sign in success or by page load/refresh
const onNewGame = () => {
  // whenever there is a new game, the first play is always an "X"
  store.currentPlay = 'X'

  // this resets the tile click events. It should really be in the
  // ui.newGameSuccess method but becaue its a circular dependency
  // we have to pass it into the .done function
  const resetTileClicks = () => {
    gameSelectors.gameBoard.cells.off('click', onTileClick)
    gameSelectors.gameBoard.cells.on('click', onTileClick)
  }

  // creates game in database and handles success/fail
  api.createGame().done(resetTileClicks).then(ui.onNewGameSuccess).catch(ui.onNewGameFailure)
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
