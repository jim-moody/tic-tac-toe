'use strict'
import store from '../store'
import { determineOutcome } from './helpers'
import { boardTiles } from './selectors'

const onNewGameSuccess = ({game}) => {
  store.currentGame = game
  console.log(store.currentGame)
}
const onNewGameFailure = (data) => {
  console.log(data)
}
const onUpdateGameSuccess = (data) => {
  if (determineOutcome().over) {
    // set the header text to the winning marker
    $('h1').text('Winner = ' + determineOutcome().winner)
    // turn off the click handlers on the board
    boardTiles.off('click')
  }
  console.log(data)
}
const onUpdateGameFailure = (data) => {
  console.log(data)
}
module.exports = {
  // handleWinner,
  onNewGameSuccess,
  onNewGameFailure,
  onUpdateGameSuccess,
  onUpdateGameFailure
}
