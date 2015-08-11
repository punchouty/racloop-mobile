Ext.define('Racloop.view.JourneyNavigationView', {
    extend: 'Ext.navigation.View',
    xtype: 'journeyNavigationView',
    alias : 'widget.journeyNavigationView',

    requires: [
        'Racloop.view.MyJourneyView',
        'Racloop.util.Config'
    ],
    config: {
        items: [{
            title : Config.tabMyJourneys,
            xtype : 'myJourneyView'
        }],
        navigationBar: {
            backButton: {
                id: 'journeyNavigationViewBack'
            }
        }
    }
});
