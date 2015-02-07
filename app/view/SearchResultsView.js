Ext.define('Racloop.view.SearchResultsView', {
    extend: 'Ext.Panel',
    alias: 'widget.searchResultsView',
    xtype: 'searchResultsView',

    requires: [
        'Racloop.store.Searches',
        'Racloop.view.SearchResultViewItem'
    ],

    config: {
        title: 'Search Results',
        xtype: 'panel',
        layout: 'vbox',

        items: [
            {
            xtype: 'button',
            itemId: 'saveJourney',
            text: 'Save Request',
            iconCls: 'acceptCls',
            iconMask: true,
            iconAlign: 'left',
            ui: 'confirm',
            margin: 10
            //padding: 8
        },
//            {
//                xtype: 'panel',
//                flex:1,
//                //scrollable: false,
//                html: 'Header'
//            },
            {
            xtype : 'dataview',
            flex:4,
            defaultType: 'searchResultViewItem',
            useComponents: true,
            store: 'SearchStore'
        }]
    }
});