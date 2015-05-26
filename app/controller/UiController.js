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
            journeyDataView: 'myJourneyView #journeyDataView',
            journeyEmptyView: 'myJourneyView #journeyEmptyView',

            historyNavigationView : 'historyNavigationView',
            historyDataView : 'historyView #historyDataView',
            historyEmptyView : 'historyNavigationView #historyEmptyView',

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
        //Racloop.app.getController('MapController').stopWatchingJourney();
        Racloop.app.getController('MapController').setWatching(false);
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
                Racloop.app.getController('MapController').showCurrentJourney();
                Racloop.app.getController('MapController').setWatching(true);
                Racloop.app.getController('MapController').processCurrentLocation();
                console.log('startWatchingJourney');
            }
            else {
                console.log('currentJourney not found');
            }
            Racloop.app.getController('MapController').updateCurrentLocationOnMap();
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
        var journeyDataView = this.getJourneyDataView();
        var journeyEmptyView = this.getJourneyEmptyView();
        var recordCount = Ext.getStore('journeyStore').getAllCount();
        var itemCount = this.getJourneyNavigationView().getItems().length;
        if(recordCount == 0) {
            console.log("showMyJourneys: recordCount == 0");
            journeyEmptyView.setHidden(false);
            journeyDataView.setHidden(true);
        }
        else {
            console.log("showMyJourneys: recordCount != 0 : " + recordCount);
            journeyDataView.refresh();
            journeyEmptyView.setHidden(true);
        }

    },

    showHistory: function() {
        var historyNavigationView = this.getHistoryNavigationView();
        var historyDataView = this.getHistoryDataView();
        var historyEmptyView = this.getHistoryEmptyView();
        var recordCount = Ext.getStore('historyStore').getAllCount();
        if(recordCount == 0) {
            console.log("showHistory: recordCount == 0");
            historyEmptyView.setHidden(false);
            historyDataView.setHidden(true);
        }
        else {
            console.log("showHistory: recordCount != 0, recordCount : " + recordCount);
            historyDataView.refresh();
            historyEmptyView.setHidden(true);
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
            title: "Terms of Use",
            scrollable : true
        });
        Racloop.app.getController('SettingsController').setTerms();
    },

    showPrivacy: function(button, e, eOpts) { //called from href link directly
        var mainNavigationView = this.getMainNavigationView(); // Main view

        // Navigate to login
        mainNavigationView.push({
            itemId: 'privacyPanel',
            xtype: "privacyPanel",
            title: "Data Privacy",
            scrollable : true
        });
        Racloop.app.getController('SettingsController').setPrivacy();
    }
});