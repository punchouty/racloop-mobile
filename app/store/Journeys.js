Ext.define('Racloop.store.Journeys', {
    extend: 'Ext.data.Store',
    xtype: 'journeyStore',
    requires: [
        'Racloop.util.Config'
    ],
    config: {
        model: 'Racloop.model.Journey',
        storeId: 'journeyStore',
        autoLoad: true,
        proxy: {
            type: 'ajax',
            url: Racloop.util.Config.url.RACLOOP_JOURNEYS,
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
            useDefaultXhrHeader: false,
            reader: {
                type: "json",
                rootProperty: "data",
                //record: 'journey',
                totalProperty: 'total',
                successProperty: 'success'
            }
        },
        listeners: {
            beforeload: function() {
                //console.log('Before load');
            },
            load: function() {
                //console.log('loaded');
            }
        }
    }
});