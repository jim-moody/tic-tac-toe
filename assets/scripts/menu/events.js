'use strict'

import { menu } from './selectors'
import { hideAllContainersExcept, hideAllAlerts } from '../helpers'
import gameSelectors from '../games/selectors'
import gamesApi from '../games/api'
import gamesUI from '../games/ui'
import authEvents from '../auth/events'
import authSelectors from '../auth/selectors'

const onShowStatistics = (event) => {
  // get all the user's games so we can show them their stats
  gamesApi.gamesIndex()
    .then(gamesUI.onShowStatisticsSuccess)
    .catch(gamesUI.onShowStatisticsFailure)
}

const onShowChangePassword = (event) => {
  // clear the screen
  hideAllContainersExcept()

  // show the change password form
  authSelectors.changePassword.container.show()
}
const onShowGameBoard = (event) => {
  // clear the screen
  hideAllContainersExcept()

  // show the game board
  gameSelectors.gameBoard.container.show()
}

const onMenuItemClick = (event) => {
  // if the menu is clicked we must be navigating so lets hide the alerts
  hideAllAlerts()

  // make sure we hide the menu
  $('.mdl-layout__drawer').toggleClass('is-visible')
  $('.mdl-layout__obfuscator').toggleClass('is-visible')
}
const addMenuHEventandlers = () => {
  $('.header-drawer button').on('click', onMenuItemClick)
  menu.signOut.on('click', authEvents.onSignOut)
  menu.gameOptions.on('click', onShowGameBoard)
  menu.changePassword.on('click', onShowChangePassword)
  menu.gameStats.on('click', onShowStatistics)
}

module.exports = {
  addMenuHEventandlers
}
