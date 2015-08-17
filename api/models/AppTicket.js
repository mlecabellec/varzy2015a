/**
 * AppTicket.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var cryptoJS = require("crypto-js");
var uuid = require('node-uuid');
var forge = require('node-forge');

module.exports = {
    attributes: {
        validityStartingAt: {type: 'datetime', required: true, defaultsTo: new Date()},
        validityEndingAt: {type: 'datetime', required: true, defaultsTo: new Date()},
        ticketToken: {type: 'string', required: true, size: 254, unique: true},
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

