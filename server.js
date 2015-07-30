var express = require('express');
var http = require('http');
var querystring = require('querystring');

var app = express();

app.use('/', express.static('./'));

app.get('/captcha', function (req, res) {
    var query = querystring.stringify(req.query);
    http.get('http://webchat.bolivia.untoque.com/dyn/xml/byext1/smsweb/get_captcha1.wireless?' + query, function (captchaResponse) {
        captchaResponse.pipe(res);
    });
});

var server = app.listen(8080, function () {
    var addr = server.address();
    
    console.log('Listening on %s:%s', addr.address, addr.port);
});