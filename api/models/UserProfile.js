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
        displayName: {type: 'string', size: 64, minLength: 4, required: true, unique: true},
        user: {model: "AppUser", protected: true, required: true, unique: true},
        isPublic: {type: 'boolean', defaultsTo: false},
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
        uuid: {type: 'string', size: 40, required: true, unique: true}
    },
    beforeCreate: function (values, cb) {

        if (values.uuid == undefined || values.uuid == null)
        {
            values.uuid = uuid.v1();
        }

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
