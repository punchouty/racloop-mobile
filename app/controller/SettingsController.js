Ext.define('Racloop.controller.SettingsController', {
    extend: 'Ext.app.Controller',

    requires: [
        'Racloop.util.Config'
    ],

    config: {
        refs: {
            mainTabs: 'mainTabs',
//            mainNavigationView: 'mainNavigationView',
            settingNavigationView: '#settingNavigationView'
//            settingsMenu: {
//                selector: '#settingsMenu',
//                xtype: 'settingsMenu'
//            }
        },

        control: {
            // "mainTabs #infoNavigationView": {
            //     back: 'goBack'
            // },
            // "infoNavigationView #settingsMenuButton": {
            //     tap: 'showMenu'
            // },
//            "settingsMenu button": {
//                tap: 'navigate'
//            },
            'settingNavigationView #settingList': {
                itemtap: 'onSettinglistItemTap'
            }
        }
    },

//    showMenu: function(target) {
//        // Get or create navigation menu
//
//        var menu = this.getSettingsMenu();
//        if (!menu) {
//            menu = Ext.create('widget.settingsMenu');
//        }
//
//        var menuItems = menu.getItems().items, // Menu buttons
//            currentView = this.currentView || "termsPanel"; // Current view alias, default to home
//        // Disable active view's button
//        menuItems.forEach(function(button) {
//
//            // Get custom navView attribute
//            var navView = button.config.navView;
//            // Active button, disable
//            if (currentView == navView) {
//                button.disable();
//            }
//
//            // Enable all others
//            else {
//                button.enable();
//            }
//
//        });
//
//        // Show menu by menu button
//        menu.showBy(target);
//
//    },
//
//    navigate: function(button, e, eOpts) {
//        /**
//         *	The following code enables navigation
//         *	by checking the custom attribute 'navView',
//         *	which is the alias of the view to show
//         */
//
//        var text = button.getText(), // Button text
//            navView = button.getInitialConfig().navView, // Get custom attribute 'navView'
//            infoNavigationView = this.getInfoNavigationView(), // Main navigation view
//            navMenu = this.getSettingsMenu(); // Navigation menu
//
//        //infoNavigationView.pop();
//        // Add view to main view
//        infoNavigationView.push({
//            xtype: navView,
//            title: text
//        });
//
//        // Remember current view alias
//        this.currentView = navView;
//        // Hide menu
//        navMenu.hide();
//
//    },
//
//    goBack: function(target, eOpts) {
//        var infoNavigationView = this.getInfoNavigationView();
//        var menu = this.getSettingsMenu();
//        var menuItems = menu.getItems().items; // Menu buttons
//        this.currentView = infoNavigationView.getActiveItem().getItemId();
//        var currentView = this.currentView;
//        menuItems.forEach(function(button) {
//
//            // Get custom navView attribute
//            var navView = button.config.navView;
//            // Active button, disable
//            if (currentView == navView) {
//                button.disable();
//            }
//
//            // Enable all others
//            else {
//                button.enable();
//            }
//
//        });
//    },
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
                LoginHelper.removeUser();
                Ext.Viewport.unmask();
                Ext.Viewport.add(Ext.create('Racloop.view.MainNavigationView'));
                Ext.Viewport.remove(mainTabs, true);

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