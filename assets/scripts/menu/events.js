'use strict'

import { menu } from './selectors'
import game from '../games/selectors'
import auth from '../auth/selectors'
import { hideAllContainers } from '../helpers'
import store from '../store'
import gamesApi from '../games/api'
import gamesUI from '../games/ui'

const onShowStatistics = (event) => {
  gamesApi.gamesIndex()
    .then(gamesUI.onShowStatisticsSuccess)
    .catch(gamesUI.onShowStatisticsFailure)
}
const onShowManageProfile = (event) => {
  console.log(store)
  hideAllContainers()
  auth.changePasswordContainer.show()
  $('#manage-profile-email').text(store.user.email)
}
const onShowGameOptions = (event) => {
  hideAllContainers()
  game.gameOptionsContainer.show()
}
const onMenuClick = (event) => {
  $('.mdl-layout__drawer').toggleClass('is-visible')
  $('.mdl-layout__obfuscator').toggleClass('is-visible')
}
const addMenuHandlers = () => {
  $('.header-drawer button').on('click', onMenuClick)
  menu.gameOptions.on('click', onShowGameOptions)
  menu.manageProfile.on('click', onShowManageProfile)
  menu.gameStats.on('click', onShowStatistics)
}

module.exports = {
  addMenuHandlers
}
