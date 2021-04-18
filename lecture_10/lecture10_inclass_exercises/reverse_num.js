(function() {
  "use strict";
    window.addEventListener("load", reverseNum);
     function reverseNum() {
       let num = prompt("Enter a number to reverse");

       let strNum = num.toString();
       strNum = strNum.split("").reverse().join("");
       alert(strNum + " is the number reversed");


     }
    }());
