'use strict'

const showAlert = (jQueryElement) => {
  jQueryElement.slideToggle().delay(2000).slideToggle()
}
module.exports = {
  showAlert
}
