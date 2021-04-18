//An example of unobtrusive JS.
(function() {
  "use strict";
    window.addEventListener("load", init);
     function init() {
       // find button object
       let OKbtn = document.getElementById("ok_button");
       // add click event
       OKbtn.addEventListener("click", function()
       {
         // do this when clicked
         alert("Booyah!");
       })
     }
    }());
