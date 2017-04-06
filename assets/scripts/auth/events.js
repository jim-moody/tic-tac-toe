'use strict'

import getFormFields from '../../../lib/get-form-fields'
import api from './api'
import ui from './ui'
import {user} from '../store'
import {signUpContainer, signInContainer, showChangePassword, changePasswordContainer, changePasswordEmptyAlert} from './selectors'
import {hideAllContainers} from '../helpers'
import {showAlert} from '../animations'

const onSignUp = (event) => {
  const data = getFormFields(event.target)
  event.preventDefault()
  api.signUp(data).then(ui.signUpSuccess).catch(ui.signUpFailure)
}
const onSignIn = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)

  api.signIn(data).then(ui.signInSuccess).catch(ui.signInFailure)
}
const onSignOut = (event) => {
  event.preventDefault()
  if (user) {
    api.signOut(user).then(ui.signOutSuccess).catch(ui.signOutFailure)
  } else {
    console.error('Not signed in')
  }
}
const onChangePassword = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  if (data.passwords.old && data.passwords.new) {
    api.changePassword(data, user).then(ui.changePasswordSuccess).catch(ui.changePasswordFailure)
  } else {
    showAlert(changePasswordEmptyAlert)
  }
}
const onShowSignUp = (event) => {
  signUpContainer.show()
  signInContainer.hide()
}
const onShowChangePassword = (event) => {
  hideAllContainers()
  changePasswordContainer.show()
}

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#sign-out').on('submit', onSignOut)
  $('#change-password').on('submit', onChangePassword)
  $('#sign-up-show').on('click', onShowSignUp)
  showChangePassword.on('click', onShowChangePassword)
}

module.exports = {
  addHandlers
}
