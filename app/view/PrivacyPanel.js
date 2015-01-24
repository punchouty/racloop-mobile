
Ext.define('Racloop.view.PrivacyPanel', {
    extend: 'Ext.Panel',
    alias: 'widget.privacyPanel',

    requires: [
        'Ext.Label'
    ],

    config: {
        itemId: 'privacyPanel',
        items: [{
            xtype: 'container',
            centered: true,
            html: 'Privacy Statement',
            itemId: 'privacyText'
        }]
    }

});