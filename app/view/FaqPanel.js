
Ext.define('Racloop.view.FaqPanel', {
    extend: 'Ext.Panel',
    alias: 'widget.faqPanel',

    requires: [
        'Ext.Label'
    ],

    config: {
        itemId: 'faqPanel',
        items: [{
            xtype: 'label',
            centered: true,
            html: 'Frequently Asked Question',
            itemId: 'faqLabel'
        }]
    }

});