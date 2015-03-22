Ext.define('Racloop.controller.ProfileController', {
    extend: 'Ext.app.Controller',

    requires: [
        'Racloop.view.MainNavigationView',
        'Racloop.view.RegisterForm',
        'Racloop.view.ChangePasswordForm',
        'Racloop.view.EditProfileForm',
        'Racloop.view.ForgotPasswordForm',
        'Racloop.view.JourneyNavigationView',
        'Racloop.view.JourneyViewItem',
        'Racloop.view.IncomingRequestList',
        'Racloop.view.OutgoingRequestList',
        'Racloop.model.EditProfile'
    ],

    config: {
        //another view need to be added here for edit profile
        refs: {
            mainNavigationView: 'mainNavigationView',

            updateProfileButton: 'editProfileForm #updateProfileButton',

            signupScreen: 'signupScreen',
            passwordForm: 'changePasswordForm',
            changeButton: 'button[action=change]',
            //editProfileForm: 'editprofileform',
            forgotPassword: '#ForgotPasswordForm',
            forgotButton: 'button[action=forgotpassword]',
            loginPanel: 'mainNavigationView #loginPanel',
            loginForm: 'mainNavigationView #loginForm',
            journeyList: 'userJourneysList',
            incomingButton: "button[action=Incoming]",
            outgoingButton: "button[action=Outgoing]"
            // acceptButton: "button[action=Accept]",
            // rejectButton: "button[action=Reject]",
            // cancelButton: "button[action=Cancel]"

        },
        control: {
            updateProfileButton: {
                tap: 'updateProfile'
            },
            changeButton: {
                tap: 'changePassword'
            },
            forgotButton: {
                tap: 'forgotPassword'
            },
            incomingButton: {
                 tap: 'onInComingButtonTap'
            },
            outgoingButton: {
                 tap: 'onOutGoingButtonTap'
            },
            // acceptButton: {
            //     tap: 'acceptButtonTap'
            // },
            // rejectButton: {
            //     tap: 'rejectButtonTap'
            // },
            // cancelButton: {
            //     tap: 'cancelButtonTap'
            // },
            'JourneyDataItem': {
                myIncomingButtonTap: 'onInComingButtonTap',
                myOutgoingButtonTap: 'onOutGoingButtonTap'
            },
            'IncomingRequestItem': {
                myAcceptButtonTap: 'acceptButtonTap',
                myRejectButtonTap:  'rejectButtonTap'
            },
            'OutgoingRequestItem': {
                myCancelButtonTap: 'cancelButtonTap'
            }
        }
    },


    changePassword: function(button, e, eOpts) {
        this.resetErrorFields();
        var user = Ext.create("Racloop.model.ChangePassword", {});
        var form = button.up('formpanel'), // Login form
        values = form.getValues(), // Form values
        loginForm = this.getPasswordForm();
        loginForm.updateRecord(user);
        console.log(values.newpassword);

        var successCallback = function(response, ops) {
            var data = Ext.decode(response.responseText);
            console.log('ChangePassword success during launch : ' + response.responseText);
            if (data.success) {
                Ext.Msg.alert("Change Password Success", data.message);
                // LoginHelper.removeUser();
                // LoginHelper.setUser(data.users[0]);
                var userData = LoginHelper.getUser();
                LoginHelper.removeUser();
                userData.password = values.newpassword;
                LoginHelper.setUser(userData);
                Ext.Viewport.unmask();
            } else {
                Ext.Msg.alert("Change Password Failure", data.message);
                Ext.Viewport.unmask();
            }
        };
        // Failure
        var failureCallback = function(response, ops) {
            Ext.Msg.alert("ChangePassword Failure", response.message);
            Ext.Viewport.unmask();

        };

        var validationObj = user.validate();
        if (!validationObj.isValid()) {
            var errorString = this.handleValidation(validationObj);
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
                    newPassword: values.newpassword,
                    confirmPassword: values.repeatpassword
                }),
                success: successCallback,
                failure: failureCallback
            });
        }


    },

    handleValidation: function(validationObj) {
        console.log("test");
        var errorstring = "";
        var oldPasswordErrors = validationObj.getByField('currentPassword');

        if (oldPasswordErrors != null && oldPasswordErrors.length > 0) {
            for (var i = 0; i < oldPasswordErrors.length; i++) {
                errorstring += oldPasswordErrors[i].getMessage() + "<br />";
            }
            var field = Ext.ComponentQuery.query('changePasswordForm  #changeScreenoldPassword');
            field[0].addCls('error');


        }


        var newpasswordErrors = validationObj.getByField('newpassword');
        if (newpasswordErrors != null && newpasswordErrors.length > 0) {
            for (var i = 0; i < newpasswordErrors.length; i++) {
                errorstring += newpasswordErrors[i].getMessage() + "<br />";
            }

            var field = Ext.ComponentQuery.query('changePasswordForm  #changeScreennewpassword');
            field[0].addCls('error');
            console.log(field);


        }

        var repeatpasswordErrors = validationObj.getByField('repeatpassword');
        if (repeatpasswordErrors != null && repeatpasswordErrors.length > 0) {
            for (var i = 0; i < repeatpasswordErrors.length; i++) {
                errorstring += repeatpasswordErrors[i].getMessage() + "<br />";
            }
            var field = Ext.ComponentQuery.query('changePasswordForm  #changeScreenrepeatpassword');
            field[0].addCls('error');
            console.log(field);

        }

        return errorstring;
    },

    resetErrorFields: function() {
        Ext.ComponentQuery.query('changePasswordForm #changeScreenoldPassword')[0].removeCls('error');
        Ext.ComponentQuery.query('changePasswordForm #changeScreennewpassword')[0].removeCls('error');
        Ext.ComponentQuery.query('changePasswordForm #changeScreenrepeatpassword')[0].removeCls('error');
    },


    updateProfile: function(button, e, eOpts) {
//        this.resetErrorEditFields();
//        var user = Ext.create("Racloop.model.EditProfile", {});
//        var form = button.up('formpanel'), // Login form
//            values = form.getValues(), // Form values
//            editForm = this.getEditProfileForm();
//        editForm.updateRecord(user);
//        // Success
//        var successCallback = function(response, ops) {
//            var data = Ext.decode(response.responseText);
//            console.log('EditProfile success during launch : ' + response.responseText);
//            if (data.success) {
//                Ext.Msg.alert("Edit Profile success", data.message)
//                var userdata = LoginHelper.getUser();
//                LoginHelper.removeUser();
//                console.log(data);
//                var editedUser = data.data;
//                userdata.fullName = values.fullName;
//                userdata.mobile = values.mobile;
//                userdata.gender = values.gender;
//                LoginHelper.setUser(userdata);
//                Ext.Viewport.unmask();
//            } else {
//                Ext.Msg.alert("Edit Profile Failure", data.message);
//                Ext.Viewport.unmask();
//            }
//        };
//        // Failure
//        var failureCallback = function(response, ops) {
//            Ext.Msg.alert("EditProfile Failure", response.message);
//            Ext.Viewport.unmask();
//
//        };
//
//
//        var validationObj = user.validate();
//        if (!validationObj.isValid()) {
//            var errorString = this.handleEditValidation(validationObj);
//            Ext.Msg.alert("Oops", errorString);
//        } else {
//            Ext.Viewport.mask({
//                xtype: 'loadmask',
//                indicator: true,
//                message: 'EditProfile...'
//            });
//            Ext.Ajax.request({
//                url: Racloop.util.Config.url.RACLOOP_EDIT,
//                withCredentials: true,
//                useDefaultXhrHeader: false,
//                headers: {
//                    'Content-Type': 'application/json'
//                },
//                params: Ext.JSON.encode({
//                    email: values.email,
//                    fullName: values.fullName,
//                    mobile: values.mobile,
//                    sex: values.gender
//                }),
//                success: successCallback,
//                failure: failureCallback
//            });
//        }
        Ext.Msg.alert("Test", "Success");
    },

    handleEditValidation: function(validationObj) {
        var errorstring = "";
        var emailErrors = validationObj.getByField('fullName');
        if (emailErrors != null && emailErrors.length > 0) {
            for (var i = 0; i < emailErrors.length; i++) {
                errorstring += emailErrors[i].getMessage() + "<br />";
            }

            var field = Ext.ComponentQuery.query('editprofileform  #editScreenName');
            field[0].addCls('error');
        }
        var mobileErrors = validationObj.getByField('mobile');
        if (mobileErrors != null && mobileErrors.length > 0) {
            for (var i = 0; i < mobileErrors.length; i++) {
                errorstring += mobileErrors[i].getMessage() + "<br />";
            }
            var field = Ext.ComponentQuery.query('editprofileform  #editScreenMobile');
            field[0].addCls('error');
        }
        var emailErrors = validationObj.getByField('email');
        if (emailErrors != null && emailErrors.length > 0) {
            for (var i = 0; i < emailErrors.length; i++) {
                errorstring += emailErrors[i].getMessage() + "<br />";
            }
            var field = Ext.ComponentQuery.query('editprofileform  #editScreenEmail');
            field[0].addCls('error');
        }
        return errorstring;
    },

    resetErrorEditFields: function() {
        Ext.ComponentQuery.query('editprofileform  #editScreenName')[0].removeCls('error');
        Ext.ComponentQuery.query('editprofileform  #editScreenMobile')[0].removeCls('error');
        Ext.ComponentQuery.query('editprofileform  #editScreenEmail')[0].removeCls('error');
    },

    //called when the Application is launched, remove if not needed
    launch: function(app) {


    },
    onInComingButtonTap: function(item) {
         console.log('onInComingButtonTap clicked');
        var journeyList = this.getJourneyList();
        var record = item.getRecord();
       // console.log('------------'+record.get("incomingRequests"));
        var data = record.get("incomingRequests");
        var incomingRequest;
        if (data.length>0) {
            incomingRequest= Ext.create('Ext.DataView', {
            title: 'Incoming Requests',
            fullscreen: true,
            itemTpl: '{name}',
            data: data,
            defaultType: 'IncomingRequestItem',
            useComponents: true
            });
            journeyList.push(incomingRequest);
        }
    },
    onOutGoingButtonTap: function(item) {
        console.log('onOutGoingButtonTap clicked');
        var journeyList = this.getJourneyList();
        var record = item.getRecord();
        var data = record.get("outgoingRequests");
        console.debug(record);
        var outgoingRequest;
        if (data.length>0) {
            outgoingRequest = Ext.create('Ext.DataView', {
            title: 'Outgoing Responses',
            fullscreen: true,
            itemTpl: '{name}',
            data: data,
            defaultType: 'OutgoingRequestItem',
            useComponents: true
        });
            journeyList.push(outgoingRequest);
        }
    //     else {
    //     outgoingRequest= Ext.create('Ext.Panel', {
    //          title: 'Outgoing Responses',
    //         fullscreen: true,
    //         html: '<center>No Record Found...</center>'
    //      });
    // }
        
    },

    acceptButtonTap: function(item) {
        //console.log('AcceptButton clicked');
        // var record = button.up().getRecord();
        // Ext.Msg.alert("Mobile No. is :-"+record.get("mobile"));
        var record = item.getRecord();
        var myJourneyId=record.get("workflow").requestJourneyId;
        var workflowId=record.get("workflow").id;
        var journeyList = this.getJourneyList();
        // var textCmp=button.up().down('textCmp').element.domquerySelectorAll('.card-main');
        // textCmp.innerHTML="";
        
        var successCallback = function(response, ops) {
            var data = Ext.decode(response.responseText);
            console.log('Request success during launch : ' + response.responseText);
            if (data.success) {
                Ext.Msg.alert("Request Successful " + data.message);
                Ext.getStore('journeyStore').load();
                journeyList.pop();
                // button.up().down("#statusCmp").setHtml('<div class="name"><b>Status</b></div><div class="name">Accepted</div><div class="name">'+mobile+'</div>');
                // button.up().down('button[action="Accept"]').hide();
                // button.up().down('button[action="Reject"]').show();

                Ext.Viewport.unmask();
            } else {
                Ext.Msg.alert("Request Failure", data.message);
                Ext.Viewport.unmask();
            }
        };
        
        // Failure
        var failureCallback = function(response, ops) {
            Ext.Msg.alert("Request Accept Failure", response.message);
            Ext.Viewport.unmask();

        };

        Ext.Viewport.mask({
            xtype: 'loadmask',
            indicator: true,
            message: 'Sending Request...'
        });
       
            Ext.Ajax.request({
                url: Config.url.RACLOOP_ACCEPTREQUEST,
                withCredentials: true,
                useDefaultXhrHeader: false,
                headers: {
                    'Content-Type': 'application/json'
                },
                params: Ext.JSON.encode({
                    myJourneyId: myJourneyId,
                    workflowId: workflowId                    
                }),
                //params: values, //TODO need to uncomment it
                success: successCallback,
                failure: failureCallback
            });
        


    },

    rejectButtonTap: function(item) {
        //console.log('RejectButton clicked');
        var record = item.getRecord();
        var myJourneyId=record.get("workflow").requestJourneyId;
        var workflowId=record.get("workflow").id;
        var journeyList = this.getJourneyList();
        var successCallback = function(response, ops) {
            var data = Ext.decode(response.responseText);
            console.log('Request success during launch : ' + response.responseText);
            if (data.success) {
                Ext.Msg.alert("Request Successful " + data.message);
                Ext.getStore('journeyStore').load();
                journeyList.pop();
                // button.up().down("#statusCmp").setHtml('<div class="name"><b>Status</b></div><div class="name">Rejected</div>');
                // button.up().down('button[action="Accept"]').show();
                // button.up().down('button[action="Reject"]').hide();
                Ext.Viewport.unmask();
            } else {
                Ext.Msg.alert("Request Failure", data.message);
                Ext.Viewport.unmask();
            }
        };
        
        // Failure
        var failureCallback = function(response, ops) {
            Ext.Msg.alert("Request Reject Failure", response.message);
            Ext.Viewport.unmask();

        };

        Ext.Viewport.mask({
            xtype: 'loadmask',
            indicator: true,
            message: 'Sending Request...'
        });
        if (Racloop.util.Config.debug) {
            successCallbackDebug();
        } else {
            Ext.Ajax.request({
                url: Config.url.RACLOOP_REJECTREQUEST,
                withCredentials: true,
                useDefaultXhrHeader: false,
                headers: {
                    'Content-Type': 'application/json'
                },
                params: Ext.JSON.encode({
                    myJourneyId: myJourneyId,
                    workflowId: workflowId                    
                }),
                //params: values, //TODO need to uncomment it
                success: successCallback,
                failure: failureCallback
            });
        }



    },

    cancelButtonTap: function(item) {
        //console.log('CancelButton clicked');
        // console.log("request");
        var record = item.getRecord();
        var workflowId=record.get("workflow").id;
        var journeyList = this.getJourneyList();
        // Ext.Msg.alert(record.get('name'));
        var successCallback = function(response, ops) {
            var data = Ext.decode(response.responseText);
            console.log('Request success during launch : ' + response.responseText);
            if (data.success) {
                Ext.Msg.alert("Request Successful " + data.message);
                Ext.getStore('journeyStore').load();
                journeyList.pop();
                // button.up().down("#statusCmp").setHtml('<div class="name"><b>Status</b></div><div class="name">Cancelled By Requester</div>');
                //  button.up().down('button[action="Cancel"]').hide();
                Ext.Viewport.unmask();
            } else {
                Ext.Msg.alert("Request Failure", data.message);
                Ext.Viewport.unmask();
            }
        };
        
        // Failure
        var failureCallback = function(response, ops) {
            Ext.Msg.alert("Request Cancellation Failure", response.message);
            Ext.Viewport.unmask();

        };

        Ext.Viewport.mask({
            xtype: 'loadmask',
            indicator: true,
            message: 'Sending Request...'
        });
        if (Racloop.util.Config.debug) {
            successCallbackDebug();
        } else {
            Ext.Ajax.request({
                url: Config.url.RACLOOP_CANCELREQUEST,
                withCredentials: true,
                useDefaultXhrHeader: false,
                headers: {
                    'Content-Type': 'application/json'
                },
                params: Ext.JSON.encode({
                    workflowId: workflowId                    
                }),
                //params: values, //TODO need to uncomment it
                success: successCallback,
                failure: failureCallback
            });
        }
    }
});