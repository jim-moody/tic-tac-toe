'use strict'

const board = $('#board')
const boardTiles = board.find('.row div')
const gameBoardContainer = $('#game-board-container')
const gameOptionsContainer = $('#game-options-container')
const gameOptionsNewGame = $('#game-options-new-game')
const newGame = $('#new-game')
const gameStatisticsContainer = {
  container: $('#game-stats-container'),
  wins: $('#game-stats-wins'),
  losses: $('#game-stats-losses'),
  draws: $('#game-stats-draws'),
  winPercentage: $('#game-stats-win-percentage')

}

module.exports = {
  board,
  boardTiles,
  gameBoardContainer,
  gameOptionsContainer,
  gameOptionsNewGame,
  newGame,
  gameStatisticsContainer
}
