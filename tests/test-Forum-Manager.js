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
var user = require("./user.js");
var forum = require("./forum.js");


 
start.run(function (){
	describe('API', function(){
		describe('Forum', function(){
			before (function (done) {
				user.createuserAdelskott(function(){
					user.createuserStirween(function (){
						user.loginAdelskott(function(){
							user.loginStirween(function(){
								done();
							});
						});
					});
				});
			});
			describe('manage', function () {
				// check user

				it('create', function (done) {
					// check user
					user.loginAdelskott(function(){
						forum.cerateForum("testJA",0,function(fofo){
							if(fofo.tag_name == "testJA" && fofo.tag_private == 0)
								done();
							else
								throw "FOFO not Found";
						});
					});
				});
				it("invite stirween", function(done){
						user.loginAdelskott(function(){
						forum.invite(user.stirween._id,"testJA",function(){
							user.loginStirween(function(){
								user.getUser(user.stirween,function (user){
									// sub avec testJA
									//console.log(user);
									for (var i = 0; i < user.Subscribes.length; i++) {
										//console.log(user.Subscribes[i]);
										if ("testJA" == user.Subscribes[i].fk_tag_name && user.Subscribes[i].pending == 1 && user.Subscribes[i].active === 0)
											return done();
									}
									throw "Not found";
								});
							});
						});
					});
				});
				it("Accept stirween",function (done){
					forum.accept("testJA",function (){
						user.getUser(user.stirween,function (user){
							// sub avec testJA
							//console.log(user);
							for (var i = 0; i < user.Subscribes.length; i++) {
								//console.log(user.Subscribes[i]);
								if ("testJA" == user.Subscribes[i].fk_tag_name && user.Subscribes[i].pending === 0 && user.Subscribes[i].active == 1)
									return done();
							}
							throw "Not found";
						});
					});
				});
				it("Remove Subscribe stirween",function (done){
					forum.unSubscribe("testJA",function (){
						user.getUser(user.stirween,function (user){
							// sub avec testJA
							//console.log(user);
							for (var i = 0; i < user.Subscribes.length; i++) {
								//console.log(user.Subscribes[i]);
								if ("testJA" == user.Subscribes[i].fk_tag_name)
									throw "Found in Subscribes";
							}
							return done();
						});
					});
				});
				it("invite stirween", function(done){
					user.loginAdelskott(function(){
						forum.invite(user.stirween._id,"testJA",function(){
							user.loginStirween(function(){
								user.getUser(user.stirween,function (user){
									// sub avec testJA
									//console.log(user);
									for (var i = 0; i < user.Subscribes.length; i++) {
										//console.log(user.Subscribes[i]);
										if ("testJA" == user.Subscribes[i].fk_tag_name && user.Subscribes[i].pending == 1 && user.Subscribes[i].active === 0)
											return done();
									}
									throw "Not found";
								});
							});
						});
					});
				});
				it("deny stirween",function (done){
					user.loginStirween(function(){
						forum.deny("testJA",function (){
							user.getUser(user.stirween,function (user){
								// sub avec testJA
								//console.log(user);
								for (var i = 0; i < user.Subscribes.length; i++) {
									//console.log(user.Subscribes[i]);
									if ("testJA" == user.Subscribes[i].fk_tag_name)
										throw "Found in Subscribes";
								}
								return done();
							});
						});
					});
				});

				it('create private', function (done) {
					// check user
					user.loginAdelskott(function(){
						forum.cerateForum("testJAPrivate",1,function(fofo){
							if(fofo.tag_name == "testJAPrivate" && fofo.tag_private == 1)
								done();
							else
								throw "FOFO not Found or not private";
						});
					});
				});
				it("stirween join private",function (done){
					user.loginStirween(function(){
						forum.subscribe("testJAPrivate",function(){
							forum.getTag("testJAPrivate",function (tag){
								if(tag.Pendings.length != 1)
									throw "Not in join";
								done();
							});
						});
					});
				});

				it("adelskott accept stirween in private forum", function (done){
					user.loginAdelskott(function (){
						forum.acceptSubscribe("testJAPrivate", user.stirween, function (){
							forum.getTag("testJAPrivate",function (tag){
								if(tag.Pendings.length !== 0)
									throw "Not in join";
								done();
							});
						});
					});
				});
				it("check stirween has testJAPrivate forum",function (done){
					user.getUser(user.stirween,function (user){
						for (var i = 0; i < user.Subscribes.length; i++) {
							//console.log(user.Subscribes[i]);
							if ("testJAPrivate" == user.Subscribes[i].fk_tag_name && user.Subscribes[i].pending === 0 && user.Subscribes[i].active == 1)
								return done();
						}
						throw "Not found";
					});
				});
				it("Remove Subscribe stirween to testJAPrivate ",function (done){
					user.loginStirween(function(){
						forum.unSubscribe("testJAPrivate",function (){
							user.getUser(user.stirween,function (user){
								// sub avec testJA
								//console.log(user);
								for (var i = 0; i < user.Subscribes.length; i++) {
									//console.log(user.Subscribes[i]);
									if ("testJAPrivate" == user.Subscribes[i].fk_tag_name)
										throw "Found in Subscribes";
								}
								return done();
							});
						});
					});
				});

				it("stirween join private",function (done){
					user.loginStirween(function(){
						forum.subscribe("testJAPrivate",function(){
							forum.getTag("testJAPrivate",function (tag){
								if(tag.Pendings.length != 1)
									throw "Not in join";
								done();
							});
						});
					});
				});

				it("adelskott deny stirween in private forum", function (done){
					user.loginAdelskott(function (){
						forum.denySubscribe("testJAPrivate", user.stirween, function (){
							forum.getTag("testJAPrivate",function (tag){
								if(tag.Pendings.length !== 0)
									throw "Not in join";
								done();
							});
						});
					});
				});

				it("check stirween had not testJAPrivate forum",function (done){
					user.getUser(user.stirween,function (user){
						for (var i = 0; i < user.Subscribes.length; i++) {
							//console.log(user.Subscribes[i]);
							if ("testJAPrivate" == user.Subscribes[i].fk_tag_name)
								throw "Not found";
						}
						return done();
					});
				});
			});
			 
		});
	});
});
