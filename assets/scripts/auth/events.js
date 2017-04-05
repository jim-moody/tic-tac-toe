'use strict'

import getFormFields from '../../../lib/get-form-fields'
import api from './api'
import ui from './ui'
import {user} from '../store'
import {signUpContainer, signInContainer} from './selectors'

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
  console.log(user)
  api.changePassword(data, user).then(ui.changePasswordSuccess).catch(ui.changePasswordFailure)
}
const onShowSignUp = (event) => {
  signUpContainer.show()
  signInContainer.hide()
}

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#sign-out').on('submit', onSignOut)
  $('#change-password').on('submit', onChangePassword)
  $('#sign-up-show').on('click', onShowSignUp)
}

module.exports = {
  addHandlers
}
