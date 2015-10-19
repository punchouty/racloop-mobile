Ext.define('Racloop.store.Passengers', {
    extend: 'Ext.data.Store',
    xtype: 'passengersStore',
    requires: [
        'Racloop.util.Config'
    ],
    config: {
        model: 'Racloop.model.Journey',
        storeId: 'passengersStore',
        autoLoad: false,
        proxy: {
            type: 'ajax',
            url: Config.url.RACLOOP_PASSENGERS,
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
        }
    }
});