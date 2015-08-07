/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    /**
     * `HomeController.index()`
     */
    index: function (req, res) {


        return res.view("home1");
    },
    data: function (req, res) {


        var data = {
            message: "test001"
        };
        sails.log.debug(data);
        return res.json(data);
    },
    /**
     * `HomeController.test()`
     */
    test: function (req, res) {

        return res.view("home1");
    },
    /**
     * `HomeController.getthreads()`
     */
    getthreads: function (req, res) {
        return res.json({
            todo: 'getthreads() is not implemented yet!'
        });
    },
    /**
     * `HomeController.newthread()`
     */
    newthread: function (req, res) {
        return res.json({
            todo: 'newthread() is not implemented yet!'
        });
    },
    /**
     * `HomeController.getmessages()`
     */
    getmessages: function (req, res) {
        return res.json({
            todo: 'getmessages() is not implemented yet!'
        });
    },
    /**
     * `HomeController.newmessage()`
     */
    newmessage: function (req, res) {
        return res.json({
            todo: 'newmessage() is not implemented yet!'
        });
    }
};

