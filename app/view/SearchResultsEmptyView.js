
Ext.define('Racloop.view.SearchResultsEmptyView', {
    extend: 'Ext.Container',
    alias: 'widget.searchResultsEmptyView',
    xtype : 'searchResultsEmptyView',

    requires: [
        'Ext.Panel',
        'Ext.Button',
        'Ext.Label',
        'Ext.layout.HBox'
    ],

    config: {
        items: [{
            title: 'Welcome',
            xtype: 'panel',
            layout: 'vbox',
            items: [{
                xtype: 'container',
                html: '<div class="section-header">' +
                        '<div class="small-text-medium uppercase colored-text">' +
                        'No Results Found' +
                        '</div>' +
                        '<div class="colored-line"></div>' +
                        '<div class="sub-heading">Save your search so that other can find you.</div>' +
                      '</div>',
                itemId: 'homeLabel'

            }, {
                xtype: 'button',
                itemId: 'saveJourneyButton',
                iconCls: 'acceptCls',
                iconMask: true,
                ui: 'action',
                text: 'Save Request',
                margin: 10
            }]
        }]
    }

});