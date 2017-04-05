'use strict'

// import {handleWinner} from './ui'
// import store from '../store'

const determineOutcome = () => {
  const outcome = {
    over: false
  }
  let board = ''
  $('#board .row').toArray().forEach((row) => {
    $(row).children().toArray().forEach((div) => {
      board += $(div).text().toLowerCase() || ' '
    })
  })
  board = board.split('')
  console.log(board)

  const row1 = board[0] + board[1] + board[2]
  const row2 = board[3] + board[4] + board[5]
  const row3 = board[6] + board[7] + board[8]
  const col1 = board[0] + board[3] + board[6]
  const col2 = board[1] + board[4] + board[7]
  const col3 = board[2] + board[5] + board[8]
  const diagonal1 = board[0] + board[4] + board[8]
  const diagonal2 = board[2] + board[4] + board[6]
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
  if (winningCombinations.some((combination) => combination === 'xxx')) {
    outcome.over = true
    outcome.winner = 'X'
  } else if (winningCombinations.some((combination) => combination === 'ooo')) {
    outcome.over = true
    outcome.winner = 'O'
  } else if (board.every((element) => element !== ' ')) {
    outcome.over = true
    outcome.winner = 'Draw'
  }
  return outcome
}

module.exports = {
  determineOutcome
}
