'use strict'

// good to store all animations in one place so its consistent
import { hideAllAlerts } from './helpers'

const showAlert = (element) => {
  hideAllAlerts()
  element.slideToggle()
}
module.exports = {
  showAlert
}
