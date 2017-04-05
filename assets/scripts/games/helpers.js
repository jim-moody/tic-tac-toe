'use strict'

// import {handleWinner} from './ui'
// import store from '../store'
// import { board } from './selectors'

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
    outcome.winner = 'X'
  } else if (winningCombinations.some((combination) => combination.toLowerCase() === 'ooo')) {
    outcome.over = true
    outcome.winner = 'O'
  } else if (cellArray.every((cell) => !cell)) {
    outcome.over = true
    outcome.winner = 'Draw'
  }
  return outcome
}

module.exports = {
  determineOutcome,
  getCellsFromBoard
}
