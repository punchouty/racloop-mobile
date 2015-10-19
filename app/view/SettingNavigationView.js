
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
                { title: Config.settingNameProfile, navView: 'editProfileForm', iconCls: 'profileCls settingNavigationViewEditProfile', itemId: 'editProfileForm' },
                { title: Config.settingPreferences, navView: 'preferences', iconCls: 'preferencesCls settingNavigationViewPreferences', itemId: 'preferences' },
                //{ title: Config.settingNameEmergencyContacts, navView: 'emergencyContactForm',iconCls: 'emergencyCls', itemId: 'emergencyContactForm'},
                { title: Config.settingRecurringSearches, navView: 'recurringView',iconCls: 'time1Cls settingNavigationViewRecurringView', itemId: 'recurringSearches'},
                { title: Config.settingNameChangePassword, navView: 'changePasswordForm',iconCls: 'passwordCls settingNavigationViewChangePasswordForm', itemId: 'changePasswordForm'},
                { title: Config.settingNameDataPrivacy ,navView: 'privacyPanel',iconCls: 'privacyCls settingNavigationViewPrivacyPanel', itemId: 'privacyPanel'},
                { title: Config.settingNameTerms ,navView: 'termsPanel',iconCls: 'termsCls settingNavigationViewTermsPanel', itemId: 'termsPanel'},
                { title: Config.settingHelp ,navView: 'helpPageView',iconCls: 'termsCls', itemId: 'helpPanel'},
                { title: Config.settingNameLogout, iconCls: 'logoutCls settingNavigationViewLogout'}
            ]
        }],        
        navigationBar: {
            backButton: {
                id: 'settingNavigationViewBack'
            }
        }
    }
   // ,
   // push: function (view) {
   //     // ref http://stackoverflow.com/questions/11522736/sencha-touch-clicking-a-button-rapidly-will-push-a-view-twice
   //   if(typeof this.getActiveItem() == 'undefined' || this.getActiveItem().xtype != view.xtype) {
   //      this.callParent(arguments);
   //     }
   //   else {
   //      console.warn("Prevented pushing a potentially duplicate view of xtype: " + view.xtype);
   //      view.destroy();
   //   }
   //}

});