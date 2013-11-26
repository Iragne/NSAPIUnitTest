//
// Copyright (c) 2013 Jean Alexandre Iragne (https://github.com/Iragne)
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//



var http = require('http');
var assert = require("assert");
var should = require('should');
var start = require("../libs/start.js");
var vars = require("../conf/vars.js");
var uri = require("../libs/http.js");



var createuserAdelskott = function(cb){
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

var createuserStirween = function(cb){
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

var stirween = null;
var adelskott = null;
var loginStirween = function (cb){
	uri.pushUri("/users/logout",null,function(err,res){
		var post = {email:"adelskott+stirween@gmail.com",password:'stirween'};
		uri.pushUri("/users/login",post,function(err,res){
			if(err)
				throw err;
			stirween = res.feeds.user;
			if (!stirween) 
				throw res;
			if(stirween.user_login != "stirween")
				throw "ERROR stirween non connected is "+stirween.user_login ;
			cb();
		});
	});
};

var loginAdelskott = function (cb){
	uri.pushUri("/users/logout",null,function(err,res){
		var post = {email:"adelskott@gmail.com",password:'toto'};
		uri.pushUri("/users/login",post,function(err,res){
			if(err)
				throw err;
			adelskott = res.feeds.user;
			if (!adelskott) 
				throw res;
			if(adelskott.user_login != "adelskott")
				throw "ERROR adelskott non connected is "+adelskott.user_login;
			cb();
		});
	});
};

var getUser = function(user,cb){
	uri.pushUri("/users/getUser/"+user._id ,null,function(err,res){
		if(err)
			throw err;
		cb(res.feeds.user);
	});
};

var addFriend = function(user,cb){
	uri.pushUri("/users/addFriend/"+user._id ,null,function(err,res){
		if(err)
			throw err;
		cb();
	});
};
var removeFriends = function(user,cb){
	uri.pushUri("/users/removeFriends/"+user._id ,null,function(err,res){
		if(err)
			throw err;
		cb();
	});
};

var acceptFriend = function (user,cb){
	uri.pushUri("/users/acceptFriend/"+user._id+"/1/1" ,null,function(err,res){
		if(err){
			console.log(err,res);
			throw err;
		}
		cb();
	});
};

var denyFriends = function (user,cb){
	uri.pushUri("/users/acceptFriend/"+user._id+"/0/1" ,null,function(err,res){
		if(err){
			console.log(err,res);
			throw err;
		}
		cb();
	});
};

start.run(function (){
	describe('API', function(){
		describe('Users', function(){
			before (function (done) {
				createuserAdelskott(function(){
					createuserStirween(function (){
						done();
					});
				});
			});
			describe('Friends', function () {
				// check user

				it("login adelskott and stirween", function (done){
					loginAdelskott(function(){
						loginStirween(done);
					});
				});
				it("login adelskott", function (done){
					// console.log(stirween);
					// console.log(adelskott);
					loginAdelskott(done);
				});
				it('add Friends stirween', function (done) {
					addFriend(stirween,done);
				});
				it("login stirween", function (done){
					loginStirween(done);
				});
				it('check pending Adelskott', function (done) {
					getUser(stirween, function(user){
						//console.log(user);
						for (var i = 0; i < user.PendingFriends.length; i++) {
							//console.log(user.PendingFriends[i]);
							if (adelskott._id == user.PendingFriends[i].User._id && user.PendingFriends[i].friend_valide === 0)
								done();
						}
					});
				});
				it('check accept Adelskott', function (done) {
					acceptFriend(adelskott,done);
				});
				it('check check Adelskott as friends ', function (done) {
					getUser(stirween, function(user){
						//console.log(user);
						for (var i = 0; i < user.Friends.length; i++) {
							//console.log(user.Friends[i]);
							if (adelskott._id == user.Friends[i].User._id && user.Friends[i].friend_valide == 1)
								done();
						}
					});
				});
				
				it("login adelskott", function (done){
					loginAdelskott(done);
				});

				it('check check stirween as friends ', function (done) {
					getUser(adelskott, function(user){
						//console.log(user);
						for (var i = 0; i < user.Friends.length; i++) {
							//console.log(user.Friends[i]);
							if (stirween._id == user.Friends[i].User._id && user.Friends[i].friend_valide == 1)
								done();
						}
					});
				});
				it("login adelskott", function (done){
					loginAdelskott(done);
				});
				it("remove stirween", function (done){
					removeFriends(stirween,done);
				});
				it('add Friends stirween', function (done) {
					addFriend(stirween,done);
				});
				it("login stirween", function (done){
					loginStirween(done);
				});
				it('Not allow Adelskott', function (done) {
					denyFriends(adelskott,done);
				});
				it('check is not pending Adelskott', function (done) {
					getUser(stirween, function(user){
						//console.log(user);
						for (var i = 0; i < user.PendingFriends.length; i++) {
							//console.log(user.PendingFriends[i]);
							if (adelskott._id == user.PendingFriends[i].User._id && user.PendingFriends[i].friend_valide === 0)
								throw "stirween is pending";
						}
						done();
					});
				});

				it("login adelskott", function (done){
					loginAdelskott(done);
				});
				it('check check Adelskott as not friends ', function (done) {
					getUser(adelskott, function(user){
						//console.log(user);
						for (var i = 0; i < user.Friends.length; i++) {
							//console.log(user.Friends[i]);
							if (stirween._id == user.Friends[i].User._id && user.Friends[i].friend_valide == 1)
								throw "stirween is friends";
						}
						done();
					});
				});
			});
			 
		});
	});
});
