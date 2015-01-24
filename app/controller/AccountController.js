Ext.define('Racloop.controller.AccountController', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.Toast',
        'Racloop.view.MainTabs',
        'Racloop.view.MainNavigationView',
        'Racloop.view.LoginForm',
        'Racloop.view.RegisterForm',
        'Racloop.view.SettingsMenu',
        'Racloop.view.ForgotPasswordForm',
        'Racloop.view.VerifySmsForm',
        'Racloop.util.Config'
    ],

    config: {
        refs: {
            mainNavigationView: 'mainNavigationView',
            loginPanel: 'mainNavigationView #loginPanel',
            loginForm: 'mainNavigationView #loginForm',
            registerForm: 'mainNavigationView #registerForm',
            verifySmsForm: 'mainNavigationView #verifySmsForm'
        },

        control: {
            "mainNavigationView #showLoginButton": {
                tap: 'showLogin'
            },
            "mainNavigationView #showRegisterButton": {  //TODO REMOVE NOT REQUIRED
                tap: 'showRegister'
            },
            "mainNavigationView #showForgotPasswordButton": { //TODO REMOVE NOT REQUIRED
                tap: 'showForgotPassword'
            },
            "mainNavigationView #showVerifyMobileButton": { //TODO REMOVE NOT REQUIRED
                tap: 'showVerifyMobile'
            },
            "loginForm #loginButton": {
                tap: 'login'
            },
            "registerForm #registerButton": {
                tap: 'register'
            },
            "verifySmsForm #verifyMobile": {
                tap: 'verifyMobile'
            },
            "verifySmsForm #resendSms": {
                tap: 'resendSms'
            },
            "settingsMenu #logoutButton": {
                tap: 'logout'
            }
        }
    },

    showLogin: function(button, e, eOpts) {
        //var loginForm = Ext.create('widget.loginform'),	// Login form
        var mainNavigationView = this.getMainNavigationView(); // Main view

        // Navigate to login
        mainNavigationView.push({
            itemId: 'loginForm',
            xtype: "loginForm",
            title: "Sign In"
        });

    },

    showRegister: function(button, e, eOpts) {

        //var registerForm = Ext.create('widget.registerform'),	// Registration form
        var mainNavigationView = this.getMainNavigationView(); // Main view

        // Navigate to register
        mainNavigationView.push({
            itemId: 'registerForm',
            xtype: "registerForm",
            title: "Register"
        });

    },

    showForgotPassword: function(button, e, eOpts) {
        // var ForgotPasswordForm = Ext.create('Racloop.view.ForgotPasswordForm'),    // Login form
        var mainNavigationView = this.getMainNavigationView(); // Main view

        // Navigate to login
        mainNavigationView.push({
            itemId: 'ForgotPasswordForm',
            xtype: "forgotPasswordForm",
            title: "Forgot Password"
        });
    },

    showVerifyMobile: function(button, e, eOpts) {
        var mainNavigationView = this.getMainNavigationView(); // Main view

        // Navigate to login
        mainNavigationView.push({
            itemId: 'VerifySmsForm',
            xtype: "verifySmsForm",
            title: "Verify Mobile"
        });
    },

    showTerms: function(button, e, eOpts) {
        var mainNavigationView = this.getMainNavigationView(); // Main view

        // Navigate to login
        mainNavigationView.push({
            itemId: 'termsPanel',
            xtype: "termsPanel",
            title: "Terms of Use"
        });
        // Success
        var successCallback = function(response, ops) {
            var data = Ext.decode(response.responseText);
            if (data.success) {
                var termsHtml = Ext.ComponentQuery.query('#termsText')[0];
                termsHtml.setHtml(data.message);
                Ext.Viewport.unmask();
            } else {
                Ext.Msg.alert("Network Failure", data.message);
                Ext.Viewport.unmask();
            }
        };
        // Failure
        var failureCallback = function(response, ops) {
            Ext.Msg.alert("Network Failure", response.message);
            Ext.Viewport.unmask();
        };
        Ext.Viewport.mask({
            xtype: 'loadmask',
            indicator: true,
            message: 'Getting Terms...'
        });
        Ext.Ajax.request({
            url: Racloop.util.Config.url.RACLOOP_TERMS,
            method: 'GET',
            withCredentials: true,
            useDefaultXhrHeader: false,
            headers: {
                'Content-Type': 'application/json'
            },
            success: successCallback,
            failure: failureCallback
        });
    },

    showPrivacy: function(button, e, eOpts) {
        var mainNavigationView = this.getMainNavigationView(); // Main view

        // Navigate to login
        mainNavigationView.push({
            itemId: 'privacyPanel',
            xtype: "privacyPanel",
            title: "Data Privacy"
        });
        // Success
        var successCallback = function(response, ops) {
            var data = Ext.decode(response.responseText);
            if (data.success) {
                var termsHtml = Ext.ComponentQuery.query('#privacyText')[0];
                termsHtml.setHtml(data.message);
                Ext.Viewport.unmask();
            } else {
                Ext.Msg.alert("Network Failure", data.message);
                Ext.Viewport.unmask();
            }
        };
        // Failure
        var failureCallback = function(response, ops) {
            Ext.Msg.alert("Network Failure", response.message);
            Ext.Viewport.unmask();
        };
        Ext.Viewport.mask({
            xtype: 'loadmask',
            indicator: true,
            message: 'Getting Privacy Statement...'
        });
        Ext.Ajax.request({
            url: Racloop.util.Config.url.RACLOOP_PRIVACY,
            method: 'GET',
            withCredentials: true,
            useDefaultXhrHeader: false,
            headers: {
                'Content-Type': 'application/json'
            },
            success: successCallback,
            failure: failureCallback
        });
    },

    login: function(button, e, eOpts) {
        this.resetLoginFormErrorFields();
        var me=this;
        var user = Ext.create("Racloop.model.LoginCredential", {});
        var form = button.up('formpanel'), // Login form
            values = form.getValues(), // Form values
            mainNavigationView = this.getMainNavigationView(), // Main view
            loginPanel = this.getLoginPanel(), // Login and register buttons
            loginForm = this.getLoginForm();
        loginForm.updateRecord(user);
        console.log(values.email + " : " + values.password);
        // Success
        var successCallback = function(response, ops) {
            var data = Ext.decode(response.responseText);
            console.log('login success during launch : ' + response.responseText);
            if (data.success) {
                //console.log(data.data);
                LoginHelper.setUser(data.data);
                me.updateCurrentLocation();
                //me.setCurrentLoc();
                mainNavigationView.pop();
                loginPanel.hide();
                var tabMain = Ext.Viewport.add(Ext.create('Racloop.view.MainTabs'));
                tabMain.show();
                Ext.getStore('journeyStore').load();
                Ext.Viewport.unmask();
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
                url: Racloop.util.Config.url.RACLOOP_LOGIN,
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


    register: function(button, e, eOpts) {
        this.resetRegistrationFormErrorFields();
        var user = Ext.create("Racloop.model.User", {});
        var form = button.up('formpanel'), // Register form
            values = form.getValues(), // Form values
            mainNavigationView = this.getMainNavigationView(), // Main view
            loginPanel = this.getLoginPanel(), // Login and register buttons
            registerForm = this.getRegisterForm();
        registerForm.updateRecord(user);
        //console.log(values);

        var successCallback = function(response, ops) {
            var data = Ext.decode(response.responseText);
            if (data.success) {
                mainNavigationView.pop();
                mainNavigationView.push({
                    itemId: 'VerifySmsForm',
                    xtype: "verifySmsForm",
                    title: "Verify Mobile"
                });
                Ext.ComponentQuery.query('#mobileForVerification')[0].setValue(values.mobile);
                Ext.Viewport.unmask();
                Ext.toast({message: data.message, timeout: 2500, animation: true, cls: 'toastClass'});
            } else {
                Ext.Msg.alert("Registartion Failure", data.message);
                Ext.Viewport.unmask();
            }
        };

        // Failure
        var failureCallback = function(response, ops) {
            Ext.Msg.alert("Registartion Failure", response.message);
            Ext.Viewport.unmask();

        };

        var validationObj = user.validate();
        if (!validationObj.isValid()) {
            var errorString = this.handleRegisterationFormValidation(validationObj);
            Ext.Msg.alert("Oops", errorString);
        } else {
            if(this.isTwoPasswordMatch()) {
                Ext.Viewport.mask({
                    xtype: 'loadmask',
                    indicator: true,
                    message: 'Signing up...'
                });
                console.log(values);
                Ext.Ajax.request({
                    url: Racloop.util.Config.url.RACLOOP_SIGNUP,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: Ext.JSON.encode({
                        email: values.email,
                        password: values.password,
                        passwordConfirm: values.repeatpassword,
                        fullName: values.name,
                        mobile: values.mobile,
                        gender: values.gender
                    }),
                    success: successCallback,
                    failure: failureCallback
                });
            }
            else {
                Ext.Msg.alert("Oops", "Two passwords don't match");
            }
        }
    },

    /*
     * Error message was getting large and ugly. So added concept of 'additional errors' to save
     * mobile real state for message box
     */
    handleRegisterationFormValidation: function(validationObj) {
        var errorString = "";
        var errorCounted = 0;
        var totalErrors = 0;
        var nameErrors = validationObj.getByField('name');
        if (nameErrors != null && nameErrors.length > 0) {
            if(errorCounted < 3) {
                errorString += nameErrors[0].getMessage() + "<br>";
                errorCounted = errorCounted + 1;
            }
            totalErrors = totalErrors + nameErrors.length;
            var field = Ext.ComponentQuery.query('#registerScreenName');
            field[0].addCls('error');
        }


        var emailErrors = validationObj.getByField('email');
        if (emailErrors != null && emailErrors.length > 0) {
            if(errorCounted < 3) {
                errorString += emailErrors[0].getMessage() + "<br>";
                errorCounted = errorCounted + 1;
            }
            totalErrors = totalErrors + emailErrors.length;
            var field = Ext.ComponentQuery.query('#registerScreenEmail');
            field[0].addCls('error');
        }

        var passwordErrors = validationObj.getByField('password');
        if (passwordErrors != null && passwordErrors.length > 0) {
            if(errorCounted < 3) {
                errorString += passwordErrors[0].getMessage() + "<br>";
                errorCounted = errorCounted + 1;
            }
            totalErrors = totalErrors + passwordErrors.length;
            var field = Ext.ComponentQuery.query('#registerScreenPassword');
            field[0].addCls('error');
        }

        var repeatpasswordErrors = validationObj.getByField('repeatpassword');
        if (repeatpasswordErrors != null && repeatpasswordErrors.length > 0) {
            if(errorCounted < 3) {
                errorString += repeatpasswordErrors[0].getMessage() + "<br>";
                errorCounted = errorCounted + 1;
            }
            totalErrors = totalErrors + repeatpasswordErrors.length;
            var field = Ext.ComponentQuery.query('#registerScreenRepeatPassword');
            field[0].addCls('error');
        }

        var mobileErrors = validationObj.getByField('mobile');
        if (mobileErrors != null && mobileErrors.length > 0) {
            if(errorCounted < 3) {
                errorString += mobileErrors[0].getMessage() + "<br>";
                errorCounted = errorCounted + 1;
            }
            totalErrors = totalErrors + mobileErrors.length;
            var field = Ext.ComponentQuery.query('#registerScreenMobile');
            field[0].addCls('error');
        }
        if(totalErrors > 3) {
            errorString += ".... more errors"
        }
        return errorString;
    },
    isTwoPasswordMatch: function() {
        var password = Ext.ComponentQuery.query('#registerScreenPassword')[0].getValue();
        var repeatPassword = Ext.ComponentQuery.query('#registerScreenRepeatPassword')[0].getValue();
        if(password !== repeatPassword) {
            Ext.ComponentQuery.query('#registerScreenPassword')[0].addCls('error');
            Ext.ComponentQuery.query('#registerScreenRepeatPassword')[0].addCls('error');
            return false;
        }
        else {
            return true;
        }
    },
    resetRegistrationFormErrorFields: function() {
        Ext.ComponentQuery.query('#registerScreenName')[0].removeCls('error');
        Ext.ComponentQuery.query('#registerScreenEmail')[0].removeCls('error');
        Ext.ComponentQuery.query('#registerScreenPassword')[0].removeCls('error');
        Ext.ComponentQuery.query('#registerScreenRepeatPassword')[0].removeCls('error');
        Ext.ComponentQuery.query('#registerScreenMobile')[0].removeCls('error');

    },

    verifyMobile: function(button, e, eOpts) {
        var me=this;
        var mobile = Ext.ComponentQuery.query('#mobileForVerification')[0].getValue();
        var verificationCode = Ext.ComponentQuery.query('#verificationCode')[0].getValue();
        var isMobileValid = false;
        var isVerificationCodeValid = false;
        if(mobile != null && mobile.length === 10) {
            isMobileValid = true;
            if(verificationCode != null && verificationCode.length === 6) {
                isVerificationCodeValid = true;
            }
            else {
                Ext.Msg.alert("Oops", "Invalid Verification Code.");
                return;
            }
        }
        else {
            Ext.Msg.alert("Oops", "Invalid Mobile number. Use format 98XXXXXXXX");
            return;
        }
        if(isMobileValid && isVerificationCodeValid) {
            var successCallback = function(response, ops) {
                var data = Ext.decode(response.responseText);
                if (data.success) {
                    var mainNavigationView = me.getMainNavigationView(); // Main view
                    mainNavigationView.pop();
                    // Navigate to login
                    mainNavigationView.push({
                        itemId: 'loginForm',
                        xtype: "loginForm",
                        title: "Sign In"
                    });
                    Ext.Viewport.unmask();
                    Ext.toast({message: data.message, timeout: 2500, animation: true, cls: 'toastClass'});
                }
                else {
                    Ext.Msg.alert("Failure", data.message);
                    Ext.Viewport.unmask();
                }
            };
            var failureCallback = function(response, ops) {
                Ext.Msg.alert("Server Failure", response.message);
                Ext.Viewport.unmask();
            };
            Ext.Ajax.request({
                url: Racloop.util.Config.url.RACLOOP_VERIFYMOBILE,
                headers: {
                    'Content-Type': 'application/json'
                },
                params: Ext.JSON.encode({
                    mobile: mobile,
                    verificationCode: verificationCode
                }),
                success: successCallback,
                failure: failureCallback
            });
        }
        else {
            Ext.Msg.alert("Oops", "Invalid Inputs.");
        }
    },

    resendSms: function(button, e, eOpts) {
        var mobile = Ext.ComponentQuery.query('#mobileForVerification')[0].getValue();
        if(mobile != null && mobile.length === 10) {
            var successCallback = function(response, ops) {
                var data = Ext.decode(response.responseText);
                if (data.success) {
                    Ext.Viewport.unmask();
                    Ext.toast({message: data.message, timeout: 2500, animation: true, cls: 'toastClass'});
                }
                else {
                    Ext.Msg.alert("Failure", data.message);
                    Ext.Viewport.unmask();
                }
            };
            var failureCallback = function(response, ops) {
                Ext.Msg.alert("Server Failure", response.message);
                Ext.Viewport.unmask();
            };
            Ext.Ajax.request({
                url: Racloop.util.Config.url.RACLOOP_RESENDSMS,
                headers: {
                    'Content-Type': 'application/json'
                },
                params: Ext.JSON.encode({
                    mobile: mobile
                }),
                success: successCallback,
                failure: failureCallback
            });
        }
        else {
            Ext.Msg.alert("Oops", "Invalid mobile number. Use format 98XXXXXXXX");
        }
        /*
        this.resetRegistrationFormErrorFields();
        var user = Ext.create("Racloop.model.User", {});
        var form = button.up('formpanel'), // Register form
            values = form.getValues(), // Form values
            mainNavigationView = this.getMainNavigationView(), // Main view
            loginPanel = this.getLoginPanel(), // Login and register buttons
            registerForm = this.getRegisterForm();
        registerForm.updateRecord(user);
        //console.log(values);

        var successCallback = function(response, ops) {
            var data = Ext.decode(response.responseText);
            if (data.success) {
                mainNavigationView.pop();
                mainNavigationView.push({
                    itemId: 'VerifySmsForm',
                    xtype: "verifySmsForm",
                    title: "Verify Mobile"
                });
                Ext.ComponentQuery.query('#mobileForVerification')[0].setValue(values.mobile);
                Ext.Viewport.unmask();
                Ext.toast({message: data.message, timeout: 2500, animation: true, cls: 'toastClass'});
            } else {
                Ext.Msg.alert("Registartion Failure", data.message);
                Ext.Viewport.unmask();
            }
        };

        // Failure
        var failureCallback = function(response, ops) {
            Ext.Msg.alert("Registartion Failure", response.message);
            Ext.Viewport.unmask();

        };

        var validationObj = user.validate();
        if (!validationObj.isValid()) {
            var errorString = this.handleRegisterationFormValidation(validationObj);
            Ext.Msg.alert("Oops", errorString);
        } else {
            if(this.isTwoPasswordMatch()) {
                Ext.Viewport.mask({
                    xtype: 'loadmask',
                    indicator: true,
                    message: 'Signing up...'
                });
                console.log(values);
                Ext.Ajax.request({
                    url: Racloop.util.Config.url.RACLOOP_SIGNUP,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: Ext.JSON.encode({
                        email: values.email,
                        password: values.password,
                        passwordConfirm: values.repeatpassword,
                        fullName: values.name,
                        mobile: values.mobile,
                        gender: values.gender
                    }),
                    success: successCallback,
                    failure: failureCallback
                });
            }
            else {
                Ext.Msg.alert("Oops", "Two passwords don't match");
            }
        }*/
    },

    logout: function(button, e, eOpts) {
        mainNavigationView = this.getMainNavigationView();
        var successCallback = function(response, ops) {
            var data = Ext.decode(response.responseText);
            console.log('Logout success during launch : ' + response.responseText);
            if (data.success) {
                LoginHelper.removeUser();                 
                Ext.Viewport.unmask();
                Ext.Viewport.removeAll(true, true);
                Ext.Viewport.add(Ext.create('Racloop.view.MainNavigationView'));

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

    },

    launch: function(app) {
        LoginHelper.removeJourney();
        var me=this;
        var user = LoginHelper.getUser();
        if (user) {
            Ext.Viewport.mask({
                xtype: 'loadmask',
                indicator: true,
                message: 'Logging in...'
            });
            var mainNavigationView = this.getMainNavigationView(); // Main view
            var loginPanel = this.getLoginPanel();
            var successCallback = function(response, ops) {
                //console.log(response);
                var data = Ext.decode(response.responseText);
                //console.log('login success during launch : ' + response.responseText);
                if (data.success) {
                    LoginHelper.setUser(data.data);
                    me.updateCurrentLocation();
                    //me.setCurrentLoc();
                    mainNavigationView.pop();
                    loginPanel.hide();
                    var tabMain = Ext.Viewport.add(Ext.create('Racloop.view.MainTabs'));
                    tabMain.show();
                    Ext.Viewport.unmask();
                } else {
                    Ext.Viewport.unmask();
                    Ext.Msg.alert(data.message);
                }
            };
            var failureCallback = function(response, ops) {
                Ext.Viewport.unmask();
                Ext.Msg.alert("Network Error", response.code);

            };

            Ext.Ajax.request({
                url: Racloop.util.Config.url.RACLOOP_LOGIN,
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