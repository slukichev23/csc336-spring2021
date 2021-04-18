(function() {
  "use strict";
    window.addEventListener("load", init);
     function init() {
       // prompts user for string input
       let userString = prompt("Please enter a sentence");
       // returns the string as a list of words
       alert(userString.split(" "));


     }
    }());
