'use strict'
/*
This file defines the different selectors for the auth forms (DRY)
Each object is like a "page object" and it contains the elements that make it up
*/

// sign up form
const signUp = {
  container: $('#sign-up-container')
}

// sign in form
const signIn = {
  container: $('#sign-in-container'),
  email: $('#sign-in-email'),
  password: $('#sign-in-password')
}

// change password form
const changePassword = {
  container: $('#change-password-container')
}

// all alert messages
const alerts = {
  changePasswordEmpty: $('#change-password-empty-alert'),
  changePasswordSuccess: $('#change-password-success-alert'),
  changePasswordFailure: $('#change-password-failure-alert'),
  signUpSuccess: $('#sign-up-success-alert'),
  signUpFailure: $('#sign-up-failure-alert'),
  signOutSuccess: $('#sign-out-success-alert'),
  signOutFailure: $('#sign-out-failure-alert')
}

module.exports = {
  changePassword,
  alerts,
  signIn,
  signUp
}
