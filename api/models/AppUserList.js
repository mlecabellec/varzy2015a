/**
* AppUserList.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var cryptoJS = require("crypto-js");
var uuid = require('node-uuid');
var forge = require('node-forge');

module.exports = {

  attributes: {
      owner:{model:'AppUser',required:true},
      ownerProfile:{model:'UserProfile',required:true},
      creationDate: {type: 'datetime', required: true, defaultsTo: new Date()},
      listItems:{collection:'AppUserListItem',via:'sourceList'}
  }
};

