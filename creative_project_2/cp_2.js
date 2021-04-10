(function() {
  "use strict";


    window.addEventListener("load", init);
     function init() {

     }


     // ### FUNCTIONS ###

     function updateCountTimer() {
       // TODO: Add hour count
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

     function removeChildren(parentObject) {
       while (parentObject.firstChild) {
       parentObject.removeChild(parentObject.firstChild);
         }
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
