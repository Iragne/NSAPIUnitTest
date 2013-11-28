var http = require('http');
var assert = require("assert");
var should = require('should');
var start = require("../libs/start.js");
var vars = require("../conf/vars.js");
var uri = require("../libs/http.js");
var user = require("./user.js");

var forums = {};


var delTag = module.exports.delTag = function (name,cb){
	uri.pushUri("/tags/deleteTag/"+name,null,function(err,res){
		if (err) {
			console.log(err);
		}
		if(cb)
			cb();
	});
};
var cerateForum = module.exports.cerateForum = function (name,priv,cb){
	"use strict";
	delTag(name,function (){
		var post = {
			title:name,
			desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas convallis ornare fringilla. Vivamus consequat ornare lacus non lobortis. Vivamus volutpat enim sit amet orci consectetur, non commodo augue vestibulum. Nulla imperdiet tellus purus, a semper orci sodales non. Nulla a arcu at tellus dignissim vulputate id nec arcu. Pellentesque viverra metus condimentum, bibendum quam molestie, aliquet lacus. Aliquam tincidunt odio dolor.",
			priv:priv
		};
		uri.pushUri("/tags/addTag",post,function(err,res){
			//console.log(err,res);
			forums[name] = res.feeds.tag;
			if (err){
				console.log(err);
				throw err;
			}
			cb(res.feeds.tag);
		});
	});
};


var getForum = module.exports.getForum = function (tagname,cb){
	var t = forums[tagname];
};

var subscribe = module.exports.subscribe = function (tagname,cb){
	var t = forums[tagname];
	uri.pushUri("/tags/joinTag/"+t._id,null,function(err,res){
		if (err){
			console.log(err);
			throw err;
		}
		cb();
	});
};



var getSubscribeUsers = module.exports.getSubscribeUsers = function (tagname,cb){
	var t = forums[tagname];
	uri.pushUri("/tags/getSubscribeUsers/"+t._id+"/1/3000",null,function(err,res){
		if (err){
			console.log(err);
			throw err;
		}
		cb();
	});
};


var getTag = module.exports.getTag = function (tagname,cb){
	var t = forums[tagname];
	uri.pushUri("/tags/getTag/"+t._id,null,function(err,res){
		if (err){
			console.log(err);
			throw err;
		}
		cb(res.feeds.tag);
	});
};


var invite = module.exports.invite = function (user_id,tagname,cb){
	var t = forums[tagname];
	uri.pushUri("/tags/invite/"+t._id+"/"+user_id,null,function(err,res){
		if (err){
			console.log(err);
			throw err;
		}
		cb(res.feeds);
	});
};

var accept = module.exports.accept = function (tagname,cb){
	var t = forums[tagname];
	uri.pushUri("/tags/acceptInvitTag/"+t._id,null,function(err,res){
		if (err){
			console.log(err);
			throw err;
		}
		cb(res.feeds);
	});
};

var deny = module.exports.deny = function (tagname,cb){
	var t = forums[tagname];
	uri.pushUri("/tags/denyInvitTag/"+t._id,null,function(err,res){
		if (err){
			console.log(err);
			throw err;
		}
		cb(res.feeds);
	});
};


var unSubscribe = module.exports.unSubscribe = function (tagname,cb){
	var t = forums[tagname];
	uri.pushUri("/tags/unJoinTag/"+t._id,null,function(err,res){
		if (err){
			console.log("ERROR",err);
			throw err;
		}
		cb(res.feeds);
	});
};

var acceptSubscribe = module.exports.acceptSubscribe = function (tagname,user,cb){
	var t = forums[tagname];
	uri.pushUri("/tags/acceptSubscribe/"+t._id+"/"+user._id,null,function(err,res){
		if (err){
			console.log("ERROR",err);
			throw err;
		}
		cb(res.feeds);
	});
};



var denySubscribe = module.exports.denySubscribe = function (tagname,user,cb){
	var t = forums[tagname];
	uri.pushUri("/tags/denySubscribe/"+t._id+"/"+user._id,null,function(err,res){
		if (err){
			console.log("ERROR",err);
			throw err;
		}
		cb(res.feeds);
	});
};




