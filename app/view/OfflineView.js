
Ext.define('Racloop.view.OfflineView', {
    extend: 'Ext.Container',
    alias: 'widget.offlineView',
    xtype : 'offlineView',

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
                    title : "Device Offline"
                },
                {
                xtype: 'container',
                html: '<div class="startup-header">' +
                        '<div class="small-text-medium-empty uppercase colored-text">' +
                        'Connectivity Issues' +
                        '</div>' +
                        '<div class="colored-line"></div>' +
                        '<div class="sub-heading-empty">Your device is not connected to internet. Please check you data connection.</div>' +
                      '</div>'

            }]
        }]
    }

});