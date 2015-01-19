
Ext.define('Racloop.view.MainNavigationView', {
    extend: 'Ext.navigation.View',
    alias: 'widget.mainNavigationView',

    requires: [
        'Ext.Panel',
        'Ext.Button',
        'Ext.Label',
        'Ext.layout.HBox'
    ],

    config: {
        items: [{
            title: 'Welcome',
            xtype: 'panel',
            itemId: 'homePanel',
            layout: 'vbox',
            id: 'homePanel',
            items: [{
                xtype: 'container',
                html: '<div class="section-header">' +
                        '<div class="small-text-medium uppercase colored-text">' +
                        'A Free Capool Finder' +
                        '</div>' +
                        '<h2 class="dark-text"><strong>Rac</strong>loop</h2>' +
                        '<div class="colored-line"></div>' +
                        '<div class="sub-heading">Save money, Make friends and Contribute to Greener Environment.</div>' +
                      '</div>',
                itemId: 'homeLabel',
                flex: 2

            }, {
                xtype: 'panel',
                itemId: 'loginPanel',
                flex: 1,
                items: [{
                    xtype: 'button',
                    itemId: 'showLoginButton',
                    iconCls: 'lockCls',
                    iconMask: true,
                    iconAlign: 'left',
                    ui: 'action',
                    margin: 10,
                    text: 'Sign In'
                },
                {
                    xtype: 'panel',
                    itemId: 'loginButtonGroupPanel',
                    flex: 1,
                    layout : {
                        type : 'hbox'
                    },
                    items: [
                        {
                            xtype: 'button',
                            itemId: 'showRegisterButton',
                            margin: 10,
                            text: 'Register',
                            ui: 'confirm',
                            iconCls: 'registerCls',
                            iconMask: true,
                            iconAlign: 'left',
                            flex : 1
                        },
                        {
                            xtype: 'button',
                            itemId: 'showVerifyMobileButton',
                            margin: 10,
                            text: 'Verify Mobile',
                            iconCls: 'mobileCls',
                            iconMask: true,
                            iconAlign: 'left',
                            ui: 'confirm',
                            flex : 1
                        }
                    ]
                }, {
                    xtype: 'button',
                    itemId: 'showForgotPasswordButton',
                    margin: 10,
                    text: 'Forgot Password',
                    iconCls: 'forgotPasswordCls',
                    iconMask: true,
                    iconAlign: 'left',
                    ui: 'decline'
                }]
            }]
        }]
    }

});