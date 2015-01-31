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
            searchNavigationView: 'searchNavigationView',
            searchForm: 'searchNavigationView #searchForm',
            settingNavigationView : 'settingNavigationView',
            settingListView : 'settingNavigationView #settingListView',
            myJourneyTab: 'mainTabs > tabbar > tab'
        },

        control: {
            showLoginButton : {
                tap: 'showLogin'
            },
            myJourneyTab : {
                tap : 'tabClicked'
            }
        }
    },

    launch: function(app) {

    },

    tabClicked: function(button, e, eOpts) {
        if(button.getTitle() === Config.tabMyJourneys) {
            Ext.getStore('journeyStore').load();
        }
        else if(button.getTitle() === Config.tabHistory) {
            Ext.getStore('historyStore').load();
        }
        else if(button.getTitle() === Config.tabSearch) {
            var searchForm = this.getSearchForm();
            var activeItem = this.getSearchNavigationView().getActiveItem();
            if(searchForm != activeItem) this.getSearchNavigationView().pop();
        }
        else if(button.getTitle() === Config.tabSettings) {
            var settingListView = this.getSettingListView();
            var activeItem = this.getSettingNavigationView().getActiveItem();
            if(settingListView != activeItem) this.getSettingNavigationView().pop();
        }
        //Ext.Msg.alert("Tab Clicked", button.getTitle());
    },

    showLogin: function(button, e, eOpts) {
        var mainNavigationView = this.getMainNavigationView(); // Main view

        // Navigate to login
        mainNavigationView.push({
            itemId: 'loginForm',
            xtype: "loginForm",
            title: "Sign In"
        });
        if(LoginHelper.getEmail()) {
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