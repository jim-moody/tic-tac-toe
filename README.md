[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# Tic-Tac-Toe Project Client

-   Live Demo: [Tic Tac Toe](https://jim-moody.github.io/tic-tac-toe)

## Project Planning

### User Stories

-   **Sign Up** - As a user I want to be able to create an account so I can save unfinished games
-   **Change Password** - As a user I want to be able to change my password so I can keep my account secure
-   **Play vs Computer** - As a user I want to be able to play tic tac toe against a computer so I can play even if I have no friends
-   **Sign In** - As a user I want to be able to sign in so I can pick up where I left off
-   **Game Statistics** - As a user I want to be able to see my statistics so I can see how many games I have won and lost

### Wireframes

[User Flow](http://imgur.com/a/QnOGm)

### Data Model

Uses the [Game API](https://github.com/jim-moody/game-project-api)

## Development Process

The strategy I used was just an iterative model. I knew the authentication piece would be simple to implement because it was a copy and paste from the books training we did, so I wanted to save that for later.

The first thing I did was create a simple html/css layout of a tic tac toe board.  Then I worked on hooking up events to the board and setting the text of each cell clicked. Once I had that working, I moved on to checking to see if anyone had won after each click, and if so, who the winner was.  At this point I had a fully functional tic tac toe board so it was time to start saving the information to the database.

Setting up the API actually was pretty tricky because the way I was storing data initially was not how the API expected it, so I had to rewrite a lot of code. If I had done a better job reviewing the API initially, it would have saved me some time on this phase.

Once I had the updateGame api set up, it was time to work on auth.  Like I had figured, this wasn't too bad.  I just copied everything from the training and it pretty much just worked.

Now I had everything working so I started added styling in and the hiding/showing of individual components as needed.  My goal was to make it very hard for the user to mess up.  So I added error handling for all the authentication forms which would display a message to the user if it failed for some reason or if it succeeded.

Once I was done with all the styling updates I had my mom test it out, and I made 3 major updates after I watched her try it out:

1.  She was trying to click something that wasn't clickable so I changed the styling to make it more obvious that it wasnt a clickable element.

2.  She was confused about why she had to sign in after signing up, so I added a feature to sign the user in automatically
3.  She didnt understand who she was playing against, so I added a feature to allow a user to play against a computer since that is a more intuitive expectation.

### Problem-Solving Strategy

If the issue wasn't major, I would actually open an issue on my own personal github to remind myself to go back to it later. If it was major, I would follow these steps:

1.  See if there were any error messages in the console or linter.  If so - fix them and try again
2.  Follow my code step by step to see if there were any obvious mistakes in the flow
3.  Insert console.log statements to see what the data looked like or see if the code was making it to where I thought it was
4.  Google what I was trying to do to see if there were any obvious gotchas
5.  Search the github issues on the game project to see if anyone had the same problem as me
6.  Open an issue on github

### Unsolved Problems

See [issues](https://github.com/jim-moody/tic-tac-toe/issues)

## Technologies Used

-   [Bootstrap](http://getbootstrap.com/) - CSS framework for responsive design
-   [Material Design Lite](https://getmdl.io) - CSS framework utilizing material design
-   [Grunt](https://gruntjs.com/) - Task Runner

## Authors

Jim Moody

## [License](LICENSE)

1.  All content is licensed under a CC­BY­NC­SA 4.0 license.
2.  All software code is licensed under GNU GPLv3. For commercial use or alternative licensing, please contact legal@ga.co.
