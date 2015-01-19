
Ext.define('Racloop.view.SettingNavigationView', {
    extend: 'Ext.navigation.View',
    alias: 'widget.settingNavigationView',
    //xtype: 'infoNavigationView',

    requires: [
        'Racloop.view.TermsPanel',
        'Ext.Panel',
        'Ext.Button'
    ],

    config: {
        itemId: 'settingNavigationView',        
        items: [{
         xtype: 'list',
         itemId: 'settingList',
         title: 'Settings',
         itemTpl: '<span class="{iconCls}"></span><span style:"margin-left:2%;">{title}</span>',
            data: [
                { title: 'Profile', navView: 'editprofileform', iconCls: 'profileCls' },
                { title: 'Password', navView: 'changePasswordForm',iconCls: 'passwordCls'},
                { title: 'Emergency Contacts', navView: 'emergencyContactForm',iconCls: 'emergencyCls'},
                { title: 'Data Privacy' ,navView: 'privacyPanel',iconCls: 'privacyCls'},
                { title: 'Terms' ,navView: 'termsPanel',iconCls: 'termsCls'},
                { title: 'Logout', navView: 'mainNavigationView',iconCls: 'logoutCls'}
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