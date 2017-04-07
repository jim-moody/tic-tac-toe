'use strict'

const config = require('../config')

const signUp = (data) => {
  return $.ajax({
    url: config.apiOrigin + '/sign-up',
    method: 'POST',
    data
  })
}
const signIn = (data) => {
  return $.ajax({
    url: config.apiOrigin + '/sign-in',
    method: 'POST',
    data
  })
}
const signOut = (user) => {
  return $.ajax({
    url: config.apiOrigin + '/sign-out/' + user.id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + user.token
    }
  })
}
const changePassword = (data, user) => {
  return $.ajax({
    url: config.apiOrigin + '/change-password/' + user.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + user.token
    },
    data
  })
}

module.exports = {
  signUp,
  signIn,
  signOut,
  changePassword
}
