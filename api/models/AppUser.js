/**
* AppUser.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    username : { type: 'string', unique: true , size:64 },

    secret1 : { type: 'string' , size:254 },

    secret2 : { type: 'string' , size: 254}
  }
};
