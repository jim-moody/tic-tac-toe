webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// Load all specs so webpack can find them. Think of this as an automatic
	// manifest for bundling specs.

	var req = __webpack_require__(33);
	req.keys().forEach(req);

/***/ },

/***/ 5:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var _constants = __webpack_require__(6);

	var _selectors = __webpack_require__(7);

	var _selectors2 = _interopRequireDefault(_selectors);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// gets a random number so we can get a random index from empty cells
	var getRandomInt = function getRandomInt(min, max) {
	  return Math.floor(Math.random() * (max - min)) + min;
	};

	// get all the text from all the cells in the RENDERED board into an array
	// if a cell is empty, set its value to be '' in the arrray
	var getCellsFromBoard = function getCellsFromBoard() {
	  var cells = [];
	  $('#board .row').toArray().forEach(function (row) {
	    $(row).children().toArray().forEach(function (div) {
	      cells.push($(div).text().toLowerCase() || '');
	    });
	  });
	  return cells;
	};

	// TODO use this for AI
	var getRandomEmptyCell = function getRandomEmptyCell() {
	  var index = 0;
	  // get all the cells from the board in array of text format
	  var cells = getCellsFromBoard();

	  // get cells in an indexed array of objects (index, value)
	  var indexedCells = cells.map(function (e, i) {
	    return { index: i, value: e };
	  });

	  // filter the array into only the empty cells
	  var emptyCells = indexedCells.filter(function (cell) {
	    return !cell.value;
	  });

	  // set the index to be a random index of an empty cell
	  if (emptyCells.length > 0) {
	    var randomIndex = getRandomInt(0, emptyCells.length);
	    index = emptyCells[randomIndex].index;
	  }

	  // get the jquery element from the index and return it
	  return $(_selectors2.default.gameBoard.cells[index]);
	};

	// returns an outcome object
	var determineOutcome = function determineOutcome(optionalCells) {
	  // if no cells are passed in, just determine the outcome of the current rendered board
	  var cellArray = optionalCells || getCellsFromBoard();

	  // create initial outcome object and assume the game is not over
	  var outcome = {
	    over: false
	  };

	  // get all the possible combinations of cells that could win:
	  // 3 rows, 3 columns, 2 diagonals
	  var row1 = cellArray[0] + cellArray[1] + cellArray[2];
	  var row2 = cellArray[3] + cellArray[4] + cellArray[5];
	  var row3 = cellArray[6] + cellArray[7] + cellArray[8];
	  var col1 = cellArray[0] + cellArray[3] + cellArray[6];
	  var col2 = cellArray[1] + cellArray[4] + cellArray[7];
	  var col3 = cellArray[2] + cellArray[5] + cellArray[8];
	  var diagonal1 = cellArray[0] + cellArray[4] + cellArray[8];
	  var diagonal2 = cellArray[2] + cellArray[4] + cellArray[6];

	  // put the winning combinations into an array for easier manipulation
	  var winningCombinations = [row1, row2, row3, col1, col2, col3, diagonal1, diagonal2];

	  // check if 3 X's in a row exist in any of the winning combinations
	  if (winningCombinations.some(function (combination) {
	    return combination.toLowerCase() === 'xxx';
	  })) {
	    outcome.over = true;
	    outcome.winner = _constants.OUTCOME.X;

	    // check if 3 O's in a row exist in any of the winning combinations
	  } else if (winningCombinations.some(function (combination) {
	    return combination.toLowerCase() === 'ooo';
	  })) {
	    outcome.over = true;
	    outcome.winner = _constants.OUTCOME.O;

	    // check if the board is completely full
	    // if it is full, since we already know there are no winners
	    // we can now say it must be a draw
	  } else if (cellArray.every(function (cell) {
	    return cell;
	  })) {
	    outcome.over = true;
	    outcome.winner = _constants.OUTCOME.DRAW;
	  }

	  // return the outcome object
	  // over: Boolean
	  // winner: 'X', 'O', 'DRAW'
	  return outcome;
	};

	// helper function to calculate win percentage with ties included
	var calculateWinPercentage = function calculateWinPercentage(wins, draws, totalGames, decimalPlaces) {
	  if (totalGames > 0) {
	    var percentage = (wins + draws * 0.5) / totalGames;
	    return (percentage * 100).toFixed(decimalPlaces);
	  } else {
	    return 0;
	  }
	};

	// constructor for our Stats object
	var Stats = function Stats(wins, losses, draws) {
	  var _this = this;

	  this.wins = wins;
	  this.losses = losses;
	  this.draws = draws;
	  this.totalGames = function () {
	    return _this.wins + _this.losses + _this.draws;
	  };
	  this.winPercentage = function (decimalPlaces) {
	    return calculateWinPercentage(_this.wins, _this.draws, _this.totalGames(), decimalPlaces);
	  };
	};

	// helper function to create our stats object with the data retrieved from the
	// backend
	var getGameStatistics = function getGameStatistics(games) {
	  // intialize the statistics object
	  var stats = new Stats(0, 0, 0);
	  // cycle through the games from the db
	  games.forEach(function (game) {
	    // we only care about games that ended, ignore the ones that didnt
	    if (game.over) {
	      // figure out who won based on the end state of the game's cells
	      var winner = determineOutcome(game.cells).winner;

	      // TODO make this better
	      // increment the winner in the stats object based on who won each game
	      if (winner === _constants.OUTCOME.X) {
	        stats.wins++;
	      } else if (winner === _constants.OUTCOME.O) {
	        stats.losses++;
	      } else if (winner === _constants.OUTCOME.DRAW) {
	        stats.draws++;
	      }
	    }
	  });
	  return stats;
	};

	module.exports = {
	  determineOutcome: determineOutcome,
	  getCellsFromBoard: getCellsFromBoard,
	  getGameStatistics: getGameStatistics,
	  getRandomEmptyCell: getRandomEmptyCell
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },

