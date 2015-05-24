Ext.define('Racloop.view.JourneyRatingView', {
    extend: 'Ext.Container',
    alias: 'widget.sosView',
    xtype : 'ratingView',

    requires: [
        'Ext.Panel',
        'Ext.Button',
        'Ext.Label',
        'Ext.layout.HBox',
        'Ext.TitleBar',
    ],

    config: {
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },
        items: [
            {
                docked: 'top',
                xtype: 'titlebar',
                title : "FeedBack"
            },{
                xtype: 'formpanel',
                itemId: 'ratingViewPanel',
                items: []
            },
            {
                xtype: 'button',
                itemId: 'saveFeedBack',
                margin: 20,
                padding: 8,
                text: 'Save FeedBack',
                ui: 'action'
            },{
                xtype: 'button',
                itemId: 'cancelFeedBack',
                margin: 20,
                padding: 8,
                text: 'Cancel FeedBack',
                ui: 'decline'
            }]
    }

});