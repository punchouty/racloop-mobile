Ext.define('Racloop.view.SearchResultsDataView', {
    extend: 'Ext.dataview.DataView',
    xtype: 'searchResultsDataView',

    requires: [
        'Racloop.store.Searches',
        'Racloop.view.SearchResultViewItem'
    ],
    config: {
        fullscreen: true,
        isDummy: true,
        defaultType: 'searchResultViewItem',
        useComponents: true,
        store: 'SearchStore'
    }
});