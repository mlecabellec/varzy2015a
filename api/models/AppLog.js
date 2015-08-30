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
        logSource: {type: 'string', required: true, defaultTo: 'Unknown', size: 80},
        logLevel: {type: 'integer', required: true, defaultTo: 99},
        logMessage: {type: 'string', required: true, defaultTo: 'NO MESSAGE !!!', size: 4000},
        uuid: {type: 'string', size: 40, required: true, unique: true},
        user: {model: 'AppUser'},
        userProfile: {model: 'UserProfile'}
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

