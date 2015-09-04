/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//Require JST, lodash and JQuery


this["APP"] = this["APP"] || {
    moduleInfo:
            {
                moduleId: "APP",
                moduleVersion: "0.0.1-DEV",
                description: "Root of the APP tree"
            },
    loadedModules: [],
    bootstrap: function bootstrap() {
        APP.loadedModules = APP.loadedModules.concat(APP.moduleInfo);
    }
};
APP.bootstrap();

//------------------------------------------------------------------------------

this.APP["login"] = this.APP["login"] || {
    moduleInfo:
            {
                moduleId: "APP.Login",
                moduleVersion: "0.0.2-DEV",
                description: "Login related module"
            },
    bootstrap: function bootstrap() {
        APP.loadedModules = APP.loadedModules.concat(APP.login.moduleInfo);
    },
    gui: {
        loginUrl: "",
        loginModal:
                {
                    openModal: function openModal() {

                        $("body").append(JST["assets/templates/login.html"](
                                {i18n: APP.home.data.i18n.loginModal}
                        ));

                        //TODO: wire events for login

                        $("#signMeLoginButton").unbind("click");
                        $("#signMeLoginButton").on("click", function () {
                            var givenUsername = $("#inputUsername").val();
                            var givenPassword = $("#inputPassword").val();
                            APP.login.gui.loginModal.doJsonLogin(givenUsername, givenPassword);




                        });

                        $("#cancelLoginButton").on("click", function () {
                            //alert("2");

                        });


                        $("#loginModal").on('shown.bs.modal', function () {

                        });

                        $("#loginModal").modal();
                    },
                    doJsonLogin: function doJsonLogin(givenUsername, givenPassword) {

                        //load authentication status
                        $.getJSON("/authentication/check", function checkAuth1(data) {
                            APP.login.data = data;

                            if (!APP.login.data.authenticated)
                            {
                                //TODO ?
                                $.getJSON("/authentication/getticket", function getTicket1(data) {
                                    var newTicket = data;
                                    APP.login.tickets = APP.login.tickets.concat(newTicket);

                                    var loginData = {
                                        username: givenUsername,
                                        password: givenPassword,
                                        ticket: newTicket.uuid
                                    };

                                    $.post("/authentication/login", loginData, function loginCb(data) {
                                        APP.login.data = data;


                                    }, 'json');
                                });

                            } else
                            {
                                //TODO ?
                            }
                        });
                    },
                    jsonLoginCb: function jsonLoginCb() {
                    },
                    doJsonLogout: function doJsonLogout() {
                    },
                    jsonLogoutCb: function jsonLogoutCb() {
                    }
                },
        helpers:
                {
                    checkAuth: function () {
                    }
                }
    },
    data: {},
    tickets: []
};
APP.login.bootstrap();

//------------------------------------------------------------------------------

this.APP["views"] = this.APP["views"] || {
    moduleInfo:
            {
                moduleId: "APP.views",
                moduleVersion: "0.0.1-DEV",
                description: "View related functions including init routines"
            },
    bootstrap: function bootstrap() {
        APP.loadedModules = APP.loadedModules.concat(APP.views.moduleInfo);
    }
};
APP.views.bootstrap();

//------------------------------------------------------------------------------

this.APP["debug"] = this.APP["debug"] || {
    moduleInfo:
            {
                moduleId: "APP.debug",
                moduleVersion: "0.0.1-DEV",
                description: "Debug related functions"
            },
    bootstrap: function bootstrap() {
        APP.loadedModules = APP.loadedModules.concat(APP.debug.moduleInfo);
        if (APP.debug.enabled)
        {
            APP.debug.debugKit.init();
        }
    },
    enabled: true,
    debugKit: {
        init: function initDebugKit()
        {

        }
    }
};
APP.debug.bootstrap();

//------------------------------------------------------------------------------

this.APP["logs"] = this.APP["logs"] || {
    moduleInfo:
            {
                moduleId: "APP.logs",
                moduleVersion: "0.0.1-DEV",
                description: "Log related functions"
            },
    bootstrap: function bootstrap() {
        APP.loadedModules = APP.loadedModules.concat(APP.logs.moduleInfo);
    }
};
APP.logs.bootstrap();

//------------------------------------------------------------------------------

this.APP["home"] = this.APP["home"] || {
    moduleInfo:
            {
                moduleId: "APP.home",
                moduleVersion: "0.0.2-DEV",
                description: "Home functions including init routines"
            },
    bootstrap: function bootstrap() {
        APP.loadedModules = APP.loadedModules.concat(APP.home.moduleInfo);
    },
    gui: {
        init: function init() {

            //load data provided by the home controller
            $.getJSON("/home/data", function (data) {
                APP.home.data = data;

                //load authentication status
                $.getJSON("/authentication/check", function (data) {
                    APP.home.data.auth = data;

                    if (!APP.home.data.auth.authenticated)
                    {
                        //APP.login.gui.loginModal.openModal(i18n);
                        $("#meLink").on("click", function loginOnMeLink() {
                            APP.login.gui.loginModal.openModal();
                        });
                    } else
                    {
                        //TODO ?
                    }
                });
            });




        }
    },
    data: {}
};
APP.home.bootstrap();


