
Ext.define('Racloop.view.JourneyDetailsPanel', {
    extend: 'Ext.Panel',
    alias: 'widget.journeyDetailsPanel',

    requires: [
        'Ext.Label'
    ],

    config: {
        itemId: 'JourneyDetailsPanel',
        items: [{
            xtype: 'panel',
            styleHtmlContent: true,
            itemId: 'JourneyDetailsText'
        }]
    }

});