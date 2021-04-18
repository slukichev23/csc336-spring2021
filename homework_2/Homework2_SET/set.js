(function() {
  "use strict";
  // Array that keeps track of up to 3 selected cards:
  let selectedCards = [];
  // this list keeps track of created combinations so that they dont repeat
  let generatedCominations = [];
  let difficultyLevel = "NA";
  // timer
  let timeLimit = 0;
  let displayTimer = null;
  let timerID = null;
  let setsFound = 0;
  let setTextReference = null;
  let limitedTime = true;

    window.addEventListener("load", init);
     function init() {
       // finds start button
       const startBtn = id("start");
       // extracts value from difficulty and time setting
       // and uses it to generate the Set! game
       const gameWindow = id("game");
       const detailsBorder = id("details");
       const gameBorder = id("game");
       const gameView = id("game-view");
       const optionsAndRules = id("wrapper-div");
       const displayTime = id("time");
       const setsFoundCounter = id("set-count");
       setTextReference = setsFoundCounter;
       displayTimer = displayTime;

       startBtn.addEventListener("click", function()
       {
         difficultyLevel = qs("p label input:checked").value;
         //console.log(difficultyLevel);
         timeLimit = id("select-dropdown").value;
         if (timeLimit == "none"){
           timeLimit = "1";
           limitedTime = false;
         }
         timeLimit = parseInt(timeLimit);


         // TODO: Hide rules menu view, unhide game view

         optionsAndRules.classList.add("hidden");

         gameView.classList.remove("hidden");

         // add borders to game view
         detailsBorder.classList.add("solid-border");
         gameBorder.classList.add("solid-border");


         // Populates game window with cards based upon the difficulty
         if (difficultyLevel == "easy") {
           for (let i = 0; i < 9; i++) {
             // ####################
             // generates EASY card
             // ####################
             let generatedCombination = generate_easy_card();
             // Checks for duplicates <-- this took me way too long. There's a slight chance of the newly generated image ALSO being a duplicate
             //                                                       which the while loop takes care of.
             if (i > 0){
               // only need to check for equality if i is greater than 0
               // iterate through array of created combinations
               let areThereNoDuplicates = false;
               let dupe = 0;
               let dupesInARow = -1;
               while (!areThereNoDuplicates){
                for (let j = 0; j < generatedCominations.length; j++){
                  let type_0_amount_1 = generatedCominations[j];
                  if (generatedCombination[0] == type_0_amount_1[0]){
                    if (generatedCombination[1] == type_0_amount_1[1]){
                      // duplicate found, generating new image
                      //console.log("Duplicate found");
                      //console.log(type_0_amount_1);
                      //console.log("Equals");
                      //console.log(generatedCombination);
                      generatedCombination = generate_easy_card();
                      dupe++;
                    }
                  }

                 }
                 if (dupe == 0){
                   areThereNoDuplicates = true;
                 } else {
                   dupesInARow++;
                   //console.log("dupes in a row: " + dupesInARow.toString());
                   dupe = 0;
                 }

               }
               // we have made sure that there are no duplicates, push card to the list!

               generatedCominations.push(generatedCombination);
             }
             // first iteration, add to array
             else {

               generatedCominations.push(generatedCombination);
             }
           }
           console.log(generatedCominations);

           for (let i = 0; i < 9; i++){
             let type_0_amount_1 = generatedCominations[i];

             // Create a div to host the image
             let card = document.createElement('div');
             card.classList.add("cards");
             // append index
             card.value = i;

             //create img element(s)
             for (let j = 0; j < type_0_amount_1[1]+1; j++){
               let theCardImage = document.createElement('img');
               theCardImage.src = "img/" + type_0_amount_1[0] + ".png";
               card.appendChild(theCardImage);
             }
             // add card to game View
             gameWindow.appendChild(card);

           }

           // Cards have been added, now we add event listener:
           // Gives cards back shadow when clicked on, removes if clicked again (clickcount = 0, mod 2 yes = no bg no = yes bg)
           // Keeps track of selected cards. When number of selected cards hits 3, it will check if they are a set and remove them from selection.
           let domCardObjects = gameWindow.children;
           console.log(domCardObjects);
           console.log("total cards: ", domCardObjects.length);
           for (let i = 0; i < domCardObjects.length; i++){
             //console.log(domCardObjects[i].value);
             // adds event listener to each card
             domCardObjects[i].addEventListener("click", cardClickEvent);
           }
           // End of EASY
         }
         else {
           // ########################
           // STANDARD difficulty cards
           // ########################
           for (let i = 0; i < 12; i++) {
             // generates easy card
             let generatedCombination = generate_standard_card();
             // Checks for duplicates
             if (i > 0){
               // only need to check for equality if i is greater than 0
               // iterate through array of created combinations
               let areThereNoDuplicates = false;
               let dupe = 0;
               let dupesInARow = -1;
               while (!areThereNoDuplicates){
                for (let j = 0; j < generatedCominations.length; j++){
                  let type_0_amount_1 = generatedCominations[j];
                  if (generatedCombination[0] == type_0_amount_1[0]){
                    if (generatedCombination[1] == type_0_amount_1[1]){
                      // duplicate found, generating new image
                      console.log("Duplicate found");
                      console.log(type_0_amount_1);
                      console.log("Equals");
                      console.log(generatedCombination);
                      generatedCombination = generate_easy_card();
                      dupe++;
                    }
                  }

                 }
                 if (dupe == 0){
                   areThereNoDuplicates = true;
                 } else {
                   dupesInARow++;
                   console.log("dupes in a row: " + dupesInARow.toString());
                   dupe = 0;
                 }

               }
               // we have made sure that there are no duplicates, push card to the list!
               generatedCominations.push(generatedCombination);
             }
             // first iteration, add to array
             else {
               generatedCominations.push(generatedCombination);
             }
           }
           console.log(generatedCominations);

           for (let i = 0; i < 12; i++){
             let type_0_amount_1 = generatedCominations[i];

             // Create a div to host the image
             let card = document.createElement('div');
             card.classList.add("cards");
             // append index
             card.value = i;

             //create img element(s)
             for (let j = 0; j < type_0_amount_1[1]+1; j++){
               let theCardImage = document.createElement('img');
               theCardImage.src = "img/" + type_0_amount_1[0] + ".png";
               card.appendChild(theCardImage);
             }
             // add card to game View
             gameWindow.appendChild(card);
           }
           // Cards have been added, now we add event listener:
           // Gives cards back shadow when clicked on, removes if clicked again (clickcount = 0, mod 2 yes = no bg no = yes bg)
           // Keeps track of selected cards. When number of selected cards hits 3, it will check if they are a set and remove them from selection.
           let domCardObjects = gameWindow.children;
           console.log(domCardObjects);
           console.log("total cards: ", domCardObjects.length);
           for (let i = 0; i < domCardObjects.length; i++){
             console.log(domCardObjects[i].value);
             // adds event listener to each card
             domCardObjects[i].addEventListener("click", cardClickEvent);
           }
         }

         // ##Handlers game timer##
         if (timeLimit == 1) {
           timerID = setInterval(updateCountTimer, 1000);
         } else {
           timerID = setInterval(updateCountDownTimer, 1000);
         }


       })
       // end of start button event handler

       // handler for return to main menu button:
       const mainMenuButton = id("main-btn");
       mainMenuButton.addEventListener("click", function()
       {
         // add hidden class to game-view
         gameView.classList.add("hidden");
         // remove border classes from details and game windows
         detailsBorder.classList.remove("solid-border");
         gameBorder.classList.remove("solid-border");
         // clear the game window of its cards
         removeChildren(gameWindow);
         // remove hidden class from main menu
         optionsAndRules.classList.remove("hidden");
         // clears the created and selected cards array
         generatedCominations = [];
         selectedCards = [];
         setsFound = 0;
         setTextReference.innerText = setsFound.toString();
         clearInterval(timerID);
         timerID = null;
       })

       const refreshBtn = id("refresh");
       // handler for refresh board button.
       refreshBtn.addEventListener("click", function() {
         // removes current cards
         removeChildren(gameWindow);
         generatedCominations = [];
         selectedCards = [];
         // adds fresh set of cards
         // Populates game window with cards based upon the difficulty
         if (difficultyLevel == "easy") {
           for (let i = 0; i < 9; i++) {
             // ####################
             // generates EASY card
             // ####################
             let generatedCombination = generate_easy_card();
             // Checks for duplicates <-- this took me way too long. There's a slight chance of the newly generated image ALSO being a duplicate
             //                                                       which the while loop takes care of.
             if (i > 0){
               // only need to check for equality if i is greater than 0
               // iterate through array of created combinations
               let areThereNoDuplicates = false;
               let dupe = 0;
               let dupesInARow = -1;
               while (!areThereNoDuplicates){
                for (let j = 0; j < generatedCominations.length; j++){
                  let type_0_amount_1 = generatedCominations[j];
                  if (generatedCombination[0] == type_0_amount_1[0]){
                    if (generatedCombination[1] == type_0_amount_1[1]){
                      // duplicate found, generating new image
                      console.log("Duplicate found");
                      console.log(type_0_amount_1);
                      console.log("Equals");
                      console.log(generatedCombination);
                      generatedCombination = generate_easy_card();
                      dupe++;
                    }
                  }

                 }
                 if (dupe == 0){
                   areThereNoDuplicates = true;
                 } else {
                   dupesInARow++;
                   console.log("dupes in a row: " + dupesInARow.toString());
                   dupe = 0;
                 }

               }
               // we have made sure that there are no duplicates, push card to the list!

               generatedCominations.push(generatedCombination);
             }
             // first iteration, add to array
             else {

               generatedCominations.push(generatedCombination);
             }
           }
           console.log(generatedCominations);

           for (let i = 0; i < 9; i++){
             let type_0_amount_1 = generatedCominations[i];

             // Create a div to host the image
             let card = document.createElement('div');
             card.classList.add("cards");
             // append index
             card.value = i;

             //create img element(s)
             for (let j = 0; j < type_0_amount_1[1]+1; j++){
               let theCardImage = document.createElement('img');
               theCardImage.src = "img/" + type_0_amount_1[0] + ".png";
               card.appendChild(theCardImage);
             }
             // add card to game View
             gameWindow.appendChild(card);

           }

           // Cards have been added, now we add event listener:
           // Gives cards back shadow when clicked on, removes if clicked again (clickcount = 0, mod 2 yes = no bg no = yes bg)
           // Keeps track of selected cards. When number of selected cards hits 3, it will check if they are a set and remove them from selection.
           let domCardObjects = gameWindow.children;
           console.log(domCardObjects);
           console.log("total cards: ", domCardObjects.length);
           for (let i = 0; i < domCardObjects.length; i++){
             console.log(domCardObjects[i].value);
             // adds event listener to each card
             domCardObjects[i].addEventListener("click", cardClickEvent);
           }
           // End of EASY
         }
         else {
           // ########################
           // STANDARD difficulty cards
           // ########################
           for (let i = 0; i < 12; i++) {
             // generates easy card
             let generatedCombination = generate_standard_card();
             // Checks for duplicates
             if (i > 0){
               // only need to check for equality if i is greater than 0
               // iterate through array of created combinations
               let areThereNoDuplicates = false;
               let dupe = 0;
               let dupesInARow = -1;
               while (!areThereNoDuplicates){
                for (let j = 0; j < generatedCominations.length; j++){
                  let type_0_amount_1 = generatedCominations[j];
                  if (generatedCombination[0] == type_0_amount_1[0]){
                    if (generatedCombination[1] == type_0_amount_1[1]){
                      // duplicate found, generating new image
                      console.log("Duplicate found");
                      console.log(type_0_amount_1);
                      console.log("Equals");
                      console.log(generatedCombination);
                      generatedCombination = generate_easy_card();
                      dupe++;
                    }
                  }

                 }
                 if (dupe == 0){
                   areThereNoDuplicates = true;
                 } else {
                   dupesInARow++;
                   console.log("dupes in a row: " + dupesInARow.toString());
                   dupe = 0;
                 }

               }
               // we have made sure that there are no duplicates, push card to the list!
               generatedCominations.push(generatedCombination);
             }
             // first iteration, add to array
             else {
               generatedCominations.push(generatedCombination);
             }
           }
           console.log(generatedCominations);

           for (let i = 0; i < 12; i++){
             let type_0_amount_1 = generatedCominations[i];

             // Create a div to host the image
             let card = document.createElement('div');
             card.classList.add("cards");
             // append index
             card.value = i;

             //create img element(s)
             for (let j = 0; j < type_0_amount_1[1]+1; j++){
               let theCardImage = document.createElement('img');
               theCardImage.src = "img/" + type_0_amount_1[0] + ".png";
               card.appendChild(theCardImage);
             }
             // add card to game View
             gameWindow.appendChild(card);
           }
           // Cards have been added, now we add event listener:
           // Gives cards back shadow when clicked on, removes if clicked again (clickcount = 0, mod 2 yes = no bg no = yes bg)
           // Keeps track of selected cards. When number of selected cards hits 3, it will check if they are a set and remove them from selection.
           let domCardObjects = gameWindow.children;
           console.log(domCardObjects);
           console.log("total cards: ", domCardObjects.length);
           for (let i = 0; i < domCardObjects.length; i++){
             console.log(domCardObjects[i].value);
             // adds event listener to each card
             domCardObjects[i].addEventListener("click", cardClickEvent);
           }
         }
       })
       // End of init function
     }

     function cardClickEvent(){

       if (timeLimit > 0){
         // Makes sure that already selected cards don't get added to list twice
         if (this.classList.contains("selected")){
           // don't add card to selected list
           this.classList.remove("selected");
           selectedCards.pop(this.value);
         } else {
           // add card
             selectedCards.push(this.value);
             this.classList.add("selected");
         }

         //console.log("Card count: ", selectedCards.length);
         //console.log("Cards array: ", selectedCards);

         // Set! Check
         if (selectedCards.length == 3){
           // Player has selected their third card, check to see if their selected cards are a set.
           // Set! Check
           // Rules:
           // Number of all 3 must be either the same or all different.
           // Color of all 3 must be either the same or all different.
           // Shape of all 3 must be either the same or all different.
           // Shading of all 3 must be either the same or all different.

           // First, let's put the attributes of each card in the format of: [shading, shape, color, number]
           let card1 = formatCard(0);
           let card2 = formatCard(1);
           let card3 = formatCard(2);

           console.log(card1, " ", card2, " ", card3);

           let isThisASet = isSet(card1, card2, card3);

           let gameWindowLocal = id("game");
           let cards = gameWindowLocal.children;

           if (isThisASet) {
             console.log("You've found a set!");
             if (limitedTime) {
               timeLimit += 15;
             } else {
               timeLimit -= 15;
             }

             setsFound++;
             setTextReference.innerText = setsFound.toString();
             // adds in-a-set class to current selected cards
             for (let i = 0; i < cards.length; i++){
               if (i == selectedCards[0] || i == selectedCards[1] || i == selectedCards[2]){
                 cards[i].classList.add("in-a-set");
               }
             }

           } else {
             // not a set
             if (limitedTime) {
               timeLimit -= 15;
             } else {
               timeLimit += 15;
             }
           }

           // Reset card count and selected cards

           // ###########

           // clear shadow only from cards which dont have the in-a-set class
           for (let i = 0; i < cards.length; i++){
             if (cards[i].classList.contains("in-a-set")){
               // if already been part of a set, don't remove shadow
             } else {
               cards[i].classList.remove("selected");
             }

           }


           // ###########


           selectedCards = [];
         } else {

         }
       }
     }

     function formatCard(selectedCardIndex){
       let formattedCard = "";
       let tempCard = generatedCominations[selectedCards[selectedCardIndex]];
       let shading_shape_color = tempCard[0];
       let number = tempCard[1];

       formattedCard = shading_shape_color + "-" + number.toString();
       return(formattedCard);


     }

     function isSet(card1, card2, card3){
       let attributePoints = 0;
       let cardArray1 = card1.split("-");
       let cardArray2 = card2.split("-");
       let cardArray3 = card3.split("-");
       // if all same or all different for a particular attribute = +1 points. 4 points = set
       for (let i = 0; i < cardArray1.length; i++){
         if (cardArray1[i] == cardArray2[i] && cardArray1[i] == cardArray3[i] && cardArray2[i] == cardArray3[i]){
           attributePoints++;
         } else if (cardArray1[i] != cardArray2[i] && cardArray1[i] != cardArray3[i] && cardArray2[i] != cardArray3[i]){
           attributePoints++;
         } else {
           // not a set
           break;
         }
       }

       if (attributePoints == 4){
         return true;
       } else {
         return false;
       }
     }

     function updateCountDownTimer(){
       timeLimit -= 1;
       //console.log("Seconds left: ", timeLimit);
       let minutes = 0;
       let seconds = 0;
       let strMinutes = "";
       let strSeconds = "";
       minutes = ((timeLimit - (timeLimit % 60)) / 60)
       seconds = timeLimit % 60;
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
       displayTimer.innerText = strMinutes + ":" + strSeconds;

       // Stops timer when time runs out:
       if (timeLimit <= 0){
         clearInterval(timerID);
         timerID = null;
         console.log("Timer has stopped");
       }

     }

     function updateCountTimer() {
       // limitation: I did not account for time played above 1 hour
       timeLimit += 1;
       let minutes = 0;
       let seconds = 0;
       let strMinutes = "";
       let strSeconds = "";
       minutes = ((timeLimit - (timeLimit % 60)) / 60)
       seconds = timeLimit % 60;
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
       displayTimer.innerText = strMinutes + ":" + strSeconds;
     }

     function removeChildren(gameWindow) {
       while (gameWindow.firstChild) {
       console.log("removing", parent.firstChild);
       gameWindow.removeChild(gameWindow.firstChild);
         }
     }
     // returns generated card for easy difficulty
     function generate_easy_card() {
       let combo = "solid-" + random_shape() + "-" + random_color();
       let num = random_amount();
       return [combo, num];
     }

     // returns generated card for standard difficulty
     function generate_standard_card() {
       let combo = random_shading() + "-" + random_shape() + "-" + random_color();
       let num = random_amount();
       return [combo, num];
     }

     function random_shading() {
       let num = random_amount();
       if (num == 0){
         return "solid";
       } else if (num == 1){
         return "outline";
       } else {
         return "striped";
       }
     }

     function random_shape() {
       let num = random_amount();
       if (num == 0){
         return "diamond";
       } else if (num == 1){
         return "squiggle";
       } else {
         return "oval";
       }
     }

     function random_color() {
       let num = random_amount();
       if (num == 0){
         return "red";
       } else if (num == 1){
         return "green";
       } else {
         return "purple";
       }
     }

     function random_amount() {
       // returns 0, 1, or 2
       return Math.floor(Math.random() * Math.floor(3));
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
