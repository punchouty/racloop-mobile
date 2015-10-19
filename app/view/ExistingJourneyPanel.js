Ext.define('Racloop.view.ExistingJourneyPanel', {
    extend : 'Ext.Panel',
    alias : 'widget.existingJourneyPanel',
    xtype : 'existingJourneyPanel',

    requires : [
        'Ext.Label'
    ],

    config: {
        itemId: 'existingPanel',
        scrollable: true,
        previousJourney: {},
        newJourney: {},
        layout: {
            type: 'vbox',
            autoScroll: true
        },
        items: [
           {
                xtype: 'container',                
                itemId: 'existingJourneyInfo',
                html: 'newJourney'                         
            },{
                xtype: 'button',
                text: 'Keep Original and Search',
                ui: 'confirm',
                iconCls: 'acceptCls',
                iconMask: true,
                iconAlign: 'left',
                margin: 10,
                itemId: 'existingJourneyKeepOriginalButton'
            },{
                xtype: 'button',
                text: 'Replace and Search',
                ui: 'action',
                iconCls: 'replaceCls',
                iconMask: true,
                iconAlign: 'left',
                margin: 10,
                itemId: 'existingJourneyReplaceButton'
            }
        ]
    }

});