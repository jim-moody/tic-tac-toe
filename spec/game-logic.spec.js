'use strict'

import { determineOutcome } from '../assets/scripts/games/helpers'

describe('Winning Outcomes', function () {
  it('should be a winner', function () {
    expect(determineOutcome).toBe(true)
  })
})
