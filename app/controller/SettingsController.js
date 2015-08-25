Ext.define('Racloop.controller.SettingsController', {
    extend: 'Ext.app.Controller',

    requires: [
        'Racloop.util.Config',
        'Racloop.util.Common',
        'Racloop.util.LoginHelper',
        'Racloop.view.ChangePasswordForm',
        'Racloop.model.EmergencyContacts',
        'Racloop.model.Preferences',
        'Racloop.model.ChangePassword'
    ],

    config: {
        refs: {
            mainTabs: 'mainTabs',
            settingNavigationView: 'settingNavigationView',

            editProfileForm : 'editProfileForm',
            updateProfileButton: 'editProfileForm #updateProfileButton',

            passwordForm: 'changePasswordForm',
            changePasswordButton: 'changePasswordForm #changePasswordButton',

            emergencyContactForm: 'emergencyContactForm',
            emergencyContactButton: 'emergencyContactForm #saveEmergencyContactsButton',

            preferencesForm: 'preferencesForm',
            savePreferencesButton: 'preferencesForm #savePreferencesButton',
            photoLibraryButton: 'editProfileForm #photoLibrary',
            photoCaptureButton: 'editProfileForm #photoCapture',

            searchFormTab: 'searchFormTab'
        },

        control: {
            'settingNavigationView #settingListView': {
                itemsingletap: 'onSettinglistItemTap'
            },
            updateProfileButton: {
                tap: 'updateProfile'
            },
            changePasswordButton : {
                tap: 'changePassword'
            },
            emergencyContactButton : {
                tap: 'saveEmergencyContacts'
            },
            savePreferencesButton : {
                tap: 'savePreferences'
            },
            photoLibraryButton: {
                tap: 'showPhotoLibrary'
            },
            photoCaptureButton: {
                tap: 'openCamera'
            }
        }
    },
    onSettinglistItemTap: function(dataview, index, target, record, e, options) {
        var searchNavigationView = this.getSettingNavigationView();
        //    mainNavigationView = this.getMainNavigationView();
        var navView = record.get("navView");
        var title = record.get("title");
        var itemId = record.get("itemId");
        if(title === Config.settingNameLogout) {
            //this.logout();
            Racloop.app.getController('SessionsController').logout();
        } else if(title === Config.settingNameEmergencyContacts) {
            searchNavigationView.push({
                itemId: itemId,
                xtype: navView,
                title: title
            });
            var user = LoginHelper.getUser();
            var field = Ext.ComponentQuery.query('emergencyContactForm  #emergencyContactOne')[0].setValue(user.emergencyContactOne);
            var field = Ext.ComponentQuery.query('emergencyContactForm  #emergencyContactTwo')[0].setValue(user.emergencyContactTwo);
        } else if(title === Config.settingNameTerms) {
            searchNavigationView.push({
                itemId: itemId,
                xtype: navView,
                title: title,
                scrollable : true
            });
            this.setTerms();
        } else if(title === Config.settingNameDataPrivacy) {
            searchNavigationView.push({
                itemId: itemId,
                xtype: navView,
                title: title,
                scrollable : true
            });
            this.setPrivacy();
        } else if(title === Config.settingRecurringSearches) {
            Ext.getStore('recurringStore').load({
                callback: function(records, operation, success) {
                    searchNavigationView.push({
                        itemId: itemId,
                        xtype: navView,
                        title: title,
                        scrollable : true
                    });
                },
                scope: this
            });
        } else {
            searchNavigationView.push({
                itemId: itemId,
                xtype: navView,
                title: title
            });
        }
    },
    updateProfile: function(button, e, eOpts) {
        var settingNavigationView = this.getSettingNavigationView();
        this.resetProfileFields();
        var user = Ext.create("Racloop.model.EditProfile", {});
        var form = button.up('formpanel'), // Login form
            values = form.getValues(), // Form values
            editForm = this.getEditProfileForm(),
            me = this;
        editForm.updateRecord(user);
        // Success
        var successCallback = function(response, ops) {
            var data = Ext.decode(response.responseText);
            if (data.success) {
                var userdata = LoginHelper.getUser();
                LoginHelper.removeUser();                
                if(data.data) {                   
                    var editedUser = data.data;                    
                    userdata.fullName = editedUser.fullName;
                    userdata.mobile = editedUser.mobile;
                    userdata.isMale = editedUser.isMale;
                    LoginHelper.setUser(userdata);
                    me.getSearchFormTab().displayGenderField();
                    settingNavigationView.pop();
                    Ext.Msg.alert("Success", data.message)
                    Ext.Viewport.unmask();
                }
                else {
                    Ext.Msg.alert("Success", data.message)
                    console.log("Profile edit with no return data. Phone number is changed");
                    Racloop.app.getController('SessionsController').logout();
                    Ext.Viewport.unmask();                    
                }
                
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


        var validationObj = user.validate();
        if (!validationObj.isValid()) {
            var errorString = this.handleProfileValidation(validationObj);
            Ext.Msg.alert("Oops", errorString);
        } else {
            Ext.Viewport.mask({
                xtype: 'loadmask',
                indicator: true,
                message: 'EditProfile...'
            });
            Ext.Ajax.request({
                url: Racloop.util.Config.url.RACLOOP_EDIT,
                withCredentials: true,
                useDefaultXhrHeader: false,
                headers: {
                    'Content-Type': 'application/json'
                },
                params: Ext.JSON.encode({
                    email: values.email,
                    fullName: values.fullName,
                    mobile: values.mobile,
                    sex: values.gender
                }),
                success: successCallback,
                failure: failureCallback
            });
        }
    },

    handleProfileValidation: function(validationObj) {
        var errorstring = "";
        var fullNameErrors = validationObj.getByField('fullName');
        if (fullNameErrors != null && fullNameErrors.length > 0) {
            for (var i = 0; i < fullNameErrors.length; i++) {
                errorstring += fullNameErrors[i].getMessage() + "<br />";
            }

            var field = Ext.ComponentQuery.query('editProfileForm  #editScreenName');
            field[0].addCls('error');
        }
        var mobileErrors = validationObj.getByField('mobile');
        if (mobileErrors != null && mobileErrors.length > 0) {
            for (var i = 0; i < mobileErrors.length; i++) {
                errorstring += mobileErrors[i].getMessage() + "<br />";
                console.log("mobileErrors[i].getMessage() : " + mobileErrors[i].getMessage())
            }
            var field = Ext.ComponentQuery.query('editProfileForm  #editScreenMobile');
            field[0].addCls('error');
        }
//        var emailErrors = validationObj.getByField('email');
//        if (emailErrors != null && emailErrors.length > 0) {
//            for (var i = 0; i < emailErrors.length; i++) {
//                errorstring += emailErrors[i].getMessage() + "<br />";
//            }
//            var field = Ext.ComponentQuery.query('editprofileform  #editScreenEmail');
//            field[0].addCls('error');
//        }
        return errorstring;
    },

    resetProfileFields : function() {
        Ext.ComponentQuery.query('editProfileForm  #editScreenName')[0].removeCls('error');
        Ext.ComponentQuery.query('editProfileForm  #editScreenMobile')[0].removeCls('error');
        //Ext.ComponentQuery.query('editProfileForm  #editScreenEmail')[0].removeCls('error');
    },

    setTerms : function() { // called from UI controller also
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

    setPrivacy : function() { // called from UI controller also
        // Success
        var successCallback = function(response, ops) {
            var data = Ext.decode(response.responseText);
            if (data.success) {
                var privacyHtml = Ext.ComponentQuery.query('#privacyText')[0];
                privacyHtml.setHtml(data.message);
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

    changePassword: function(button, e, eOpts) {
        var settingNavigationView = this.getSettingNavigationView();
        this.resetErrorFieldsForChangePassword();
        var user = Ext.create("Racloop.model.ChangePassword", {});
        var form = button.up('formpanel'), // Login form
            values = form.getValues(), // Form values
            loginForm = this.getPasswordForm();
        loginForm.updateRecord(user);
        //TODO Need to be removed
        Ext.ComponentQuery.query('#changeScreenRepeatPassword')[0].setValue(values.newPassword);

        var successCallback = function(response, ops) {
            var data = Ext.decode(response.responseText);
            console.log('ChangePassword success during launch : ' + response.responseText);
            if (data.success) {
                Ext.Msg.alert("Success", data.message);
                var userData = LoginHelper.getUser();
                LoginHelper.removeUser();
                userData.password = values.newPassword;
                settingNavigationView.pop();
                LoginHelper.setUser(userData);
                Ext.Viewport.unmask();
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

        var validationObj = user.validate();
        if (!validationObj.isValid()) {
            var errorString = this.handleValidationForChangePassword(validationObj);
            Ext.Msg.alert("Oops", errorString);
        } else {
            Ext.Viewport.mask({
                xtype: 'loadmask',
                indicator: true,
                message: 'Password Change...'
            });
            Ext.Ajax.request({
                url: Racloop.util.Config.url.RACLOOP_CHANGEPASSWORD,
                withCredentials: true,
                useDefaultXhrHeader: false,
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                params: Ext.JSON.encode({
                    currentPassword: values.currentPassword,
                    newPassword: values.newPassword,
                    confirmPassword: values.newPassword
                }),
                success: successCallback,
                failure: failureCallback
            });
        }
    },

    handleValidationForChangePassword : function(validationObj) {
        var errorstring = "";
        var oldPasswordErrors = validationObj.getByField('currentPassword');
        if (oldPasswordErrors != null && oldPasswordErrors.length > 0) {
            for (var i = 0; i < oldPasswordErrors.length; i++) {
                errorstring += oldPasswordErrors[i].getMessage() + "<br />";
            }
            var field = Ext.ComponentQuery.query('changePasswordForm  #changeScreenOldPassword');
            field[0].addCls('error');
        }
        var newPasswordErrors = validationObj.getByField('newPassword');
        if (newPasswordErrors != null && newPasswordErrors.length > 0) {
            for (var i = 0; i < newPasswordErrors.length; i++) {
                errorstring += newPasswordErrors[i].getMessage() + "<br />";
            }
            var field = Ext.ComponentQuery.query('changePasswordForm  #changeScreenNewPassword');
            field[0].addCls('error');
        }

//        var repeatpasswordErrors = validationObj.getByField('repeatpassword');
//        if (repeatpasswordErrors != null && repeatpasswordErrors.length > 0) {
//            for (var i = 0; i < repeatpasswordErrors.length; i++) {
//                errorstring += repeatpasswordErrors[i].getMessage() + "<br />";
//            }
//            var field = Ext.ComponentQuery.query('changePasswordForm  #changeScreenrepeatpassword');
//            field[0].addCls('error');
//            console.log(field);
//
//        }

        return errorstring;
    },

    resetErrorFieldsForChangePassword: function() {
        Ext.ComponentQuery.query('changePasswordForm #changeScreenOldPassword')[0].removeCls('error');
        Ext.ComponentQuery.query('changePasswordForm #changeScreenNewPassword')[0].removeCls('error');
        //Ext.ComponentQuery.query('changePasswordForm #changeScreenrepeatpassword')[0].removeCls('error');
    },

    saveEmergencyContacts : function(button, e, eOpts) {
        var emergencyContacts = Ext.create("Racloop.model.EmergencyContacts", {});
        var form = button.up('formpanel'), // Login form
            values = form.getValues(), // Form values
            emergencyContactForm = this.getEmergencyContactForm();
        emergencyContactForm.updateRecord(emergencyContacts);

        var successCallback = function(response, ops) {
            var data = Ext.decode(response.responseText);
            if (data.success) {
                var user = LoginHelper.getUser();
                user.emergencyContactOne = values.contactOne;
                user.emergencyContactTwo = values.contactTwo;
                LoginHelper.setUser(user);
                Ext.Msg.alert("Success", data.message);
                Ext.Viewport.unmask();
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

        var validationObj = emergencyContacts.validate();
        var errorstring = null;
        if(!Common.isEmpty(values.contactOne)) {
            if(!(/^[7-9][0-9]{9}$/).test(values.contactOne)) {
                errorstring = "Invalid Mobile Number"
            }
        }
        if(!Common.isEmpty(values.contactTwo)) {
            if(!(/^[7-9][0-9]{9}$/).test(values.contactTwo)) {
                errorstring = "Invalid Mobile Number"
            }
        }
        if(Common.isEmpty(values.contactOne) && Common.isEmpty(values.contactTwo)) {
                errorstring = "Enter Atleast One Number"
        }
        if (errorstring) {
            Ext.Msg.alert("Validation Error", errorstring);
        }
        else {
            Ext.Viewport.mask({
                xtype: 'loadmask',
                indicator: true,
                message: 'Saving Emergency Contacts...'
            });
            Ext.Ajax.request({
                url: Racloop.util.Config.url.RACLOOP_SAVE_EMERGENCY_CONTACTS,
                withCredentials: true,
                useDefaultXhrHeader: false,
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                params: Ext.JSON.encode({
                    contactOne: values.contactOne,
                    contactTwo: values.contactTwo
                }),
                success: successCallback,
                failure: failureCallback
            });
        }
    },

    // ALSO CALLED FROM SESSION CONTROLLER AFTER SUCCESSFUL LOGIN
    setPreferenceToSearchScreen : function() {
        var user = LoginHelper.getUser();
        if(!Common.isEmpty(user.travelModePreference))  {
            if(user.travelModePreference === 'auto') {
                Ext.ComponentQuery.query('searchFormTab field[name=isTaxi]')[0].setValue('false');
                Ext.ComponentQuery.query('searchFormTab field[itemId=autoTaxiSelectField]')[0].setValue('auto');
            }
            else {
                Ext.ComponentQuery.query('searchFormTab field[name=isTaxi]')[0].setValue('false');
                Ext.ComponentQuery.query('searchFormTab field[itemId=autoTaxiSelectField]')[0].setValue('taxi');
            }
        }
        if(user.isMale) {
            Ext.ComponentQuery.query('searchFormTab field[itemId=searchScreenGender]')[0].hide();
        }
        else {
            Ext.ComponentQuery.query('searchFormTab field[itemId=searchScreenGender]')[0].show();
            Ext.ComponentQuery.query('searchFormTab field[itemId=searchScreenGender]')[0].setValue(user.femaleOnlySearch);
            //if(!Common.isEmpty(user.femaleOnlySearch))  {
            //    Ext.ComponentQuery.query('searchFormTab field[itemId=searchScreenGender]')[0].setValue(user.femaleOnlySearch);
            //}
            //else {
            //    Ext.ComponentQuery.query('searchFormTab field[itemId=searchScreenGender]')[0].setValue(0);
            //}
        }
    },

    savePreferences : function(button, e, eOpts) {
        var settingNavigationView = this.getSettingNavigationView();
        var savePreferences = Ext.create("Racloop.model.Preferences", {});
        var form = button.up('formpanel'), // Login form
            values = form.getValues(), // Form values
            preferencesForm = this.getPreferencesForm();
        preferencesForm.updateRecord(savePreferences);
        var successCallback = function(response, ops) {
            var data = Ext.decode(response.responseText);
            if (data.success) {
                var user = LoginHelper.getUser();
                user.emergencyContactOne = values.contactOne;
                user.emergencyContactTwo = values.contactTwo;
                user.travelModePreference = values.travelModePreference;
                user.paymentPreference = values.paymentPreference;
                user.cabServicePreference = values.cabServicePreference;
                user.enableRecurringSearch = values.enableRecurringSearch;
                user.femaleOnlySearch = values.femaleOnlySearch;
                LoginHelper.setUser(user);
                settingNavigationView.pop();
                Ext.Msg.alert("Success", data.message);
                Ext.Viewport.unmask();
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
        var validationObj = savePreferences.validate();
        var errorstring = null;
        if(!Common.isEmpty(values.contactOne)) {
            if(!(/^[7-9][0-9]{9}$/).test(values.contactOne)) {
                errorstring = "Invalid Mobile Number"
            }
        }
        if(!Common.isEmpty(values.contactTwo)) {
            if(!(/^[7-9][0-9]{9}$/).test(values.contactTwo)) {
                errorstring = "Invalid Mobile Number"
            }
        }
        if (errorstring) {
            Ext.Msg.alert("Validation Error", errorstring);
        }
        else {
        
            Ext.Viewport.mask({
               xtype: 'loadmask',
               indicator: true,
               message: 'Saving user preferences...'
            });
            Ext.Ajax.request({
               url: Racloop.util.Config.url.RACLOOP_SAVE_PREFERENCES,
               withCredentials: true,
               useDefaultXhrHeader: false,
               method: 'post',
               headers: {
                   'Content-Type': 'application/json'
               },
               params: Ext.JSON.encode({
                   contactOne: values.contactOne,
                   contactTwo: values.contactTwo,
                   travelModePreference: values.travelModePreference,
                   paymentPreference: values.paymentPreference,
                   cabServicePreference: values.cabServicePreference,
                   enableRecurringSearch: values.enableRecurringSearch,
                   femaleOnlySearch:values.femaleOnlySearch
               }),
               success: successCallback,
               failure: failureCallback
            });
        }
        
    },
    showPhotoLibrary: function(btn){
         this.getPhoto(Camera.PictureSourceType.PHOTOLIBRARY);
    },   

    openCamera: function(button,eve){   
        this.getPhoto(Camera.PictureSourceType.CAMERA);
    },
    getPhoto: function(source) {
        var me = this;
        var profileForm = me.getEditProfileForm();
        var currentUser = LoginHelper.getUser(); 
        var pictureSuccess = function(imageData) {            
            var jsonFile = {
                       file : imageData,                   
                       email: currentUser.email
                  };
              profileForm.down("#userImage").setSrc("data:image/jpg;base64," + imageData);
                Ext.Viewport.mask({
                    xtype: 'loadmask',
                    indicator: true,
                    message: 'Uploading...'
                });

            Ext.Ajax.request({
                    url: Racloop.util.Config.url.RACLOOP_USER_IMAGE,
                    withCredentials: true,
                    useDefaultXhrHeader: false,
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    jsonData : jsonFile,
                    success: function(response, opts) {
                        var data = Ext.decode(response.responseText);
                        if(data.success) {
                            LoginHelper.setUser(data.data);
                            me.getSettingNavigationView().pop();
                            Ext.Viewport.unmask();
                            Ext.Msg.alert("Success", "Picture uploaded successfully");
                        }
                        else {
                            Ext.Msg.alert("Failure", data.message);
                        }
                    },
                    failure: function(response, opts) {
                        Ext.Viewport.unmask();
                        Ext.Msg.alert("Failure", response.status);
                        console.log('server-side failure with status code ' + response.status);
                    }
              });
        };

        var pictureFailure = function(message) {
            Ext.Msg.alert("Operation Cancelled", message);
        };

        navigator.camera.getPicture(pictureSuccess, pictureFailure, {
                destinationType: Camera.DestinationType.DATA_URL,
                encodingType : Camera.EncodingType.JPEG,
                allowEdit : true,
                sourceType: source,
                allowEdit : false,
                targetWidth: 256,
                targetHeight: 256,
                saveToPhotoAlbum: false,
                cameraDirection: Camera.Direction.FRONT
        });
      }

});