'use strict'

import { determineOutcome } from '../assets/scripts/games/helpers'
import {TOKEN} from '../assets/scripts/games/constants'

describe('Game Logic', () => {
  it(`row 1 returns winner of X`, () => {
    const board = ['X', 'X', 'X', '', '', '', '', '', '']
    expect(determineOutcome(board)).toEqual({over: true, winner: TOKEN.X})
  })
  it(`row 2 returns winner of X`, () => {
    const board = ['O', 'X', 'X', 'X', 'X', 'X', '', '', 'O']
    expect(determineOutcome(board)).toEqual({over: true, winner: TOKEN.X})
  })
  it(`row 3 returns winner of X`, () => {
    const board = ['X', '', '', 'X', '', '', 'X', 'X', 'X']
    expect(determineOutcome(board)).toEqual({over: true, winner: TOKEN.X})
  })
  it(`col 1 returns winner of X`, () => {
    const board = ['X', 'X', 'O', 'X', 'O', '', 'X', 'O', 'O']
    expect(determineOutcome(board)).toEqual({over: true, winner: TOKEN.X})
  })
  it(`col 2 returns winner of X`, () => {
    const board = ['O', 'X', 'O', 'X', 'X', '', 'O', 'X', 'O']
    expect(determineOutcome(board)).toEqual({over: true, winner: TOKEN.X})
  })
  it(`col 3 returns winner of O`, () => {
    const board = ['', 'X', 'O', 'X', '', 'O', '', 'X', 'O']
    expect(determineOutcome(board)).toEqual({over: true, winner: TOKEN.O})
  })
  it(`diag 1 returns winner of O`, () => {
    const board = ['O', 'X', '', '', 'O', 'X', 'X', '', 'O']
    expect(determineOutcome(board)).toEqual({over: true, winner: TOKEN.O})
  })
  it(`diag 2 returns winner of O`, () => {
    const board = ['X', '', 'O', 'X', 'O', '', 'O', '', 'X']
    expect(determineOutcome(board)).toEqual({over: true, winner: TOKEN.O})
  })
  it(`returns game not over`, () => {
    const board = ['X', 'O', 'X', '', '', '', '', '', '']
    expect(determineOutcome(board)).toEqual({over: false})
  })
  it(`returns draw and game over `, () => {
    const board = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X']
    expect(determineOutcome(board)).toEqual({over: true, winner: 'DRAW'})
  })
})
