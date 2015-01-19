Ext.define('Racloop.controller.SettingsController', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            mainTabs: '#mainTabs',
            mainNavigationView: 'mainNavigationView',
            settingNavigationView: '#settingNavigationView',
            settingsMenu: {
                selector: '#settingsMenu',
                xtype: 'settingsMenu'
            }
        },

        control: {
            // "mainTabs #infoNavigationView": {
            //     back: 'goBack'
            // },
            // "infoNavigationView #settingsMenuButton": {
            //     tap: 'showMenu'
            // },
            "settingsMenu button": {
                tap: 'navigate'
            },
            'settingNavigationView #settingList': {
                itemtap: 'onSettinglistItemTap'
            }
        }
    },

    showMenu: function(target) {
        // Get or create navigation menu

        var menu = this.getSettingsMenu();
        if (!menu) {
            menu = Ext.create('widget.settingsMenu');
        }

        var menuItems = menu.getItems().items, // Menu buttons
            currentView = this.currentView || "termsPanel"; // Current view alias, default to home
        // Disable active view's button
        menuItems.forEach(function(button) {

            // Get custom navView attribute
            var navView = button.config.navView;
            // Active button, disable
            if (currentView == navView) {
                button.disable();
            }

            // Enable all others
            else {
                button.enable();
            }

        });

        // Show menu by menu button
        menu.showBy(target);

    },

    navigate: function(button, e, eOpts) {
        /**
         *	The following code enables navigation
         *	by checking the custom attribute 'navView',
         *	which is the alias of the view to show
         */

        var text = button.getText(), // Button text
            navView = button.getInitialConfig().navView, // Get custom attribute 'navView'
            infoNavigationView = this.getInfoNavigationView(), // Main navigation view
            navMenu = this.getSettingsMenu(); // Navigation menu

        //infoNavigationView.pop();
        // Add view to main view
        infoNavigationView.push({
            xtype: navView,
            title: text
        });

        // Remember current view alias
        this.currentView = navView;
        // Hide menu
        navMenu.hide();

    },

    goBack: function(target, eOpts) {
        var infoNavigationView = this.getInfoNavigationView();
        var menu = this.getSettingsMenu();
        var menuItems = menu.getItems().items; // Menu buttons
        this.currentView = infoNavigationView.getActiveItem().getItemId();
        var currentView = this.currentView;
        menuItems.forEach(function(button) {

            // Get custom navView attribute
            var navView = button.config.navView;
            // Active button, disable
            if (currentView == navView) {
                button.disable();
            }

            // Enable all others
            else {
                button.enable();
            }

        });
    },
    onSettinglistItemTap: function(dataview, index, target, record, e, options) {
        var searchNavigationView = this.getSettingNavigationView(),
            mainNavigationView = this.getMainNavigationView();
        var navView = record.get("navView");
        var title=record.get("title");
        if(title.toLowerCase().indexOf("logout") <= -1) {
            searchNavigationView.push({
                xtype: navView,
                title: title
            });
        } else {                 
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
        }
        // if (title.toLowerCase().indexOf("terms") > -1){
        //     searchNavigationView.push({
        //     xtype: navView,
        //     title: text
        // });

        // } else if (title.toLowerCase().indexOf("profile") > -1){

        // } else if(title.toLowerCase().indexOf("password") > -1){

        // } else if(title.toLowerCase().indexOf("logout") > -1){

        // }  
    }

});