/***/ 6:
/***/ function(module, exports) {

	'use strict';

	// use this to control for the different game outcomes

	var OUTCOME = {
	  X: 'X',
	  O: 'O',
	  DRAW: 'DRAW'
	};

	module.exports = {
	  OUTCOME: OUTCOME
	};

/***/ },

/***/ 7:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	/*
	This file defines the different selectors for the games forms (DRY)
	Each object is like a "page object" and it contains the elements that make it up
	*/

	// game board

	var gameBoard = {
	  container: $('#game-board-container'),
	  board: $('#board'),
	  cells: $('#board').find('.row div'),
	  resultOverlay: $('#result-overlay'),
	  computerSwitch: $('#switch-computer')
	};

	// new game button
	var newGame = $('#new-game');

	// game statistics dashboard
	var gameStatistics = {
	  container: $('#game-stats-container'),
	  wins: $('#game-stats-wins'),
	  losses: $('#game-stats-losses'),
	  draws: $('#game-stats-draws'),
	  winPercentage: $('#game-stats-win-percentage')

	};

	module.exports = {
	  newGame: newGame,
	  gameStatistics: gameStatistics,
	  gameBoard: gameBoard
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },

/***/ 33:
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./example.spec.js": 34,
		"./game-logic.spec.js": 35
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 33;


/***/ },

/***/ 34:
/***/ function(module, exports) {

	'use strict';

	// const example = require('../assets/scripts/example')

	// describe('Example', function () {
	//   it('is true', function () {
	//     expect(example).toBe(true)
	//   })
	// })

/***/ },

/***/ 35:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _helpers = __webpack_require__(5);

	describe('Game Logic', function () {
	  it('returns winner of x and game over', function () {
	    var board = ['x', 'x', 'x', '', '', '', '', '', ''];
	    expect((0, _helpers.determineOutcome)(board)).toEqual({ over: true, winner: 'X' });
	  });
	  it('returns winner of o and game over', function () {
	    var board = ['o', 'x', 'x', '', 'o', '', '', '', 'o'];
	    expect((0, _helpers.determineOutcome)(board)).toEqual({ over: true, winner: 'O' });
	  });
	  it('returns winner of x and game over', function () {
	    var board = ['x', '', '', 'x', '', '', 'x', '', ''];
	    expect((0, _helpers.determineOutcome)(board)).toEqual({ over: true, winner: 'X' });
	  });
	  it('returns correct winner of x and game over', function () {
	    var board = ['x', 'x', 'o', '', 'o', '', 'x', 'x', 'x'];
	    expect((0, _helpers.determineOutcome)(board)).toEqual({ over: true, winner: 'X' });
	  });
	  it('returns game not over', function () {
	    var board = ['x', 'o', 'x', '', '', '', '', '', ''];
	    expect((0, _helpers.determineOutcome)(board)).toEqual({ over: false });
	  });
	  it('returns draw and game over ', function () {
	    var board = ['x', 'o', 'x', 'x', 'o', 'o', 'o', 'x', 'x'];
	    expect((0, _helpers.determineOutcome)(board)).toEqual({ over: true, winner: 'DRAW' });
	  });
	});

/***/ }

});