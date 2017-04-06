'use strict'

// import {handleWinner} from './ui'
// import store from '../store'
// import { board } from './selectors'
import {OUTCOME} from './constants'

const getCellsFromBoard = () => {
  const cells = []
  $('#board .row').toArray().forEach((row) => {
    $(row).children().toArray().forEach((div) => {
      cells.push($(div).text().toLowerCase() || '')
    })
  })
  console.log(cells)
  return cells
}

/*
returns object with following possibilities
  {
  over: true/false
  winner: 'X', 'O', 'Draw'
}
*/
const determineOutcome = (optionalCells) => {
  // console.log(getCellsFromBoard())
  const cellArray = optionalCells || getCellsFromBoard()
  // console.log(cellArray)
  const outcome = {
    over: false
  }

  const row1 = cellArray[0] + cellArray[1] + cellArray[2]
  const row2 = cellArray[3] + cellArray[4] + cellArray[5]
  const row3 = cellArray[6] + cellArray[7] + cellArray[8]
  const col1 = cellArray[0] + cellArray[3] + cellArray[6]
  const col2 = cellArray[1] + cellArray[4] + cellArray[7]
  const col3 = cellArray[2] + cellArray[5] + cellArray[8]
  const diagonal1 = cellArray[0] + cellArray[4] + cellArray[8]
  const diagonal2 = cellArray[2] + cellArray[4] + cellArray[6]
  const winningCombinations = [
    row1,
    row2,
    row3,
    col1,
    col2,
    col3,
    diagonal1,
    diagonal2
  ]
  if (winningCombinations.some((combination) => combination.toLowerCase() === 'xxx')) {
    outcome.over = true
    outcome.winner = OUTCOME.X
  } else if (winningCombinations.some((combination) => combination.toLowerCase() === 'ooo')) {
    outcome.over = true
    outcome.winner = OUTCOME.O
  } else if (cellArray.every((cell) => cell)) {
    outcome.over = true
    outcome.winner = OUTCOME.DRAW
  }
  console.log(outcome)
  return outcome
}

/*
returns object like this:
{
  wins: Number
  losses: Number
  draws: Number
  win %: String
}
*/
const calculateWinPercentage = (wins, draws, totalGames, decimalPlaces) => {
  console.log(decimalPlaces)
  if (totalGames > 0) {
    const percentage = (wins + (draws * 0.5)) / totalGames
    return (percentage * 100).toFixed(decimalPlaces)
  } else {
    return 0
  }
}
const Stats = function (wins, losses, draws) {
  this.wins = wins
  this.losses = losses
  this.draws = draws
  this.totalGames = () => {
    return this.wins + this.losses + this.draws
  }
  this.winPercentage = (decimalPlaces) => {
    return calculateWinPercentage(this.wins, this.losses, this.totalGames(), decimalPlaces)
  }
}

const getGameStatistics = (games) => {
  const wins = 0
  const losses = 0
  const draws = 0
  console.log('made it here')
  const stats = new Stats(wins, losses, draws)
  games.forEach((game) => {
    if (game.over) {
      const winner = determineOutcome(game.cells).winner
      if (winner === OUTCOME.X) {
        stats.wins++
      } else if (winner === OUTCOME.O) {
        stats.losses++
      } else if (winner === OUTCOME.DRAW) {
        stats.draws++
      }
    }
  })

  // stats.X, stats.O

  return stats
}
module.exports = {
  determineOutcome,
  getCellsFromBoard,
  getGameStatistics
}
