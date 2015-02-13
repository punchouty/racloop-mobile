Ext.define('Racloop.view.SearchResultsDataView', {
    extend: 'Ext.Panel',
    alias: 'widget.searchResultsDataView',
    xtype: 'searchResultsDataView',

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