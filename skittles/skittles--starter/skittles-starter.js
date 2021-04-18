(function() {
  // Part 1: Setting up the window load event listener to call init when page is loaded
  // 1.1. Write the event listener (one statement)
  window.addEventListener("load", init);

  // Part 2: Finish assigning event listeners for main interactive page elements (two buttons for now)
  function init() {
    // references to html elements
    const jar = id("jar");
    const startBtn = id("start-btn");
    const answerBtn = id("answer-btn");
    const displayParent = qs("p");
    const displayText = id("count");
    let greenCount = 0;
    let hasUserCreatedMoreSkittles = false;

    // (Given) When [#answer-btn] is clicked, call [showAnswer]
    answerBtn.addEventListener("click", function(){
      if (hasUserCreatedMoreSkittles){
        let listOfSkittles = jar.children;
        for (let i = 0; i < listOfSkittles.length; i++){
          //console.log(listOfSkittles[i]);
          if (listOfSkittles[i].classList.contains("green")){
            greenCount++;
          }
        }
        //console.log(greenCount);
        displayParent.classList.remove("hidden");
        displayText.innerText = "";
        let textNode = document.createTextNode(greenCount.toString());
        displayText.appendChild(textNode);
        hasUserCreatedMoreSkittles = false;

      }


    });
    // 2.1. When #start-btn is clicked, fillJar should be called.
    startBtn.addEventListener("click", function(){
      hasUserCreatedMoreSkittles = true;
      let numOfSkittles = 36;
      for (let i = 0; i < numOfSkittles; i++){
        let newSkittle = gen("div");
        newSkittle.classList.add("skittle");
        newSkittle.classList.add(getRandomColor());
        jar.appendChild(newSkittle);
      }

  });
  }


  // Part 5: Get a random color for a skittle (we'll add more colors soon!)
  function getRandomColor() {
    const COLORS = ["red", "green", "blue"];
    // 5.1. Get a random integer number using length of COLORS. Hint: Use Math.random() to get a number between [0, 1).
    random_index = Math.floor(Math.random() * Math.floor(COLORS.length));
    // 5.2 Return a string at the random index of COLORS
    return COLORS[random_index];
  }



  /* ------------------------------ Provided Shorthand Functions ------------------------------ */
  // Note: These are the three provided shorthand functions shown in lecture/section. You may use these
  // in your own JS, but these are the only functions you are allowed to use in your own work as an
  // exception to the course Academic Conduct policy. These are also useful examples of JSDoc comments!
  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id (null if none).
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Returns the array of elements that match the given CSS selector.
   * @param {string} selector - CSS query selector
   * @returns {object[]} array of DOM objects matching the query (empty if none).
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

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} selector - CSS query selector string.
   * @returns {object} first element matching the selector in the DOM tree (null if none)
   */
  function qs(selector) {
    return document.querySelector(selector);
  }
})();
