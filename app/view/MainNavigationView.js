
Ext.define('Racloop.view.MainNavigationView', {
    extend: 'Ext.navigation.View',
    alias: 'widget.mainNavigationView',
    xtype: 'mainNavigationView',

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
            items: [{
                xtype: 'container',
                html: '<div class="section-header">' +
                        '<img src="resources/icons/logo-mono.png"/>' +
                        '<div class="colored-line"></div>' +
                        '<div class="sub-heading">' +
                            'Search, Connect and Go' +
                        '</div>' +
                      '</div>',
                itemId: 'homeLabel'

            }, {
                xtype: 'button',
                itemId: 'showLoginButton',
//                iconCls: 'lockCls',
//                iconMask: true,
//                iconAlign: 'right',
                ui: 'action',
                text: 'Sign In',
                margin: 10
            }, {
                xtype: 'container',
                html: '<div class="links">' +
                    '<a href="#" class="small-text-medium colored-text" onclick="Racloop.app.getController(\'UiController\').showRegister(); return false;">' +
                    'New User?' +
                    '</a>' +
                    '</div>',
                itemId: 'homeLinks',
                margin: '20 10 10 10'

            }]
        }]
    }

});