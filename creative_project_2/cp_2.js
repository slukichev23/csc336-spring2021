(function() {

  "use strict";
  // Statistics which can be viewed in stats-view. Will not be reset by restart button.
  let gamesPlayed = 0;
  let wins = 0;
  let losses = 0;
  let winPercent = 0;
  let timeArray = [];
  let avgTime = 0; // in seconds
  // Keeps track for game itself. These will be reset aftereach game.
  let clickCount = 0;
  let tileValues = [0, 0, 0, 0, 0, 0, 0, 0, 0]; // 0 = empty, 1 = player, 2 = computer
  let timerID = null;
  let time = 0;
  let playerCanMove = true; // player will always have first move
  let gameBoardMade = false;

  window.addEventListener("load", init);

  function init() {
    // getting references to buttons
    const startBtn = id("play-btn");
    // ADD: rulesBtn, statsBtn, returnToGameBtn
    startBtn.addEventListener("click", startGame);
    id("return-to-game").addEventListener("click", startGame);
  }

    // Event listener for Start Button
    function startGame(){
      // 1. Add hidden class to Rules View and Stats View
      id("rules-view").classList.add("hidden");
      id("stats-view").classList.add("hidden");
      // 2. Remove hidden class from Game View
      let gameView = id("game-view");
      gameView.classList.remove("hidden");
      console.log(gameBoardMade);
      // 3. Create div with id "game-board" and append it to Game View
      let gameBoard = gen("div");
      console.log(gameBoardMade);
      gameBoard.id  = "game-board";
      gameView.appendChild(gameBoard);
      // 4. Add class show-border to Game Board
      gameBoard.classList.add("show-border")
      // 5. Populate Game Board with 9 game-tile show-border divs
      for (let i = 0; i < 9; i++){
        let newTile = gen("div");
        newTile.classList.add("game-tile");
        newTile.classList.add("show-border");
        newTile.value = i;
        // 6. Add event handler to each tile
        newTile.addEventListener("click", tileClickEvent);
        gameBoard.appendChild(newTile);
      }
      if (gameBoardMade){
        console.log("game-board is already made, adding saved images");
        // user checked rules and wants to return to the game they had going.
        // fillValues = true;
        let board = qsa(".game-tile");
        console.log(board);
        for (let i = 0; i < board.length; i++) {
          if (tileValues[i] == 1) {
            console.log("Tile " + i + " has value of 1");
            // add player icon
            let playerImg = gen("img");
            playerImg.src = "images/player.png";
            board[i].appendChild(playerImg);
          } else if (tileValues[i] == 2) {
            console.log("Tile " + i + " has value of 2");
            // add computer icon
            let compImg = gen("img");
            compImg.src = "images/computer.png";
            board[i].appendChild(compImg);
          } else {
            console.log("Tile " + i + " has value of 0");
          }
        }
      } else {
        // TODO: Start timer
        if (timerID == null){
          timerID = setInterval(updateCountTimer, 1000);
        }

      }
      gameBoardMade = true;
      // 7. Create "Rules", "Stats", and "Restart Buttons" and append them to Game View
      let rulesBtn = gen("button");
      rulesBtn.id = "rules-btn";
      rulesBtn.innerHTML = "Rules";
      let resetboardBtn = gen("button");
      resetboardBtn.id = "resetboard-btn";
      resetboardBtn.innerHTML = "Restart";
      let statsBtn = gen("button");
      statsBtn.id = "stats-btn";
      statsBtn.innerHTML = "Stats";
      let buttonsContainer = gen("div");
      buttonsContainer.id = "container";
      gameView.appendChild(buttonsContainer);
      buttonsContainer.appendChild(rulesBtn);
      buttonsContainer.appendChild(resetboardBtn);
      buttonsContainer.appendChild(statsBtn);

      // 8. If flag to fill was set earlier, fill board with saved values:
      // ### function goes here ###

      // 9. Add event handlers to each button
      rulesBtn.addEventListener("click", rulesBtnHandler);
      resetboardBtn.addEventListener("click", resetboardBtnHandler);
      statsBtn.addEventListener("click", statsBtnHandler);

    }

    function tileClickEvent() {
      console.log("tile index " + this.value + " has been clicked");
      // 1. Check if this has child. If it does, either player or computer
      // has already clicked on it.
      console.log(this.children.length);
      if (this.children.length < 1 && playerCanMove) {
        clickCount++;
        playerCanMove = false;
        // 2. If empty, gen img and append as child. Set img to player's icon
        let playerIcon = gen("img");
        playerIcon.src = "images/player.png";
        this.appendChild(playerIcon);
        // Keeps track of board in array:
        tileValues[this.value] = 1;
        // 3. If at least 3 clicks have been made, begin checking for winning condition
        if (clickCount >= 3) {
          // Win condition check for player function goes here
          if (checkWinCondition(1)) {
            // Player wins.
            console.log("Player won!");
            playerCanMove = false;
            clearInterval(timerID);
            timerID = null;
            // updating stats
            gamesPlayed += 1;
            wins += 1;
            winPercent = wins / gamesPlayed;
            timeArray.push(time);
            let totalTimes = 0;
            let count = 0;
            for (let i = 0; i < timeArray.length; i++){
              count++;
              totalTimes += timeArray[i];
            }
            avgTime = totalTimes / count;
            id("timer").innerHTML = "You won!";
            updateStatsView();
            return 1;
          }
        }
        // If it is the player's 5th click, that means that the board is full.
        if (clickCount >= 5) {
          console.log("Draw!");
          playerCanMove = false;
          clearInterval(timerID);
          timerID = null;
          // updating stats
          gamesPlayed += 1;
          winPercent = wins / gamesPlayed;
          timeArray.push(time);
          let totalTimes = 0;
          let count = 0;
          for (let i = 0; i < timeArray.length; i++){
            count++;
            totalTimes += timeArray[i];
          }
          avgTime = totalTimes / count;
          id("timer").innerHTML = "Draw!";
          updateStatsView();
          return 3;
        }
        // 5. Let computer pick where to go.
        setTimeout(function(){
          // ## Function that determines where computer will go ##
          if (clickCount == 1){
            randomComputerMove();
          }
          else {
            // By this point player has gone at least 2 times.
            // Check if there is a spot computer can go to win the round.
            let possibleWinningTile = winningMoveExists(2);
            if (possibleWinningTile >= 0) {
              // There exists a spot where the computer can go and win the game.
              addImageToTile(possibleWinningTile);
              // Computer wins game.
            } else {
              // No immediate win path for computer.
              // Checking if there is a defensive play it can make.
              let possiblePlayerWin = winningMoveExists(1);
              if (possiblePlayerWin >= 0) {
                // There is a spot that the player can go to win the game next turn. Take it.
                addImageToTile(possiblePlayerWin);
              } else {
                // No winning more nor defensive move detected, selecting random location!
                console.log("No winning or defensive move detected, will choose a random location");
                randomComputerMove();
              }
            }
            // If not, check if there is a spot the player can go to win the round, and take it before they do

            // Else, choose random spot
          }
          if (clickCount >= 3) {
            // Win condition check for COMPUTER function goes here
            if (checkWinCondition(2)) {
              // Player wins.
              console.log("Computer won!");
              playerCanMove = false;
              clearInterval(timerID);
              timerID = null;
              // updating stats
              gamesPlayed += 1;
              losses += 1;
              winPercent = wins / gamesPlayed;
              timeArray.push(time);
              let totalTimes = 0;
              let count = 0;
              for (let i = 0; i < timeArray.length; i++){
                count++;
                totalTimes += timeArray[i];
              }
              avgTime = totalTimes / count;
              id("timer").innerHTML = "You lost!";
              updateStatsView();
              return 2;
            }

          }
          console.log("Tile Value array: " + tileValues);
          playerCanMove = true;
        }, 500);

      }

    } // End of tile chick event

    function addImageToTile(index) {
      // There exists a spot where the computer can go and win the game.
      let gameTilesArray = qsa(".game-tile");
      for (let i = 0; i < gameTilesArray.length; i++) {
        if (gameTilesArray[i].value == index) {
          let computerIcon = gen("img");
          computerIcon.src = "images/computer.png";
          gameTilesArray[i].appendChild(computerIcon);
          // Update array
          tileValues[index] = 2;
        }
      }
    }

    function randomComputerMove() {
      let openIndexArray = [];
      for (let i = 0; i < tileValues.length; i++){
        if (tileValues[i] == 0) {
          openIndexArray.push(i);
          console.log(i + " is open");
        }
      }
      // finds specifc tile with that value and adds computer icon to it
      let computerMoveIndex = openIndexArray[random_amount(openIndexArray.length)];
      let gameTilesArray = qsa(".game-tile");
      for (let i = 0; i < gameTilesArray.length; i++) {
        if (gameTilesArray[i].value == computerMoveIndex) {
          let computerIcon = gen("img");
          computerIcon.src = "images/computer.png";
          gameTilesArray[i].appendChild(computerIcon);
          // Update array
          tileValues[computerMoveIndex] = 2;
        }
      }
      // end
    }

    // for either player (1) or computer (2)
    // if their next move can be a winning one, it will return the index of that tile.    // 0 1 2
    // if it can't find a winning tile, returns -1                                        // 3 4 5
    function winningMoveExists(player_or_computer) {                                      // 6 7 8
      // checks rows
      // Row 1
      if (tileValues[0] == player_or_computer && tileValues[1] == player_or_computer && tileValues[2] == 0) {
        return 2;
      } else
      if (tileValues[0] == player_or_computer && tileValues[1] == 0 && tileValues[2] == player_or_computer) {
        return 1;
      } else
      if (tileValues[0] == 0 && tileValues[1] == player_or_computer && tileValues[2] == player_or_computer) {
        return 0;
      } else
      // Row 2
      if (tileValues[3] == player_or_computer && tileValues[4] == player_or_computer && tileValues[5] == 0) {
        return 5;
      } else
      if (tileValues[3] == player_or_computer && tileValues[4] == 0 && tileValues[5] == player_or_computer) {
        return 4;
      } else
      if (tileValues[3] == 0 && tileValues[4] == player_or_computer && tileValues[5] == player_or_computer) {
        return 3;
      } else
      // Row 3
      if (tileValues[6] == player_or_computer && tileValues[7] == player_or_computer && tileValues[8] == 0) {
        return 8;
      } else
      if (tileValues[6] == player_or_computer && tileValues[7] == 0 && tileValues[8] == player_or_computer) {
        return 7;
      } else
      if (tileValues[6] == 0 && tileValues[7] == player_or_computer && tileValues[8] == player_or_computer) {
        return 6;
      } else
      // checks colums
      // Column 1
      if (tileValues[0] == player_or_computer && tileValues[3] == player_or_computer && tileValues[6] == 0) {
        return 6;
      } else
      if (tileValues[0] == player_or_computer && tileValues[3] == 0 && tileValues[6] == player_or_computer) {
        return 3;
      } else
      if (tileValues[0] == 0 && tileValues[3] == player_or_computer && tileValues[6] == player_or_computer) {
        return 0;
      } else
      // Column 2
      if (tileValues[1] == player_or_computer && tileValues[4] == player_or_computer && tileValues[7] == 0) {
        return 7;
      } else
      if (tileValues[1] == player_or_computer && tileValues[4] == 0 && tileValues[7] == player_or_computer) {
        return 4;
      } else
      if (tileValues[1] == 0 && tileValues[4] == player_or_computer && tileValues[7] == player_or_computer) {
        return 1;
      } else
      // Column 3
      if (tileValues[2] == player_or_computer && tileValues[5] == player_or_computer && tileValues[8] == 0) {
        return 8;
      } else
      if (tileValues[2] == player_or_computer && tileValues[5] == 0 && tileValues[8] == player_or_computer) {
        return 5;
      } else
      if (tileValues[2] == 0 && tileValues[5] == player_or_computer && tileValues[8] == player_or_computer) {
        return 2;
      } else
      // checks diagonals
      // Top Left to Bottom Right Diagonal
      if (tileValues[0] == player_or_computer && tileValues[4] == player_or_computer && tileValues[8] == 0) {
        return 8;
      } else
      if (tileValues[0] == player_or_computer && tileValues[4] == 0 && tileValues[8] == player_or_computer) {
        return 4;
      } else
      if (tileValues[0] == 0 && tileValues[4] == player_or_computer && tileValues[8] == player_or_computer) {
        return 0;
      } else
      // Top Right to Bottom Left Diagonal
      if (tileValues[2] == player_or_computer && tileValues[4] == player_or_computer && tileValues[6] == 0) {
        return 6;
      } else
      if (tileValues[2] == player_or_computer && tileValues[4] == 0 && tileValues[6] == player_or_computer) {
        return 4;
      } else
      if (tileValues[2] == 0 && tileValues[4] == player_or_computer && tileValues[6] == player_or_computer) {
        return 2;
      } else {
        return -1;
      }
    }

    // returns true or false if input (player or computer) has won the game
    function checkWinCondition(player_or_computer) {
      // 0 1 2
      // 3 4 5
      // 6 7 8
      // Rows
      if (tileValues[0] == player_or_computer && tileValues[1] == player_or_computer && tileValues[2] == player_or_computer) {
        return true;
      } else
      if (tileValues[3] == player_or_computer && tileValues[4] == player_or_computer && tileValues[5] == player_or_computer) {
        return true;
      } else
      if (tileValues[6] == player_or_computer && tileValues[7] == player_or_computer && tileValues[8] == player_or_computer) {
        return true;
      } else
      // columns
      if (tileValues[0] == player_or_computer && tileValues[3] == player_or_computer && tileValues[6] == player_or_computer) {
        return true;
      } else
      if (tileValues[1] == player_or_computer && tileValues[4] == player_or_computer && tileValues[7] == player_or_computer) {
        return true;
      } else
      if (tileValues[2] == player_or_computer && tileValues[5] == player_or_computer && tileValues[8] == player_or_computer) {
        return true;
      } else
      // diagonals
      if (tileValues[0] == player_or_computer && tileValues[4] == player_or_computer && tileValues[8] == player_or_computer) {
        return true;
      } else
      if (tileValues[2] == player_or_computer && tileValues[4] == player_or_computer && tileValues[6] == player_or_computer) {
        return true;
      } else {
        return false;
      }
    }

    function removeGameViewChildren(button) {
      let gameViewParent = id("game-view");
      let gameBoardParent = id("game-board");
      let buttonContainerParent = button.parentNode;
      gameViewParent.removeChild(gameBoardParent);
      gameViewParent.removeChild(buttonContainerParent);
    }

    // Rules handler:
    // Removes Game Board children and then Game Board itself
    // Adds hidden class to Game View
    // Removes hidden class from Rules View
    function rulesBtnHandler() {
      removeGameViewChildren(this);
      let gameViewParent = id("game-view");
      gameViewParent.classList.add("hidden");
      id("rules-view").classList.remove("hidden");
    }

    function resetboardBtnHandler() {

      removeGameViewChildren(this);
      // fillValues = false;
      gameBoardMade = false;
      time = 0;
      clearInterval(timerID);
      timerID = null;
      clickCount = 0;
      tileValues = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      playerCanMove = true;
      id("timer").innerHTML = "Time: 00:00";

      startGame();
    }

    function statsBtnHandler() {

      removeGameViewChildren(this);
      let gameViewParent = id("game-view");
      gameViewParent.classList.add("hidden");
      id("stats-view").classList.remove("hidden");

      // adds return to game button
      // let returnToGameBtn = gen("button");
      // returnToGameBtn.id = "return-to-game";
      // returnToGameBtn.innerHTML = "Return";
      // id("stats-view").appendChild(returnToGameBtn);

    }

    function updateCountTimer() {
      time += 1;
      let minutes = 0;
      let seconds = 0;
      let strMinutes = "";
      let strSeconds = "";
      minutes = ((time - (time % 60)) / 60)
      seconds = time % 60;
      if (minutes <= 9) {
        strMinutes = "0" + minutes.toString();
      } else {
        strMinutes = minutes.toString();
      }
      if (seconds <= 9) {
        strSeconds = "0" + seconds.toString();
      } else {
        strSeconds = seconds.toString();
      }
      id("timer").innerText = "Time: " + strMinutes + ":" + strSeconds;
    }

    function updateStatsView() {
      id("games-played").innerHTML = gamesPlayed.toString();
      id("wins").innerHTML = wins.toString();
      id("losses").innerHTML = losses.toString();
      id("win-percentage").innerHTML = winPercent.toString() + "%";
      id("avg-time").innerHTML = avgTime.toString() + " seconds";
    }


     // returns random index number for a given length n.
     function random_amount(n) {
       // returns 0 through n-1
       return Math.floor(Math.random() * Math.floor(n));
     }

     /**
      * Returns the element that has the ID attribute with the specified value.
      * @param {string} idName - element ID
      * @returns {object} DOM object associated with id.
      */
     function id(idName) {
       return document.getElementById(idName);
     }

     /**
      * Returns a new element with the given tag name.
      * @param {string} tagName - HTML tag name for new DOM element.
      * @returns {object} New DOM object for given HTML tag.
      */
     function gen(tagName) {
       return document.createElement(tagName);
     }

     /**
      * Returns the first element that matches the given CSS selector.
      * @param {string} selector - CSS query selector.
      * @returns {object} The first DOM object matching the query.
      */
     function qs(selector) {
       return document.querySelector(selector);
     }

     /**
      * Returns the array of elements that match the given CSS selector.
      * @param {string} selector - CSS query selector
      * @returns {object[]} array of DOM objects matching the query.
      */
     function qsa(selector) {
       return document.querySelectorAll(selector);
     }

    }());
