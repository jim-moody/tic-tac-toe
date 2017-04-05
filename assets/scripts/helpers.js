import authSelectors from './auth/selectors'
import gameSelectors from './games/selectors'
// import menuSelectors from './menu/selectors'

const hideAllContainers = () => {
  authSelectors.signUpContainer.hide()
  authSelectors.signInContainer.hide()
  gameSelectors.gameBoardContainer.hide()
  gameSelectors.gameOptionsContainer.hide()
}

module.exports = {
  hideAllContainers
}
