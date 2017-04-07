'use strict'
/*
This file defines the different selectors for the auth forms (DRY)
Each object is like a "page object" and it contains the elements that make it up
*/

// sign up form
const signUp = {
  container: $('#sign-up-container'),
  form: $('#sign-up'),
  email: $('#sign-up-email'),
  password: $('#sign-up-password'),
  passwordConfirmation: $('#sign-up-password-confirmation')
}

// sign in form
const signIn = {
  form: $('#sign-in'),
  container: $('#sign-in-container'),
  email: $('#sign-in-email'),
  password: $('#sign-in-password'),
  signUpLink: $('#sign-up-show')
}

// change password form
const changePassword = {
  form: $('#change-password'),
  container: $('#change-password-container')
}

// all alert messages
const alerts = {
  changePasswordEmpty: $('#change-password-empty-alert'),
  changePasswordSuccess: $('#change-password-success-alert'),
  changePasswordFailure: $('#change-password-failure-alert'),
  signInEmpty: $('#sign-in-empty-alert'),
  signInFailure: $('#sign-in-failure-alert'),
  signUpSuccess: $('#sign-up-success-alert'),
  signUpFailure: $('#sign-up-failure-alert'),
  signUpEmpty: $('#sign-up-empty-alert'),
  signOutSuccess: $('#sign-out-success-alert'),
  signOutFailure: $('#sign-out-failure-alert')
}

module.exports = {
  changePassword,
  alerts,
  signIn,
  signUp
}
