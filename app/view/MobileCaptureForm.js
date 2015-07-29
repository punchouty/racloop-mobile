
Ext.define('Racloop.view.MobileCaptureForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.mobileCaptureForm',
     xtype: 'mobileCaptureForm',

    requires: [
        'Ext.form.FieldSet',
        'Ext.field.Number'
    ],

    config: {
        items: [{
            xtype: 'fieldset',
            title: 'Contact Details',
            instructions: "This number will be verified using SMS",

            items: [{
                name: 'mobile',
                xtype: 'numberfield',
                label: 'Contact 1',
                placeHolder: '10 digit mobile number',
                itemId: 'mobileNumber'
            }, {
                xtype: 'hiddenfield',
                name: 'facebookId'
            }, {
                xtype: 'hiddenfield',
                name: 'email'
            }, {
                xtype: 'hiddenfield',
                name: 'accessToken'
            }, {
                xtype: 'hiddenfield',
                name: 'name'
            }, {
                xtype: 'hiddenfield',
                name: 'gender'
            }]
        }, {
            xtype: 'button',
            itemId: 'saveMobileButton',
            action: 'action',
            text: 'Save',
            ui: 'action',
            margin: 20,
            padding: 8
        }

        ]
    }
});