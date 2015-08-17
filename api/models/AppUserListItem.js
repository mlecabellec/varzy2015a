/**
* AppUserListItem.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var cryptoJS = require("crypto-js");
var uuid = require('node-uuid');
var forge = require('node-forge');

module.exports = {

  attributes: {
      sourceList:{model:'AppUserList',required:true},
      rankIndex:{type:'integer',min:0,defaultsTo:1,required:true},
      memberItem:{model:'AppUser',required:true}
  }
};

