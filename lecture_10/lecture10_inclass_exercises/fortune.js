var fortuneCookie = {
    tellFortune: function (numOfChildren, partnerName, geoLocation, jobTitle) {
        alert("You will be a " + jobTitle + " in " + geoLocation + " , and married to " + partnerName + " with " + numOfChildren + " kids.");
    }
};

fortuneCookie.tellFortune(10, "Ryan", "London", "Engineer");
fortuneCookie.tellFortune(2, "Lauren", "Seatle", "Coffee Shop Owener");
fortuneCookie.tellFortune(0, "Bob", "Paris", "Taxi Driver");
fortuneCookie.tellFortune(1, "Christina", "Guangzhou", "Software Engineer");
