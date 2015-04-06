
Ext.define('Racloop.util.LoginHelper', {
    singleton: true,
    alternateClassName: ['LoginHelper'],
    requires: [
        'Racloop.util.Config',
        'Racloop.util.Common'
    ],
    config: {
        getUser: function() {
            if (Common.supportsHtml5Storage()) {
                var encrypted = window.localStorage.getItem("u");
                if(encrypted) {
                    var decrypted = CryptoJS.AES.decrypt(encrypted, Config.quote, { format: Config.cypherJsonFormatter });
                    var userString = decrypted.toString(CryptoJS.enc.Utf8);
                    var user = JSON.parse(userString);
                    return user;
                }
                else {
                    return null;
                }
            } else {
                console.error("Local storage not supported");
                return null;
            }
        },
        setUser: function(user) {
            if (Common.supportsHtml5Storage()) {
                var userString = JSON.stringify(user);
                var encrypted = CryptoJS.AES.encrypt(userString, Config.quote, { format: Config.cypherJsonFormatter });
                window.localStorage.setItem("u", encrypted);
            } else {
                console.error("Local storage not supported");
                return null;
            }
        },
        removeUser: function() {
            if (Common.supportsHtml5Storage()) localStorage.removeItem('u');
        },
        setEmail : function(email) {
            if (Common.supportsHtml5Storage()) {
                window.localStorage.setItem("e", email);
            }
        },
        getEmail : function() {
            if (Common.supportsHtml5Storage()) {
                return window.localStorage.getItem("e");
            }
        },
        removeEmail: function() {
            if (Common.supportsHtml5Storage()) localStorage.removeItem('e');
        },
        isFemale: function(user) {
            if(user.isMale == true) {
                return false
            }
            else {
                return true;
            }
        },
        isEmergencyContactDefined: function(user) {
            if(user.emergencyContactOne != null || user.emergencyContactTwo != null) {
                return true
            }
            else {
                return false;
            }
        },
        getLoginCounter: function() {
            if (Common.supportsHtml5Storage()) {
                var counter = parseInt(window.localStorage.getItem("c"));
                if(counter) {
                    return counter;
                }
                else {
                    window.localStorage.setItem("c", "0");
                    return 0;
                }
            }
        },
        initLoginCounter: function() {
            if (Common.supportsHtml5Storage()) {
                window.localStorage.setItem("c", "3");
            }
        },
        resetLoginCounter: function() {
            if (Common.supportsHtml5Storage()) {
                window.localStorage.setItem("c", "0");
            }
        },
        incrementLoginCounter: function() {
            if (Common.supportsHtml5Storage()) {
                var counter = parseInt(window.localStorage.getItem("c"));
                if(counter) {
                    counter = counter + 1;
                }
                else {
                    counter = 1;
                }
                window.localStorage.setItem("c", counter);
            }
        },
        removeLoginCounter: function() {
            if (Common.supportsHtml5Storage()) localStorage.removeItem('c');
        },
        setCurrentJourney : function(journey) {
            if (Common.supportsHtml5SessionStorage()) {
                var journeyString = JSON.stringify(journey);
                sessionStorage.j = journeyString;
            }
        },
        getCurrentJourney: function() {
            if (Common.supportsHtml5SessionStorage()) {
                if(sessionStorage.j) {
                    var journeyString = window.sessionStorage.getItem("j");
                    var journey = JSON.parse(journeyString);
                    return journey;
                }
                else {
                    return null;
                }
            }
        },
        removeCurrentJourney: function() {
            if (Common.supportsHtml5SessionStorage()) window.sessionStorage.removeItem('j');
        },
        setRoutes : function(route) {
            if (Common.supportsHtml5SessionStorage()) {
                var routeString = JSON.stringify(route);
                window.sessionStorage.setItem("r", routeString);
            }
        },
        getRoutes : function() {
            if (Common.supportsHtml5SessionStorage()) {
                if(sessionStorage.r) {
                    var routeString = window.sessionStorage.getItem("r");
                    var route = JSON.parse(routeString);
                    return route;
                }
                else {
                    return null;
                }
            }
        },
        removeRoutes : function() {
            if (Common.supportsHtml5SessionStorage()) sessionStorage.removeItem('r');
        }
    },
    constructor: function() {
        return this.config;
    }
});