/**
 * MessageController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	


  /**
   * `MessageController.getMessages()`
   */
  messages: function (req, res) {
    return res.json({
      todo: 'getMessages() is not implemented yet!'
    });
  },


  /**
   * `MessageController.getMyThreads()`
   */
  threads: function (req, res) {
    return res.json({
      todo: 'getMyThreads() is not implemented yet!'
    });
  },


  /**
   * `MessageController.getPublicThreads()`
   */
  publicthreads: function (req, res) {
    return res.json({
      todo: 'getPublicThreads() is not implemented yet!'
    });
  },
   /**
   * `MessageController.getPublicThreads()`
   */
  publicmessages: function (req, res) {
    return res.json({
      todo: 'publicMessages() is not implemented yet!'
    });
  } 
  
};

