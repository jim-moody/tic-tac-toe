'use strict'

import {OUTCOME, TOKEN} from './constants'
import {gameBoard} from './selectors'

// gets a random number so we can get a random index from empty cells
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min

// get all the text from all the cells in the RENDERED board into an array
// if a cell is empty, set its value to be '' in the arrray
const getCellsFromBoard = () =>
gameBoard.cells.toArray().map((cell) => $(cell).text())

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

  // get the jquery element from the index and return it
  return $(gameBoard.cells[index])
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
  const winners = [
    [0, 1, 2], // row 1
    [3, 4, 5], // row 2
    [6, 7, 8], // row 3
    [0, 3, 6], // col 1
    [1, 4, 7], // col 2
    [2, 5, 8], // col 3
    [0, 4, 8], // diag 1
    [2, 4, 6]  // diag 2
  ]
  winners.forEach((i) => {
    const combination = [cellArray[i[0]], cellArray[i[1]], cellArray[i[2]]]

    // returns true when theres 3 in a row of the X token
    // so set the winner to be X and game over
    if (combination.every((e) => e === TOKEN.X)) {
      outcome.winner = TOKEN.X
      outcome.over = true
      // returns true when theres 3 in a row of the O token
      // so set the winner to be O and game over
    } else if (combination.every((e) => e === TOKEN.O)) {
      outcome.winner = TOKEN.O
      outcome.over = true
      // returns true when all cells have text in them
      // at this point we know no one won, so it must be a draw
    } else if (cellArray.every((cell) => cell)) {
      outcome.over = true
      outcome.winner = OUTCOME.DRAW
    }
  })

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
const Stats = function (wins, losses, draws) {
  this.wins = wins
  this.losses = losses
  this.draws = draws
  this.totalGames = () => {
    return this.wins + this.losses + this.draws
  }
  this.winPercentage = (decimalPlaces) => {
    return calculateWinPercentage(this.wins, this.draws, this.totalGames(), decimalPlaces)
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
  getRandomEmptyCell
}
