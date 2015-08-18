
Ext.define('Racloop.view.Preferences', {
    extend: 'Ext.form.Panel',
    alias: 'widget.preferences',
    xtype: 'preferencesForm',

    requires: [
        'Ext.form.FieldSet',
        'Ext.field.Number',
        'Racloop.util.Common'
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
                        value: 'taxi'
                    },
                    {
                        text: 'Auto',
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
                value:'Cash',
                options: [
                    {
                        text: 'Cash',
                        value: 'cash'
                    },
                    {
                        text: 'PayTM',
                        value: 'payTM'
                    },
                    {
                        text: 'Other mobile wallets',
                        value: 'other'
                    }
                ],
                listeners: {
                    change: function(field, newValue) {
                        if (newValue == "cash") {
                            var paymentPreference = field.up().down('field[name=paymentPreference]');
                            paymentPreference.setValue("cash");
                        } else if (newValue == "payTM") {
                            var paymentPreference = field.up().down('field[name=paymentPreference]');
                            paymentPreference.setValue("payTM");
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
                value:'Uber',
                options: [
                    {
                        text: 'Ola',
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
                        text: 'Other',
                        value: 'other'
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
                        } else if (newValue == "other") {
                            var cabServicePreference = field.up().down('field[name=cabServicePreference]');
                            cabServicePreference.setValue("other");
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
            itemId: 'savePreferencesButton',
            id: 'preferencesFormSaveButton',
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
        if(!Common.isEmpty(user.emergencyContactOne)) this.down('field[itemId=emergencyContactOne]').setValue(user.emergencyContactOne);
        if(!Common.isEmpty(user.emergencyContactTwo)) this.down('field[itemId=emergencyContactTwo]').setValue(user.emergencyContactTwo);
        if(!Common.isEmpty(user.cabServicePreference)) this.down('field[itemId=cabServicePreferenceSelectField]').setValue(user.cabServicePreference);
        else this.down('field[itemId=cabServicePreferenceSelectField]').setValue('other');
        if(!Common.isEmpty(user.paymentPreference))  this.down('field[itemId=paymentPreferenceSelectField]').setValue(user.paymentPreference);
        else this.down('field[itemId=paymentPreferenceSelectField]').setValue('cash');
        if(!Common.isEmpty(user.travelModePreference))  this.down('field[itemId=travelModePreferenceField]').setValue(user.travelModePreference);
        else this.down('field[itemId=travelModePreferenceField]').setValue('auto');
    }
});