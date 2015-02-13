
Ext.define('Racloop.view.HistoryEmptyView', {
    extend: 'Ext.Container',
    xtype : 'historyEmptyView',
    alias : 'widget.historyEmptyView',

    requires: [
        'Ext.Panel',
        'Ext.Button',
        'Ext.Label',
        'Ext.layout.HBox'
    ],

    config: {
        items: [{
            title: 'History',
            xtype: 'panel',
            items: [{
                xtype: 'container',
                html: '<div class="section-header">' +
                        '<div class="small-text-medium uppercase colored-text">' +
                        'No History Found' +
                        '</div>' +
                        '<div class="colored-line"></div>' +
                        '<div class="sub-heading">No previous data found.</div>' +
                      '</div>',
                itemId: 'emptyHistory',
                items: {
                    docked: 'top',
                    xtype: 'titlebar',
                    title: Config.tabHistory
                }

            }]
        }]
    }

});