
Ext.define('Racloop.view.PrivacyPanel', {
    extend: 'Ext.Panel',
    alias: 'widget.privacyPanel',

    requires: [
        'Ext.Label'
    ],

    config: {
        itemId: 'privacyPanel',
        items: [{
            xtype: 'panel',
            styleHtmlContent: true,
            itemId: 'privacyText'
        }]
    }

});