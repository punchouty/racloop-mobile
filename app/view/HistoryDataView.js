Ext.define('Racloop.view.HistoryDataView', {
    extend: 'Ext.dataview.DataView',
    xtype: 'historyDataView',
    alias : 'widget.historyDataView',

    requires: [
        'Racloop.store.History',
        'Racloop.view.HistoryViewItem',
        'Racloop.util.Config'
    ],
    config: {
        //title : Config.tabHistory,
        itemId: 'historyDataView',
        fullscreen: true,
        defaultType: 'historyViewItem',
        useComponents: true,
        scrollable: {
            direction: 'vertical'
        },
        store: "historyStore",
        items: {
            docked: 'top',
            xtype: 'titlebar',
            title: Config.tabHistory
        }
    }
});
