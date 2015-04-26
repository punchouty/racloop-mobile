Ext.define('Racloop.view.JourneyNavigationView', {
    extend: 'Ext.navigation.View',
    xtype: 'journeyNavigationView',
    alias : 'widget.journeyNavigationView',

    requires: [
        'Ext.DataView',
        'Racloop.store.Journeys',
        'Racloop.view.JourneyViewItem',
        'Racloop.util.Config'
    ],
    config: {
        items: [{
            title: Config.tabMyJourneys,
            itemId: 'journeyView',
            xtype: 'dataview',
            fullscreen: true,
            defaultType: 'journeyViewItem',
            useComponents: true,
//            animation: {
//                duration: 3000,
//                easing: 'ease-in-out',
//                type: 'slide',
//                direction: 'right'
//            },
            scrollable: {
                direction: 'vertical'
            },
            store: "journeyStore"
        }]
    }
});
