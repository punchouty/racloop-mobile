
Ext.define('Racloop.view.Preferences', {
    extend: 'Ext.form.Panel',
    alias: 'widget.preferences',
    xtype: 'preferences',

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
                options: [
                    {
                        text: 'Taxi',
                        value: 'taxi'
                    },
                    {
                        text: 'Auto Rickshaw',
                        value: 'auto'
                    }
                ],
                listeners: {
                    change: function(field, newValue) {
                        if (newValue == "auto") {
                            var travelModePreference = field.up().down('field[name=travelModePreference]');
                            travelModePreference.setValue('auto');
                        } else if (newValue == "taxi") {
                            var travelModePreference = field.up().down('field[name=travelModePreference]');
                            travelModePreference.setValue('taxi');
                        }
                    }
                }

            }, {
                xtype: 'selectfield',
                itemId: 'paymentPreferenceSelectField',
                label: 'Payment',
                options: [
                    {
                        text: 'Cash',
                        value: 'cash'
                    },
                    {
                        text: 'Pay TM',
                        value: 'payTm'
                    },
                    {
                        text: 'Other Mobile Wallet',
                        value: 'other'
                    }
                ],
                listeners: {
                    change: function(field, newValue) {
                        if (newValue == "cash") {
                            var paymentPreference = field.up().down('field[name=paymentPreference]');
                            paymentPreference.setValue("cash");
                        } else if (newValue == "payTm") {
                            var paymentPreference = field.up().down('field[name=paymentPreference]');
                            paymentPreference.setValue("payTm");
                        } else if (newValue == "other") {
                            var paymentPreference = field.up().down('field[name=paymentPreference]');
                            paymentPreference.setValue("other");
                        }
                    }
                }

            },{
                xtype: 'selectfield',
                itemId: 'cabServicePreferenceSelectField',
                label: 'Cab Company',
                options: [
                    {
                        text: 'Ola Cabs',
                        value: 'ola'
                    },
                    {
                        text: 'Uber',
                        value: 'uber'
                    },
                    {
                        text: 'Meru Cabs',
                        value: 'meru'
                    },
                    {
                        text: 'Mega Cabs',
                        value: 'mega'
                    },
                    {
                        text: 'Easy Cabs',
                        value: 'easy'
                    },
                    {
                        text: 'Others',
                        value: 'others'
                    }
                ],
                listeners: {
                    change: function(field, newValue) {
                        if (newValue == "uber") {
                            var cabServicePreference = field.up().down('field[name=cabServicePreference]');
                            cabServicePreference.setValue("uber");
                        } else if (newValue == "ola") {
                            var cabServicePreference = field.up().down('field[name=cabServicePreference]');
                            cabServicePreference.setValue("ola");
                        } else if (newValue == "others") {
                            var cabServicePreference = field.up().down('field[name=cabServicePreference]');
                            cabServicePreference.setValue("others");
                        } else if (newValue == "meru") {
                            var cabServicePreference = field.up().down('field[name=cabServicePreference]');
                            cabServicePreference.setValue("meru");
                        } else if (newValue == "mega") {
                            var cabServicePreference = field.up().down('field[name=cabServicePreference]');
                            cabServicePreference.setValue("mega");
                        } else if (newValue == "easy") {
                            var cabServicePreference = field.up().down('field[name=cabServicePreference]');
                            cabServicePreference.setValue("easy");
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
            itemId: 'saveProfileButton',
            action: 'action',
            text: 'Save',
            ui: 'action',
            margin: 20,
            padding: 8
        }

        ]
    }
});