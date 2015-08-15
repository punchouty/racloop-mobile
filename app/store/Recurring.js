Ext.define('Racloop.store.Recurring', { //Ext.getStore('journeyStore').load()
    extend: 'Ext.data.Store',
    xtype: 'recurringStore',
    requires: [
        'Racloop.util.Config'
    ],
    config: {
        model: 'Racloop.model.Journey',
        storeId: 'recurringStore',
        //autoLoad: true,
        proxy: {
            type: 'ajax',
            url: Config.url.RACLOOP_RECURRING_JOURNEY + "?" + Ext.urlEncode({
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
            beforeload: function(store, operation, eOpts) {
                //console.log('Before load');
            },
            load: function() {
                //console.log('loaded');
            }
        }
    }
});