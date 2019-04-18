window.onload = function() {

	// Check for the various File API support.
	if (window.File && window.FileReader && window.FileList && window.Blob) {
	  	// Great success! All the File APIs are supported.
	  	console.log("File API works.");
	} else {
	  	alert('The File APIs are not fully supported in this browser.');
	}

	// Download behavioral data
	function download(filename, text) {
		// Create an invisible element, give it a download attribute with the encoded data, and click it
	  	var element = document.createElement('a');
	  	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	  	element.setAttribute('download', filename);
	  	element.style.display = 'none';
	  	document.body.appendChild(element);
	  	element.click();
	  	// Remove the element
	  	document.body.removeChild(element);
	}
	
	const isAlphaNumeric = ch => {
		return ch.match(/^[a-z0-9]+$/i) !== null;
	}

	// Initialize the String the data will be put into
	var data_text = "";
	var mouse_timer = Date.now();
	var bounce_timer = Date.now();

 	console.log("Script load: successful.\n");

 	// Add an event listener to the page that waits for the user to keydown
 	document.addEventListener('keydown', function(event) {
		// Variables for keystroke dynamics
		var xpos = event.pageX;
		var ypos = event.pageY;
        var timestamp = Date.now();
		var event_type = 'd';
		var keyName = event.key;
		if (keyName == ' ') { keyName = '_'; }
		if (isAlphaNumeric(keyName) || keyName == '_') {
			console.log('keyup event' + '\nkey: ' + keyName + "at " + timestamp);
			// Put keystroke data into the string
			var data = xpos + ',' + ypos + ',' + timestamp + ',' + event_type + ',' + keyName + '\r\n';
			data_text = data_text + data; 
			// Save data to localStorage
			localStorage.setItem('data', JSON.stringify(data_text));
		}
	}, false);
	
	//KeyUp Listener
	document.addEventListener('keyup', function(event) {
		// Variables for keystroke dynamics
		var xpos = event.pageX;
		var ypos = event.pageY;
        var timestamp = Date.now();
		var event_type = 'u';
		var keyName = event.key;
		if (keyName == ' ') { keyName = '_'; }
		if (isAlphaNumeric(keyName) || keyName == '_') {
			console.log('keyup event' + '\nkey: ' + keyName + "at " + timestamp);
			// Put keystroke data into the string
			var data = xpos + ',' + ypos + ',' + timestamp + ',' + event_type + ',' + keyName + '\r\n';
			data_text = data_text + data; 
			// Save data to localStorage
			localStorage.setItem('data', JSON.stringify(data_text));
		}
	}, false);
	
	// MouseMove Listener
	document.addEventListener('mousemove', function(event) {	
		var xpos = event.pageX;
		var ypos = event.pageY;
		var timestamp = Date.now();
		if (timestamp >= mouse_timer + 20) {
			mouse_timer = timestamp;
			var event_type = 'mm';
			console.log('Mouse Event: ' + event_type + ' at ' + timestamp);
			var data = xpos + ',' + ypos + ',' + timestamp + ',' + event_type + ',:' + '\r\n';
			data_text = data_text + data; 
			// Save data to localStorage
			localStorage.setItem('data', JSON.stringify(data_text));
		}
	}, false);
	
	//MouseDown Listener
	document.addEventListener('mousedown', function(event) {
		var xpos = event.pageX;
		var ypos = event.pageY;
		var timestamp = Date.now();
		mouse_timer = timestamp;
		var event_type = "ld";
		
		/* Only once  regular clicks are functional
		if (event.button == 0) {
			event_type = "ld";
		}else if (event.button == 1) {
			event_type = "rd";
		}else {
			event_type = "md";
		}
		*/
		console.log( event_type + ' event at ' + timestamp);
		var data = xpos + ',' + ypos + ',' + timestamp + ',' + event_type + ',:' + '\r\n';
		data_text = data_text + data; 
		// Save data to localStorage
		localStorage.setItem('data', JSON.stringify(data_text));
	}, false);
	
	//MouseUp Listener
	document.addEventListener('mouseup', function(event) {
		var xpos = event.pageX;
		var ypos = event.pageY;
		var timestamp = Date.now();
		mouse_timer = timestamp;
		var event_type = "lu";
		/*
		if (event.button == 0) {
			event_type = "lu";
		}else if (event.button == 1) {
			event_type = "ru";
		}else {
			event_type = "mu";
		}
		*/
		console.log( event_type + ' event at ' + timestamp);
		var data = xpos + ',' + ypos + ',' + timestamp + ',' + event_type + ',:' + '\r\n';
		data_text = data_text + data; 
		// Save data to localStorage
		localStorage.setItem('data', JSON.stringify(data_text));
	}, false);
	
	

 	// Add an event listener for when the user redirects, download the dynamic data
 	window.addEventListener('submit', function (e) {
 		// Get data from localStorage and download it
 		var data_text = JSON.parse(localStorage.getItem('data'));
  		download("data.csv", data_text);
		//(e || window.event).returnValue = null;
		//return null;
 	}, false);
	
	



}