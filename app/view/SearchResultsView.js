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
            itemId: 'saveJourneyButton',
            text: 'Let People Find Me',
            iconCls: 'acceptCls',
            iconMask: true,
            iconAlign: 'left',
            ui: 'confirm',
            hidden: true,
            margin: 25//,
            //padding: 10
        },
        {
            xtype: 'button',
            itemId: 'loginButtonInSearchResults',
            text: 'Login Required',
            iconCls: 'lockCls',
            iconMask: true,
            iconAlign: 'left',
            ui: 'confirm',
            //hidden: true,
            margin: 10,
            padding: 10
        },
        {
            xtype : 'dataview',
            isDummy: false,
            flex:4,
            defaultType: 'searchResultViewItem',
            itemId: 'searchResultsDataViewInner',
            useComponents: true,
            store: 'SearchStore'
        }]
    }
});