'use strict'
import store from '../store'
import config from '../config'

// creates a new game for the given user
const createGame = () => {
  return $.ajax({
    method: 'POST',
    url: config.apiOrigin + '/games',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

// updates a game
const updateGame = ({cell, gameId, over}) => {
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

// returns all games for a user
const gamesIndex = () => {
  return $.ajax({
    method: 'GET',
    url: config.apiOrigin + '/games',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  createGame,
  updateGame,
  gamesIndex
}
