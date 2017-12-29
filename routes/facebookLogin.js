var express = require('express');
var router = express.Router();
var OAuth2 = require('oauth').OAuth2;

const facebookClientId = '207184696517792';
const facebookClientSecret = '87d5fd48fa7c5965e653be35772eb394';
const oauth2 = new OAuth2(facebookClientId, facebookClientSecret, '', 'https://www.facebook.com/dialog/oauth', 'https://graph.facebook.com/oauth/access_token', null);
const redirect_uri = 'http://localhost:3000/facebook/callback';
let accessToken;
let expires;

router.get('/auth', function(req, res, next){
	const params = { 
		'redirect_uri': redirect_uri,
		'scope': 'user_about_me'
	};
	res.redirect(oauth2.getAuthorizeUrl(params));	
})

router.get('/callback', function(req, res){
	if(req.error_reason){
		res.send(req.error_reason);
	}
	if(req.query.code) {
		const loginCode = req.query.code;
		oauth2.getOAuthAccessToken(loginCode, {
			grant_type: 'authorization_code',
			redirect_uri: redirect_uri
		}, function(err, accessToken, refreshToken, params){
			if(err){
				console.log(err);
				res.send(err);
			}else{
				accessToken = params.access_token;
				expires = params.expires_in;
			}			
		})
	}
})

router.get('/getFbProfile', function(req, res){
	oauth2.get('https://graph.facebook.com/me', accessToken, function(err, data, response){
		if(err){
			console.log(err);
			res.send(err);
		}else{
			let profile = JSON.parse(data);
			console.log(profile);
			let profileImg = 'https://graph.facebook.com/'+profile.id+'/picture';
		}
	})
})

module.exports = router;
