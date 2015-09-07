/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global AppUser, sails */

/**
 * multiAuth1
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
        sessionkey: "",
        authenticated: false,
        code: 9999,
        message: "",
        error: ""
    };

    sails.log.debug("--------- multiauth1 session ----------");
    sails.log.debug(req.session);
    sails.log.debug("--------- multiauth1 session ----------");

    sails.log.debug("--------- multiauth1 cookies ----------");
    sails.log.debug(req.cookies);
    sails.log.debug("--------- multiauth1 cookies ----------");


    //ultiAuth1, sails.sid: " + sails.sid);
    sails.log.debug("multiAuth1, sails.sid: " + sails.sid);

    if (req.cookies.authenticated && !authData.authenticated) {

        AppUser.findOne({sessionkey: req.cookies.sessionkey}, function (err, cUser) {

            if (err !== null && err !== undefined)
            {
                //console.log("cookieAuth error: " + err);
                sails.log.debug("multiAuth1, cookieAuth error: " + err);

                if (!authData.authenticated && !req.session.authenticated)
                {
                    authData.hasCoockie = true;
                    //authData.hasSession = false;
                    //authData.username="";
                    //authData.sessionkey= "";
                    authData.authenticated = false;
                    authData.code = 4010;
                    authData.message = "4010: Invalid session";
                    authData.error = "4010: Invalid session";

                    return res.forbidden({data: authData});
                }

                //return res.serverError("Error when finding user for authentication !!!");
            } else if (cUser !== undefined)
            {
                //console.log("cookieAuth username: " + cUser.username);
                sails.log.debug("multiAuth1, cookieAuth username: " + cUser.username);

                authData.hasCoockie = true;
                //authData.hasSession = false;
                authData.username = cUser.username;
                authData.sessionkey = req.session.sessionkey;
                authData.authenticated = true;
                authData.code = 0;
                authData.message = "0: Coockie successfully identified";
                authData.error = "0: Coockie successfully identified";

                return next();

            } else
            {
                //console.log("cookieAuth, problem with user: " + cUser);
                sails.log.debug("multiAuth1, cookieAuth, problem with user: " + cUser);

                if (!authData.authenticated && !req.session.authenticated)
                {
                    authData.hasCoockie = true;
                    authData.hasSession = false;
                    authData.username = "";
                    authData.sessionkey = "";
                    authData.authenticated = false;
                    authData.code = 4020;
                    authData.message = "4020: Authentication problem";
                    authData.error = "4020: Authentication problem";

                    return res.forbidden({data: authData});
                }
            }
        });
    } else
    {
        //console.log("cookieAuth, req.signedCookies.authenticated: " + req.cookies.authenticated);
        sails.log.debug("multiAuth1, req.signedCookies.authenticated: " + req.cookies.authenticated);

        if (!authData.authenticated && !req.session.authenticated)
        {
            authData.hasCoockie = false;
            authData.hasSession = false;
            authData.username = "";
            authData.sessionkey = "";
            authData.authenticated = false;
            authData.code = 4030;
            authData.message = "4030: Invalid coockie";
            authData.error = "4030: Invalid coockie";

            return res.forbidden({data: authData});
        }
    }


    if (req.session.authenticated && !authData.authenticated) {

        AppUser.findOne({sessionkey: req.session.sessionkey}, function (err, cUser) {

            if (err !== null && err !== undefined)
            {
                //console.log("sessionAuth error: " + err);
                sails.log.debug("multiAuth1, sessionAuth error: " + err);


                if (!authData.authenticated && !req.cookies.authenticated)
                {
                    //authData.hasCoockie = false;
                    authData.hasSession = true;
                    authData.username = "";
                    authData.sessionkey = "";
                    authData.authenticated = false;
                    authData.code = 4040;
                    authData.message = "4040: Invalid session";
                    authData.error = "4040: Invalid session";

                    return res.forbidden({data: authData});
                }


                //return res.serverError("Error when finding user for authentication !!!");
            } else if (cUser !== undefined)
            {
                //console.log("sessionAuth username: " + cUser.username);
                sails.log.debug("multiAuth1, username: " + cUser.username);

                //authData.hasCoockie = false;
                authData.hasSession = true;
                authData.username = cUser.username;
                authData.sessionkey = req.session.sessionkey;
                authData.authenticated = true;
                authData.code = 0;
                authData.message = "0: Session successfully identified";
                authData.error = "0: Session successfully identified";

                try {
                    return next();
                } catch (ex)
                {
                    authData.code = 4110;
                    authData.message = "4110: " + ex.message;
                    authData.error = "4110: " + ex.message;
                    sails.log.warn("multiAuth1,code 4110, ex=" + ex.message);
                }
            } else
            {
                //console.log("sessionAuth, problem with user: " + cUser);
                sails.log.debug("multiAuth1, problem with user: " + cUser);

                if (!authData.authenticated && !req.cookies.authenticated)
                {
                    //authData.hasCoockie = false;
                    authData.hasSession = true;
                    authData.username = "";
                    authData.sessionkey = "";
                    authData.authenticated = false;
                    authData.code = 4050;
                    authData.message = "4050: Session identification error";
                    authData.error = "4050: Session identification error";

                    return res.forbidden({data: authData});
                }
            }
        });
    } else
    {
        //console.log("sessionAuth, req.session.authenticated: " + req.session.authenticated);
        sails.log.debug("multiAuth1, req.session.authenticated: " + req.session.authenticated);

        if (!authData.authenticated && !req.cookies.authenticated) {
            authData.hasCoockie = false;
            authData.hasSession = false;
            authData.username = "";
            authData.sessionkey = "";
            authData.authenticated = false;
            authData.code = 4060;
            authData.message = "4060: Session identification error";
            authData.error = "4060: Session identification error";

            return res.forbidden({data: authData});
        }
    }
};
