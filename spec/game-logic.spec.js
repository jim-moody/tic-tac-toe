'use strict'

import { determineOutcome } from '../assets/scripts/games/helpers'

describe('Game Logic', () => {
  it(`returns winner of x and game over`, () => {
    const board = ['x', 'x', 'x', '', '', '', '', '', '']
    expect(determineOutcome(board)).toEqual({over: true, winner: 'X'})
  })
  it(`returns winner of o and game over`, () => {
    const board = ['o', 'x', 'x', '', 'o', '', '', '', 'o']
    expect(determineOutcome(board)).toEqual({over: true, winner: 'O'})
  })
  it(`returns winner of x and game over`, () => {
    const board = ['x', '', '', 'x', '', '', 'x', '', '']
    expect(determineOutcome(board)).toEqual({over: true, winner: 'X'})
  })
  it(`returns correct winner of x and game over`, () => {
    const board = ['x', 'x', 'o', '', 'o', '', 'x', 'x', 'x']
    expect(determineOutcome(board)).toEqual({over: true, winner: 'X'})
  })
  it(`returns game not over`, () => {
    const board = ['x', 'o', 'x', '', '', '', '', '', '']
    expect(determineOutcome(board)).toEqual({over: false})
  })
  it(`returns draw and game over `, () => {
    const board = ['x', 'o', 'x', 'x', 'o', 'o', 'o', 'x', 'x']
    expect(determineOutcome(board)).toEqual({over: true, winner: 'DRAW'})
  })
})
