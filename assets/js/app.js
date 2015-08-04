/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//Require JST, lodash and JQuery


this["APP"] = this["APP"] || {};

this.APP["login"] = this.APP["login"] || {
    gui: {
        loginUrl: "",
        loginModal:
                {
                    openModal: function (i18n) {

                        $("body").append(JST["assets/templates/login.html"](
                                {i18n:i18n}
                        ));
                
                        //TODO: wire events for login
                
                        $("#loginModal").modal();
                    },
                    closeModal: function () 
                    {
                        //TODO: remove this
                        
                        //$("#loginModal").modal("hide");
                        //$("#loginModal").remove();
                        
                    },
                    doJsonLogin: function () {
                    },
                    jsonLoginCb: function () {
                    },
                    doJsonLogout: function () {
                    },
                    jsonLogoutCb: function () {
                    }
                },
        helpers:
                {
                    checkAuth: function () {
                    }
                }
    }
};


this.APP["views"] = this.APP["views"] || {
    home: {init: function () {
        }
    },
    test001: {init: function () {
        }
    }
};

this.APP["debug"] = this.APP["debug"] || {};
this.APP["logs"] = this.APP["logs"] || {};