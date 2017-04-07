'use strict'

import getFormFields from '../../../lib/get-form-fields'
import api from './api'
import ui from './ui'
import {user} from '../store'
import authSelectors from './selectors'
import {hideAllAlerts} from '../helpers'
import {showAlert} from '../animations'

const onSignUp = (event) => {
  // prevent a page refresh
  event.preventDefault()

  // get the data from the form
  const data = getFormFields(event.target)

  // destructure the data
  const {email, password, password_confirmation: passwordConfirmation} = data.credentials

  // check to make sure theres data, otherwise show a message to the user
  if (email && password && passwordConfirmation) {
    // send the data to the backend and handle success/fail
    api.signUp(data).then(ui.signUpSuccess).catch(ui.signUpFailure)
  } else {
    // let the user know that they need to fill out the form
    showAlert(authSelectors.alerts.signUpEmpty)
  }
}
const onSignIn = (event) => {
  // prevent a page refresh
  event.preventDefault()

  // get the data from the form
  const data = getFormFields(event.target)

  // check to make sure theres data, otherwise show a message to the user
  if (data.credentials.email && data.credentials.password) {
    // show loader and hide button
    $(event.target).find('button').slideToggle(0, () => $('#loader').slideToggle())

    // send the data to the backend and handle success/fail
    api.signIn(data).then(ui.signInSuccess).catch(ui.signInFailure)
  } else {
    // show a message to the user to tell them to enter credentials
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

// this currently can only be triggered from the sign in form
const onShowSignIn = (event) => {
  // clear any alerts on the page
  hideAllAlerts()

  // show the sign in form
  authSelectors.signIn.container.show()

  // hide the sign up form
  authSelectors.signUp.container.hide()
}

// add all the event handlers to their respective selectors
const addAuthEventHandlers = () => {
  authSelectors.signUp.form.on('submit', onSignUp)
  authSelectors.signIn.form.on('submit', onSignIn)
  authSelectors.changePassword.form.on('submit', onChangePassword)
  authSelectors.signIn.signUpLink.on('click', onShowSignUp)
  authSelectors.signUp.signInLink.on('click', onShowSignIn)
}

module.exports = {
  addAuthEventHandlers,
  onSignOut
}
