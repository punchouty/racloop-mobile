Ext.define('Racloop.view.RecurringView', {
    extend: 'Ext.Panel',
    xtype: 'recurringView',
    alias : 'widget.recurringView',

    requires: [
        'Ext.layout.VBox',
        'Racloop.view.HistoryViewItem',
        'Racloop.util.Config',
        'Racloop.util.LoginHelper',
        'Ext.DataView',
        'Ext.TitleBar',
        'Ext.field.Text',
        'Ext.Button',
        'Ext.form.FieldSet'

    ],
    //layout: {
    //    type: 'vbox'
    //},

    config : {
        layout: 'vbox',
        xtype: 'panel',
        items: [{
                itemId: 'recurringEmptyView',
                xtype: 'panel',
                //hidden : true,
                html: '<div class="startup-header">' +
                            '<div class="small-text-medium uppercase colored-text">' +
                                'No Recurring Searches Found' +
                            '</div>' +
                            '<div class="colored-line"></div>' +
                            '<div class="sub-heading">You can create a recurring search from the History tab.</div>' +
                    '</div>',
                flex : 1
            },
            {
                itemId: 'recurringDataView',
                xtype: 'dataview',
                defaultType: 'recurringViewItem',
                useComponents: true,
                scrollable: {
                    direction: 'vertical'
                },
                store: "recurringStore",
                flex : 4
            }
        ]

    }    

});
