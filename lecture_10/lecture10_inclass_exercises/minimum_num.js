(function() {
  "use strict";
    window.addEventListener("load", findMin);
     function findMin() {
       // array of numbers
       let numArray = [0,46,-23,14,95,3,8,-42,4,1];
       // finds minimum num in Array
       let minNum = numArray[0];
       for (let i = 0; i < numArray.length - 1; i++){
         if (minNum > numArray[i+1]){
           minNum = numArray[i+1];
         }

       }
       document.write("The array is " + numArray);
       document.write(" and the minimum number is  " + minNum);


     }
    }());
