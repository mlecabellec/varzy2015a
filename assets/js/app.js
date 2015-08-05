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
                moduleVersion: "0.0.1",
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
                moduleVersion: "0.0.1",
                description: "Login related module"
            },
    bootstrap: function bootstrap() {
        APP.loadedModules = APP.loadedModules.concat(APP.login.moduleInfo);
    },
    gui: {
        loginUrl: "",
        loginModal:
                {
                    openModal: function openModal(i18n) {

                        $("body").append(JST["assets/templates/login.html"](
                                {i18n: i18n}
                        ));

                        //TODO: wire events for login

                        $("#loginModal").modal();
                    },
                    doJsonLogin: function doJsonLogin() {
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
    }
};
APP.login.bootstrap();

//------------------------------------------------------------------------------

this.APP["views"] = this.APP["views"] || {
    moduleInfo:
            {
                moduleId: "APP.views",
                moduleVersion: "0.0.1",
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
                moduleVersion: "0.0.1",
                description: "Debug related functions"
            },
    bootstrap: function bootstrap() {
        APP.loadedModules = APP.loadedModules.concat(APP.debug.moduleInfo);
    }
};
APP.debug.bootstrap();

//------------------------------------------------------------------------------

this.APP["logs"] = this.APP["logs"] || {
    moduleInfo:
            {
                moduleId: "APP.logs",
                moduleVersion: "0.0.1",
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
                moduleVersion: "0.0.1",
                description: "Home functions including init routines"
            },
    bootstrap: function bootstrap() {
        APP.loadedModules = APP.loadedModules.concat(APP.home.moduleInfo);
    },
    gui: {
        init: function init(homeData) {
            alert(homeData.message);
        }
    }
};


