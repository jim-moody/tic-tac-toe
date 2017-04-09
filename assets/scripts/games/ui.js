'use strict'
import store from '../store'
import {determineOutcome, getGameStatistics} from './helpers'
import gameSelectors from './selectors'
import {hideAllContainersExcept, hideAllAlerts} from '../helpers'
import {OUTCOME} from './constants'

const onNewGameSuccess = ({game}) => {
  // clear the "winner" alert
  gameSelectors.gameBoard.resultOverlay.slideUp()

  // clear the screen
  hideAllAlerts()
  hideAllContainersExcept(gameSelectors.gameBoard.container)

  // clear the board of all text
  gameSelectors.gameBoard.cells.text('')

  // highlight the correct turn
  highlightCurrentPlay(store.currentPlay)

  // show the game board if hidden
  !gameSelectors.gameBoard.container.is(':visible') && gameSelectors.gameBoard.container.slideDown()

  // set the current game to the store
  store.currentGame = game
}
const onNewGameFailure = (data) => {
  // TODO update this
  console.log(data)
}
const onUpdateGameSuccess = ({game}) => {
  // if the game is over
  if (game.over) {
    const {winner} = determineOutcome(game.cells)
    if (winner === OUTCOME.DRAW) {
      // set the text to be that it was a draw
      gameSelectors.gameBoard.resultOverlay.text('Draw')
    } else {
      // set the text to be who won
      gameSelectors.gameBoard.resultOverlay.text(winner + ' wins!')
    }
    // display the outcome to the user
    gameSelectors.gameBoard.resultOverlay.slideDown()
  } else {
    // highlight the current play for the user so they know if the next
    // play is an X or an O
    // highlightCurrentTurn(store.currentPlay)
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

// toggles which player is highlighted
// this is used to show who's turn it is
const highlightCurrentPlay = (currentPlay) => {
  const x = $('#player-x-title')
  const o = $('#player-o-title')

  // if current play is x, highlight the X player
  if (currentPlay === 'X') {
    x.addClass('is-active')
    o.removeClass('is-active')

  // if the current play is O, highlight the O player
  } else if (currentPlay === 'O') {
    o.addClass('is-active')
    x.removeClass('is-active')
  }
}
module.exports = {
  // handleWinner,
  onNewGameSuccess,
  onNewGameFailure,
  onUpdateGameSuccess,
  onUpdateGameFailure,
  onShowStatisticsSuccess,
  onShowStatisticsFailure,
  highlightCurrentPlay
}
