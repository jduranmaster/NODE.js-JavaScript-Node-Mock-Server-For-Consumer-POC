var express = require('express'),
    http = require('http'),
    https = require('https'),
    cors = require('cors'),
    bodyParser = require("body-parser"),
    fs = require('fs'),
    path = require('path'),
    app = express();

var port = 9090

var server = http.createServer(app);

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

server.listen(port, function(){
    console.log("Consumer Server running on port "+port);
})

app.get('/', function(llamado, respuesta){
    respuesta.sendFile(__dirname + '/consumer.html');
});

app.get('/consumer/finances/:dealer_id/products', function (req, res, next) {
    var country = req.get('x-santander-country');
  	console.log('get products for '+ country);
    var dealer_code = req.params.dealer_id;
    console.log('dealer_code:****' + dealer_code + '****');
	
    var responseFile = path.join(__dirname,'response', 'productsResponse_'+country.toUpperCase()+'.json');
    console.log('file::: '+ responseFile);
    try {
      var response = JSON.parse(fs.readFileSync(responseFile, 'utf8'));
      res.json(response);
    } catch (err) {
      if (err.code === 'ENOENT') {
        console.log('err::: '+ JSON.stringify(err));
        res.json({result: {httpCode: '400', httpMessage: 'Bad Request', moreInformation: 'Unrecognizable Country.'+country+' is not a recognized country'}});
      } else {
        res.json({result: {httpCode: '500', httpMessage: 'Internal Server Error', moreInformation: err}});
      }
    }
});

app.post('/consumer/finances/:dealer_id/calculate', function (req, res, next) {
    var country = req.get('x-santander-country');
  	console.log('post calculate for '+ country);
	var dealer_code = req.params.dealer_id;
    console.log('dealer_code:****' + dealer_code + '****');
	
    var responseFile = path.join(__dirname,'response', 'calculateResponse_'+country.toUpperCase()+'.json');
    console.log('file::: '+ responseFile);
	console.log('Quoring-'+country.toUpperCase()+' :::::'  + req.get('x-consumer-country').toUpperCase());
    try {
      var response = JSON.parse(fs.readFileSync(responseFile, 'utf8'));
      res.json(response);
    } catch (err) {
      if (err.code === 'ENOENT') {
        console.log('err::: '+ JSON.stringify(err));
        res.json({result: {httpCode: '400', httpMessage: 'Bad Request', moreInformation: 'Unrecognizable Country.'+country+' is not a recognized country'}});
      } else {
        res.json({result: {httpCode: '500', httpMessage: 'Internal Server Error', moreInformation: err}});
      }
    }
});
