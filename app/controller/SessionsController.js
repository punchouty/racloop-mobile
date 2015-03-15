Ext.define('Racloop.controller.SessionsController', {
    extend: 'Ext.app.Controller',

    requires: [
        'Racloop.view.MainTabs',
        'Racloop.view.MainNavigationView',
        'Racloop.view.MapPanel',
        'Racloop.util.LoginHelper',
        'Racloop.util.Common',
        'Racloop.util.Config'
    ],

    config: {
        refs: {
            mainNavigationView: 'mainNavigationView',
            loginButton: 'loginForm #loginButton'
        },

        control: {
            loginButton: {
                tap: 'login'
            }
        }
    },

    autoLogin : function(app) { // Called from MapController launch
        var mainNavigationView = this.getMainNavigationView(); // Main view
        var me = this;
        var user = LoginHelper.getUser();
        var currentDateString = Ext.Date.format(new Date(),'d M y h:i A');
        console.log("launch currentDateString : " + currentDateString);
        if (user) {
            console.log("autoLogin user : " + user);
            Ext.Viewport.mask({
                xtype: 'loadmask',
                indicator: true,
                message: 'Logging in...'
            });
            var successCallback = function(response, ops) {
                var data = Ext.decode(response.responseText);
                if (data.success) {
                    LoginHelper.setUser(data.data);
                    LoginHelper.setEmail(user.email);
                    var currentJourney = data.currentJourney
                    var mainTabs = Ext.ComponentQuery.query('mainTabs')[0];
                    Ext.Viewport.setActiveItem(mainTabs);
                    mainTabs.show();
                    Ext.Viewport.unmask();
                    if(currentJourney) {
                        mainTabs.setActiveItem('mapPanel');
                        LoginHelper.setCurrentJourney(currentJourney);
                        Racloop.app.getController('MapController').showCurrentJourney();
                        Racloop.app.getController('MapController').watchCurrentLocation();
                    }
                    else {
                        console.log('login success data.currentJourney : false');
                        if(!LoginHelper.isEmergencyContactDefined(data.data)) {
                            LoginHelper.incrementLoginCounter();
                            if(LoginHelper.isFemale(data.data)) {
                                if(LoginHelper.getLoginCounter() >= 3) {
                                    LoginHelper.resetLoginCounter();
                                    mainTabs.setActiveItem('settingNavigationView');
                                    Ext.Msg.alert("Emergency Contacts", "Please provide your emergency contacts");
                                }
                                else {
                                    mainTabs.setActiveItem('mapPanel');
                                    Racloop.app.getController('MapController').updateCurrentLocationOnMap();
                                }
                            }
                            else {
                                if(LoginHelper.getLoginCounter() >= 6) {
                                    LoginHelper.resetLoginCounter();
                                    mainTabs.setActiveItem('settingNavigationView');
                                    Ext.Msg.alert("Emergency Contacts", "Please provide your emergency contacts");
                                }
                                else {
                                    mainTabs.setActiveItem('mapPanel');
                                    Racloop.app.getController('MapController').updateCurrentLocationOnMap();
                                }
                            }

                        }
                        else {
                            mainTabs.setActiveItem('mapPanel');
                            Racloop.app.getController('MapController').updateCurrentLocationOnMap();
                        }

                    }
                } else {
                    LoginHelper.removeUser();
                    Ext.Viewport.unmask();
                    Ext.Msg.alert('Login Error', data.message);
                    Ext.Viewport.setActiveItem(mainNavigationView);
                }
            };
            var failureCallback = function(response, ops) {
                //LoginHelper.removeUser();
                Ext.Viewport.unmask();
                Ext.Viewport.setActiveItem(mainNavigationView);
                Ext.Msg.alert("Network Error", response.code);

            };

            Ext.Ajax.request({
                url: Config.url.RACLOOP_LOGIN,
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true,
                useDefaultXhrHeader: false,
                params: Ext.JSON.encode({
                    email: user.email,
                    password: user.password,
                    rememberMe: true,
                    currentDateString : currentDateString
                }),
                success: successCallback,
                failure: failureCallback
            });

        }
        else {
            console.log("autoLogin no user in local cache");
            Ext.Viewport.unmask();
            Ext.Viewport.setActiveItem(mainNavigationView);
        }
    },

    login: function(button, e, eOpts) {
        this.resetLoginFormErrorFields();
        var me = this;
        var user = Ext.create("Racloop.model.LoginCredential", {});
        var loginForm = button.up('formpanel'); // Login form
        var values = loginForm.getValues(); // Form values
        var mainNavigationView = this.getMainNavigationView(); // Main view
        loginForm.updateRecord(user);
        var currentDateString = Ext.Date.format(new Date(),'d M y h:i A');
        console.log("launch currentDateString : " + currentDateString);
        // Success
        var successCallback = function(response, ops) {
            var data = Ext.decode(response.responseText);
            if (data.success) {
                LoginHelper.setUser(data.data);
                LoginHelper.setEmail(user.email);
                var currentJourney = data.currentJourney
                var mainTabs = Ext.ComponentQuery.query('mainTabs')[0];
                Ext.Viewport.setActiveItem(mainTabs);
                mainTabs.show();
                Ext.Viewport.unmask();
                if(currentJourney) {
                    console.log("login success currentJourney : " + currentJourney);
                    mainTabs.setActiveItem('mapPanel');
                    LoginHelper.setCurrentJourney(currentJourney);
                    Racloop.app.getController('MapController').showCurrentJourney();
                    Racloop.app.getController('MapController').watchCurrentLocation();
                }
                else {
                    console.log('login success data.currentJourney : false');
                    if(!LoginHelper.isEmergencyContactDefined(data.data)) {
                        LoginHelper.incrementLoginCounter();
                        if(LoginHelper.isFemale(data.data)) {
                            if(LoginHelper.getLoginCounter() >= 3) {
                                LoginHelper.resetLoginCounter();
                                mainTabs.setActiveItem('settingNavigationView');
                                Ext.Msg.alert("Emergency Contacts", "Please provide your emergency contacts");
                            }
                            else {
                                mainTabs.setActiveItem('mapPanel');
                                Racloop.app.getController('MapController').updateCurrentLocationOnMap();
                            }
                        }
                        else {
                            if(LoginHelper.getLoginCounter() >= 6) {
                                LoginHelper.resetLoginCounter();
                                mainTabs.setActiveItem('settingNavigationView');
                                Ext.Msg.alert("Emergency Contacts", "Please provide your emergency contacts");
                            }
                            else {
                                mainTabs.setActiveItem('mapPanel');
                                Racloop.app.getController('MapController').updateCurrentLocationOnMap();
                            }
                        }

                    }
                    else {
                        console.log('login success emergency contact : false');
                        mainTabs.setActiveItem('mapPanel');
                        Racloop.app.getController('MapController').updateCurrentLocationOnMap();
                    }

                }
            } else {
                LoginHelper.removeUser();
                LoginHelper.removeCurrentJourney();
                Ext.Viewport.unmask();
                Ext.Msg.alert('Login Error', data.message);
                Ext.Viewport.setActiveItem(mainNavigationView);
            }
        };
        // Failure
        var failureCallback = function(response, ops) {
            Ext.Viewport.unmask();
            Ext.Viewport.setActiveItem(mainNavigationView);
            Ext.Msg.alert("Network Error", response.code);
        };


        var validationObj = user.validate();
        if (!validationObj.isValid()) {
            var errorString = this.handleLoginFormValidation(validationObj);
            Ext.Msg.alert("Oops", errorString);
        } else {
            Ext.Viewport.mask({
                xtype: 'loadmask',
                indicator: true,
                message: 'Logging in...'
            });
            Ext.Ajax.request({
                url: Config.url.RACLOOP_LOGIN,
                method: 'post',
                withCredentials: true,
                useDefaultXhrHeader: false,
                headers: {
                    'Content-Type': 'application/json'
                },
                params: Ext.JSON.encode({
                    email: values.email,
                    password: values.password,
                    rememberMe: true,
                    currentDateString : currentDateString
                }),
                success: successCallback,
                failure: failureCallback
            });
        }


    },

    handleLoginFormValidation: function(validationObj) {
        var errorstring = "";
        var emailErrors = validationObj.getByField('email');
        if (emailErrors != null && emailErrors.length > 0) {
            for (var i = 0; i < emailErrors.length; i++) {
                errorstring += emailErrors[i].getMessage() + "<br>";
            }

            var field = Ext.ComponentQuery.query('#loginScreenEmail');
            field[0].addCls('error');
        }
        var passwordErrors = validationObj.getByField('password');
        if (passwordErrors != null && passwordErrors.length > 0) {
            for (var i = 0; i < passwordErrors.length; i++) {
                errorstring += passwordErrors[i].getMessage() + "<br>";
            }
            var field = Ext.ComponentQuery.query('#loginScreenPassword');
            field[0].addCls('error');
        }
        return errorstring;
    },

    resetLoginFormErrorFields: function() {
        Ext.ComponentQuery.query('#loginScreenEmail')[0].removeCls('error');
        Ext.ComponentQuery.query('#loginScreenPassword')[0].removeCls('error');
    }
});