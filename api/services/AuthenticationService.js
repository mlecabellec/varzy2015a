/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var cryptoJS = require("crypto-js");
var uuid = require('node-uuid');
var forge = require('node-forge');

module.exports = {
    /**
     * `AuthenticationController.login()`
     */
    login: function (givenUsername, givenPassword) {

        var authData = {
            hasCoockie: false,
            hasSession: false,
            username: "",
            sessionKey: "",
            authenticated: false,
            code: 9999,
            message: "",
            error: ""
        };


        if (givenUsername === null || givenUsername === undefined)
        {
            
            authData.hasSession = false;
        authData.username = "";
        authData.sessionKey = "";
        authData.authenticated = false;
        authData.code = 5010;
        authData.message = "5010: Bad or missing username" ;
        authData.error = "5010: Bad or missing username" ;

            return authData;

        }

        if (givenPassword === null || givenPassword === undefined)
        {
                authData.hasSession = false;
        authData.username = "";
        authData.sessionKey = "";
        authData.authenticated = false;
        authData.code = 5020;
        authData.message = "5020: Bad or missing password" ;
        authData.error = "5020: Bad or missing password" ;

            return authData;
        }


        var lookingForUser = {username: givenUsername, password: cryptoJS.SHA256(givenPassword).toString(cryptoJS.enc.Base64), isActive: true};

        AppUser.findOne(lookingForUser, function (err, cUser) {

            if (err !== null)
            {
                console.log("login error: " + err);
                return authData;
            }

            if (cUser !== undefined)
            {
                console.log("login, user found: " + cUser.username);
                //req.session.authenticated = true;
                //req.session.sessionkey = cUser.sessionkey;
                //req.session.username = cUser.username ;

                //req.signedCookies.authenticated = true;
                //req.signedCookies.sessionkey = cUser.sessionkey;
                //req.signedCookies.username = cUser.username;

                //res.cookie('authenticated', true);
                //res.cookie('sessionkey', cUser.sessionkey);
                //res.cookie('username', cUser.username);


                console.log("login, req.session.authenticated: " + req.session.authenticated);
                console.log("login, req.session.authenticated: " + req.session.authenticated);
                console.log("login, req.session.sessionkey: " + req.session.sessionkey);
                console.log("login, req.session.username: " + req.session.username);

                console.log("login, req.cookies.authenticated: " + req.cookies.authenticated);
                console.log("login, req.cookies.sessionkey: " + req.cookies.sessionkey);
                console.log("login, req.cookies.username: " + req.cookies.username);

                return authData;

            } else
            {
                console.log("login, problem with user: " + cUser);
                return authData;
            }

        });


    },
    /**
     * `AuthenticationController.logout()`
     */
    logout: function (req, res) {

        res.clearCookie('authenticated');
        res.clearCookie('sessionkey');
        res.clearCookie('username');

        req.session.authenticated = true;
        req.session.sessionkey = "";
        req.session.username = "";


        return authData;
    },
    /**
     * `AuthenticationController.register()`
     */
    register: function (req, res) {

        res.clearCookie('authenticated');
        res.clearCookie('sessionkey');
        res.clearCookie('username');

        req.session.authenticated = true;
        req.session.sessionkey = "";
        req.session.username = "";

        var givenUsername = req.param("username");
        var givenPassword1 = req.param("password1");
        var givenPassword2 = req.param("password2");
        var givenEmail = req.param("email");



        var newUser = {username: givenUsername, password: cryptoJS.SHA256(givenPassword1).toString(cryptoJS.enc.Base64), isActive: true, isAdmin: false, email: givenEmail};

        AppUser.create(newUser).exec(function (err, record) {

            if (err !== null)
            {
                console.log("Registration error: " + err);
                return res.json({
                    message: "Registration problem.",
                    errorMessage: "Registration problem. Please check this error: " + err,
                    code: 3080,
                    err: err
                });
            } else
            {
                return res.json({
                    message: "Registration OK.",
                    errorMessage: "",
                    code: 0,
                    err: err
                });
            }



        });

    },
    /**
     * `AuthenticationController.check()`
     */
    check: function (req, res) {

        var authData = {
            hasCoockie: false,
            hasSession: false,
            username: "",
            sessionKey: "",
            authenticated: false,
            code: 9999,
            message: "",
            error: ""
        };


        //ultiAuth1, sails.sid: " + sails.sid);
        sails.log.debug("AuthenticationController/check, sails.sid: " + sails.sid);

        if (req.cookies.authenticated) {

            AppUser.findOne({sessionkey: req.cookies.sessionkey}, function (err, cUser) {

                if (err !== null)
                {
                    //console.log("cookieAuth error: " + err);
                    sails.log.debug("AuthenticationController/check, cookieAuth error: " + err);

                    authData.hasCoockie = true;
                    //authData.hasSession = false;
                    //authData.username="";
                    //authData.sessionKey= "";
                    authData.authenticated = false;
                    authData.code = 4010;
                    authData.message = "4010: Invalid session";
                    authData.error = "4010: Invalid session";

                    //return res.serverError("Error when finding user for authentication !!!");
                }

                if (cUser !== undefined)
                {
                    //console.log("cookieAuth username: " + cUser.username);
                    sails.log.debug("AuthenticationController/check, cookieAuth username: " + cUser.username);

                    authData.hasCoockie = true;
                    //authData.hasSession = false;
                    authData.username = cUser.username;
                    authData.sessionKey = req.session.sessionkey;
                    authData.authenticated = true;
                    authData.code = 0;
                    authData.message = "0: Coockie successfully identified";
                    authData.error = "0: Coockie successfully identified";

                    //return next();
                } else
                {
                    //console.log("cookieAuth, problem with user: " + cUser);
                    sails.log.debug("AuthenticationController/check, cookieAuth, problem with user: " + cUser);

                    authData.hasCoockie = true;
                    //authData.hasSession = false;
                    authData.username = "";
                    authData.sessionKey = "";
                    authData.authenticated = false;
                    authData.code = 4020;
                    authData.message = "4020: Authentication problem";
                    authData.error = "4020: Authentication problem";

                    //return res.forbidden('You are not permitted to perform this action.');
                }


            });

        } else
        {
            //console.log("cookieAuth, req.signedCookies.authenticated: " + req.cookies.authenticated);
            sails.log.debug("AuthenticationController/check, req.signedCookies.authenticated: " + req.cookies.authenticated);

            authData.hasCoockie = false;
            //authData.hasSession = false;
            authData.username = "";
            authData.sessionKey = "";
            authData.authenticated = false;
            authData.code = 4030;
            authData.message = "4030: Invalid coockie";
            authData.error = "4030: Invalid coockie";

            //return res.forbidden('You are not permitted to perform this action.');
        }


        if (req.session.authenticated) {

            AppUser.findOne({sessionkey: req.session.sessionkey}, function (err, cUser) {

                if (err !== null)
                {
                    //console.log("sessionAuth error: " + err);
                    sails.log.debug("AuthenticationController/check, sessionAuth error: " + err);

                    //authData.hasCoockie = false;
                    authData.hasSession = true;
                    authData.username = "";
                    authData.sessionKey = "";
                    authData.authenticated = false;
                    authData.code = 4040;
                    authData.message = "4040: Invalid session";
                    authData.error = "4040: Invalid session";

                    //return res.serverError("Error when finding user for authentication !!!");
                }

                if (cUser !== undefined)
                {
                    //console.log("sessionAuth username: " + cUser.username);
                    sails.log.debug("AuthenticationController/check, username: " + cUser.username);

                    //authData.hasCoockie = false;
                    authData.hasSession = true;
                    authData.username = cUser.username;
                    authData.sessionKey = req.session.sessionkey;
                    authData.authenticated = true;
                    authData.code = 0;
                    authData.message = "0: Session successfully identified";
                    authData.error = "0: Session successfully identified";

                    //return next();
                } else
                {
                    //console.log("sessionAuth, problem with user: " + cUser);
                    sails.log.debug("AuthenticationController/check, problem with user: " + cUser);

                    //authData.hasCoockie = false;
                    authData.hasSession = true;
                    authData.username = "";
                    authData.sessionKey = "";
                    authData.authenticated = false;
                    authData.code = 4050;
                    authData.message = "4050: Session identification error";
                    authData.error = "4050: Session identification error";

                    //return res.forbidden('You are not permitted to perform this action.');
                }


            });

        } else
        {
            //console.log("sessionAuth, req.session.authenticated: " + req.session.authenticated);
            sails.log.debug("AuthenticationController/check, req.session.authenticated: " + req.session.authenticated);

            //authData.hasCoockie = false;
            authData.hasSession = false;
            authData.username = "";
            authData.sessionKey = "";
            authData.authenticated = false;
            authData.code = 4060;
            authData.message = "4060: Session identification error";
            authData.error = "4060: Session identification error";

            //return res.forbidden('You are not permitted to perform this action.');
        }

        return res.json(authData);



    },
    getticket: function (req, res)
    {

    }
};
