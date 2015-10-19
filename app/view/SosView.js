
Ext.define('Racloop.view.SosView', {
    extend: 'Ext.Container',
    alias: 'widget.sosView',
    xtype : 'sosView',

    requires: [
        'Ext.Panel',
        'Ext.Button',
        'Ext.Label',
        'Ext.layout.HBox',
        'Ext.TitleBar'
    ],

    config: {
        items: [{
            items: [
                {
                    docked: 'top',
                    xtype: 'titlebar',
                    title : "Danger"
                },
                {
                xtype: 'container',
                html: '<div class="section-header">' +
                        '<div class="small-text-medium uppercase colored-text">' +
                        'Please switch on your phone GPS' +
                        '</div>' +
                        '<h2 class="dark-text">SOS</h2>' +
                        '<div class="colored-line"></div>' +
                        '<div class="sub-heading">If you are not in danger please click <strong>Cancel SOS</strong></div>' +
                      '</div>'

            }, {
                    xtype: 'button',
                    itemId: 'cancelSos',
                    margin: 20,
                    padding: 8,
                    text: 'Cancel SOS',
                    ui: 'decline'
                }]
        }]
    }

});