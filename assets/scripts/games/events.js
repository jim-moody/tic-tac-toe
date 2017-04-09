'use strict'

import store from '../store'
import {determineOutcome, getRandomEmptyCell} from './helpers'
import api from './api'
import gameSelectors from './selectors'
import ui from './ui'

const computerPlay = () => {
  // get a random cell that is empty
  // this AI is pretty dumb :)
  const cell = getRandomEmptyCell()

  // set the target to be the random cell
  // this is just to keep the code consistent with onTileClick
  const target = cell

  // if the cell is empty, continue, else dont do anything
  if (!target.text()) {
    // set the text to be whatever the current play is
    target.text(store.currentPlay)

    // update the store to be the next play
    store.currentPlay = store.currentPlay === 'X'
      ? 'O'
      : 'X'

    // turn off the click events until we have finished our api call
    if (!determineOutcome().over) {
      gameSelectors.gameBoard.cells.on('click', onTileClick)
    }

    // highlight the current play for the user so they know if the next
    // play is an X or an O
    ui.highlightCurrentPlay(store.currentPlay)

    // turn clicks off and back on so we dont get duplicate events
    resetTileClicks()

    // get the data to send to the backend
    const data = getUpdateGameData(target)

    // save the new data to the database
    api.updateGame(data)

    // pass in the data and a callback to have the computer make a play
    .then((data) => ui.onUpdateGameSuccess(data, computerPlay))
    .catch(ui.onUpdateGameFailure)
  }
}
const getUpdateGameData = (cellTarget) => {
  // get the current gameId from the store to save to database
  const gameId = store.currentGame.id

  // see if the game is over so we can save it to db
  const over = determineOutcome().over

  // set the correct index and value for updating db
  const index = cellTarget.data('cell')
  const value = cellTarget.text()

  // create the data object
  const data = {
    over,
    cell: {
      index,
      value
    },
    gameId
  }
  // create a new object with updated data for db
  return data
}
const onTileClick = (event) => {
  const target = $(event.target)

  // if the cell is empty and its not the computers turn
  // continue, else dont do anything
  if (!target.text() && !store.computersTurn) {
    // set the text to be whatever the current play is
    target.text(store.currentPlay)
    store.currentPlay = store.currentPlay === 'X'
      ? 'O'
      : 'X'

    // turn off the click events until we have finished our api call
    if (determineOutcome().over || store.computersTurn) {
      gameSelectors.gameBoard.cells.off('click')
    }

    // highlight the current play for the user so they know if the next
    // play is an X or an O
    ui.highlightCurrentPlay(store.currentPlay)

    // get the data associated with this cell to save to db
    const data = getUpdateGameData(target)

    // save the new data to the database
    api.updateGame(data)
    .then((data) => ui.onUpdateGameSuccess(data, computerPlay))
    .catch(ui.onUpdateGameFailure)
  }
}

// Initiated by sign in success or by page load/refresh
const onNewGame = () => {
  // whenever there is a new game, the first play is always an "X"
  store.currentPlay = 'X'

  // creates game in database and handles success/fail
  api.createGame().done(resetTileClicks).then(ui.onNewGameSuccess).catch(ui.onNewGameFailure)
}

// this resets the tile click events. It should really be in the
// ui.newGameSuccess method but becaue its a circular dependency
// we have to pass it into the .done function
const resetTileClicks = () => {
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
