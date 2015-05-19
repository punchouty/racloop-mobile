Ext.define('Racloop.controller.SessionsController', {
    extend: 'Ext.app.Controller',

    requires: [
        'Racloop.view.MainTabs',
        'Racloop.view.MainNavigationView',
        'Racloop.view.MapPanel',
        'Racloop.view.SettingNavigationView',
        'Racloop.util.LoginHelper',
        'Racloop.util.Common',
        'Racloop.util.Config'
    ],

    config: {
        refs: {
            mainTabs: 'mainTabs',
            mainNavigationView: 'mainNavigationView',
            settingNavigationView : 'settingNavigationView',
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
        var settingNavigationView = this.getSettingNavigationView();
        var me = this;
        var user = LoginHelper.getUser();
        var currentDateString = Ext.Date.format(new Date(),'d M y h:i A');
        console.log("SessionController - autoLogin : " + currentDateString);
        if (user) {
            console.log("autoLogin user : " + user.email);
            Ext.Viewport.mask({
                xtype: 'loadmask',
                indicator: true,
                message: 'Logging in...'
            });
            var successCallback = function(response, ops) {
                var data = Ext.decode(response.responseText);
                if (data.success) {
                    console.log("SessionController - autoLogin - successfully login");
                    LoginHelper.setUser(data.data);
                    LoginHelper.setEmail(user.email);
                    var currentJourney = data.currentJourney
                    var mainTabs = Ext.ComponentQuery.query('mainTabs')[0];
                    Ext.Viewport.setActiveItem(mainTabs);
                    mainTabs.show();
                    Ext.Viewport.unmask();
                    if(currentJourney) {
                        console.log("SessionController - autoLogin - currentJourney exists");
                        mainTabs.setActiveItem('mapPanel');
                        LoginHelper.setCurrentJourney(currentJourney);
                        Racloop.app.getController('MapController').showCurrentJourney();
                        //Racloop.app.getController('MapController').watchCurrentLocation();
                    }
                    else {
                        console.log("SessionController - autoLogin - currentJourney does not exists");
                        LoginHelper.removeCurrentJourney();
                        console.log('login success data.currentJourney : false');
                        if(!LoginHelper.isEmergencyContactDefined(data.data)) {
                            LoginHelper.incrementLoginCounter();
                            if(LoginHelper.isFemale(data.data)) {
                                if(LoginHelper.getLoginCounter() >= 3) {
                                    LoginHelper.resetLoginCounter();
                                    mainTabs.setActiveItem('settingNavigationView');
                                    settingNavigationView.push({
                                        title: Config.settingNameEmergencyContacts,
                                        xtype: 'emergencyContactForm',
                                        itemId: 'emergencyContactForm'
                                    });
                                    Ext.Msg.alert("Emergency Contacts", "Please provide your emergency contacts");
                                }
                                else {
                                    mainTabs.setActiveItem('searchNavigationView');
                                    Racloop.app.getController('MapController').updateFromFieldWithCurrentLocation();
//                                    mainTabs.setActiveItem('mapPanel');
//                                    Racloop.app.getController('MapController').updateCurrentLocationOnMap();
                                }
                            }
                            else {
                                if(LoginHelper.getLoginCounter() >= 3) {
                                    LoginHelper.resetLoginCounter();
                                    mainTabs.setActiveItem('settingNavigationView');
                                    settingNavigationView.push({
                                        title: Config.settingNameEmergencyContacts,
                                        xtype: 'emergencyContactForm',
                                        itemId: 'emergencyContactForm'
                                    });
                                    Ext.Msg.alert("Emergency Contacts", "Please provide your emergency contacts");
                                }
                                else {
                                    mainTabs.setActiveItem('searchNavigationView');
                                    Racloop.app.getController('MapController').updateFromFieldWithCurrentLocation();
//                                    mainTabs.setActiveItem('mapPanel');
//                                    Racloop.app.getController('MapController').updateCurrentLocationOnMap();
                                }
                            }

                        }
                        else {
                            mainTabs.setActiveItem('searchNavigationView');
                            Racloop.app.getController('MapController').updateFromFieldWithCurrentLocation();
//                            mainTabs.setActiveItem('mapPanel');
//                            Racloop.app.getController('MapController').updateCurrentLocationOnMap();
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
        var settingNavigationView = this.getSettingNavigationView();
        var me = this;
        var user = Ext.create("Racloop.model.LoginCredential", {});
        var loginForm = button.up('formpanel'); // Login form
        var values = loginForm.getValues(); // Form values
        var mainNavigationView = this.getMainNavigationView(); // Main view
        loginForm.updateRecord(user);
        var currentDateString = Ext.Date.format(new Date(),'d M y h:i A');
        // Success
        var successCallback = function(response, ops) {
            var data = Ext.decode(response.responseText);
            if (data.success) {
                LoginHelper.setUser(data.data);
                LoginHelper.setEmail(values.email);
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
                    //Racloop.app.getController('MapController').watchCurrentLocation();
                }
                else {
                    LoginHelper.removeCurrentJourney();
                    console.log('login success data.currentJourney : false');
                    if(!LoginHelper.isEmergencyContactDefined(data.data)) {
                        LoginHelper.incrementLoginCounter();
                        if(LoginHelper.isFemale(data.data)) {
                            if(LoginHelper.getLoginCounter() >= 3) {
                                LoginHelper.resetLoginCounter();
                                mainTabs.setActiveItem('settingNavigationView');
                                settingNavigationView.push({
                                    title: Config.settingNameEmergencyContacts,
                                    xtype: 'emergencyContactForm',
                                    itemId: 'emergencyContactForm'
                                });
                                Ext.Msg.alert("Emergency Contacts", "Please provide your emergency contacts");
                            }
                            else {
                                mainTabs.setActiveItem('searchNavigationView');
                                Racloop.app.getController('MapController').updateFromFieldWithCurrentLocation();
//                                mainTabs.setActiveItem('mapPanel');
//                                Racloop.app.getController('MapController').updateCurrentLocationOnMap();
                            }
                        }
                        else {
                            if(LoginHelper.getLoginCounter() >= 3) {
                                LoginHelper.resetLoginCounter();
                                mainTabs.setActiveItem('settingNavigationView');
                                settingNavigationView.push({
                                    title: Config.settingNameEmergencyContacts,
                                    xtype: 'emergencyContactForm',
                                    itemId: 'emergencyContactForm'
                                });
                                Ext.Msg.alert("Emergency Contacts", "Please provide your emergency contacts");
                            }
                            else {
                                mainTabs.setActiveItem('searchNavigationView');
                                Racloop.app.getController('MapController').updateFromFieldWithCurrentLocation();
//                                mainTabs.setActiveItem('mapPanel');
//                                Racloop.app.getController('MapController').updateCurrentLocationOnMap();
                            }
                        }

                    }
                    else {
                        console.log('login success emergency contact : false');
                        mainTabs.setActiveItem('searchNavigationView');
                        Racloop.app.getController('MapController').updateFromFieldWithCurrentLocation();
//                        mainTabs.setActiveItem('mapPanel');
//                        Racloop.app.getController('MapController').updateCurrentLocationOnMap();
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
    },

    logout: function() { //called from Setting Controller
        var mainTabs = this.getMainTabs();
        var successCallback = function(response, ops) {
            var data = Ext.decode(response.responseText);
            if (data.success) {
                console.log("Logged out successfully");
                LoginHelper.removeUser();
                LoginHelper.removeEmail();
                LoginHelper.removeCurrentJourney();
                //Emptying all stores
                Ext.getStore('journeyStore').removeAll();
                Ext.getStore('historyStore').removeAll();
                Ext.getStore('SearchStore').removeAll();
                Ext.Viewport.unmask();
                var mainNavigationView = Ext.ComponentQuery.query('mainNavigationView')[0];
                Ext.Viewport.setActiveItem(mainNavigationView);
                var loginForm = Ext.ComponentQuery.query('loginForm')[0];
                if(loginForm) {
                    mainNavigationView.setActiveItem(loginForm);
                }
                else {
                    mainNavigationView.push({
                        itemId: 'loginForm',
                        xtype: "loginForm",
                        title: "Sign In"
                    });
                    if(!LoginHelper.getEmail()) {
                        var emailField = Ext.ComponentQuery.query('#loginScreenEmail')[0];
                        emailField.setValue(LoginHelper.getEmail());
                    }
                }

            } else {
                Ext.Msg.alert("Logout Failure", data.message);
                Ext.Viewport.unmask();
            }
        };

        // Failure
        var failureCallback = function(response, ops) {
            Ext.Msg.alert("Logout Failure", response.message);
            Ext.Viewport.unmask();
        };

        Ext.Viewport.mask({
            xtype: 'loadmask',
            indicator: true,
            message: 'Logging out...'
        });
        Ext.Ajax.request({
            url: Racloop.util.Config.url.RACLOOP_LOGOUT,
            method: 'post',
            withCredentials: true,
            useDefaultXhrHeader: false,
            headers: {
                'Content-Type': 'application/json'
            },
            params: Ext.JSON.encode({
                "action": "logout"
            }),
            success: successCallback,
            failure: failureCallback
        });

    }
});