/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/**
 * cookieAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function (req, res, next) {
    // User is allowed, proceed to the next policy,
    // or if this is the last policy, the controller

    var authData = {
        hasCoockie: false,
        hasSession: false,
        username: "",
        sessionKey: "",
        authenticated: false,
        code: 9999
    };


    //ultiAuth1, sails.sid: " + sails.sid);
    sails.log.debug("multiAuth1, sails.sid: " + sails.sid);

    if (req.cookies.authenticated) {

        AppUser.findOne({sessionkey: req.cookies.sessionkey}, function (err, cUser) {

            if (err !== null)
            {
                //console.log("cookieAuth error: " + err);
                sails.log.debug("cookieAuth error: " + err);

                authData.hasCoockie = true;
                //authData.hasSession = false;
                //authData.username="";
                //authData.sessionKey= "";
                authData.authenticated = false;
                authData.code = 4010;

                //return res.serverError("Error when finding user for authentication !!!");
            }

            if (cUser !== undefined)
            {
                //console.log("cookieAuth username: " + cUser.username);
                sails.log.debug("cookieAuth username: " + cUser.username);

                authData.hasCoockie = true;
                //authData.hasSession = false;
                authData.username = cUser.username;
                authData.sessionKey = req.session.sessionkey;
                authData.authenticated = true;
                authData.code = 0;

                //return next();
            } else
            {
                //console.log("cookieAuth, problem with user: " + cUser);
                sails.log.debug("cookieAuth, problem with user: " + cUser);

                authData.hasCoockie = true;
                //authData.hasSession = false;
                authData.username = "";
                authData.sessionKey = "";
                authData.authenticated = false;
                authData.code = 4020;

                //return res.forbidden('You are not permitted to perform this action.');
            }


        });

    } else
    {
        //console.log("cookieAuth, req.signedCookies.authenticated: " + req.cookies.authenticated);
        sails.log.debug("cookieAuth, req.signedCookies.authenticated: " + req.cookies.authenticated);

        authData.hasCoockie = false;
        //authData.hasSession = false;
        authData.username = "";
        authData.sessionKey = "";
        authData.authenticated = false;
        authData.code = 4030;

        //return res.forbidden('You are not permitted to perform this action.');
    }


    if (req.session.authenticated) {

        AppUser.findOne({sessionkey: req.session.sessionkey}, function (err, cUser) {

            if (err !== null)
            {
                //console.log("sessionAuth error: " + err);
                sails.log.debug("sessionAuth error: " + err);

                //authData.hasCoockie = false;
                authData.hasSession = true;
                authData.username = "";
                authData.sessionKey = "";
                authData.authenticated = false;
                authData.code = 4040;

                //return res.serverError("Error when finding user for authentication !!!");
            }

            if (cUser !== undefined)
            {
                //console.log("sessionAuth username: " + cUser.username);
                sails.log.debug("sessionAuth username: " + cUser.username);

                //authData.hasCoockie = false;
                authData.hasSession = true;
                authData.username = cUser.username;
                authData.sessionKey = req.session.sessionkey;
                authData.authenticated = true;
                authData.code = 0;

                //return next();
            } else
            {
                //console.log("sessionAuth, problem with user: " + cUser);
                sails.log.debug("sessionAuth, problem with user: " + cUser);

                //authData.hasCoockie = false;
                authData.hasSession = true;
                authData.username = "";
                authData.sessionKey = "";
                authData.authenticated = false;
                authData.code = 4050;

                //return res.forbidden('You are not permitted to perform this action.');
            }


        });

    } else
    {
        //console.log("sessionAuth, req.session.authenticated: " + req.session.authenticated);
        sails.log.debug("sessionAuth, req.session.authenticated: " + req.session.authenticated);

        //authData.hasCoockie = false;
        authData.hasSession = false;
        authData.username = "";
        authData.sessionKey = "";
        authData.authenticated = false;
        authData.code = 4060;

        //return res.forbidden('You are not permitted to perform this action.');
    }


    if (authData.authenticated)
    {
        //console.log("Authenticated");
        sails.log.debug("Authenticated");

        //req.session.authenticated = true;
        //req.session.sessionkey = authData.sessionkey;
        //req.session.username = authData.username;

        // res.cookie('authenticated', true);
        //res.cookie('sessionkey', authData.sessionkey);
        //res.cookie('username', authData.username);

        return next();
    } else
    {
        //console.log("NOT authenticated");
        sails.log.debug("NOT authenticated");

        res.clearCookie('authenticated');
        res.clearCookie('sessionkey');
        res.clearCookie('username');

        req.session.authenticated = true;
        req.session.sessionkey = "";
        req.session.username = "";

        return res.forbidden(authData,"home1");
    }


    // User is not allowed
    // (default res.forbidden() behavior can be overridden in `config/403.js`)
};
