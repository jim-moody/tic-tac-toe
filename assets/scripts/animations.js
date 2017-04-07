'use strict'

// good to store all animations in one place so its consistent
import { hideAllAlerts } from './helpers'

const showAlert = (element) => {
  hideAllAlerts()
  element.slideToggle()
}
const showTemporaryAlert = (element) => {
  hideAllAlerts()
  element.slideDown().delay(2000).slideUp()
}
module.exports = {
  showAlert,
  showTemporaryAlert
}
