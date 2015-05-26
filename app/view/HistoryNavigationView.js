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
            xtype: 'historyView'
        }]
    }
});