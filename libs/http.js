var querystring = require('querystring');
var http = require('http');
var config = require("../conf/conf.js");

var cookie = [];

var callNsApi = function(opt, post,cb) {
	

	if (!opt.headers)
		opt.headers = {};
	if (cookie && opt) {
		cookie = (cookie + "").split(";").shift();
		opt.headers.Cookie = cookie;
	}else{
		console.log(cookie);
	}
	if(post){
		opt.headers = {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': post.length
		};
	}
	//console.log(opt,post);
	var post_req = http.request(opt, function(res) {
	      res.setEncoding('utf8');
	      if(res.headers["set-cookie"])
	      	cookie = res.headers["set-cookie"];
	      //console.log(res.headers)
	      var data = "";
	      res.on('data', function (chunk) {
			data += chunk;
	      });
	      res.on('error',function(err){
	        cb(err,null);
	      });
	      res.on('end', function (){
	      	try{
	      		var json_data = JSON.parse(data);
	      		if(json_data.error)
	      			cb(json_data.error,data);
	      		else
		      		cb(null, json_data);
	      	}catch(e){
	      		cb(e, null);
	      	}
			
	      });
	    });
	    post_req.on('error',function(err){
	      cb(err,null);
	    });
	    if(post){
			post_req.write(post);
	    }
	    post_req.end();
};

module.exports.pushUri =function (uri,post,cb){
	var post_data = null;
	if(post)
		post_data = querystring.stringify(post);
	var opt = {
		host: config.api.url,
		port: 80,
		path: '/api/1/'+config.api.key+uri,
		headers: null
	};
	if (post)
		opt.method='POST';
	callNsApi(opt,post_data,cb);
};

