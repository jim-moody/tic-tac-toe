'use strict'

// import {handleWinner} from './ui'
// import store from '../store'
// import { board } from './selectors'
import {OUTCOME} from './constants'
import {onTileClick} from './events'
import gameSelectors from './selectors'

// TODO use this for AI
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min
}

// get all the text from all the cells in the RENDERED board into an array
// if a cell is empty, set its value to be '' in the arrray
const getCellsFromBoard = () => {
  const cells = []
  $('#board .row').toArray().forEach((row) => {
    $(row).children().toArray().forEach((div) => {
      cells.push($(div).text().toLowerCase() || '')
    })
  })
  return cells
}

// TODO use this for AI
const getRandomEmptyCell = () => {
  let index = 0
  // get all the cells from the board in array of text format
  const cells = getCellsFromBoard()

  // get cells in an indexed array of objects (index, value)
  const indexedCells = cells.map((e, i) => {
    return {index: i, value: e}
  })

  // filter the array into only the empty cells
  const emptyCells = indexedCells.filter((cell) => !cell.value)

  // set the index to be a random index of an empty cell
  if (emptyCells.length > 0) {
    const randomIndex = getRandomInt(0, emptyCells.length)
    index = emptyCells[randomIndex].index
  }

  // get the jquery element from the index

  return $(gameSelectors.gameBoard.cells[index])
}

// returns an outcome object
const determineOutcome = (optionalCells) => {
  // if no cells are passed in, just determine the outcome of the current rendered board
  const cellArray = optionalCells || getCellsFromBoard()

  // create initial outcome object and assume the game is not over
  const outcome = {
    over: false
  }

  // get all the possible combinations of cells that could win:
  // 3 rows, 3 columns, 2 diagonals
  const row1 = cellArray[0] + cellArray[1] + cellArray[2]
  const row2 = cellArray[3] + cellArray[4] + cellArray[5]
  const row3 = cellArray[6] + cellArray[7] + cellArray[8]
  const col1 = cellArray[0] + cellArray[3] + cellArray[6]
  const col2 = cellArray[1] + cellArray[4] + cellArray[7]
  const col3 = cellArray[2] + cellArray[5] + cellArray[8]
  const diagonal1 = cellArray[0] + cellArray[4] + cellArray[8]
  const diagonal2 = cellArray[2] + cellArray[4] + cellArray[6]

  // put the winning combinations into an array for easier manipulation
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

  // check if 3 X's in a row exist in any of the winning combinations
  if (winningCombinations.some((combination) => combination.toLowerCase() === 'xxx')) {
    outcome.over = true
    outcome.winner = OUTCOME.X

    // check if 3 O's in a row exist in any of the winning combinations
  } else if (winningCombinations.some((combination) => combination.toLowerCase() === 'ooo')) {
    outcome.over = true
    outcome.winner = OUTCOME.O

    // check if the board is completely full
    // if it is full, since we already know there are no winners
    // we can now say it must be a draw
  } else if (cellArray.every((cell) => cell)) {
    outcome.over = true
    outcome.winner = OUTCOME.DRAW
  }

  // return the outcome object
  // over: Boolean
  // winner: 'X', 'O', 'DRAW'
  return outcome
}

// helper function to calculate win percentage with ties included
const calculateWinPercentage = (wins, draws, totalGames, decimalPlaces) => {
  if (totalGames > 0) {
    const percentage = (wins + (draws * 0.5)) / totalGames
    return (percentage * 100).toFixed(decimalPlaces)
  } else {
    return 0
  }
}

// constructor for our Stats object
const Stats = function(wins, losses, draws) {
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

// helper function to create our stats object with the data retrieved from the
// backend
const getGameStatistics = (games) => {
  // intialize the statistics object
  const stats = new Stats(0, 0, 0)
  // cycle through the games from the db
  games.forEach((game) => {
    // we only care about games that ended, ignore the ones that didnt
    if (game.over) {
      // figure out who won based on the end state of the game's cells
      const winner = determineOutcome(game.cells).winner

      // TODO make this better
      // increment the winner in the stats object based on who won each game
      if (winner === OUTCOME.X) {
        stats.wins++
      } else if (winner === OUTCOME.O) {
        stats.losses++
      } else if (winner === OUTCOME.DRAW) {
        stats.draws++
      }
    }
  })

  return stats
}

module.exports = {
  determineOutcome,
  getCellsFromBoard,
  getGameStatistics,
  getRandomEmptyCell,
  highlightCurrentTurn
}
