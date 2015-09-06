Ext.define('Racloop.controller.SessionsController', {
    extend: 'Ext.app.Controller',

    requires: [
        'Racloop.view.MainTabs',
        'Racloop.view.MainNavigationView',
        'Racloop.view.MapPanel',
        'Racloop.view.SettingNavigationView',
        'Racloop.util.LoginHelper',
        'Racloop.util.Common',
        'Racloop.util.Config',
        'Ext.ux.touch.Rating'
    ],

    config: {
        refs: {
            mainTabs: 'mainTabs',
            mainNavigationView: 'mainNavigationView',
            settingNavigationView : 'settingNavigationView',
            searchNavigationView : 'searchNavigationView',
            journeyNavigationView: 'journeyNavigationView',
            historyNavigationView : 'historyNavigationView',

            loginButton: 'loginForm #loginButton',
            ratingView: 'ratingView',
            saveFeedBackButton: 'ratingView #saveFeedBack',
            cancelFeedBackButton: 'ratingView #cancelFeedBack',
            fbLoginButton: 'loginForm #facebookLoginButton',
            saveMobileButton: 'mobileCaptureForm #saveMobileButton',
            searchHeading: 'searchNavigationView #searchFormInTabs #searchHeading',
            homeLinks: 'searchNavigationView #searchFormInTabs #homeLinks',
            searchForm: 'searchFormTab'

        },

        control: {
            loginButton: {
                tap: 'login'
            },
            saveFeedBackButton: {
                tap: 'onSaveFeedbackTap'
            },
            cancelFeedBackButton: {
                tap: 'onCancelFeedbackTap'
            },
            fbLoginButton: {
                 tap: 'onFBLogInButtonTap'
            },
            saveMobileButton : {
                tap : 'saveMobileButtonTap'
            }
        }
    },

    autoLogin : function(app) { // Called from MapController launch
        var mainNavigationView = this.getMainNavigationView(); // Main view
        var settingNavigationView = this.getSettingNavigationView();
        var me = this;
        var user = LoginHelper.getUser();
        var currentDateString = Ext.Date.format(new Date(),'c');
        console.log("SessionController - autoLogin : " + currentDateString);
        if (user != null && user.email != null && user.password != null) {
            console.log("autoLogin  user.email : " + user.email + ", user.password : " + user.password);
            Ext.Viewport.mask({
                xtype: 'loadmask',
                indicator: true,
                message: 'Signing In'
            });
            var successCallback = function(response, ops) {
                var data = Ext.decode(response.responseText);
                if (data.success) {
                    console.log("SessionController - autoLogin - successfully login");
                    LoginHelper.setUser(data.data);
                    Racloop.app.getController('SettingsController').setPreferenceToSearchScreen();
                     LoginHelper.setEmail(user.email);
                     var currentJourney = data.currentJourney;                  
                    if (data.feedbackPending){
                        var feedbackJournies = data.currentJourney.relatedJourneys;
                         var ratingView =me.getRatingView();
                            if(!ratingView) {                            
                                ratingView = Ext.create('Racloop.view.JourneyRatingView');
                                Ext.Viewport.add(ratingView);
                            }                           

                             for (var i in feedbackJournies) {
                                var index = parseInt(i)+1;
                                me.setRatingView(ratingView, feedbackJournies[i], currentJourney, index);
                              }
                            Ext.Viewport.setActiveItem(ratingView);
                            Ext.Viewport.unmask();
                    }else {  
                        var mainTabs = Ext.ComponentQuery.query('mainTabs')[0];
                        Ext.Viewport.setActiveItem(mainTabs);
                        mainTabs.show();
                        Ext.Viewport.unmask();
                        if(currentJourney) {
                            console.log("SessionController - autoLogin - currentJourney exists");
                            mainTabs.setActiveItem('mapPanel');
                            LoginHelper.setCurrentJourney(currentJourney);
                            Racloop.app.getController('MapController').showCurrentJourney();
                            Racloop.app.getController('MapController').updateCurrentLocationOnMap();
                        }
                        else {
                            console.log("SessionController - autoLogin - currentJourney does not exists");
                            LoginHelper.removeCurrentJourney();
                            Racloop.app.getController('MapController').updateCurrentLocationOnMap();
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
                                        Racloop.app.getController('MapController').updateFromFieldWithCurrentLocation(false);
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
                                        me.getSearchForm().populateMainFormData();
                                        mainTabs.setActiveItem('searchNavigationView');
                                        Racloop.app.getController('MapController').updateFromFieldWithCurrentLocation(false);
    //                                    mainTabs.setActiveItem('mapPanel');
    //                                    Racloop.app.getController('MapController').updateCurrentLocationOnMap();
                                    }
                                }

                            }
                            else {
                                mainTabs.setActiveItem('searchNavigationView');
                                Racloop.app.getController('MapController').updateFromFieldWithCurrentLocation(false);
    //                            mainTabs.setActiveItem('mapPanel');
    //                            Racloop.app.getController('MapController').updateCurrentLocationOnMap();
                            }

                        }
                    }
                } else {
                    LoginHelper.removeUser();
                    Ext.Viewport.unmask();
                    Ext.Msg.alert('Login Error', data.message);
                    Ext.Viewport.setActiveItem(mainNavigationView);
                    Racloop.app.getController('MapController').updateFromFieldWithCurrentLocation(true);
                }
            };
            var failureCallback = function(response, ops) {
                //LoginHelper.removeUser();
                Ext.Viewport.unmask();
                Ext.Viewport.setActiveItem(mainNavigationView);
                Racloop.app.getController('MapController').updateFromFieldWithCurrentLocation(true);
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
            LoginHelper.removeUser();
            LoginHelper.removeEmail();
            Ext.Viewport.unmask();
            Ext.Viewport.setActiveItem(mainNavigationView);
            Racloop.app.getController('MapController').updateFromFieldWithCurrentLocation(true);
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
        var currentDateString = Ext.Date.format(new Date(),'c');
        // Success
        var successCallback = function(response, ops) {
            var data = Ext.decode(response.responseText);
            if (data.success) {
                LoginHelper.setUser(data.data);
                LoginHelper.setEmail(values.email);
                Racloop.app.getController('SettingsController').setPreferenceToSearchScreen();
                var currentJourney = data.currentJourney;
                if (data.feedbackPending){
                        var feedbackJournies = data.currentJourney.relatedJourneys;
                        console.log(data);
                          var ratingView = me.getRatingView();
                            if(!ratingView) {                            
                                ratingView = Ext.create('Racloop.view.JourneyRatingView');
                                Ext.Viewport.add(ratingView);
                            }

                             for (var i in feedbackJournies) {
                                var index = parseInt(i)+1;
                                me.setRatingView(ratingView, feedbackJournies[i], currentJourney, index);
                              }
                            Ext.Viewport.setActiveItem(ratingView);
                            Ext.Viewport.unmask();
                    }else {                    
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
                                    if(!LoginHelper.getSearchedJourney())
                                    Racloop.app.getController('MapController').updateFromFieldWithCurrentLocation(false);
                                    me.getSearchForm().populateMainFormData();
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
                                    if(!LoginHelper.getSearchedJourney())
                                    Racloop.app.getController('MapController').updateFromFieldWithCurrentLocation(false);
                                    me.getSearchForm().populateMainFormData();                                
    //                                mainTabs.setActiveItem('mapPanel');
    //                                Racloop.app.getController('MapController').updateCurrentLocationOnMap();
                                }
                            }

                        }
                        else {
                            console.log('login success emergency contact : false');
                            mainTabs.setActiveItem('searchNavigationView');
                            if(!LoginHelper.getSearchedJourney())
                            Racloop.app.getController('MapController').updateFromFieldWithCurrentLocation(false);
                            me.getSearchForm().populateMainFormData();
    //                        mainTabs.setActiveItem('mapPanel');
    //                        Racloop.app.getController('MapController').updateCurrentLocationOnMap();
                        }

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

        Ext.Viewport.mask({
            xtype: 'loadmask',
            indicator: true,
            message: 'Signing In'
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

    },

    loginFromVerify : function() {
        var user = LoginHelper.getUser();
        var currentDateString = Ext.Date.format(new Date(),'c');

        var successCallback = function(response, ops) {
            var data = Ext.decode(response.responseText);
            if (data.success) {
                LoginHelper.setUser(data.data);
                LoginHelper.setEmail(data.data.email);
                var mainTabs = Ext.ComponentQuery.query('mainTabs')[0];
                Ext.Viewport.setActiveItem(mainTabs);
                mainTabs.show();
                mainTabs.setActiveItem('searchNavigationView');
                Ext.Viewport.unmask();
            }
        }
        // Failure
        var failureCallback = function(response, ops) {
            Ext.Viewport.unmask();
            Ext.Msg.alert("Network Error", response.code);
        };

        Ext.Viewport.mask({
            xtype: 'loadmask',
            indicator: true,
            message: 'Signing In'
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
                email: user.email,
                password: user.password,
                rememberMe: true,
                currentDateString : currentDateString
            }),
            success: successCallback,
            failure: failureCallback
        });
    },

    onFBLogInButtonTap: function(){ 
        var me = this;
        //loginView = me.getSettingNavigationView();
        Racloop.util.FBConnect.authenticate(me);
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
        var me = this;
        var mainTabs = this.getMainTabs();
        var successCallback = function(response, ops) {
            var data = Ext.decode(response.responseText);
            if (data.success) {
                console.log("Logged out successfully");
                //Emptying all stores
                Ext.getStore('journeyStore').removeAll();
                Ext.getStore('historyStore').removeAll();
                Ext.getStore('SearchStore').removeAll();
                Ext.getStore('childJourneyStore').removeAll();
                Ext.getStore('passengersStore').removeAll();
                LoginHelper.removeUser();
                LoginHelper.removeEmail();
                LoginHelper.removeCurrentJourney();
                LoginHelper.removeInstallStatus();
                LoginHelper.removeLoginCounter();
                LoginHelper.removeRoutes();
                LoginHelper.removeSearchedJourney();
                me.getJourneyNavigationView().reset();
                me.getSearchNavigationView().reset();
                me.getSettingNavigationView().reset();
                me.getHistoryNavigationView().reset();
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
            message: 'Signing Out'
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

    },
    setRatingView: function(ratingView, feedbackJourney, currentJourney, index){
        var dateOfJourney = Ext.Date.parse(feedbackJourney.dateOfJourney, "c");
          var ratingViewPanel = ratingView.down("#ratingViewPanel");
          var userReviews = ratingView.down("#userReviews");
          var day = Ext.Date.format(dateOfJourney, 'd');
          var month = Ext.Date.format(dateOfJourney, 'F');
          var time = Ext.Date.format(dateOfJourney, 'g:i A');

            var html='\
                <div class="card">\
                    <div class="card-info">\
                        <div class="card-date">\
                            <div class="card-day">'+day+'</div>\
                            <div class="card-month">'+month+'</div>\
                        </div>\
                        <div class="card-main">\
                            <div>\
                                <span class="card-time"> <span class="timeCls"></span>  '+time+'</span>\
                            </div>\
                        </div>\
                    </div>\
        \
                    <div class="card-footer">\
                        <div class="card-footer-row">\
                            <span class="card-location-label">From : </span>\
                            <span class="card-location"> &nbsp;<span class="fromCls"> </span>'+currentJourney.from+'</span>\
                        </div>\
                        <div class="card-footer-row">\
                            <span class="card-location-label">To : </span>\
                            <span class="card-location"> &nbsp;<span class="toCls"> </span>'+currentJourney.to+' </span>\
                        </div>\
                    </div>\
                </div>';
                ratingViewPanel.setHtml(html);
                var journeyField = userReviews.down("hiddenfield[name='journeyId']");
                journeyField.setValue(currentJourney.id);

                var newItem = {   
                    xtype: 'fieldset',
                    instructions: "How likely you will recommend others to share ride with this CabShare user?",
                    title: feedbackJourney.name,
                    items: [
                    {
                        xtype: 'rating',
                        label : 'Punctuality',
                        name: 'punctuality'+index,
                        hidden : true,
                        itemsCount : 5,
                        value: 2, //zero-based!                     
                        itemCls : 'x-rating-star',
                        itemHoverCls : 'x-rating-star-hover'
                    },{
                        xtype: 'rating',
                        label : 'Ride Experience',
                        labelWidth: '40%',
                        name: 'overall'+index,
                        itemsCount : 5,
                        value: 2, //zero-based!                     
                        itemCls : 'x-rating-star',
                        itemHoverCls : 'x-rating-star-hover'
                    },{
                        xtype: 'textareafield',
                        label: 'Comments',
                        name: 'comment'+index,
                        maxLength: 200,
                        maxRows: 4                        
                    },{
                        xtype: "hiddenfield",
                        name: 'pairId'+index,
                        value: feedbackJourney.myPairId
                    }]
                };

                userReviews.add(newItem);
    },
    onSaveFeedbackTap: function(button, e, eOpts){
        console.log("onSaveFeedbackTap");
        var me = this;
        var mainTabs = this.getMainTabs();
        var user = Ext.create("Racloop.model.UserReview", {});
        var reviewForm = button.up('ratingView'); // review form
        var values = reviewForm.getValues(); // Form values  
        var currentDateString = Ext.Date.format(new Date(),'c');
        console.log(values);

        var successCallback = function(response, ops) {
            var data = Ext.decode(response.responseText);
            var ratingView = me.getRatingView();
            Ext.Viewport.remove(ratingView, true);
            if (data.success) {
                var currentJourney = data.currentJourney;
                if(currentJourney) {
                    var mainTabs = Ext.ComponentQuery.query('mainTabs')[0];
                    Ext.Viewport.setActiveItem(mainTabs);
                    mainTabs.setActiveItem('mapPanel');
                    LoginHelper.setCurrentJourney(currentJourney);
                    Racloop.app.getController('MapController').showCurrentJourney();
                    Racloop.app.getController('MapController').updateCurrentLocationOnMap();
                }
                else {
                    LoginHelper.removeCurrentJourney();
                    var mainTabs = Ext.ComponentQuery.query('mainTabs')[0];
                    Ext.Viewport.setActiveItem(mainTabs);
                    mainTabs.setActiveItem('searchNavigationView');
                    Racloop.app.getController('MapController').updateFromFieldWithCurrentLocation();
                }
                Ext.Viewport.unmask();
            } else {
                LoginHelper.removeCurrentJourney();
                var mainTabs = Ext.ComponentQuery.query('mainTabs')[0];
                Ext.Viewport.setActiveItem(mainTabs);
                mainTabs.setActiveItem('searchNavigationView');
                Racloop.app.getController('MapController').updateFromFieldWithCurrentLocation();
                Ext.Viewport.unmask();
                Ext.Msg.alert("Failure", data.message);
            }
          };

        var failureCallback = function(response, ops) {
            LoginHelper.removeCurrentJourney();
            var ratingView =me.getRatingView();
            Ext.Viewport.remove(ratingView, true);
            var mainTabs = Ext.ComponentQuery.query('mainTabs')[0];
            Ext.Viewport.setActiveItem(mainTabs);
            mainTabs.setActiveItem('searchNavigationView');
            Racloop.app.getController('MapController').updateFromFieldWithCurrentLocation();
            Ext.Viewport.unmask();
            Ext.Msg.alert("Failure", response.message);

        };
        Ext.Viewport.mask({
            xtype: 'loadmask',
            indicator: true,
            message: 'Saving'
        });

          Ext.Ajax.request({
            url: Config.url.RACLOOP_SEND_USER_RATING,
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
            useDefaultXhrHeader: false,
            params: Ext.JSON.encode({
                journeyId: values.journeyId,
                pairId1: values.pairId1,
                pairId2: values.pairId2,
                comment1: values.comment1,
                comment2: values.comment2,
                punchuality1: values.punctuality1,
                punchuality2: values.punctuality2,
                overall1: values.overall1,
                overall2: values.overall2,
                currentDateString : currentDateString
            }),
            success: successCallback,
            failure: failureCallback
        });

    },
    onCancelFeedbackTap: function(button, e, eOpts){
        console.log("onCancelFeedbackTap");
        var me = this;
        var mainTabs = this.getMainTabs();
        var currentDateString = Ext.Date.format(new Date(),'c');

        var successCallback = function(response, ops) {
            var data = Ext.decode(response.responseText);
            var ratingView =me.getRatingView();
            Ext.Viewport.remove(ratingView, true);
            if (data.success) {
                var currentJourney = data.currentJourney;
                if(currentJourney) {
                    //Ext.toast({message: data.message, timeout: Racloop.util.Config.toastTimeout, animation: true, cls: 'toastClass'});
                    var mainTabs = Ext.ComponentQuery.query('mainTabs')[0];
                    Ext.Viewport.setActiveItem(mainTabs);
                    mainTabs.setActiveItem('mapPanel');
                    LoginHelper.setCurrentJourney(currentJourney);
                    Racloop.app.getController('MapController').showCurrentJourney();
                    Racloop.app.getController('MapController').updateCurrentLocationOnMap();
                }
                else {
                    LoginHelper.removeCurrentJourney();
                    var mainTabs = Ext.ComponentQuery.query('mainTabs')[0];
                    Ext.Viewport.setActiveItem(mainTabs);
                    mainTabs.setActiveItem('searchNavigationView');
                    Racloop.app.getController('MapController').updateFromFieldWithCurrentLocation();
                }
                Ext.Viewport.unmask();
            } else {
                LoginHelper.removeCurrentJourney();
                var mainTabs = Ext.ComponentQuery.query('mainTabs')[0];
                Ext.Viewport.setActiveItem(mainTabs);
                mainTabs.setActiveItem('searchNavigationView');
                Racloop.app.getController('MapController').updateFromFieldWithCurrentLocation();
                Ext.Viewport.unmask();
                Ext.Msg.alert("Failure", data.message);
            }
        };
        var failureCallback = function(response, ops) {
            LoginHelper.removeCurrentJourney();
            var ratingView =me.getRatingView();
            Ext.Viewport.remove(ratingView, true);
            var mainTabs = Ext.ComponentQuery.query('mainTabs')[0];
            Ext.Viewport.setActiveItem(mainTabs);
            mainTabs.setActiveItem('searchNavigationView');
            Racloop.app.getController('MapController').updateFromFieldWithCurrentLocation();
            Ext.Viewport.unmask();
            Ext.Msg.alert("Failure", response.message);
        };
        Ext.Viewport.mask({
            xtype: 'loadmask',
            indicator: true,
            message: 'Cancelling'
        });

        Ext.Ajax.request({
            url: Config.url.RACLOOP_CANCEL_USER_RATING,
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
            useDefaultXhrHeader: false,
            params: Ext.JSON.encode({
                currentDateString : currentDateString
            }),
            success: successCallback,
            failure: failureCallback
        });
    },
    getCurrentJourney: function(){
        var mainNavigationView = this.getMainNavigationView(); // Main view
        var settingNavigationView = this.getSettingNavigationView();
        var me = this;
        var currentDateString = Ext.Date.format(new Date(),'c');
        var successCallback = function(response, ops) {
            var data = Ext.decode(response.responseText);
            console.log(data);
            if (data.success) {
                var currentJourney = data.currentJourney;
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
                    Racloop.app.getController('MapController').updateCurrentLocationOnMap();
                }
                else {
                    console.log("SessionController - autoLogin - currentJourney does not exists");
                    LoginHelper.removeCurrentJourney();
                    Racloop.app.getController('MapController').updateCurrentLocationOnMap();
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

            }
            else {
                Ext.Viewport.unmask();
                Ext.Msg.alert('Error', data.message);
                Ext.Viewport.setActiveItem(mainNavigationView);
             }
        };

        var failureCallback = function(response, ops) {
            //LoginHelper.removeUser();
            Ext.Viewport.unmask();
            Ext.Viewport.setActiveItem(mainNavigationView);
            Ext.Msg.alert("Network Error", response.code);

        };         
        Ext.Viewport.mask({
            xtype: 'loadmask',
            indicator: true,
            message: 'Connecting'
        }); 

          Ext.Ajax.request({
            url: Config.url.RACLOOP_GET_CURRENT_JOURNEY,
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
            useDefaultXhrHeader: false,
            params: Ext.JSON.encode({
                currentDateString : currentDateString
            }),
            success: successCallback,
            failure: failureCallback
        });
    },

    loginAsFacebook : function(facebookId, email, name, gender) {
        var me = this;
        var mainNavigationView = this.getMainNavigationView();
        var successCallback = function(response, ops) {
            var data = Ext.decode(response.responseText);
            if (data.success) {
                 Ext.Viewport.unmask();
                if(data.data) {
                    LoginHelper.setUser(data.data);
                    //LoginHelper.setEmail(values.email);
                    me.autoLogin();
                }
                else  {
                    var mobileCaptureForm = mainNavigationView.push({
                        title: "Mobile",
                        xtype: 'mobileCaptureForm',
                        itemId: 'mobileCaptureForm'
                    });
                    mobileCaptureForm.down("field[name=facebookId]").setValue(facebookId);
                    mobileCaptureForm.down("field[name=email]").setValue(email);
                    //mobileCaptureForm.down("field[name=accessToken]").setValue(accessToken);
                    mobileCaptureForm.down("field[name=name]").setValue(name);
                    mobileCaptureForm.down("field[name=gender]").setValue(gender);
                }
               
            } 
            else {
                Ext.Viewport.unmask();
                Ext.Msg.alert("Unable to login", data.message);
            }
        };

        // Failure
        var failureCallback = function(response, ops) {
            Ext.Msg.alert("Server Failure", response.message);
            Ext.Viewport.unmask();

        };

        Ext.Viewport.mask({
            xtype: 'loadmask',
            indicator: true,
            message: 'Signing In'
        });
        Ext.Ajax.request({
            url: Racloop.util.Config.url.RACLOOP_LOGIN_AS_FACEBOOK,
            method: 'post',
            withCredentials: true,
            useDefaultXhrHeader: false,
            params: Ext.JSON.encode({
                email: email,
                facebookId : facebookId,
                name:name,
                gender:gender
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            success: successCallback,
            failure: failureCallback
        });
    },

    saveMobileButtonTap : function(button, e, eOpts) {
        var user = Ext.create("Racloop.model.User", {});
        var registerForm = button.up('formpanel'); // Register form
        var values = registerForm.getValues(); // Form values

        //TODO Need to be removed
        //Ext.ComponentQuery.query('#registerScreenRepeatPassword')[0].setValue(values.password);
        //Ext.ComponentQuery.query('#registerScreenFemale')[0].setValue(true);
        var mainNavigationView = this.getMainNavigationView(); // Main view
        registerForm.updateRecord(user);

        var validationObj = user.validate();
        var mobileErrors = validationObj.getByField('mobile');
        if (mobileErrors != null && mobileErrors.length > 0) {
            var errorString = mobileErrors[0].getMessage() + "<br>";
            var field = Ext.ComponentQuery.query('mobileCaptureForm #mobileNumber');
            field[0].addCls('error');
            // var errorString = this.handleFBRegisterationFormValidation(validationObj);
            Ext.Msg.alert("Oops", errorString);
        } else {
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
                    Ext.Msg.alert("Success", data.message);
                    //Ext.toast({message: data.message, timeout: Racloop.util.Config.toastTimeout, animation: true, cls: 'toastClass'});
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
                message: 'Signing Up'
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
                    facebookId:values.facebookId,
                    referalCode:values.referalCode
                }),
                success: successCallback,
                failure: failureCallback
            });
        }            
    }
});