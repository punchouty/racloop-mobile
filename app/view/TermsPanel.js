Ext.define('Racloop.view.TermsPanel', {
    extend: 'Ext.Panel',
    alias: 'widget.termsPanel',

    requires: [
        'Ext.Label'
    ],

    config: {
        itemId: 'termsPanel',
        items: [{
            xtype: 'container',
            centered: true,
            html: 'Terms and Conditions',
            itemId: 'termsText'
        }]
    }

});