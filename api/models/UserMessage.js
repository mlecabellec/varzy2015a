/**
* UserMessage.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var cryptoJS = require("crypto-js");
var uuid = require('node-uuid');
var forge = require('node-forge');

module.exports = {

  attributes: {
      id:{type:"integer",unique:true,primaryKey:true},
      content:{type:"text",size:4000},
      user:{model:"AppUser",protected:true},
      userProfile:{model:"UserProfile"},
      thread:{model:"UserThread"}
  }
};
