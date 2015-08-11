
Ext.define('Racloop.view.MainNavigationView', {
    extend: 'Ext.navigation.View',
    alias: 'widget.mainNavigationView',
    xtype: 'mainNavigationView',

    requires: [
        'Ext.Panel',
        'Ext.Button',
        'Ext.Label',
        'Ext.layout.HBox',
        'Racloop.form.SearchForm'
    ],

    config: {
        items: [{
            xtype: 'searchForm',
            itemId: 'searchFormInMain',
            title: 'Welcome'
        }],
//        items: [{
//            title: 'Welcome',
//            xtype: 'panel',
//            itemId: 'homePanel',
//            layout: 'vbox',
//            items: [{
//                xtype: 'container',
//                html: '<div class="section-header">' +
//                        '<div class="small-text-medium uppercase colored-text">' +
//                        'Search, Connect and Go' +
//                        '</div>' +
//                        '<h2 class="dark-text"><strong>Cab</strong>Share</h2>' +
//                        '<div class="colored-line"></div>' +
//                        '<div class="sub-heading">' +
//                            'Share Taxi and Auto Rides Conveniently.' +
//                        '</div>' +
//                      '</div>',
//                itemId: 'homeLabel'
//
//            }, {
//                xtype: 'button',
//                itemId: 'showLoginButton',
////                iconCls: 'lockCls',
////                iconMask: true,
////                iconAlign: 'right',
//                ui: 'action',
//                text: 'Sign In',
//                margin: 10
//            }, {
//                xtype: 'container',
//                html: '<div class="links">' +
//                    '<a href="#" class="small-text-medium colored-text" onclick="Racloop.app.getController(\'UiController\').showRegister(); return false;">' +
//                    'New User?' +
//                    '</a>' +
//                    '</div>',
//                itemId: 'homeLinks',
//                margin: '20 10 10 10'
//
//            }]
//        }]
            navigationBar: {
                backButton: {
                    id: 'mainNavigationViewBack'
                }
            }
    }

});