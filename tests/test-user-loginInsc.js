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




start.run(function (){
	describe('API', function(){
		describe('create users', function(){
			before (function (done) {
				var post = {email:"adelskott@gmail.com",password:'toto'};
				uri.pushUri("/users/login",post,function(err,res){
					//console.log(err,res);
					if(err)
						done();
					else{
						uri.pushUri("/users/unsubscribe",null,function(err,res){
							//console.log(err,res);
							if(err)
								throw err;
							else
								done();
						});
					}
				});
			});
			describe('Subscribe', function () {
				// check user
				it("Non Exit User", function (done_exit){
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
						//console.log(err,res);
						if (err) throw err;
						done_exit();
					});
				});
				it('Login', function (done) {
					var post = {email:"adelskott@gmail.com",password:'toto'};
					uri.pushUri("/users/login",post,function(err,res){
						//console.log(err,res);
						if(err)
							throw err;
						done();
					});
				});
				it('logout', function (done) {
					uri.pushUri("/users/logout",null,function(err,res){
						if(err)
							throw err;
						
						done();
					});
				});
			});
			
			
			it('Subscribe', function (done) {
				done();
			});
		});
	});
});
