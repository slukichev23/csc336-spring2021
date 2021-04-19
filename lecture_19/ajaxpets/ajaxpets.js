/**
 *
 * A webpage for fetching cute pet photos. Puppies (the best) or
 * kitties will be populated on the page after the user selects their desired
 * pet type.
 */
(function() {
  "use strict";

  window.addEventListener("load", initialize);

  /*
   * TODO: What do we need to initialize?
   */
  function initialize() {
    const radioList = qsa("input");
    const kittyButton = radioList[0];
    const puppyButton = radioList[1];
    // Kitty button event handler
    kittyButton.addEventListener("click", function() {
      console.log("clicked kitty");
      id("pictures").innerHTML = "";
      makeRequest('kitty');
    });
    // Puppy button event handler
    puppyButton.addEventListener("click", function() {
      console.log("clicked puppy");
      id("pictures").innerHTML = "";
      makeRequest('puppy');
    });

  }

  /*
   * TODO: Fetch data from the CSE 154 ajax pets api!
   */
  function makeRequest(pet) {
    let url = "https://courses.cs.washington.edu/courses/cse154/webservices/pets/ajaxpets.php?animal="
    fetch(url + pet)
    .then(checkStatus)
    .then(resp => resp.split("\n"))
    .then(resp => displayPets(resp))

  }

  /**
   * TODO: Implement any other functions you need
   */

  /* ------------------------------ Helper Functions  ------------------------------ */

  /*
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} response - response to check for success/error
   * @return {object} - valid result text if response was successful, otherwise rejected
   *                    Promise result
   */
  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300 || response.status == 0) {
      return response.text();
    } else {
      return Promise.reject(new Error(response.status + ": " + response.statusText));
    }
  }

  function displayPets(response) {
    for (let i = 0; i < response.length; i++){
      let newImg = gen("img");
      newImg.src = response[i];
      id("pictures").appendChild(newImg);

    }
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} id - element ID
   * @return {object} DOM object associated with id.
   */
  function id(id) {
    return document.getElementById(id);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} query - CSS query selector.
   * @returns {object[]} array of DOM objects matching the query.
   */
  function qs(query) {
    return document.querySelector(query);
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
   * Returns the array of elements that match the given CSS selector.
   * @param {string} query - CSS query selector
   * @returns {object[]} array of DOM objects matching the query.
   */
  function qsa(query) {
    return document.querySelectorAll(query);
  }
})();
