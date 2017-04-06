import authSelectors from './auth/selectors'
import gameSelectors from './games/selectors'

// Helper function to hide all containers on the screen
// optional parameter to include containers that you dont want hidden
const hideAllContainersExcept = (ignoreElement) => {
  const containers = [
    $('.main-header'),
    $('#winner-header'),
    authSelectors.signUp.container,
    authSelectors.signIn.container,
    authSelectors.changePassword.container,
    gameSelectors.gameBoard.container,
    gameSelectors.gameStatistics.container
  ]

  // only hide the elements if we dont want to ignore one
  // TODO clean this up
  containers.forEach((container) => {
    if (!ignoreElement) {
      container.hide()
    } else if (ignoreElement && (ignoreElement !== container)) {
      container.hide()
    }
  })
}

// gets all the alerts from the different modules and hides them all
// just a nice way to reset alerts
// TODO clean this up
const hideAllAlerts = (isAnimated) => {
  const alerts = []
  alerts.push(authSelectors.alerts)
  alerts.push(gameSelectors.alerts)
  alerts.forEach((alertSet) => {
    for (const alert in alertSet) {
      if (isAnimated) {
        alertSet[alert].hide('slow')
      } else {
        alertSet[alert].hide()
      }
    }
  })
}
module.exports = {
  hideAllContainersExcept,
  hideAllAlerts
}
