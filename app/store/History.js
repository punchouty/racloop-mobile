Ext.define('Racloop.store.History', { //Ext.getStore('journeyStore').load()
    extend: 'Ext.data.Store',
    xtype: 'historyStore',
    requires: [
        'Racloop.util.Config'
    ],
    config: {
        model: 'Racloop.model.Journey',
        storeId: 'historyStore',
        autoLoad: true,
        proxy: {
            type: 'ajax',
            url: Config.url.RACLOOP_HISTORY + "?" + Ext.urlEncode({
                currentTime : Ext.Date.format(new Date(),'c')
            }),
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