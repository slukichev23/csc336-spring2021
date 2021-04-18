//An example of unobtrusive JS.
(function() {
  "use strict";
    window.addEventListener("load", init);
     function init() {
       // Number that user has to guess
       let num = Math.floor((Math.random() * 10) + 1);
       // loop to keep prompting user
       let userNum = prompt("Enter a number between 1 and 10");
       while (userNum != num){
         alert("Not matched!");
         userNum = prompt("Please enter another number");
       }
       alert("Good work!!!");

     }
    }());
