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
            message: req.__('Welcome'),
            i18n: {
                loginModal: {loginLabel: __('Log in'),
                    usernameLabel: __('Username'),
                    passwordLabel: __('Password'),
                    rememberMeLabel: __('Remember me'),
                    signMeLabel: __('Sign me'),
                    cancelLabel: __('cancel')}
            }
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

