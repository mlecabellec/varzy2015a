/**
* AppLog.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var cryptoJS = require("crypto-js");
var uuid = require('node-uuid');
var forge = require('node-forge');

module.exports = {

  attributes: {
      creationDate:{type:'datetime',required:true,defaultsTo:new Date()},
      logSource:{type:'string',required:true,defaultTo:'Unknown',size:80},
      logLevel:{type:'integer',required:true,defaultTo:99},
      logMessage:{type:'string',required:true,defaultTo:'NO MESSAGE !!!',size:4000}
  }
};

