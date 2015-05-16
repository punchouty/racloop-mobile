Ext.define('Racloop.store.Journeys', { //Ext.getStore('journeyStore').load()
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
            url: Config.url.RACLOOP_JOURNEYS + "?" + Ext.urlEncode({
                currentTime : Ext.Date.format(new Date(),'c')
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
            noCache: true,
            useDefaultXhrHeader: false,
            reader: {
                type: "json",
                rootProperty: "data",
                totalProperty: 'total',
                successProperty: 'success'
            }
        },
        listeners: {
            refresh: function() {

            },
            load: function() {

            },
            beforeload: function() {

            }
        }
    }
});