let request = new XMLHttpRequest();



function loginWithGithub(){
	console.log("loginWithGithub");
	request.onload = function(){
		console.log(request.status);
		console.log(request.responseText);
	}

	request.open('GET', '/users', true);
	request.send();
}

/*function loginWithFacebook(){
	console.log("loginWithFacebook");
	
	request.onload = function(){
		console.log(request.status);
		console.log(request.responseText);
	}

	request.open('GET', '/facebookLogin', true);
	request.send();
}*/