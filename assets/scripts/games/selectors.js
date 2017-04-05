'use strict'

const board = $('#board')
const boardTiles = board.find('.row div')
const gameBoardContainer = $('#game-board-container')
const gameOptionsContainer = $('#game-options-container')
const gameOptionsNewGame = $('#game-options-new-game')
const newGame = $('#new-game')

module.exports = {
  board,
  boardTiles,
  gameBoardContainer,
  gameOptionsContainer,
  gameOptionsNewGame,
  newGame
}
