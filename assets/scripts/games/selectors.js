'use strict'
/*
This file defines the different selectors for the games forms (DRY)
Each object is like a "page object" and it contains the elements that make it up
*/

// game board
const gameBoard = {
  container: $('#game-board-container'),
  board: $('#board'),
  cells: $('#board').find('.row div'),
  resultOverlay: $('#result-overlay'),
  computerSwitch: $('#switch-computer')
}

// new game button
const newGame = $('#new-game')

// game statistics dashboard
const gameStatistics = {
  container: $('#game-stats-container'),
  wins: $('#game-stats-wins'),
  losses: $('#game-stats-losses'),
  draws: $('#game-stats-draws'),
  winPercentage: $('#game-stats-win-percentage')

}

module.exports = {
  newGame,
  gameStatistics,
  gameBoard
}
