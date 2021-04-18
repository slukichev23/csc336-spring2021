(function() {
  "use strict";

  window.addEventListener("load", init);

  function init() {
    // 1. Add event listener for clicking the #add-btn
    const submitBtn = id("add-btn");
    const output = id("group-output");
    const sizeBtn = id("group-size");
    const memberList = id("member-list");
    submitBtn.addEventListener("click", function(){
      // ###########################
      // displays group on next page
      // ###########################

      let inputs = qsa("ul input");
      let groupName = qs("label input");
      // Highlights empty fields in red
      let empty_field  = 0;
      // highlights group name input pink if not empty
      if (groupName.value != ""){
        groupName.classList.add("valid-input-group-name");
      } else {
        groupName.classList.remove("valid-input-group-name");
      }
      output.innerHTML = groupName.value + ":<br>";
      for (let i = 0; i < inputs.length; i++) {
        // resetting valid hightling:
        inputs[i].classList.remove("valid-input");
        // determining valid or invalid hightlighting color
        if (inputs[i].value == ""){
          inputs[i].classList.add("invalid-input");
          inputs[i].value = "Please enter member name";
          empty_field++;
        } else if (inputs[i].value != "Please enter member name"){
          inputs[i].classList.remove("invalid-input");
          inputs[i].classList.add("valid-input");
          // Valid Group member name, displays in group-output
          output.innerHTML += inputs[i].value + "<br>";
        }
      }

    })

    // 2. Add event listener for changing the #member-size dropdown
    sizeBtn.addEventListener("click", function(){
      // ##############################
      // updates number of input fields
      // ##############################

      // stores select value for group size
      let groupSize = qs("label select option:checked").value;
      let inputs = qsa("ul input");
      let numberOfFields = inputs.length;
      let memberListChildren = qsa("li");
      //console.log(inputs);
      // case 0: need to add fields. groupSize > numberOfFields
      if (groupSize > numberOfFields) {
        let fieldsToCreate = groupSize - numberOfFields;
        for (let i = 1; i <= fieldsToCreate; i++) {
          // Creating new List and Text element
          let newChild = gen("li");
          let newFields = numberOfFields + i;
          let textNode = document.createTextNode("Member " + newFields.toString()+ ":");
          newChild.appendChild(textNode);
          // Creating new Input box
          let inputBox = gen("input");
          inputBox.type = "text";
          inputBox.size = 40;
          newChild.appendChild(inputBox);
          // Adding them to the member list
          memberList.appendChild(newChild);

        }
      } else if (groupSize < numberOfFields){
        // case 1: need to remove fields. groupSize < numberOfFields
        let fieldsToRemove = numberOfFields - groupSize;
        for(let i = 0; i < inputs.length; i++){
          if(i > (numberOfFields - fieldsToRemove - 1)){
            //console.log("got here");
            // removing the input field and the Member # text
            memberListChildren[i].removeChild(inputs[i])
            memberListChildren[i].innerHTML = "";
            // The parent of those elements is still there thought
            // so we have to remove that too
            memberList.removeChild(memberListChildren[i]);
          }
        }

      }




    })


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
  /**
   * Returns a new element with the given tag name.
   * @param {string} tagName - HTML tag name for new DOM element.
   * @returns {object} New DOM object for given HTML tag.
   */
  function gen(tagName) {
    return document.createElement(tagName);
  }


})();
