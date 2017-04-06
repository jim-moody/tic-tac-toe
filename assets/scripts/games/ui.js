'use strict'
import store from '../store'
import {determineOutcome, getGameStatistics} from './helpers'
import {boardTiles, gameBoardContainer, gameStatisticsContainer} from './selectors'
import {hideAllContainers} from '../helpers'
import {OUTCOME} from './constants'

const onNewGameSuccess = ({game}) => {
  $('h1').text('')
  hideAllContainers()
  gameBoardContainer.show()
  store.currentGame = game
  console.log(store.currentGame)
}
const onNewGameFailure = (data) => {
  console.log(data)
}
const onUpdateGameSuccess = ({game}) => {
  if (game.over) {
    const {winner} = determineOutcome(game.cells)
    if (winner === OUTCOME.DRAW) {
      // set the header text to the winning marker
      $('#winner-header').text('Draw')
    } else {
      $('#winner-header').text(winner + ' wins!')
    }
    // turn off the click handlers on the board

    boardTiles.off('click')
  }
}

const onUpdateGameFailure = (data) => {
  console.log(data)
}
const onShowStatisticsSuccess = ({games}) => {
  // get the data from the user's games
  const {wins, losses, draws, winPercentage} = getGameStatistics(games)

  // set the text for each of the relevant data pieces
  gameStatisticsContainer.wins.text(wins)
  gameStatisticsContainer.losses.text(losses)
  gameStatisticsContainer.draws.text(draws)
  gameStatisticsContainer.winPercentage.text(winPercentage(1) + '%')

  // clear the screen
  hideAllContainers()

  // show the game stats
  gameStatisticsContainer.container.show()
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
