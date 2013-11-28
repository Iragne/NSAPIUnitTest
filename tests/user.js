var http = require('http');
var assert = require("assert");
var should = require('should');
var start = require("../libs/start.js");
var vars = require("../conf/vars.js");
var uri = require("../libs/http.js");

var createuserAdelskott = module.exports.createuserAdelskott= function(cb){
	var post = {
		login:"adelskott",
		password:"toto",
		email:"adelskott@gmail.com",
		lang:"fra",
		prenom:"john",
		nom:"doe",
		"data[Applis][u_key]":"com.jai.test",
		"data[Devices][version]":"7.0",
		"data[Devices][u_key]":"235785454363456ACD43EF",
		"data[Devices][model]":"iphone",
		nl:"1",
		nlp:"1",
	};
	uri.pushUri("/users/subscribe",post,function(err,res){
		cb();
	});
};

var createuserStirween = module.exports.createuserStirween= function(cb){
	var post = {
		login:"stirween",
		password:"stirween",
		email:"adelskott+stirween@gmail.com",
		lang:"fra",
		prenom:"john",
		nom:"doe",
		"data[Applis][u_key]":"com.jai.test",
		"data[Devices][version]":"7.0",
		"data[Devices][u_key]":"235785454363456ACD43EF",
		"data[Devices][model]":"iphone",
		nl:"1",
		nlp:"1",
	};
	uri.pushUri("/users/subscribe",post,function(err,res){
		cb();
	});
};

var stirween = module.exports.stirween =null;
var adelskott = module.exports.adelskott =null;

var loginStirween = module.exports.loginStirween= function (cb){
	uri.pushUri("/users/logout",null,function(err,res){
		var post = {email:"adelskott+stirween@gmail.com",password:'stirween'};
		uri.pushUri("/users/login",post,function(err,res){
			if(err)
				throw err;
			module.exports.stirween = res.feeds.user;
			if (!module.exports.stirween) 
				throw res;
			if(module.exports.stirween.user_login != "stirween")
				throw "ERROR stirween non connected is "+module.exports.stirween.user_login ;
			cb();
		});
	});
};

var loginAdelskott = module.exports.loginAdelskott= function (cb){
	uri.pushUri("/users/logout",null,function(err,res){
		var post = {email:"adelskott@gmail.com",password:'toto'};
		uri.pushUri("/users/login",post,function(err,res){
			//console.log(res);
			if(err)
				throw err;
			module.exports.adelskott = res.feeds.user;
			if (!module.exports.adelskott) 
				throw res;
			if(module.exports.adelskott.user_login != "adelskott")
				throw "ERROR adelskott non connected is "+module.exports.adelskott.user_login;
			cb();
		});
	});
};

var getUser = module.exports.getUser= function(user,cb){
	uri.pushUri("/users/getUser/"+user._id ,null,function(err,res){
		if(err)
			throw err;
		cb(res.feeds.user);
	});
};

var addFriend = module.exports.addFriend= function(user,cb){
	uri.pushUri("/users/addFriend/"+user._id ,null,function(err,res){
		if(err)
			throw err;
		cb();
	});
};
var removeFriends = module.exports.removeFriends= function(user,cb){
	uri.pushUri("/users/removeFriends/"+user._id ,null,function(err,res){
		if(err)
			throw err;
		cb();
	});
};

var acceptFriend = module.exports.acceptFriend= function (user,cb){
	uri.pushUri("/users/acceptFriend/"+user._id+"/1/1" ,null,function(err,res){
		if(err){
			console.log(err,res);
			throw err;
		}
		cb();
	});
};

var denyFriends = module.exports.denyFriends= function (user,cb){
	uri.pushUri("/users/acceptFriend/"+user._id+"/0/1" ,null,function(err,res){
		if(err){
			console.log(err,res);
			throw err;
		}
		cb();
	});
};


