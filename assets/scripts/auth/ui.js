'use strict'

import store from '../store'

const signUpSuccess = (data) => {
  console.log(data)
}
const signUpFailure = (error) => {
  console.error(error)
}
const signInSuccess = ({user}) => {
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
