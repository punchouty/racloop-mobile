Ext.define('Racloop.view.JourneyRatingView', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ratingView',
    xtype : 'ratingView',

    requires: [
        'Ext.Panel',
        'Ext.Button',
        'Ext.Label',
        'Ext.layout.HBox',
        'Ext.TitleBar'
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
                xtype: 'container',
                itemId: 'ratingViewPanel',
                html: 'Feedback'
            },{
                xtype: 'panel',
                itemId: 'userReviews',
                items: [{
                     xtype: "hiddenfield",
                     name: 'journeyId'
                }]
                // listeners: {
                //     add: function( field, item, index, eOpts ) {
                //         // body...
                //         console.log(field);
                //     }
                // } 
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