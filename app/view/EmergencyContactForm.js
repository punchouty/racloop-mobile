
Ext.define('Racloop.view.EmergencyContactForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.emergencyContactForm',

    requires: [
        'Ext.form.FieldSet',
        'Ext.field.Number'
    ],

    config: {
        items: [{
            xtype: 'fieldset',
            title: 'Emergency Contacts',
            instructions: "Contacts you want to notify in case of emergency. Mobile number of your parent, family member or your friend",

            items: [{
                name: 'contactOne',
                xtype: 'numberfield',
                label: 'Contact 1',
                placeHolder: '10 digit mobile number',
                itemId: 'emergencyContactOne'
            }, {
                name: 'contactTwo',
                xtype: 'numberfield',
                label: 'Contact 2',
                placeHolder: '10 digit mobile number',
                itemId: 'emergencyContactTwo'
            } ]
        }, {
            xtype: 'button',
            itemId: 'saveEmergencyContactsButton',
            id: 'emergencyContactSaveButton',
            action: 'action',
            text: 'Save',
           // ui: 'action',
            margin: 20,
            padding: 8
        }

        ]
    }
});