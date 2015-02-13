
Ext.define('Racloop.view.JourneyEmptyView', {
    extend: 'Ext.Container',
    xtype : 'journeyEmptyView',
    alias : 'widget.journeyEmptyView',

    requires: [
        'Ext.Panel',
        'Ext.Button',
        'Ext.Label',
        'Ext.layout.VBox',
        'Racloop.util.Config'
    ],

    config: {
        items: [{
            xtype: 'panel',
            items: [{
                xtype: 'container',
                html: '<div class="section-header">' +
                        '<div class="small-text-medium uppercase colored-text">' +
                        'No Active Journeys Found' +
                        '</div>' +
                        '<div class="colored-line"></div>' +
                        '<div class="sub-heading">Go to search tab to request a ride.</div>' +
                      '</div>',
                itemId: 'emptyJourney',
                items: {
                    docked: 'top',
                    xtype: 'titlebar',
                    title: Config.tabMyJourneys
                }
            }]
        }]
    }

});