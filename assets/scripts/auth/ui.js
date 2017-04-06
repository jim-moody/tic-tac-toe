'use strict'

import store from '../store'
import {signUpContainer, signInContainer,
  signUpSuccessAlert, signUpFailureAlert, changePasswordContainer} from './selectors'
import { gameOptionsContainer } from '../games/selectors'
import { menu } from '../menu/selectors'

const signUpSuccess = (data) => {
  console.log(data)
  signUpSuccessAlert.slideToggle().delay(2000).slideToggle()
  signUpContainer.hide()
  signInContainer.show()
}
const signUpFailure = (error) => {
  signUpFailureAlert.slideToggle().delay(2000).slideToggle()
  console.error(error)
}
const signInSuccess = ({user}) => {
  menu.container.show()
  signInContainer.hide()
  gameOptionsContainer.show()
  console.log(user)
  store.user = user
}
const signInFailure = (error) => {
  console.error(error)
}
const signOutSuccess = () => {
  console.log('Signed out', store)
  store.user = null
  console.log('Signed out', store)
}
const signOutFailure = (error) => {
  console.error(error)
}
const changePasswordSuccess = (data) => {
  changePasswordContainer.slideDown()
  signInContainer.slideUp()
  $('#password-change-success-alert').slideToggle().delay(2000).slideToggle()
  console.log('success:', data)
}
const changePasswordFailure = (error) => {
  console.error(error)
}
module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  changePasswordSuccess,
  changePasswordFailure
}
