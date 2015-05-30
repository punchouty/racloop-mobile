
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
        layout: 'vbox',
        items: [{
            xtype: 'panel',
            items: [{
                xtype: 'panel',
                html: '<div class="section-header">' +
                        '<div class="small-text-medium uppercase colored-text">' +
                        'No Results Found' +
                        '</div>' +
                        '<div class="colored-line"></div>' +
                        '<div class="sub-heading">Save your request so that other can find you.</div>' +
                      '</div>',
                itemId: 'emptySearchHtml'

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