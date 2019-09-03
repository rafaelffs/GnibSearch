'use strict';

let runScript = document.getElementById('runScript');

runScript.onclick = function(element) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  
chrome.tabs.executeScript(null, { file: "jquery-3.4.1.min.js" }, function() {
       chrome.tabs.executeScript(
        tabs[0].id,
        {
			file: 'gnib.js'
		});
	});
 });
};

