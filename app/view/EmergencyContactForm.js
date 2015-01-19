
Ext.define('Racloop.view.EmergencyContactForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.emergencyContactForm',

    config: {
        items: [{
            xtype: 'fieldset',
            title: 'Emergency Contac',
            instructions: "Contacts you want to notify in case of emergency",

            items: [{
                name: 'contactOne',
                xtype: 'textfield',
                label: 'Emergency Contact 1',
                placeHolder: 'Mobile Number 1',
                itemId: 'emergencyContactOne'
            }, {
                name: 'contactTwo',
                xtype: 'textfield',
                label: 'Emergency Contact 2',
                placeHolder: 'Mobile Number 2',
                itemId: 'emergencyContactTwo'
            } ]
        }, {
            xtype: 'button',
            itemId: 'saveEmergencyContactsButton',
            action: 'action',
            text: 'Save',
            ui: 'action',
            margin: 20,
            padding: 8
        }

        ]
    }
});