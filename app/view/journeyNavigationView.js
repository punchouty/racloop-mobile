Ext.define('Racloop.view.JourneyNavigationView', {
    extend: 'Ext.navigation.View',
    xtype: 'journeyNavigationView',

    requires: [
        //'RacloopApp.model.Journey',
        'Racloop.store.Journeys',
        'Ext.DataView',
        'Racloop.view.JourneyViewItem'
    ],
    config: {
        items: [{
            title: 'My Journeys',
            itemId: 'myJourneyView',
            xtype: 'dataview',
            fullscreen: true,
            defaultType: 'journeyViewItem',
            useComponents: true,
            animation: {
                duration: 3000,
                easing: 'ease-in-out',
                type: 'slide',
                direction: 'right'
            },
            scrollable: {
                direction: 'vertical'
            },
            store: "journeyStore"
        }]
    }
});