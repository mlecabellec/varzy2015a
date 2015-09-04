/* global AppUser, AppTicket */

/**
 * AuthenticationController
 *
 * @description :: Server-side logic for managing authentications
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var cryptoJS = require("crypto-js");
var uuid = require('node-uuid');
var forge = require('node-forge');

module.exports = {
    /**
     * `AuthenticationController.index()`
     */
    index: function index(req, res) {

        res.render({view: 'index'});

    },
    /**
     * `AuthenticationController.login()`
     */
    login: function login(req, res) {

        var givenUsername = req.param("username");
        var givenPassword = req.param("password");
        var givenTicket = req.param("ticket"); //UUID

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

            return res.json(authData);

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

            return res.json(authData);
        }


        var lookingForUser = {username: givenUsername, password: cryptoJS.SHA256(givenPassword).toString(cryptoJS.enc.Base64), isActive: true};

        AppUser.findOne(lookingForUser, function afterUserLookup(err, cUser) {

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

                return res.json(authData);
            }else if (cUser !== undefined)
            {
                console.log("login, user found: " + cUser.username);
                req.session.authenticated = true;
                req.session.sessionkey = cUser.sessionkey;
                req.session.username = cUser.username;

                req.signedCookies.authenticated = true;
                req.signedCookies.sessionkey = cUser.sessionkey;
                req.signedCookies.username = cUser.username;

                res.cookie('authenticated', true);
                res.cookie('sessionkey', cUser.sessionkey);
                res.cookie('username', cUser.username);


                console.log("login, req.session.authenticated: " + req.session.authenticated);
                console.log("login, req.session.authenticated: " + req.session.authenticated);
                console.log("login, req.session.sessionkey: " + req.session.sessionkey);
                console.log("login, req.session.username: " + req.session.username);


                console.log("login, req.cookies.authenticated: " + req.cookies.authenticated);
                console.log("login, req.cookies.sessionkey: " + req.cookies.sessionkey);
                console.log("login, req.cookies.username: " + req.cookies.username);

                cUser.hitCount += 1;
                cUser.sessionKey = cryptoJS.SHA256(cUser.username + Math.ceil(Math.random() * 2 ^ 32 + Math.random() * 2 ^ 13)).toString(cryptoJS.enc.Base64);
                cUser.save(function savedUserHook(err, savedUser) {
                    //TODO ?
                });

                authData.hasSession = true;
                authData.hasCoockie = true ;
                authData.username = cUser.username;
                authData.sessionKey = cUser.sessionKey;
                authData.authenticated = true;
                authData.code = 0;
                authData.message = "0: Authenticated";
                authData.error = "0: Authenticated";

                return res.json(authData);

            } else
            {
                console.log("login, problem with user: " + cUser);

                var lookingForAttackedUser = {username: givenUsername};
                AppUser.findOne(lookingForAttackedUser, function whenAttackedUser(err, attackedUser) {
                    if (err == null)
                    {
                        attackedUser.healthPoints = attackedUser.healthPoints - 5;
                        console.log("User: " + attackedUser.username + ", health: " + attackedUser.healthPoints);
                        attackedUser.save(function onHealthDecrease(err) {
                            //TODO ?
                        });
                        AppUser.update({where: {healthPoints: {'<': 0}}}, {isActive: false}, function afterDisablingUsers(err, disabledUsers) {
                            disabledUsers.forEach(function logDisabledUsers(cDisabledUser, cIndex, allDisabledUsers) {
                                console.log("Disabled user for security reasons: " + cDisabledUser.username);
                            });
                        });
                    } else
                    {
                        console.log("attack check error: " + err);
                    }

                });

                authData.hasSession = false;
                authData.username = cUser.username;
                authData.sessionKey = "";
                authData.authenticated = false;
                authData.code = 5060;
                authData.message = "5060: Login problem";
                authData.error = "5060: Login problem";

                return res.json(authData);
            }

        });



    },
    /**
     * `AuthenticationController.logout()`
     */
    logout: function logout(req, res) {

        var givenUsername = req.session.username;
        var givenSessionKey = req.session.sessionKey;

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

            return res.json(authData);

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

            return res.json(authData);
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

                return res.json(authData);
            }else if (cUser !== undefined)
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

                res.clearCookie('authenticated');
                res.clearCookie('sessionkey');
                res.clearCookie('username');

                req.session.authenticated = true;
                req.session.sessionkey = "";
                req.session.username = "";

                return res.json(authData);

            } else
            {
                console.log("logout, problem with user: " + cUser);

                var lookingForAttackedUser = {username: givenUsername};
                AppUser.findOne(lookingForAttackedUser, function whenAttackedUser(err, attackedUser) {
                    if (err == null)
                    {
                        attackedUser.healthPoints = attackedUser.healthPoints - 5;
                        console.log("User: " + attackedUser.username + ", health: " + attackedUser.healthPoints);
                        attackedUser.save(function onHealthDecrease(err) {
                            //TODO ?
                        });
                        AppUser.update({where: {healthPoints: {'<': 0}}}, {isActive: false}, function afterDisablingUsers(err, disabledUsers) {
                            disabledUsers.forEach(function logDisabledUsers(cDisabledUser, cIndex, allDisabledUsers) {
                                console.log("Disabled user for security reasons: " + cDisabledUser.username);
                            });
                        });
                    } else
                    {
                        console.log("attack check error: " + err);
                    }

                });

                authData.hasSession = false;
                authData.username = cUser.username;
                authData.sessionKey = "";
                authData.authenticated = false;
                authData.code = 5160;
                authData.message = "5160: Logout problem";
                authData.error = "5160: Logout problem";

                return res.json(authData);
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
    register: function register(req, res) {

        res.clearCookie('authenticated');
        res.clearCookie('sessionkey');
        res.clearCookie('username');

        req.session.authenticated = false;
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
            } else
            {
                console.log("Registration seems OK: ");
            }



        });

    },
    /**
     * `AuthenticationController.check()`
     */
    check: function checkAuth(req, res) {

        var givenUsername = req.session.username;
        var givenSessionKey = req.session.sessionKey;

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

            return res.json(authData);


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

            return res.json(authData);

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

                return res.json(authData);

            }else if (cUser !== undefined)
            {
                console.log("login, user found: " + cUser.username);
                req.session.authenticated = true;
                req.session.sessionkey = cUser.sessionkey;
                req.session.username = cUser.username;

                req.signedCookies.authenticated = true;
                req.signedCookies.sessionkey = cUser.sessionkey;
                req.signedCookies.username = cUser.username;

                res.cookie('authenticated', true);
                res.cookie('sessionkey', cUser.sessionkey);
                res.cookie('username', cUser.username);


                console.log("login, req.session.authenticated: " + req.session.authenticated);
                console.log("login, req.session.authenticated: " + req.session.authenticated);
                console.log("login, req.session.sessionkey: " + req.session.sessionkey);
                console.log("login, req.session.username: " + req.session.username);


                console.log("login, req.cookies.authenticated: " + req.cookies.authenticated);
                console.log("login, req.cookies.sessionkey: " + req.cookies.sessionkey);
                console.log("login, req.cookies.username: " + req.cookies.username);

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

                return res.json(authData);


            } else
            {
                console.log("logout, problem with user: " + cUser);

                var lookingForAttackedUser = {username: givenUsername};
                AppUser.findOne(lookingForAttackedUser, function whenAttackedUser(err, attackedUser) {
                    if (err == null)
                    {
                        attackedUser.healthPoints = attackedUser.healthPoints - 5;
                        console.log("User: " + attackedUser.username + ", health: " + attackedUser.healthPoints);
                        attackedUser.save(function onHealthDecrease(err) {
                            //TODO ?
                        });
                        AppUser.update({where: {healthPoints: {'<': 0}}}, {isActive: false}, function afterDisablingUsers(err, disabledUsers) {
                            disabledUsers.forEach(function logDisabledUsers(cDisabledUser, cIndex, allDisabledUsers) {
                                console.log("Disabled user for security reasons: " + cDisabledUser.username);
                            });
                        });
                    } else
                    {
                        console.log("attack check error: " + err);
                    }

                });


                authData.hasSession = false;
                authData.username = cUser.username;
                authData.sessionKey = "";
                authData.authenticated = false;
                authData.code = 5260;
                authData.message = "5260: check problem";
                authData.error = "5260: check problem";

                return res.json(authData);

            }

        });

    },
    getticket: function getTicket(req, res)
    {
        //TODO: implementig dual mode session or login+password
        var givenUsername = req.session.username;
        var givenSessionKey = req.session.sessionKey;

        var newTicket = {
            validityStartingAt: new Date(),
            validityEndingAt: new Date() + 20000,
            ticketToken: uuid.v1(),
            uuid: uuid.v1(),
            owner: undefined,
            ownerProfile: undefined
        };


        AppTicket.destroy({where: {validityEndingAt: {'<': new Date()}}, skip: 0, limit: 1000, sort: 'validityEndingAt ASC'}).exec(function ackTicketsDestroyed(err, deletedTickets) {
            //TODO ?
        });

        var lookingForUser = {username: givenUsername, sessionKey: givenSessionKey, isActive: true};

        AppUser.findOne(lookingForUser, function (err, cUser) {

            if (err !== null)
            {
                AppTicket.create(newTicket, function newTicketCb(err, createdTicket)
                {
                    if (err == null || err !== undefined)
                    {
                        return res.json(createdTicket);
                    } else
                    {
                        return res.serverError();

                        //TODO ?
                    }

                });



            }else if (cUser !== undefined)
            {

                newTicket.owner = cUser.toJSON();

                AppTicket.create(newTicket, function newTicketCb(err, createdTicket)
                {
                    if (err == null || err !== undefined)
                    {
                        return res.json(createdTicket);
                    } else
                    {
                        return res.serverError();
                        //TODO ?
                    }

                });

            } else
            {
                AppTicket.create(newTicket, function newTicketCb(err, createdTicket)
                {
                    if (err == null || err !== undefined)
                    {
                        return res.json(createdTicket);
                    } else
                    {
                        return res.serverError();
                        //TODO ?
                    }

                });

            }
        });


    },
    getticket2: function getTicket2(req, res)
    {

        var givenUsername = req.param("username");
        var givenPassword = req.param("password");

        var newTicket = {
            validityStartingAt: new Date(),
            validityEndingAt: new Date() + 20000,
            ticketToken: uuid.v1(),
            uuid: uuid.v1(),
            owner: undefined,
            ownerProfile: undefined
        };


        AppTicket.destroy({where: {validityEndingAt: {'<': new Date()}}, skip: 0, limit: 1000, sort: 'validityEndingAt ASC'}).exec(function ackTicketsDestroyed(err, deletedTickets) {
            //TODO ?
        });

        var lookingForUser = {username: givenUsername, password: cryptoJS.SHA256(givenPassword).toString(cryptoJS.enc.Base64), isActive: true};

        AppUser.findOne(lookingForUser, function (err, cUser) {

            if (err !== null)
            {
                AppTicket.create(newTicket, function newTicketCb(err, createdTicket)
                {
                    if (err == null || err !== undefined)
                    {
                        return res.json(createdTicket);
                    } else
                    {
                        return res.serverError();

                        //TODO ?
                    }

                });

            }else if (cUser !== undefined)
            {

                newTicket.owner = cUser.toJSON();

                AppTicket.create(newTicket, function newTicketCb(err, createdTicket)
                {
                    if (err == null || err !== undefined)
                    {
                        return res.json(createdTicket);
                    } else
                    {
                        return res.serverError();
                        //TODO ?
                    }

                });

            } else
            {

                var lookingForAttackedUser = {username: givenUsername};
                AppUser.findOne(lookingForAttackedUser, function whenAttackedUser(err, attackedUser) {
                    if (err == null)
                    {
                        attackedUser.healthPoints = attackedUser.healthPoints - 5;
                        console.log("User: " + attackedUser.username + ", health: " + attackedUser.healthPoints);
                        attackedUser.save(function onHealthDecrease(err) {
                            //TODO ?
                        });
                        AppUser.update({where: {healthPoints: {'<': 0}}}, {isActive: false}, function afterDisablingUsers(err, disabledUsers) {
                            disabledUsers.forEach(function logDisabledUsers(cDisabledUser, cIndex, allDisabledUsers) {
                                console.log("Disabled user for security reasons: " + cDisabledUser.username);
                            });
                        });
                    } else
                    {
                        console.log("attack check error: " + err);
                    }

                });

                AppTicket.create(newTicket, function newTicketCb(err, createdTicket)
                {
                    if (err == null || err !== undefined)
                    {
                        return res.json(createdTicket);
                    } else
                    {
                        return res.serverError();
                        //TODO ?
                    }

                });

            }
        });


    },
    verifyticket: function verifyTicket(req, res)
    {
        //var givenUsername = req.session.username;
        //var givenSessionKey = req.session.sessionKey;
    }
};
