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
    login: function login(givenUsername, givenPassword) {

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
            authData.message = "5010: Bad or missing username";
            authData.error = "5010: Bad or missing username";

            return authData;

        }

        if (givenPassword === null || givenPassword === undefined)
        {
            authData.hasSession = false;
            authData.username = "";
            authData.sessionKey = "";
            authData.authenticated = false;
            authData.code = 5020;
            authData.message = "5020: Bad or missing password";
            authData.error = "5020: Bad or missing password";

            return authData;
        }


        var lookingForUser = {username: givenUsername, password: cryptoJS.SHA256(givenPassword).toString(cryptoJS.enc.Base64), isActive: true};

        AppUser.findOne(lookingForUser, function (err, cUser) {

            if (err !== null)
            {
                console.log("login error: " + err);

                authData.hasSession = false;
                authData.username = "";
                authData.sessionKey = "";
                authData.authenticated = false;
                authData.code = 5030;
                authData.message = "5030: User not found";
                authData.error = "5030: User not found";

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


                //console.log("login, req.session.authenticated: " + req.session.authenticated);
                //console.log("login, req.session.authenticated: " + req.session.authenticated);
                //console.log("login, req.session.sessionkey: " + req.session.sessionkey);
                //console.log("login, req.session.username: " + req.session.username);


                //console.log("login, req.cookies.authenticated: " + req.cookies.authenticated);
                //console.log("login, req.cookies.sessionkey: " + req.cookies.sessionkey);
                //console.log("login, req.cookies.username: " + req.cookies.username);

                cUser.hitCount += 1;
                cUser.sessionKey = cryptoJS.SHA256(values.username + Math.ceil(Math.random() * 2 ^ 32 + Math.random() * 2 ^ 13)).toString(cryptoJS.enc.Base64);
                cUser.save(function savedUserHook(err, savedUser) {
                    //TODO ?
                });

                authData.hasSession = false;
                authData.username = cUser.username;
                authData.sessionKey = cUser.sessionKey;
                authData.authenticated = true;
                authData.code = 0;
                authData.message = "0: Authenticated";
                authData.error = "0: Authenticated";

                return authData;

            } else
            {
                console.log("login, problem with user: " + cUser);

                authData.hasSession = false;
                authData.username = cUser.username;
                authData.sessionKey = "";
                authData.authenticated = false;
                authData.code = 5060;
                authData.message = "5060: Login problem";
                authData.error = "5060: Login problem";

                return authData;
            }

        });


    },
    /**
     * `AuthenticationController.logout()`
     */
    logout: function logout(givenUsername, givenSessionKey) {



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
            authData.code = 5110;
            authData.message = "5110: Bad or missing username";
            authData.error = "5110: Bad or missing username";

            return authData;

        }

        if (givenSessionKey === null || givenSessionKey === undefined)
        {
            authData.hasSession = false;
            authData.username = "";
            authData.sessionKey = "";
            authData.authenticated = false;
            authData.code = 5120;
            authData.message = "5120: Bad or missing session key";
            authData.error = "5120: Bad or missing session key";

            return authData;
        }


        var lookingForUser = {username: givenUsername, sessionKey: givenSessionKey, isActive: true};

        AppUser.findOne(lookingForUser, function (err, cUser) {

            if (err !== null)
            {
                console.log("login error: " + err);

                authData.hasSession = false;
                authData.username = "";
                authData.sessionKey = "";
                authData.authenticated = false;
                authData.code = 5130;
                authData.message = "5130: User not found";
                authData.error = "5130: User not found";

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


                //console.log("login, req.session.authenticated: " + req.session.authenticated);
                //console.log("login, req.session.authenticated: " + req.session.authenticated);
                //console.log("login, req.session.sessionkey: " + req.session.sessionkey);
                //console.log("login, req.session.username: " + req.session.username);


                //console.log("login, req.cookies.authenticated: " + req.cookies.authenticated);
                //console.log("login, req.cookies.sessionkey: " + req.cookies.sessionkey);
                //console.log("login, req.cookies.username: " + req.cookies.username);

                //cUser.hitCount += 1;
                cUser.sessionKey = cryptoJS.SHA256(values.username + Math.ceil(Math.random() * 2 ^ 32 + Math.random() * 2 ^ 13)).toString(cryptoJS.enc.Base64);
                cUser.save(function savedUserHook(err, savedUser) {
                    //TODO ?
                });

                authData.hasSession = false;
                authData.username = cUser.username;
                authData.sessionKey = "";
                authData.authenticated = false;
                authData.code = 0;
                authData.message = "0: OK";
                authData.error = "0: OK";

                return authData;

            } else
            {
                console.log("logout, problem with user: " + cUser);

                authData.hasSession = false;
                authData.username = cUser.username;
                authData.sessionKey = "";
                authData.authenticated = false;
                authData.code = 5160;
                authData.message = "5160: Logout problem";
                authData.error = "5160: Logout problem";

                return authData;
            }

        });

        //res.clearCookie('authenticated');
        //res.clearCookie('sessionkey');
        //res.clearCookie('username');

        //req.session.authenticated = true;
        //req.session.sessionkey = "";
        //req.session.username = "";

    },
    /**
     * `AuthenticationController.register()`
     */
    register: function register(givenUsername, givenPassword, givenEmail) {

        //res.clearCookie('authenticated');
        //res.clearCookie('sessionkey');
        //res.clearCookie('username');

        //req.session.authenticated = true;
        //req.session.sessionkey = "";
        //req.session.username = "";

        //var givenUsername = req.param("username");
        //var givenPassword1 = req.param("password1");
        //var givenPassword2 = req.param("password2");
        //var givenEmail = req.param("email");



        var newUser = {username: givenUsername, password: cryptoJS.SHA256(givenPassword).toString(cryptoJS.enc.Base64), isActive: true, isAdmin: false, email: givenEmail};

        AppUser.create(newUser).exec(function (err, record) {

            if (err !== null)
            {
                console.log("Registration error: " + err);
            } else
            {
                console.log("Registration seems OK: ");
            }



        });

    },
    /**
     * `AuthenticationController.register()`
     */
    register2: function register2(givenUsername, givenPassword) {

        //res.clearCookie('authenticated');
        //res.clearCookie('sessionkey');
        //res.clearCookie('username');

        //req.session.authenticated = true;
        //req.session.sessionkey = "";
        //req.session.username = "";

        //var givenUsername = req.param("username");
        //var givenPassword1 = req.param("password1");
        //var givenPassword2 = req.param("password2");
        //var givenEmail = req.param("email");



        var newUser = {username: givenUsername, password: cryptoJS.SHA256(givenPassword).toString(cryptoJS.enc.Base64), isActive: true, isAdmin: false};

        AppUser.create(newUser).exec(function (err, record) {

            if (err !== null)
            {
                console.log("Registration error: " + err);
            } else
            {
                console.log("Registration seems OK: ");
            }



        });

    },
    /**
     * `AuthenticationController.check()`
     */
    check: function (givenUsername, givenSessionKey) {



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
            authData.code = 5210;
            authData.message = "5210: Bad or missing username";
            authData.error = "5210: Bad or missing username";

            return authData;

        }

        if (givenSessionKey === null || givenSessionKey === undefined)
        {
            authData.hasSession = false;
            authData.username = "";
            authData.sessionKey = "";
            authData.authenticated = false;
            authData.code = 5220;
            authData.message = "5220: Bad or missing session key";
            authData.error = "5220: Bad or missing session key";

            return authData;
        }


        var lookingForUser = {username: givenUsername, sessionKey: givenSessionKey, isActive: true};

        AppUser.findOne(lookingForUser, function (err, cUser) {

            if (err !== null)
            {
                console.log("login error: " + err);

                authData.hasSession = false;
                authData.username = "";
                authData.sessionKey = "";
                authData.authenticated = false;
                authData.code = 5230;
                authData.message = "5230: User not found";
                authData.error = "5230: User not found";

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


                //console.log("login, req.session.authenticated: " + req.session.authenticated);
                //console.log("login, req.session.authenticated: " + req.session.authenticated);
                //console.log("login, req.session.sessionkey: " + req.session.sessionkey);
                //console.log("login, req.session.username: " + req.session.username);


                //console.log("login, req.cookies.authenticated: " + req.cookies.authenticated);
                //console.log("login, req.cookies.sessionkey: " + req.cookies.sessionkey);
                //console.log("login, req.cookies.username: " + req.cookies.username);

                cUser.hitCount += 1;
                //cUser.sessionKey = cryptoJS.SHA256(values.username + Math.ceil(Math.random() * 2 ^ 32 + Math.random() * 2 ^ 13)).toString(cryptoJS.enc.Base64);
                cUser.save(function savedUserHook(err, savedUser) {
                    //TODO ?
                });

                authData.hasSession = false;
                authData.username = cUser.username;
                authData.sessionKey = cUser.sessionKey;
                authData.authenticated = true;
                authData.code = 0;
                authData.message = "0: OK";
                authData.error = "0: OK";

                return authData;

            } else
            {
                console.log("logout, problem with user: " + cUser);

                authData.hasSession = false;
                authData.username = cUser.username;
                authData.sessionKey = "";
                authData.authenticated = false;
                authData.code = 5260;
                authData.message = "5260: check problem";
                authData.error = "5260: check problem";

                return authData;
            }

        });

    },
    getTicket: function getTicket()
    {
        var newTicket = {
            validityStartingAt: new Date(),
            validityEndingAt: new Date() + 20000,
            ticketToken: uuid.v1(),
            uuid: uuid.v1(),
            owner: undefined,
            ownerProfile: undefined
        };
        
        //appTicket.create(newTicket);

    },
    getTicket2: function getTicket2(givenUsername, givenSessionKey)
    {

    },
    verifyTicket: function verifyTicket(ticket)
    {

    }
};
