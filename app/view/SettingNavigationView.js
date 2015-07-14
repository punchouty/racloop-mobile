
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
         itemId: 'settingListView',
         title: 'Settings',
         itemTpl: '<span class="{iconCls}"></span><span class="settingItem">{title}</span>',
            data: [
                //look at setting controller for tap implementation
                { title: Config.settingNameProfile, navView: 'editProfileForm', iconCls: 'profileCls', itemId: 'editProfileForm' },
                { title: Config.settingPreferences, navView: 'preferences', iconCls: 'preferencesCls', itemId: 'preferences' },
                //{ title: Config.settingNameEmergencyContacts, navView: 'emergencyContactForm',iconCls: 'emergencyCls', itemId: 'emergencyContactForm'},
                { title: Config.settingNameChangePassword, navView: 'changePasswordForm',iconCls: 'passwordCls', itemId: 'changePasswordForm'},
                { title: Config.settingNameDataPrivacy ,navView: 'privacyPanel',iconCls: 'privacyCls', itemId: 'privacyPanel'},
                { title: Config.settingNameTerms ,navView: 'termsPanel',iconCls: 'termsCls', itemId: 'termsPanel'},
                { title: Config.settingNameLogout, iconCls: 'logoutCls'}
            ]
        }]
    }

});