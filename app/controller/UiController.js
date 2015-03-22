Ext.define('Racloop.controller.UiController', {
    extend: 'Ext.app.Controller',

    requires: [
        'Racloop.view.MainTabs',
        'Racloop.view.MainNavigationView',
        'Racloop.util.LoginHelper',
        'Racloop.util.Common',
        'Racloop.util.Config'
    ],

    config: {
        refs: {
            mainTabs: 'mainTabs',
            mainNavigationView: 'mainNavigationView',
            showLoginButton: 'mainNavigationView #showLoginButton',

            journeyNavigationView: 'journeyNavigationView',
            journeyView: 'journeyNavigationView #journeyView',
            journeyEmptyView: 'journeyNavigationView journeyEmptyView',

            historyNavigationView : 'historyNavigationView',
            historyView : 'historyNavigationView #historyView',
            historyEmptyView : 'historyNavigationView historyEmptyView',

            searchNavigationView: 'searchNavigationView',
            searchForm: 'searchNavigationView #searchForm',

            settingNavigationView : 'settingNavigationView',
            settingListView : 'settingNavigationView #settingListView',

            tabs: 'mainTabs > tabbar > tab'
        },

        control: {
            showLoginButton : {
                tap: 'showLogin'
            },
            tabs : {
                tap : 'tabClicked'
            }
        }
    },

    launch: function(app) {

    },

    enable : function() {
        console.log("this.getSearchNavigationView() : " + this.getSearchNavigationView());
//        this.getSearchNavigationView().enable();
//        this.getSearchForm().enable();
//        this.getSettingListView().enable();
//        this.getJourneyNavigationView().enable();
//        this.getHistoryNavigationView().enable();
//        this.getMainNavigationView().enable();
//        this.getMainTabs().enable();
    },

    disable : function() {
//        this.getSearchNavigationView().disable();
//        this.getSearchForm().disable();
//        this.getSettingListView().disable();
//        this.getJourneyNavigationView().disable();
//        this.getHistoryNavigationView().disable();
//        this.getMainNavigationView().disable();
//        this.getMainTabs().disable();
    },

    tabClicked: function(button, e, eOpts) {
        var me = this;
        Racloop.app.getController('MapController').stopWatchingJourney();
        if(button.getTitle() === Config.tabMyJourneys) {
            Ext.getStore('journeyStore').load({
                callback: function(records, operation, success) {
                    me.showMyJourneys();
                },
                scope: this
            });
        }
        else if(button.getTitle() === Config.tabHistory) {
            Ext.getStore('historyStore').load({
                callback: function(records, operation, success) {
                    me.showHistory();
                },
                scope: this
            });
        }
        else if(button.getTitle() === Config.tabSearch) {
            var searchForm = this.getSearchForm();
            var activeItem = this.getSearchNavigationView().getActiveItem();
            if(searchForm != activeItem) this.getSearchNavigationView().pop();
            Racloop.app.getController('MapController').updateFromFieldWithCurrentLocation();
        }
        else if(button.getTitle() === Config.tabSettings) {
            var settingListView = this.getSettingListView();
            var activeItem = this.getSettingNavigationView().getActiveItem();
            if(settingListView != activeItem) this.getSettingNavigationView().pop();
        }
        else if(button.getTitle() === Config.tabHome) {
            var currentJourney = LoginHelper.getCurrentJourney();
            if(currentJourney) {
                Racloop.app.getController('MapController').startWatchingJourney();
                console.log('startWatchingJourney');
            }
            else {
                Racloop.app.getController('MapController').updateCurrentLocationOnMap();
                console.log('updateCurrentLocationOnMap');
            }
            //Racloop.app.getController('MapController').startWatchingJourney();
        }
        //Ext.Msg.alert("Tab Clicked", button.getTitle());
    },

    showAndLoadAfterDelay: function() {
        var me = this;
        var showMyJourneysFunction = me.showMyJourneys();
        var loadMyJourney = function() {
            console.log("Calling loadMyJourney");
            Ext.getStore('journeyStore').load({
                callback: function(records, operation, success) {
                    console.log("Calling loadMyJourney load : " + Ext.getStore('journeyStore').getAllCount());
                    me.showMyJourneys();
                    //Ext.Function.defer(showMyJourneysFunction, 500, me);
                },
                scope: me
            });
        };
        Ext.Function.defer(loadMyJourney, 500, me);
    },

    showMyJourneys: function() {
        var journeyNavigationView = this.getJourneyNavigationView();
        var recordCount = Ext.getStore('journeyStore').getAllCount();
        var itemCount = this.getJourneyNavigationView().getItems().length;
        if(recordCount == 0) {
            console.log("showMyJourneys: recordCount == 0");
            if(itemCount == 1) {
                console.log("showMyJourneys: recordCount == 0 & itemCount == 1");
                var activeItem = journeyNavigationView.getActiveItem();
                var journeyEmptyView = this.getJourneyEmptyView();
                if(activeItem != journeyEmptyView) {
                    journeyNavigationView.removeAll(false, true);
                    journeyNavigationView.push({
                        title : Config.tabMyJourneys,
                        xtype : "journeyEmptyView"
                    });
                }
            }
            else {
                console.log("showMyJourneys: recordCount == 0 & itemCount != 1");
                journeyNavigationView.removeAll(false, true);
                journeyNavigationView.push({
                    title : Config.tabMyJourneys,
                    xtype : "journeyEmptyView"
                });
            }
        }
        else {
            console.log("showMyJourneys: recordCount != 0");
            var journeyView = this.getJourneyView();
            var activeItem = journeyNavigationView.getActiveItem();
            var journeyEmptyView = this.getJourneyEmptyView();
            if(activeItem == journeyEmptyView) {
                journeyNavigationView.removeAll(false, true);
                journeyNavigationView.push(journeyView);
            }
            else if(activeItem != journeyEmptyView) {
                journeyNavigationView.pop();
            }
            Ext.ComponentQuery.query('journeyNavigationView #journeyView')[0].refresh();
        }

    },

    showHistory: function() {
        var historyNavigationView = this.getHistoryNavigationView();
        var recordCount = Ext.getStore('historyStore').getAllCount();
        var itemCount = this.getHistoryNavigationView().getItems().length;
        if(recordCount == 0) {
            console.log("showHistory: recordCount == 0");
            if(itemCount == 1) {
                console.log("showHistory: recordCount == 0 & itemCount == 1");
                var activeItem = historyNavigationView.getActiveItem();
                var historyEmptyView = this.getHistoryEmptyView();
                if(activeItem != historyEmptyView) {
                    historyNavigationView.removeAll(false, true);
                    historyNavigationView.push({
                        title : Config.tabHistory,
                        xtype : "historyEmptyView"
                    });
                }
                else {
                    console.log("showHistory: recordCount == 0 & itemCount != 1");
                    historyNavigationView.setActiveItem(historyEmptyView);
                    historyNavigationView.push({
                        title : Config.tabHistory,
                        xtype : "historyEmptyView"
                    });
                }
            }
            else {
                console.log("showHistory: recordCount == 0 & itemCount != 1");
                historyNavigationView.removeAll(false, true);
                historyNavigationView.push({
                    title : Config.tabHistory,
                    xtype : "historyEmptyView"
                });
            }
        }
        else {
            console.log("showHistory: recordCount != 0");
            var historyView = this.getHistoryView();
            var activeItem = historyNavigationView.getActiveItem();
            var historyEmptyView = this.getHistoryEmptyView();
            if(activeItem == historyEmptyView) {
                historyNavigationView.removeAll(false, true);
                historyNavigationView.push(historyView);
            }
            else if(activeItem != historyView) {
                historyNavigationView.pop();
            }
            Ext.ComponentQuery.query('historyNavigationView #historyView')[0].refresh();
        }

    },

    showLogin: function(button, e, eOpts) {
        var mainNavigationView = this.getMainNavigationView(); // Main view

        // Navigate to login
        mainNavigationView.push({
            itemId: 'loginForm',
            xtype: "loginForm",
            title: "Sign In"
        });
        console.log("LoginHelper.getEmail() : " + LoginHelper.getEmail());
        if(!LoginHelper.getEmail()) {
            var emailField = Ext.ComponentQuery.query('#loginScreenEmail')[0];
            emailField.setValue(LoginHelper.getEmail());
        }

    },

    showRegister: function() { //called from href link directly

        //var registerForm = Ext.create('widget.registerform'),	// Registration form
        var mainNavigationView = this.getMainNavigationView(); // Main view

        // Navigate to register
        mainNavigationView.push({
            itemId: 'registerForm',
            xtype: "registerForm",
            title: "Register"
        });

    },

    showForgotPassword: function() { //called from href link directly
        // var ForgotPasswordForm = Ext.create('Racloop.view.ForgotPasswordForm'),    // Login form
        var mainNavigationView = this.getMainNavigationView(); // Main view

        // Navigate to login
        mainNavigationView.push({
            itemId: 'ForgotPasswordForm',
            xtype: "forgotPasswordForm",
            title: "Forgot Password"
        });
    },

    showVerifyMobile: function() { //called from href link directly
        var mainNavigationView = this.getMainNavigationView(); // Main view

        // Navigate to login
        mainNavigationView.push({
            itemId: 'VerifySmsForm',
            xtype: "verifySmsForm",
            title: "Verify Mobile"
        });
    },

    showTerms: function() { //called from href link directly
        var mainNavigationView = this.getMainNavigationView(); // Main view

        mainNavigationView.push({
            itemId: 'termsPanel',
            xtype: "termsPanel",
            title: "Terms of Use"
        });
        Racloop.app.getController('SettingsController').setTerms();
    },

    showPrivacy: function(button, e, eOpts) { //called from href link directly
        var mainNavigationView = this.getMainNavigationView(); // Main view

        // Navigate to login
        mainNavigationView.push({
            itemId: 'privacyPanel',
            xtype: "privacyPanel",
            title: "Data Privacy"
        });
        Racloop.app.getController('SettingsController').setPrivacy();
    }
});