
Ext.define('Racloop.view.SettingsMenu', {
    extend: 'Ext.Panel',
    alias: 'widget.settingsMenu',
    xtype: 'settingsMenu',

    requires: [
        'Ext.Button'
    ],

    config: {
        centered: true,
        hidden: true,
        itemId: 'settingsMenu',
        padding: 3,
        hideOnMaskTap: true,
        modal: true,
        items: [{
            xtype: 'button',
            navView: 'termsPanel',
            margin: 3,
            iconCls: 'info',
            text: 'Terms',
            ui: 'confirm'
        }, {
            xtype: 'button',
            navView: 'editprofileform',
            margin: 3,
            iconCls: 'user',
            text: 'Profile',
            ui: 'confirm'
        }, {
            xtype: 'button',
            navView: 'changePasswordForm',
            margin: 3,
            iconCls: 'key',
            text: 'Password',
            ui: 'confirm'
        }, {
            xtype: 'button',
            navView: 'mainNavigationView',
            margin: 3,
            iconCls: 'power',
            text: 'Logout',
            itemId: 'logoutButton',
            ui: 'decline'
        }]
    }
});
