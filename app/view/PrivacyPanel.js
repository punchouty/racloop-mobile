
Ext.define('Racloop.view.PrivacyPanel', {
    extend: 'Ext.Panel',
    alias: 'widget.privacyPanel',

    requires: [
        'Ext.Label'
    ],

    config: {
        itemId: 'privacyPanel',
        items: [{
            xtype: 'label',
            centered: true,
            html: 'Privacy Statement',
            itemId: 'privacyLabel'
        }]
    }

});