/**
 * AppUser.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */


var cryptoJS = require("crypto-js");
var uuid = require('node-uuid');
var forge = require('node-forge');

module.exports = {
    attributes: {
        username: {type: 'string', size: 64, minLength: 4, unique: true, primaryKey: true},
        password: {type: 'string', size: 180, required: true, protected: true},
        sessionkey: {type: 'string', size: 180, required: true, protected: true, unique: true, defaultsTo: ""},
        isActive: {type: 'boolean', defaultsTo: true},
        isAdmin: {type: 'boolean', defaultsTo: false},
        email: {type: 'email', size: 180, minLength: 4, unique: true, required: true},
        hitCount: {type: 'integer', defaultsTo: 0, required: true},
        healthPoints: {type: 'integer', defaultsTo: 100, required: true},
        profiles: {
            collection: 'UserProfile',
            via: 'user'
        },
        userLists: {
            collection: 'AppUserList',
            via: 'owner'
        },
        userThreads: {
            collection: 'UserThread',
            via: 'owner'
        },
        userMessages: {
            collection: 'UserMessage',
            via: 'user'
        },
        uuid: {type: 'string', size: 40, required: true, unique: true}
    },
    beforeCreate: function (values, cb) {

        values.uuid = uuid.v1();
        values.sessionkey = cryptoJS.SHA256(values.username + Math.ceil(Math.random() * 2 ^ 32 + Math.random() * 2 ^ 13)).toString(cryptoJS.enc.Base64);

        cb();

    },
    beforeUpdate: function (values, cb) {

        if (values.sessionkey == undefined || values.sessionkey.length < 3)
        {
            values.sessionkey = cryptoJS.SHA256(values.username + Math.ceil(Math.random() * 2 ^ 32 + Math.random() * 2 ^ 13)).toString(cryptoJS.enc.Base64);
        }


        cb();

    },
    beforeValidate: function (values, cb) {

        if (values.uuid == undefined || values.uuid == null)
        {
            values.uuid = uuid.v1();
        }

        if (values.sessionkey == undefined || values.sessionkey.length < 3)
        {
            values.sessionkey = cryptoJS.SHA256(values.username + Math.ceil(Math.random() * 2 ^ 32 + Math.random() * 2 ^ 13)).toString(cryptoJS.enc.Base64);
        }

        cb();

    }
};
