'use strict'

/*
This file defines the different selectors for the games forms (DRY)
Each object is like a "page object" and it contains the elements that make it up
*/

const menu = {
  container: $('header'),
  gameOptions: $('#menu-show-game-options'),
  gameStats: $('#menu-view-statistics'),
  changePassword: $('#menu-change-password'),
  signOut: $('#sign-out'),
  email: $('#menu-email')
}

module.exports = {
  menu
}
