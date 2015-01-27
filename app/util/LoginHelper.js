
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
                var encrypted = localStorage.u;
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
                localStorage.u = encrypted;
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
                localStorage.e = email;
            }
        },
        getEmail : function() {
            if (Common.supportsHtml5Storage()) {
                return localStorage.e;
            }
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
                var counter = parseInt(localStorage.c);
                if(counter) {
                    return counter;
                }
                else {
                    localStorage.c = 0;
                    return 0;
                }
            }
        },
        initLoginCounter: function() {
            if (Common.supportsHtml5Storage()) {
                localStorage.c = 3;
            }
        },
        resetLoginCounter: function() {
            if (Common.supportsHtml5Storage()) {
                localStorage.c = 0;
            }
        },
        incrementLoginCounter: function() {
            if (Common.supportsHtml5Storage()) {
                var counter = parseInt(localStorage.c);
                if(counter) {
                    counter = counter + 1;
                }
                else {
                    counter = 1;
                }
                localStorage.c = counter;
            }
        },
        removeLoginCounter: function() {
            if (Common.supportsHtml5Storage()) localStorage.removeItem('c');
        }
    },
    constructor: function() {
        return this.config;
    }
});