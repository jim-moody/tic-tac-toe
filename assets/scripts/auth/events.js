'use strict'

import getFormFields from '../../../lib/get-form-fields'
import api from './api'
import ui from './ui'
import {user} from '../store'
import authSelectors from './selectors'
import {hideAllAlerts} from '../helpers'
import {showAlert} from '../animations'

const onSignUp = (event) => {
  // get the data from the form
  const data = getFormFields(event.target)

  // prevent a page refresh
  event.preventDefault()

  // send the data to the backend and handle success/fail
  api.signUp(data).then(ui.signUpSuccess).catch(ui.signUpFailure)
}
const onSignIn = (event) => {
  // prevent a page refresh
  event.preventDefault()

  // get the data from the form
  const data = getFormFields(event.target)

  // check to make sure theres data, otherwise show a message to the user
  if (data.credentials.email && data.credentials.password) {
    // send the data to the backend and handle success/fail
    api.signIn(data).then(ui.signInSuccess).catch(ui.signInFailure)
  } else {
    showAlert(authSelectors.alerts.signInEmpty)
  }
}
const onSignOut = (event) => {
  // prevent a page refresh
  event.preventDefault()
  // sign out will only work if the user is saved in the store
  if (user) {
    // send the sign out call to the backend and handle success/fail
    api.signOut(user).then(ui.signOutSuccess).catch(ui.signOutFailure)
  } else {
    // TODO handle this with a message? not sure how this could happen
    console.error('Not signed in')
  }
}
const onChangePassword = (event) => {
  // prevent page refresh
  event.preventDefault()

  // get data from the form
  const data = getFormFields(event.target)

  // make sure the user has filled in an old and new pw in the form
  if (data.passwords.old && data.passwords.new) {
    // send the data to the backend and handle success/fail
    api.changePassword(data, user).then(ui.changePasswordSuccess).catch(ui.changePasswordFailure)
  } else {
    // if they havent filled in the form, alert them
    showAlert(authSelectors.alerts.changePasswordEmpty)
  }
}
// this currently can only be triggered from the sign in form
const onShowSignUp = (event) => {
  // clear any alerts on the page
  hideAllAlerts()

  // show the sign up form
  authSelectors.signUp.container.show()

  // hide the sign in form
  authSelectors.signIn.container.hide()
}

// add all the event handlers to their respective selectors
const addAuthEventHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#sign-out').on('submit', onSignOut)
  $('#change-password').on('submit', onChangePassword)
  $('#sign-up-show').on('click', onShowSignUp)
}

module.exports = {
  addAuthEventHandlers,
  onSignOut
}
