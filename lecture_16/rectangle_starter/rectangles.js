// color the rectangle and move them randomlyi
// Today's goal :
//   - rectangles randomly are colored when the color button is clicked
//   - when the select is changed the number of rectangles changes to match it

// in the next class we will make the move function work

// here is a road map of the functions you need to implement.

(function() {
	"use strict";

	window.onload = function() {
		var colorButton = id("color");
		colorButton.onclick = colorIt;

		var moveButton = id("move");
		moveButton.onclick = moveIt;

		var numSelect = id("count");
		numSelect.onchange = createRectangles;

		createRectangles();
		//colorIt();
		//moveIt();
	};

	// creates the number of rectangles specified in the select.
	function createRectangles() {
		id("rectanglearea").innerHTML = "";
		var count = id("count").value;
		// creates rectangles
		for (let i = 0; i < count; i ++){
			let newRectangle = gen("div");
			newRectangle.classList.add("rectangle");
			id("rectanglearea").appendChild(newRectangle);
		}



	}

   	// Randomly color all of the rectangles
		function generateColor(){
			var r = Math.floor(Math.random() * 256);
			var g = Math.floor(Math.random() * 256);
			var b = Math.floor(Math.random() * 256);
			return ("rgb(" + r + ", " + g + ", " + b + ")");
		}

    function colorIt() {
    	// your code goes here
    	//you might find the following code snippts useful
			let rectangleChildren = id("rectanglearea").children;
			for (let i = 0; i < rectangleChildren.length; i++){
				rectangleChildren[i].classList.add("highlighted");
				rectangleChildren[i].style.backgroundColor = generateColor();
			}

    }

	// Randomly position all the rectangles
	function moveIt() {
		// adding movable class to all rectangles
		let rectangleChildren = id("rectanglearea").children;
		for (let i = 0; i < rectangleChildren.length; i++){
			rectangleChildren[i].classList.add("movable");
			rectangleChildren[i].style.opacity = 0.75;
			// generating random x y position and moving rectangles there
			// note: max left: 648px, max top: 448px;
			var left = Math.floor(Math.random() * 648);
			var top = Math.floor(Math.random() * 448);
			rectangleChildren[i].style.left = left + "px";
			rectangleChildren[i].style.top = top + "px";
		}


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



})();
