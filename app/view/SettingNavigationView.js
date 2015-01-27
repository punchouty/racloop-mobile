
Ext.define('Racloop.view.SettingNavigationView', {
    extend: 'Ext.navigation.View',
    alias: 'widget.settingNavigationView',
    xtype: 'settingNavigationView',

    requires: [
        'Racloop.util.Config'
    ],

    config: {
        itemId: 'settingNavigationView',        
        items: [{
         xtype: 'list',
         itemId: 'settingList',
         title: 'Settings',
         itemTpl: '<span class="{iconCls}"></span><span class="settingItem">{title}</span>',
            data: [
                //look at setting controller for tap implementation
                { title: Config.settingNameProfile, navView: 'editProfileForm', iconCls: 'profileCls', itemId: 'editProfileForm' },
                { title: Config.settingNameChangePassword, navView: 'changePasswordForm',iconCls: 'passwordCls', itemId: 'changePasswordForm'},
                { title: Config.settingNameEmergencyContacts, navView: 'emergencyContactForm',iconCls: 'emergencyCls', itemId: 'emergencyContactForm'},
                { title: Config.settingNameDataPrivacy ,navView: 'privacyPanel',iconCls: 'privacyCls', itemId: 'privacyPanel'},
                { title: Config.settingNameTerms ,navView: 'termsPanel',iconCls: 'termsCls', itemId: 'termsPanel'},
                { title: Config.settingNameLogout, iconCls: 'logoutCls'}
            ]
        }]
        // navigationBar: {
        //     centered: false,
        //     docked: 'top',
        //     itemId: 'navBar',
        //     layout: {
        //         type: 'hbox',
        //         align: 'center'
        //     },
        //     items: [{
        //         xtype: 'button',
        //         itemId: 'settingsMenuButton',
        //         iconCls: 'settings',
        //         text: 'Settings',
        //         align: 'right'
        //     }]
        // }
    }

});