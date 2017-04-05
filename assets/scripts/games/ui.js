'use strict'
import store from '../store'
import { determineOutcome } from './helpers'
import { boardTiles, gameBoardContainer } from './selectors'

const onNewGameSuccess = ({game}) => {
  $('h1').text('')
  gameBoardContainer.show()
  store.currentGame = game
  console.log(store.currentGame)
}
const onNewGameFailure = (data) => {
  console.log(data)
}
const onUpdateGameSuccess = ({game}) => {
   console.log(game)
  if (game.over) {
    // set the header text to the winning marker
    $('h1').text('Winner = ' + determineOutcome(game.cells).winner)
    // turn off the click handlers on the board
    boardTiles.off('click')
  }
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
