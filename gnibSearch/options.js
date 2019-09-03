'use strict';

let saveButton = document.getElementById('save');
let boolGnib = document.getElementById('boolGnib');

boolGnib.addEventListener('change', function() {
	let hasGnib = document.getElementById('hasGnib');
	if(boolGnib.value == "Yes"){
		hasGnib.style.display = "block";
	}
	else {
		hasGnib.style.display = "none";
	}
});
saveButton.addEventListener('click', function() {
	let objUser = {};
	objUser.boolGnib = document.getElementById('boolGnib').value;
	objUser.gnibNumber = document.getElementById('gnibNumber').value;
	objUser.gnibExDate = document.getElementById('gnibExDate').value;
	objUser.givenName = document.getElementById('givenName').value;
	objUser.surName = document.getElementById('surName').value;
	objUser.birth = document.getElementById('birth').value;
	objUser.email = document.getElementById('email').value;
	objUser.passport = document.getElementById('passport').value;
	objUser.nationality = document.getElementById('nationality').value;
	
  chrome.storage.sync.set({"user": objUser}, function() {
    console.log(objUser);
  })
});