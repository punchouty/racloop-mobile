
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
            localStorage.removeItem('u');
        },
         getJourney: function() {
            if (Common.supportsHtml5Storage()) {
                var journeyString = sessionStorage.racloopJourney;
                if (journeyString) {
                    var journey = JSON.parse(journeyString);
                    console.log('journey loaded from session storage : ' + journeyString);
                    return journey;
                } else {
                    console.log("No journey in session storage");
                    null;
                }
            } else {
                console.error("Session storage not supported");
                return null;
            }
        },
        setJourney: function(journey) {
            if (Common.supportsHtml5Storage()) {
                var journeyString = JSON.stringify(journey);
                sessionStorage.racloopJourney = journeyString;
                console.log('Journey saved into session storage : ' + journeyString);
            } else {
                console.error("Session storage not supported");
                return null;
            }
        },
        removeJourney: function() {
            sessionStorage.removeItem('racloopJourney');
        },
        setCurrentLocation: function(currentLocation) {
            if (Common.supportsHtml5Storage()) {
                console.log("supportsHtml5Storage");
                var currentLocationString = JSON.stringify(currentLocation);
                sessionStorage.currentLocation = currentLocationString;
                console.log('Current Location saved into session storage : ' + currentLocationString);
            } else {
                console.error("Session storage not supported");
                return null;
            }
        },
        getCurrentLocation: function() {
            if (Common.supportsHtml5Storage()) {
                var currentLocationString = sessionStorage.currentLocation;
                if (currentLocationString) {
                    var currentLocation = JSON.parse(currentLocationString);
                    console.log('Current Location loaded from session storage : ' + currentLocationString);
                    return currentLocation;
                } else {
                    console.log("Current Location in session storage");
                    null;
                }
            } else {
                console.error("Session storage not supported");
                return null;
            }
        },
        removeCurrentLocation: function() {
            sessionStorage.removeItem('currentLocation');
        },
        login: function(user) {
            Ext.Ajax.request({
                url: Racloop.util.Config.url.RACLOOP_LOGIN,
                //jsonData : {email : user.email, password : user.password},
                success: function(response, opts) {
                    var data = Ext.decode(response.responseText);
                    console.log('success : ' + response.responseText);
                    if (data.success) {
                        LoginHelper.setUser(data.users[0]);
                        Ext.Viewport.unmask();
                        //Ext.Viewport.removeAll(true, true);
                        //Ext.Viewport.add(Ext.create('RacloopApp.view.Main'));
                    } else {
                        Ext.Viewport.unmask();
                        Ext.Msg.alert(data.message);
                    }
                },
                failure: function(response, opts) {
                    Ext.Viewport.unmask();
                    Ext.Msg.alert('Network Error');
                }
            });
        }
    },
    constructor: function() {
        return this.config;
    }
});