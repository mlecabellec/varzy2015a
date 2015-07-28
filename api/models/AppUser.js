/**
 * AppUser.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

    username: {
      type: 'string',
      unique: true,
      size: 64,
      required: true,
      primaryKey: true
    },

    secret1: {
      type: 'string',
      size: 254
    },

    secret2: {
      type: 'string',
      size: 254
    },

    creationdate: {
      type: 'datetime'
    },

    locked: {
      type: 'binary',
      defaultsTo: false
    },

    activated: {
      type: 'binary',
      defaultsTo: false
    },

    superadmin: {
      type: 'binary',
      defaultsTo: false
    },

    token: {
      type: 'string',
      size: 254,
      unique: true
    },

    userEmail: {
      type: 'email',
      size: 254,
      unique: true
    }

  }
};
