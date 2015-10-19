Ext.define('Racloop.store.Searches', {
    extend: 'Ext.data.Store',
    requires: [
        'Ext.data.proxy.LocalStorage'
    ],
    config: {
        model: 'Racloop.model.Journey',
        storeId: 'SearchStore',
        //autoLoad: true,
        proxy: {
            type: 'memory',
            id: 'resultJourney'
        }
    }
});