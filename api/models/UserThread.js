/**
* UserThread.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var cryptoJS = require("crypto-js");
var uuid = require('node-uuid');
var forge = require('node-forge');

module.exports = {
    attributes: {
        id:{type:"integer",unique:true,primaryKey:true,autoIncrement: true},
        title: {type: 'string', size: 200},
        owner:{model:'AppUser'},
        ownerProfile:{model:'UserProfile'},
        messages: {
            collection: 'UserMessage',
            via: 'thread'
        }
    }
};
