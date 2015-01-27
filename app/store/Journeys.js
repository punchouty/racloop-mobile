Ext.define('Racloop.store.Journeys', { //Ext.getStore('journeyStore').load()
    extend: 'Ext.data.Store',
    xtype: 'journeyStore',
    requires: [
        'Racloop.util.Config'
    ],
    config: {
        model: 'Racloop.model.Journey',
        storeId: 'journeyStore',
        //autoLoad: true,
        proxy: {
            type: 'ajax',
            url: Config.url.RACLOOP_JOURNEYS,
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