Ext.define('Racloop.controller.AccountController', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.Toast',
        'Racloop.view.MainTabs',
        'Racloop.view.MainNavigationView',
        'Racloop.view.LoginForm',
        'Racloop.view.RegisterForm',
        'Racloop.view.ForgotPasswordForm',
        'Racloop.view.VerifySmsForm',
        'Racloop.model.ForgotPassword',
        'Racloop.util.LoginHelper',
        'Racloop.util.Common',
        'Racloop.util.Config'
    ],

    config: {
        refs: {
            mainNavigationView: 'mainNavigationView',
            homePanel: 'mainNavigationView #homePanel',
            loginForm: 'loginForm',
            registerButton : 'registerForm #registerButton',
            verifyMobileButton: 'verifySmsForm #verifyMobile',
            resendSmsButton : 'verifySmsForm #resendSms',
            forgotPasswordButton : 'forgotPasswordForm #forgotPasswordButton',
            facebookSignInButton : 'registerForm #facebookSignInButton'
        },

        control: {
            registerButton : {
                tap: 'register'
            },
            verifyMobileButton : {
                tap: 'verifyMobile'
            },
            resendSmsButton : {
                tap: 'resendSms'
            },
            forgotPasswordButton : {
                tap: 'forgotPassword'
            },
            facebookSignInButton : {
                tap: 'onFBSignInButtonTap'
            }
        }
    },

    register: function(button, e, eOpts) {
        this.resetRegistrationFormErrorFields();
        var user = Ext.create("Racloop.model.User", {});
        var registerForm = button.up('formpanel'); // Register form
        var values = registerForm.getValues(); // Form values

        //TODO Need to be removed
        Ext.ComponentQuery.query('#registerScreenRepeatPassword')[0].setValue(values.password);
        Ext.ComponentQuery.query('#registerScreenFemale')[0].setValue(true);
        var mainNavigationView = this.getMainNavigationView(); // Main view
        registerForm.updateRecord(user);

        var validationObj = user.validate();
        if (!validationObj.isValid()) {
            var errorString = this.handleRegisterationFormValidation(validationObj);
            Ext.Msg.alert("Oops", errorString);
        } else {
            if(this.isTwoPasswordMatch()) {
                // Success
                var successCallback = function(response, ops) {
                    var data = Ext.decode(response.responseText);
                    if (data.success) {
                        LoginHelper.setEmail(values.email);
                        LoginHelper.setUser(data.data);
//                        mainNavigationView.pop();
                        mainNavigationView.push({
                            itemId: 'verifySmsForm',
                            xtype: "verifySmsForm",
                            title: "Verify Mobile"
                        });
                        Ext.ComponentQuery.query('#mobileForVerification')[0].setValue(values.mobile);
                        Ext.Viewport.unmask();
                        Ext.toast({message: data.message, timeout: Racloop.util.Config.toastTimeout, animation: true, cls: 'toastClass'});
                    } else {
                        Ext.Msg.alert("Failure", data.message);
                        Ext.Viewport.unmask();
                    }
                };

                // Failure
                var failureCallback = function(response, ops) {
                    Ext.Msg.alert("Failure", response.message);
                    Ext.Viewport.unmask();

                };

                Ext.Viewport.mask({
                    xtype: 'loadmask',
                    indicator: true,
                    message: 'Signing up...'
                });
                Ext.Ajax.request({
                    url: Config.url.RACLOOP_SIGNUP,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: Ext.JSON.encode({
                        email: values.email,
                        password: values.password,
                        passwordConfirm: values.password,
                        fullName: values.name,
                        mobile: values.mobile,
                        gender: values.gender,
                        referalCode:values.referalCode,
                        cordova : device.cordova,
                        model : device.model,
                        platform : device.platform,
                        uuid : device.uuid,
                        version : device.version
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

        //var repeatpasswordErrors = validationObj.getByField('repeatpassword');
        //if (repeatpasswordErrors != null && repeatpasswordErrors.length > 0) {
        //    if(errorCounted < 3) {
        //        errorString += repeatpasswordErrors[0].getMessage() + "<br>";
        //        errorCounted = errorCounted + 1;
        //    }
        //    totalErrors = totalErrors + repeatpasswordErrors.length;
        //    var field = Ext.ComponentQuery.query('#registerScreenRepeatPassword');
        //    field[0].addCls('error');
        //}


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
        var me = this;
        var verifyMobileForm = button.up('formpanel'); // Verify Mobile form
        var values = verifyMobileForm.getValues(); // Form values
        var mobile = values.mobile;
        var verificationCode = values.verificationCode;
        var isMobileValid = false;
        var isVerificationCodeValid = false;
        console.log(mobile + " : mobile.length : " + mobile.length);
        if(mobile != null && mobile.length == 10) {
            isMobileValid = true;
            if(verificationCode != null && verificationCode.length == 6) {
                isVerificationCodeValid = true;
            }
            else {
                Ext.Msg.alert("Oops", "Invalid Verification Code.");
                return;
            }
        }
        else {
            Ext.Msg.alert("Oops", "Invalid Mobile number.");
            return;
        }
        if(isMobileValid && isVerificationCodeValid) {
            var successCallback = function(response, ops) {
                var data = Ext.decode(response.responseText);
                if (data.success) {
                    Ext.Viewport.unmask();
                    var sessionController = Racloop.app.getController('SessionsController') ;
                    sessionController.autoLogin();
                    
                }
                else {
                    Ext.Viewport.unmask();
                    Ext.Msg.alert("Oops", data.message);
                }
            };
            var failureCallback = function(response, ops) {
                Ext.Msg.alert("Server Failure", response.message);
                Ext.Viewport.unmask();
            };
            Ext.Ajax.request({
                url: Config.url.RACLOOP_VERIFYMOBILE,
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
        var verifyMobileForm = button.up('formpanel'); // Verify Mobile form
        var values = verifyMobileForm.getValues(); // Form values
        var mobile = values.mobile;
        if(mobile != null && mobile.length === 10) {
            var successCallback = function(response, ops) {
                var data = Ext.decode(response.responseText);
                if (data.success) {
                    Ext.Viewport.unmask();
                    Ext.toast({message: data.message, timeout: Config.toastTimeout, animation: true, cls: 'toastClass'});
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
                url: Config.url.RACLOOP_RESENDSMS,
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
            Ext.Msg.alert("Oops", "Invalid mobile number");
        }
    },

    forgotPassword: function(button, e, eOpts) {
        this.resetErrorForgetPasswordFields();
        var mainNavigationView = this.getMainNavigationView(); // Main view
        var user = Ext.create("Racloop.model.ForgotPassword", {});
        var forgotPasswordForm = button.up('formpanel');
        var values = forgotPasswordForm.getValues(); // Form values
        forgotPasswordForm.updateRecord(user);
        // Success
        var successCallback = function(response, ops) {
            var data = Ext.decode(response.responseText);
            if (data.success) {
                LoginHelper.removeUser();
                mainNavigationView.pop();
                var emailField = Ext.ComponentQuery.query('#loginScreenEmail')[0];
                emailField.setValue(values.email);
                Ext.Viewport.unmask();
                Ext.toast({message: data.message, timeout: Config.toastTimeout, animation: true, cls: 'toastClass'});
            } else {
                Ext.Msg.alert("Email Send Failure", data.message);
                Ext.Viewport.unmask();
            }
        };
        // Failure
        var failureCallback = function(response, ops) {
            Ext.Msg.alert("Email Send Failure", response.message);
            Ext.Viewport.unmask();

        };

        var validationObj = user.validate();
        if (!validationObj.isValid()) {
            var errorString = this.handleForgotPasswordValidation(validationObj);
            Ext.Msg.alert("Oops", errorString);
        } else {
            Ext.Viewport.mask({
                xtype: 'loadmask',
                indicator: true,
                message: 'Please Wait...'
            });
            Ext.Ajax.request({
                url: Config.url.RACLOOP_FORGOTPASSWORD,
                withCredentials: true,
                useDefaultXhrHeader: false,
                headers: {
                    'Content-Type': 'application/json'
                },
                params: Ext.JSON.encode({
                    email: values.email
                }),
                success: successCallback,
                failure: failureCallback
            });
        }
    },

    handleForgotPasswordValidation: function(validationObj) {
        var errorstring = "";
        var emailErrors = validationObj.getByField('email');
        if (emailErrors != null && emailErrors.length > 0) {
            for (var i = 0; i < emailErrors.length; i++) {
                errorstring += emailErrors[i].getMessage() + "<br />";
            }
            var field = Ext.ComponentQuery.query('#forgotPasswordTextField');
            field[0].addCls('error');
        }
        return errorstring;
    },

    resetErrorForgetPasswordFields: function() {
        Ext.ComponentQuery.query('#forgotPasswordTextField')[0].removeCls('error');
    },

    onFBSignInButtonTap: function(){ 
        var me = this;
        var sessionController = Racloop.app.getController('SessionsController') ;
        Racloop.util.FBConnect.authenticate(sessionController);
    }
});