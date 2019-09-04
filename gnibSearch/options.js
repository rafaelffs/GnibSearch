'use strict';

let saveButton = document.getElementById('save');
let form1 = document.getElementById('form');
let boolGnib = document.getElementById('boolGnib');
let openInis = document.getElementById('openInis');
let toggleExtras = document.getElementById('toggleExtras');

boolGnib.addEventListener('change', function() {
	showHideGnib();
});

toggleExtras.addEventListener('click', function() {
	showHideExtras(true);
}); 

openInis.onclick = function(element) {
	chrome.tabs.update({url: "https://burghquayregistrationoffice.inis.gov.ie/Website/AMSREG/AMSRegWeb.nsf/AppSelect?OpenForm"});
};

form1.addEventListener('submit', function() {
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
	objUser.blockedAppointments = document.getElementById('blockedAppointments').value;
	objUser.minDate = document.getElementById('minDate').value;
	objUser.maxDate = document.getElementById('maxDate').value;
	chrome.storage.sync.set({"user": objUser}, function() {
		alert("User Saved");
	})
  
});

function showHideExtras(clicked){
	if((document.getElementById('blockedAppointments').value > 0 
	|| document.getElementById('minDate').value != ""
	|| document.getElementById('maxDate').value != "") && !clicked)
			$("#extras").show();

	if(clicked){
		$("#extras").fadeToggle("slow");
		document.getElementById('minDate').value = "";
		document.getElementById('maxDate').value = "";
		document.getElementById('blockedAppointments').value = 0;
	}
}

function showHideGnib(){
	let hasGnib = document.getElementById('hasGnib');
	let gnibNumber = document.getElementById('gnibNumber');
	let gnibExDate = document.getElementById('gnibExDate');
	
	if(boolGnib.value == "Yes"){
		hasGnib.style.display = "block";
		gnibExDate.required = true;
		gnibNumber.required = true;
	}
	else {
		hasGnib.style.display = "none";
		document.getElementById('gnibNumber').value = "";
		document.getElementById('gnibExDate').value = "";
		gnibExDate.required = false;
		gnibNumber.required = false;
	}
}

function loadInfo(){
chrome.storage.sync.get('user', function(data) {
	if(data.user != undefined){
		document.getElementById('boolGnib').value = data.user.boolGnib;   
		document.getElementById('gnibNumber').value = data.user.gnibNumber;
		document.getElementById('gnibExDate').value  = data.user.gnibExDate;
		document.getElementById('givenName').value = data.user.givenName;
		document.getElementById('surName').value = data.user.surName; 
		document.getElementById('birth').value = data.user.birth;   
		document.getElementById('email').value = data.user.email;      
		document.getElementById('passport').value = data.user.passport;
		document.getElementById('nationality').value = data.user.nationality;
		document.getElementById('minDate').value = data.user.minDate;
		document.getElementById('maxDate').value = data.user.maxDate;
		document.getElementById('blockedAppointments').value = data.user.blockedAppointments == undefined ? 0 : data.user.blockedAppointments;
		showHideGnib();
		showHideExtras();
	}
});
}

loadInfo();