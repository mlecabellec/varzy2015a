/**
* UserProfile.js
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
        displayName: {type: 'string', size: 64, minLength: 4,required:true,unique:true},
        user: {model: "AppUser",protected:true,required:true,unique:true},
        profileLists: {
            collection: 'AppUserList',
            via: 'ownerProfile'
        },
        profileThreads: {
            collection: 'UserThread',
            via: 'ownerProfile'
        },
        profileMessages: {
            collection: 'UserMessage',
            via: 'userProfile'
        },
    }
};
