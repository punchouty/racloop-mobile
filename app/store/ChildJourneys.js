Ext.define('Racloop.store.ChildJourneys', {
    extend: 'Ext.data.Store',
    xtype: 'childJourneyStore',
    requires: [
        'Racloop.util.Config'
    ],
    config: {
        model: 'Racloop.model.Journey',
        storeId: 'childJourneyStore',
        autoLoad: false,
        proxy: {
            type: 'ajax',
            url: Config.url.RACLOOP_CHILD_JOURNEYS,
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