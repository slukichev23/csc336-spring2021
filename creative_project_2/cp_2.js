(function() {

  "use strict";
  // Statistics which can be viewed in stats-view
  let gamesPlayed = 0;
  let wins = 0;
  let losses = 0;
  let winPercent = 0;
  let avgTime = 0; // in seconds
  // Keeps track for game itself
  let clickCount = 0;
  let fillValues = false;
  let tileValues = [0, 0, 0, 0, 0, 0, 0, 0, 0]; // 0 = empty, 1 = player, 2 = computer
  let timerID = null;
  let time = 0;

  window.addEventListener("load", init);

  function init() {
    // getting references to buttons
    const startBtn = id("play-btn");
    // ADD: rulesBtn, statsBtn, returnToGameBtn
    startBtn.addEventListener("click", startGame);
  }

    // Event listener for Start Button
    function startGame(){
      // 1. Add hidden class to Rules View
      id("rules-view").classList.add("hidden");
      // 2. Remove hidden class from Game View
      let gameView = id("game-view");
      gameView.classList.remove("hidden");

      if (id("game-board")){
        // game-board is already made
        // user checked rules and wants to return to the game they had going.
        // setting flag to fill in values of tiles after generation
        fillValues = true;
      } else {
        // TODO: Start timer
        timerID = setInterval(updateCountTimer, 1000);
      }
      // 3. Create div with id "game-board" and append it to Game View
      let gameBoard = gen("div");
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
      // 7. Create "Rules", "Stats", and "Restart Buttons" and append them to Game View
      let rulesBtn = gen("button");
      rulesBtn.id = "rules-btn";
      rulesBtn.innerHTML = "Rules";
      let resetboardBtn = gen("button");
      resetboardBtn.id = "resetboard-btn";
      resetboardBtn.innerHTML = "Restart";
      let statsBtn = gen("button");
      statsBtn.id = "stats-btn";
      statsBtn.innerHTML = "Your stats";
      let buttonsContainer = gen("div");
      buttonsContainer.id = "container";
      gameView.appendChild(buttonsContainer);
      buttonsContainer.appendChild(rulesBtn);
      buttonsContainer.appendChild(resetboardBtn);
      buttonsContainer.appendChild(statsBtn);

      // 8. If flag to fill was set earlier, fill board with saved values:
      // function goes here

      // 9. Add event handlers to each button
      // Rules handler:
      // Removes Game Board children and then Game Board itself
      // Adds hidden class to Game View
      // Removes hidden class from Rules View
      rulesBtn.addEventListener("click", rulesBtnHandler);
      resetboardBtn.addEventListener("click", resetboardBtnHandler);

    }

    function tileClickEvent() {
      console.log("tile index " + this.value + " has been clicked");
      clickCount++;
      // 1. Check if this has child. If it does, either player or computer
      // has already clicked on it.
      // 2. If empty, gen img and append as child. Set img to player's icon
      // 3. If at least 3 clicks have been made, begin checking for winning condition
      // Board:
      // 0 1 2
      // 3 4 5
      // 6 7 8
      // 4. After player has clicked, set canPlayerMove = false (cooldown to let computer make its move)
      // 5. Let computer pick where to go.
        // a. If there is an immediate spot open that will cause player to win if they
        // go there, take that spot. Will claim first of such spots that it detects.
        // b. If there are no spots which will lead to immediate player victory, computer
        // gets a list of open indexes and randomly chooses one of them.
    }

    function removeGameViewChildren(button) {
      let gameViewParent = id("game-view");
      let gameBoardParent = id("game-board");
      let buttonContainerParent = button.parentNode;
      gameViewParent.removeChild(gameBoardParent);
      gameViewParent.removeChild(buttonContainerParent);
    }

    function rulesBtnHandler() {
      // Removes children from game-view
      removeGameViewChildren(this);
      let gameViewParent = id("game-view");
      gameViewParent.classList.add("hidden");
      id("rules-view").classList.remove("hidden");
    }

    function resetboardBtnHandler() {
      // Removes children from game-view
      removeGameViewChildren(this);
      fillValues = false;
      time = 0;
      clearInterval(timerID);
      timerID = null;
      startGame();
    }

    function statsBtnHandler() {
      // Removes children from game-view
      removeGameViewChildren(this);
      let gameViewParent = id("game-view");
      gameViewParent.classList.add("hidden");
      id("stats-view").classList.remove("hidden");
    }

    function updateCountTimer() {
      // TODO: Add hour count
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
      id("timer").innerText = strMinutes + ":" + strSeconds;
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
