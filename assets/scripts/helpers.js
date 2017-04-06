import authSelectors from './auth/selectors'
import gameSelectors from './games/selectors'
// import menuSelectors from './menu/selectors'

const hideAllContainers = () => {
  authSelectors.signUpContainer.hide()
  authSelectors.signInContainer.hide()
  authSelectors.changePasswordContainer.hide()
  gameSelectors.gameBoardContainer.hide()
  gameSelectors.gameOptionsContainer.hide()
  gameSelectors.gameStatisticsContainer.container.hide()
}

module.exports = {
  hideAllContainers
}
