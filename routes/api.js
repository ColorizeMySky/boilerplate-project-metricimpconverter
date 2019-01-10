/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');

const url = require('url'); 

module.exports = function (app) {
  
  var convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res){
      var input = req.query.input;
      var initNum = convertHandler.getNum(input);
      var initUnit = convertHandler.getUnit(input);
      var returnNum = convertHandler.convert(initNum, initUnit);
      var returnUnit = convertHandler.getReturnUnit(initUnit);
      var toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      
      //res.json
      let urlParsed = url.parse(req.url, true);
      //^([^a-zA-Z]*)([a-zA-Z]+)$
      let num = urlParsed.query.input.replace(/^([^a-zA-Z]*)([a-zA-Z]+)$/, '$1');
      let unit = urlParsed.query.input.replace(/^([^a-zA-Z]*)([a-zA-Z]+)$/, '$2');  
    
      (num == '') ? num = 1 : num = eval(num);
    
      let unitList = ['gal', 'l', 'kg', 'lbs', 'mi', 'km'];
    
      if( (unitList.indexOf(unit) == -1) && (isNaN(num)) ) {
        res.end('invalid number and unit');
      }
      else if(unitList.indexOf(unit) == -1) {
        res.end('invalid unit');
      }
      else if (isNaN(num)) {
        res.end('invalid number');
      }
      else {
        switch (unit) {
          //1 gal to 3.78541 L
          case 'gal':
            res.json((num * 3.78541).toFixed(5) + 'l');
            break;
          case 'l':
             res.json((num / 3.78541).toFixed(5) + 'gal');
            break;
          //1 lbs to 0.453592 kg
          case 'kg':
            res.json((num * 0.453592).toFixed(5) + 'lbs');
            break;
          case 'lbs':
            res.json((num / 0.453592).toFixed(5) + 'kg');
            break;
          //1 mi to 1.60934 km
          case 'mi':
            res.json((num * 1.60934).toFixed(5) + 'km');
            break;
          case 'km':
            res.json((num / 1.60934).toFixed(5) + 'mi');
            break;
        }
        
      }
    });
    
};
