Ext.define('Racloop.view.MyJourneyView', {
    extend: 'Ext.Panel',
    xtype: 'myJourneyView',
    alias : 'widget.myJourneyView',

    requires: [
        'Ext.layout.VBox',
        'Racloop.view.JourneyViewItem',
        'Racloop.util.Config',
        'Ext.DataView'
    ],
    //layout: {
    //    type: 'vbox'
    //},

    config : {
        layout: 'vbox',
        items: [
            {
                itemId: 'journeyEmptyView',
                xtype: 'panel',
                hidden : true,
                html: '<div class="section-header">' +
                '<div class="small-text-medium uppercase colored-text">' +
                'No Active Journeys Found' +
                '</div>' +
                '<div class="colored-line"></div>' +
                '<div class="sub-heading">Go to search tab to request a ride.</div>' +
                '</div>',
                flex : 1
            },
            {
                itemId: 'journeyDataView',
                xtype: 'dataview',
                defaultType: 'journeyViewItem',
                useComponents: true,
                scrollable: {
                    direction: 'vertical'
                },
                store: "journeyStore",
                flex : 1
            }
        ]

    }

});
