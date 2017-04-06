'use strict'
import store from '../store'
import {determineOutcome, getGameStatistics} from './helpers'
import gameSelectors from './selectors'
import {hideAllContainersExcept, hideAllAlerts} from '../helpers'
import {OUTCOME} from './constants'

const onNewGameSuccess = ({game}) => {
  // clear the "winner" alert
  $('#winner-header').hide('slow')

  // clear the screen
  hideAllAlerts()
  hideAllContainersExcept([gameSelectors.gameBoard.container])

  // clear the board of all text
  gameSelectors.gameBoard.cells.text('')

  // // show the game board if hidden
  !gameSelectors.gameBoard.container.is(':visible') && gameSelectors.gameBoard.container.slideDown()

  // set the current game to the store
  store.currentGame = game
}
const onNewGameFailure = (data) => {
  console.log(data)
}
const onUpdateGameSuccess = ({game}) => {
  // if the game is over
  if (game.over) {
    const {winner} = determineOutcome(game.cells)
    if (winner === OUTCOME.DRAW) {
      // set the text to be that it was a draw
      $('#winner-header').text('Draw')
    } else {
      // set the text to be who won
      $('#winner-header').text(winner + ' wins!')
    }
    // display the outcome to the user
    $('#winner-header').slideToggle()
    // turn off the click handlers on the board because the game is over
    gameSelectors.gameBoard.cells.off('click')
  }
}

const onUpdateGameFailure = (data) => {
  console.log(data)
}
const onShowStatisticsSuccess = ({games}) => {
  // get the data from the user's games
  const {wins, losses, draws, winPercentage} = getGameStatistics(games)

  // set the text for each of the relevant data pieces
  gameSelectors.gameStatistics.wins.text(wins)
  gameSelectors.gameStatistics.losses.text(losses)
  gameSelectors.gameStatistics.draws.text(draws)
  gameSelectors.gameStatistics.winPercentage.text(winPercentage(1) + '%')

  // clear the screen
  hideAllContainersExcept()

  // show the game stats
  gameSelectors.gameStatistics.container.show()
}
const onShowStatisticsFailure = (error) => {
  console.error(error)
}
module.exports = {
  // handleWinner,
  onNewGameSuccess,
  onNewGameFailure,
  onUpdateGameSuccess,
  onUpdateGameFailure,
  onShowStatisticsSuccess,
  onShowStatisticsFailure
}
