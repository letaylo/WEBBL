document.getElementById('btn').addEventListener('click', function() {
	var data = JSON.parse(window.localStorage.getItem('data'));
	//alert("Check");
	var filename = "data.txt";
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
	element.setAttribute('download', filename);
	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
});