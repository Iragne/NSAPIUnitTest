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

var
    config = require("../conf/conf.js"),
    vars = require("../conf/vars.js"),
    mongoose = require('mongoose');



var run = function (next){
    "use strict";
    if(vars.mongoose)
        return next();
    var login = "";
    if (config.mongodb.password)
        login = config.mongodb.user+':'+config.mongodb.password+'@';
    var url = 'mongodb://'+login+config.mongodb.host+":"+config.mongodb.port+'/'+config.mongodb.database;
    vars.log.debug("JAJAJAJA",url);
    mongoose.connect(url, function(err) {
      if (err) { throw err; }
    });
    vars.mongoose = mongoose;
    // var dbno = ["users","apps","devicesapps","userlogs","medias","configs","tagfeeds","feeds","friends","userfeeds","tags","msgs","msgthreads","adminusers"];
    // dbno.forEach(function(d){
    //     require("../app/models/nosql/"+d+".js");
    // });
    next();
};
module.exports.run = run;
