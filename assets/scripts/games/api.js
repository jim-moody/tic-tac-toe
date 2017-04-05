'use strict'
import store from '../store'
import config from '../config'

const createGame = () => {
  return $.ajax({
    method: 'POST',
    url: config.apiOrigin + '/games',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}
const updateGame = (cell, gameId, over) => {
  return $.ajax({
    method: 'PATCH',
    url: config.apiOrigin + '/games/' + gameId,
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      game: {
        cell,
        over
      }
    }
  })
}

// const up

module.exports = {
  createGame,
  updateGame
}
