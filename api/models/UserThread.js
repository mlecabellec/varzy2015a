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
        title: {type: 'string', size: 200},
        owner:{model:'AppUser'},
        ownerProfile:{model:'UserProfile'},
        isPublic:{type: 'boolean', defaultsTo: false},
        messages: {
            collection: 'UserMessage',
            via: 'thread'
        },
        uuid: {type: 'string', size: 40, required:true,unique:true}
    },
    beforeCreate: function (values, cb) {

        values.uuid = uuid.v1();

        cb();

    },
    beforeUpdate: function (values, cb) {

        cb();

    },
    beforeValidate: function (values, cb) {

        if (values.uuid == undefined || values.uuid == null)
        {
            values.uuid = uuid.v1();
        }

        cb();

    }
};
