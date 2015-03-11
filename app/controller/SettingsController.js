Ext.define('Racloop.controller.SettingsController', {
    extend: 'Ext.app.Controller',

    requires: [
        'Racloop.util.Config'
    ],

    config: {
        refs: {
            mainTabs: 'mainTabs',
            settingNavigationView: '#settingNavigationView'
        },

        control: {
            'settingNavigationView #settingListView': {
                itemtap: 'onSettinglistItemTap'
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
            this.logout();
        } else if(title === Config.settingNameTerms) {
            searchNavigationView.push({
                itemId: itemId,
                xtype: navView,
                title: title
            });
            this.setTerms();
        } else if(title === Config.settingNameDataPrivacy) {
            searchNavigationView.push({
                itemId: itemId,
                xtype: navView,
                title: title
            });
            this.setPrivacy();
        } else {
            searchNavigationView.push({
                itemId: itemId,
                xtype: navView,
                title: title
            });
        }
    },

    logout: function() {
        var mainTabs = this.getMainTabs();
        var successCallback = function(response, ops) {
            var data = Ext.decode(response.responseText);
            if (data.success) {
                console.log("Logged out successfully");
                LoginHelper.removeUser();
                LoginHelper.removeCurrentJourney();
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

    },

    setTerms : function() {
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

    setPrivacy : function() {
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
    }

});