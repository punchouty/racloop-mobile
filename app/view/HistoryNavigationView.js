Ext.define('Racloop.view.HistoryNavigationView', {
    extend: 'Ext.navigation.View',
    xtype: 'historyNavigationView',
    alias : 'widget.historyNavigationView',

    requires: [
        'Ext.DataView',
        'Racloop.store.History',
        'Racloop.view.HistoryViewItem',
        'Racloop.util.Config'
    ],
    config: {
        items: [{
            title: Config.tabHistory,
            xtype: 'dataview',
            itemId: 'historyView',
            fullscreen: true,
            defaultType: 'historyViewItem',
            useComponents: true,
            store: "historyStore",
//            animation: {
//                duration: 3000,
//                easing: 'ease-in-out',
//                type: 'slide',
//                direction: 'right'
//            },
            scrollable: {
                direction: 'vertical'
            }
        }]
    }
});