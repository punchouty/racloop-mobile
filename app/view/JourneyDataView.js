Ext.define('Racloop.view.JourneyDataView', {
    extend: 'Ext.dataview.DataView',
    xtype: 'journeyDataView',
    alias : 'widget.journeyDataView',

    requires: [
        'Racloop.store.Journeys',
        'Racloop.view.JourneyViewItem',
        'Racloop.util.Config'
    ],
    config: {
        //title : Config.tabMyJourneys,
        itemId: 'journeyDataView',
        fullscreen: true,
        defaultType: 'journeyViewItem',
        useComponents: true,
        scrollable: {
            direction: 'vertical'
        },
        store: "journeyStore",
        items: {
            docked: 'top',
            xtype: 'titlebar',
            title: Config.tabMyJourneys
        }
    }
});