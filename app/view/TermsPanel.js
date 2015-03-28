Ext.define('Racloop.view.TermsPanel', {
    extend: 'Ext.Panel',
    alias: 'widget.termsPanel',

    requires: [

    ],

    config: {
        itemId: 'termsPanel',
        items: [{
            xtype: 'panel',
            styleHtmlContent: true,
            itemId: 'termsText'
        }]
    }

});