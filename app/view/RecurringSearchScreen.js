Ext.define('Racloop.view.RecurringSearchScreen', {
    extend: 'Ext.form.Panel',
    alias: 'widget.recurringSearchScreen',
    xtype: 'recurringSearchScreen',

    requires: [
        'Ext.TitleBar',
        'Ext.form.FieldSet',
        'Ext.field.Password',
        'Ext.field.Search',
        // 'Ext.field.DatePicker',
        // 'Ext.ux.field.TimePicker',
        'Ext.field.Hidden',
        'Ext.ActionSheet',
        // 'Racloop.store.Journeys',
        'Ext.DataView',
        'Racloop.util.Common'
    ],

    config: {
        // enableDialog: true,
        items: [{
                xtype: 'container',
                itemId: 'recurringInfoContainer',
                html: ''
            },            
            {
            xtype: 'fieldset',
            //title: 'Make search recurring',
            //instructions: "Make your search recurring",
            items: [{
                xtype: 'checkboxfield',
                name : 'monday',
                label: 'Monday',
                value: '1'
                
            },
            {
                xtype: 'checkboxfield',
                name : 'tuesday',
                label: 'Tuesday',
                value: '2'
            },
            {
                xtype: 'checkboxfield',
                name : 'wednesday',
                label: 'Wednesday',
                value: '3'
            },
            {
                xtype: 'checkboxfield',
                name : 'thursday',
                label: 'Thursday',
                value: '4'
            },
            {
                xtype: 'checkboxfield',
                name : 'friday',
                label: 'Friday',
                value: '5'
            },
            {
                xtype: 'checkboxfield',
                name : 'saturday',
                label: 'Saturday',
                value: '6'
            },
            {
                xtype: 'checkboxfield',
                name : 'sunday',
                label: 'Sunday',
                value: '7'
            },
            {
                xtype: 'hiddenfield',
                name: 'journeyId',
                value: ''
            }]

        }, {
            xtype: 'button',
            itemId: 'saveRecurringButton',
            text: 'Save',
            action: 'save',
            iconCls: 'searchCls',
            iconMask: true,
            margin: 10
       //     ui: 'action'
        },
        {
            xtype: 'button',
            itemId: 'cancelRecurringButton',
            text: 'Cancel',
            action: 'cancel',
            iconCls: 'searchCls',
            iconMask: true,
            margin: 10,
            ui: 'decline'
        }
         

        ]
    }
});