
Ext.define('Racloop.view.Preferences', {
    extend: 'Ext.form.Panel',
    alias: 'widget.preferences',
    xtype: 'preferencesForm',

    requires: [
        'Ext.form.FieldSet',
        'Ext.field.Number'
    ],

    config: {
        items: [ {
            xtype: 'fieldset',
            title: 'Preferences',
            instructions: "Preferences to customize your experience",

            items: [ {
                name: 'contactOne',
                xtype: 'numberfield',
                label: 'Contact 1',
                placeHolder: 'Emergency Mobile',
                itemId: 'emergencyContactOne'
            }, {
                name: 'contactTwo',
                xtype: 'numberfield',
                label: 'Contact 2',
                placeHolder: 'Emergency Mobile',
                itemId: 'emergencyContactTwo'
            },{
                xtype: 'selectfield',
                itemId: 'travelModePreferenceField',
                label: 'Travel Mode',
                value:'Taxi',
                options: [
                    {
                        text: 'Taxi',
                        value: 'Taxi'
                    },
                    {
                        text: 'Auto',
                        value: 'Auto'
                    }
                ],
                listeners: {
                    change: function(field, newValue) {
                        if (newValue == "Auto") {
                            var travelModePreference = field.up().down('field[name=travelModePreference]');
                            travelModePreference.setValue('Auto');
                        } else if (newValue == "Taxi") {
                            var travelModePreference = field.up().down('field[name=travelModePreference]');
                            travelModePreference.setValue('Taxi');
                        }
                    }
                }

            }, {
                xtype: 'selectfield',
                itemId: 'paymentPreferenceSelectField',
                label: 'Payment',
                value:'Cash',
                options: [
                    {
                        text: 'Cash',
                        value: 'Cash'
                    },
                    {
                        text: 'PayTM',
                        value: 'PayTM'
                    },
                    {
                        text: 'Other mobile wallets',
                        value: 'Other mobile wallets'
                    }
                ],
                listeners: {
                    change: function(field, newValue) {
                        if (newValue == "Cash") {
                            var paymentPreference = field.up().down('field[name=paymentPreference]');
                            paymentPreference.setValue("Cash");
                        } else if (newValue == "PayTM") {
                            var paymentPreference = field.up().down('field[name=paymentPreference]');
                            paymentPreference.setValue("PayTM");
                        } else if (newValue == "Other mobile wallets") {
                            var paymentPreference = field.up().down('field[name=paymentPreference]');
                            paymentPreference.setValue("Other mobile wallets");
                        }
                    }
                }

            },{
                xtype: 'selectfield',
                itemId: 'cabServicePreferenceSelectField',
                label: 'Cab Company',
                value:'Uber',
                options: [
                    {
                        text: 'Ola',
                        value: 'Ola'
                    },
                    {
                        text: 'Uber',
                        value: 'Uber'
                    },
                    {
                        text: 'Meru Cabs',
                        value: 'Meru Cabs'
                    },
                    {
                        text: 'Mega Cabs',
                        value: 'Mega Cabs'
                    },
                    {
                        text: 'Easy Cabs',
                        value: 'Easy Cabs'
                    },
                    {
                        text: 'Others',
                        value: 'Others'
                    }
                ],
                listeners: {
                    change: function(field, newValue) {
                        if (newValue == "Uber") {
                            var cabServicePreference = field.up().down('field[name=cabServicePreference]');
                            cabServicePreference.setValue("Uber");
                        } else if (newValue == "Ola") {
                            var cabServicePreference = field.up().down('field[name=cabServicePreference]');
                            cabServicePreference.setValue("Ola");
                        } else if (newValue == "Others") {
                            var cabServicePreference = field.up().down('field[name=cabServicePreference]');
                            cabServicePreference.setValue("Others");
                        } else if (newValue == "Meru Cabs") {
                            var cabServicePreference = field.up().down('field[name=cabServicePreference]');
                            cabServicePreference.setValue("Meru Cabs");
                        } else if (newValue == "Mega Cabs") {
                            var cabServicePreference = field.up().down('field[name=cabServicePreference]');
                            cabServicePreference.setValue("Mega Cabs");
                        } else if (newValue == "Easy Cabs") {
                            var cabServicePreference = field.up().down('field[name=cabServicePreference]');
                            cabServicePreference.setValue("Easy Cabs");
                        }
                    }
                }

            }, {
                xtype: 'hiddenfield',
                name: 'travelModePreference',
                value: 'taxi'
            } , {
                xtype: 'hiddenfield',
                name: 'paymentPreference',
                value: 'cash'
            }, {
                xtype: 'hiddenfield',
                name: 'cabServicePreference',
                value: 'ola'
            } ]
        }, {
            xtype: 'button',
            itemId: 'savePreferencesButton',
            action: 'action',
            text: 'Save',
            ui: 'action',
            margin: 20,
            padding: 8
        }

        ]
    },
    initialize: function() {
        this.callParent(arguments);
        var user = LoginHelper.getUser();
        this.setValues(user);
        this.down('field[itemId=emergencyContactOne]').setValue(user.emergencyContactOne);
        this.down('field[itemId=emergencyContactTwo]').setValue(user.emergencyContactTwo);
        this.down('field[itemId=cabServicePreferenceSelectField]').setValue(user.cabServicePreference);
        this.down('field[itemId=paymentPreferenceSelectField]').setValue(user.paymentPreference);
        this.down('field[itemId=travelModePreferenceField]').setValue(user.travelModePreference);
    }
});