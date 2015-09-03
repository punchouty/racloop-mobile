
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
                html: '<div class="startup-header">' +
                        '<div class="small-text-medium-empty uppercase colored-text">' +
                        'No Results Found' +
                        '</div>' +
                        '<div class="colored-line"></div>' +
                        '<div class="sub-heading-empty">Please save your ride and we will notify you as soon as we find any matches.</div>' +
                      '</div>',
                itemId: 'emptySearchHtml'

            }, {
                xtype: 'button',
                itemId: 'saveJourneyButton',
                iconCls: 'acceptCls',
                iconMask: true,
                ui: 'confirm',
                text: 'Save Ride',
                margin: 10
            }]
        }]
    }

});