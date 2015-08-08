Ext.define('Racloop.view.HistoryView', {
    extend: 'Ext.Panel',
    xtype: 'historyView',
    alias : 'widget.historyView',

    requires: [
        'Ext.layout.VBox',
        'Racloop.view.HistoryViewItem',
        'Racloop.util.Config',
        'Ext.DataView',
        'Ext.TitleBar',
        'Ext.field.Text',
        'Ext.Button',
        'Ext.form.FieldSet',
    ],
    //layout: {
    //    type: 'vbox'
    //},

    config : {
        layout: 'vbox',
        items: [            
            {
                itemId: 'historyEmptyView',
                xtype: 'panel',
                hidden : true,
                html: '<div class="section-header">' +
                '<div class="small-text-medium uppercase colored-text">' +
                'No History Found' +
                '</div>' +
                '<div class="colored-line"></div>' +
                '<div class="sub-heading">No previous data found.</div>' +
                '</div>',
                flex : 1
            },
            {
                itemId: 'historyDataView',
                xtype: 'dataview',
                defaultType: 'historyViewItem',
                useComponents: true,
                scrollable: {
                    direction: 'vertical'
                },
                store: "historyStore",
                flex : 1
            }
        ]

    }

});
