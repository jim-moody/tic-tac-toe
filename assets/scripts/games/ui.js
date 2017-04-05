'use strict'
import store from '../store'

// const handleWinner = (winner) => {
//   $('h1').text(winner + ' is the winner!')
// }
const onNewGameSuccess = ({game}) => {
  store.currentGame = game
  console.log(store.currentGame)
}
const onNewGameFailure = (data) => {
  console.log(data)
}
const onUpdateGameSuccess = (data) => {
  console.log(data)
}
const onUpdateGameFailure = (data) => {
  console.log(data)
}
module.exports = {
  // handleWinner,
  onNewGameSuccess,
  onNewGameFailure,
  onUpdateGameSuccess,
  onUpdateGameFailure
}
