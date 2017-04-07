'use strict'

const showFormLoader = (form) => {
  form.container.find('button').slideToggle(0, () => {
    form.loader.slideToggle()
  })
}
const hideFormLoader = (form) => {
  form.container.find('button').show()
  form.loader.hide()
}
module.exports = {
  showFormLoader,
  hideFormLoader
}
