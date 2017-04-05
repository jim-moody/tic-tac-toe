'use strict'

import menu from './selectors'
import game from '../games/selectors'
import { hideAllContainers } from '../helpers'

const onShowStatistics = (event) => {

}
const onShowManageProfile = (event) => {

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
  menu.showGameOptions.on('click', onShowGameOptions)
  menu.showManageProfile.on('click', onShowManageProfile)
  menu.showStatistics.on('click', onShowStatistics)
}

module.exports = {
  addMenuHandlers
}
