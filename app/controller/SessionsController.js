Ext.define('Racloop.controller.SessionsController', {
    extend: 'Ext.app.Controller',

    requires: [
        'Racloop.view.MainTabs',
        'Racloop.view.MainNavigationView',
        'Racloop.util.LoginHelper',
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

    launch: function(app) {
        var mainNavigationView = this.getMainNavigationView(); // Main view
        var me = this;
        var user = LoginHelper.getUser();
        if (user) {
            Ext.Viewport.mask({
                xtype: 'loadmask',
                indicator: true,
                message: 'Logging in...'
            });
            var successCallback = function(response, ops) {
                var data = Ext.decode(response.responseText);
                //console.log('login success during launch : ' + response.responseText);
                if (data.success) {
                    LoginHelper.setUser(data.data);
                    LoginHelper.setEmail(user.email);
                    var tabMain = Ext.Viewport.add(Ext.create('Racloop.view.MainTabs'));
                    Ext.Viewport.remove(mainNavigationView, true);
                    tabMain.show();
                    Ext.Viewport.unmask();
                    if(!LoginHelper.isEmergencyContactDefined(data.data)) {
                        LoginHelper.incrementLoginCounter();
                        if(LoginHelper.isFemale(data.data)) {
                            if(LoginHelper.getLoginCounter() >= 3) {
                                LoginHelper.resetLoginCounter();
                                tabMain.setActiveItem('settingNavigationView');
                                Ext.Msg.alert("Emergency Contacts", "Please provide your emergency contacts");
                            }
                            else {
                                me.updateCurrentLocation();
                                //tabMain.setActiveItem('userJourneysList');
                            }
                        }
                        else {
                            if(LoginHelper.getLoginCounter() >= 6) {
                                LoginHelper.resetLoginCounter();
                                tabMain.setActiveItem('settingNavigationView');
                                Ext.Msg.alert("Emergency Contacts", "Please provide your emergency contacts");
                            }
                            else {
                                me.updateCurrentLocation();
                                //tabMain.setActiveItem('userJourneysList');
                            }
                        }

                    }
                } else {
                    LoginHelper.removeUser();
                    Ext.Viewport.unmask();
                    Ext.Msg.alert('Login Error', data.message);
                    //Ext.Viewport.removeAll(true, true);
                    //Ext.Viewport.add(Ext.create('Racloop.view.MainNavigationView'));
                }
            };
            var failureCallback = function(response, ops) {
                //LoginHelper.removeUser();
                Ext.Viewport.unmask();
                Ext.Msg.alert("Network Error", response.code);
                //Ext.Viewport.removeAll(true, true);
                Ext.Viewport.add(Ext.create('Racloop.view.MainNavigationView'));

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
                    rememberMe: true
                }),
                success: successCallback,
                failure: failureCallback
            });

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
        // Success
        var successCallback = function(response, ops) {
            var data = Ext.decode(response.responseText);
            if (data.success) {
                var user = data.data;
                LoginHelper.setUser(user);
                LoginHelper.setEmail(user.email);
                var tabMain = Ext.Viewport.add(Ext.create('Racloop.view.MainTabs'));
                Ext.Viewport.remove(mainNavigationView, true);
                tabMain.show();
                Ext.Viewport.unmask();
                if(!LoginHelper.isEmergencyContactDefined(user)) {
                    LoginHelper.incrementLoginCounter();
                    if(LoginHelper.isFemale(user)) {
                        if(LoginHelper.getLoginCounter() >= 3) {
                            LoginHelper.resetLoginCounter();
                            tabMain.setActiveItem('settingNavigationView');
                            Ext.Msg.alert("Emergency Contacts", "Please provide your emergency contacts");
                        }
                        else {
                            me.updateCurrentLocation();
                            //tabMain.setActiveItem('userJourneysList');
                        }
                    }
                    else {
                        if(LoginHelper.getLoginCounter() >= 6) {
                            LoginHelper.resetLoginCounter();
                            tabMain.setActiveItem('settingNavigationView');
                            Ext.Msg.alert("Emergency Contacts", "Please provide your emergency contacts");
                        }
                        else {
                            me.updateCurrentLocation();
                            //tabMain.setActiveItem('userJourneysList');
                        }
                    }

                }
                //me.updateCurrentLocation();
            } else {
                Ext.Msg.alert("Login Failure", data.message);
                Ext.Viewport.unmask();
            }
        };
        // Failure
        var failureCallback = function(response, ops) {
            Ext.Msg.alert("Login Failure", response.message);
            Ext.Viewport.unmask();

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
                    rememberMe: true
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

    updateCurrentLocation: function(){
        Ext.device.Geolocation.getCurrentPosition({
            allowHighAccuracy : false,
            timeout : 3000,
            success: function(position) {
                var geocoder = new google.maps.Geocoder();
                var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                geocoder.geocode({'latLng': latlng}, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results.length > 0) {
                            Ext.ComponentQuery.query('textfield[name=fromPlace]')[0].setValue(results[0].formatted_address);
                            Ext.ComponentQuery.query('hiddenfield[name=fromLatitude]')[0].setValue(results[0].geometry.location.lat());
                            Ext.ComponentQuery.query('hiddenfield[name=fromLongitude]')[0].setValue(results[0].geometry.location.lng());
                        } else {
                            console.log("No results found");
                        }
                    } else {
                        console.log("Geocoder failed due to: " + status);
                    }
                });
            },
            failure: function() {
                console.log('something went wrong!');
            }
        });
    }
});