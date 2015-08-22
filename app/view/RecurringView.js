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
        items: [
            {
                itemId: 'enableRecurring',
                xtype:  'fieldset',
                items: [{
                        xtype: 'checkboxfield',
                        name : 'enableDialog',
                        label: 'Enable Recurring Search',
                        labelWidth : "60%",
                        checked: Boolean(LoginHelper.getDialogOption() || false),
                        listeners: {
                        check: function() {
                            LoginHelper.setDialogOption(true);
                        },
                        uncheck: function() {
                            LoginHelper.setDialogOption(false);
                        }
                      }             
                    }]
            },
            {
                itemId: 'recurringEmptyView',
                xtype: 'panel',
                hidden : true,
                html: '<div class="section-header">' +
                '<div class="small-text-medium uppercase colored-text">' +
                'No Recurring Searches Found' +
                '</div>' +
                '<div class="colored-line"></div>' +
                '<div class="sub-heading">No previous data found.</div>' +
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
                flex : 1
            }
        ]

    }

});
