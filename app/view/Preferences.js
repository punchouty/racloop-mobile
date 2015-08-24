
Ext.define('Racloop.view.Preferences', {
    extend: 'Ext.form.Panel',
    alias: 'widget.preferences',
    xtype: 'preferencesForm',

    requires: [
        'Ext.form.FieldSet',
        'Ext.field.Number',
        'Racloop.util.Common',
        'Ext.field.Toggle'
    ],

    config: {
        items: [ {
            xtype: 'fieldset',
            //title: 'Preferences',
            //instructions: "Preferences to customize your experience",

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
                name: 'travelModePreference',
                xtype: 'selectfield',
                itemId: 'travelModePreferenceField',
                label: 'Travel Mode',
                value:'auto',
                options: [
                    {
                        text: 'Taxi',
                        value: 'taxi'
                    },
                    {
                        text: 'Auto',
                        value: 'auto'
                    }
                ]
            }, {
                name: 'paymentPreference',
                xtype: 'selectfield',
                itemId: 'paymentPreferenceSelectField',
                label: 'Payment',
                value:'cash',
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
                ]
            },{
                name: 'cabServicePreference',
                xtype: 'selectfield',
                itemId: 'cabServicePreferenceSelectField',
                label: 'Cab Company',
                value:'other',
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
                ]
            }, {
                xtype: 'togglefield',
                name : 'enableDialogPreference',
                label: 'Enable Recurring Search',
                itemId: 'enableDialogPreferenceField',
                listeners: {
                    change: function(field, newValue, oldValue) {                      
                         console.log('Enable Recurring Search has changed:', (newValue) ? 'ON' : 'OFF');
                    }              
              }             
            }, {
                xtype: 'togglefield',
                name : 'womenOnlySearchPreference',
                label: 'Women Only Search',
                itemId: 'womenOnlyPreferenceField',
                hidden: true,
                listeners: {
                    change: function(field, newValue, oldValue) {
                        console.log('Women Only Search has changed:', (newValue) ? 'ON' : 'OFF');
                    }              
              }             
            }

            ]
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
        console.log("preference view")
        console.dir(user)
        if(!Common.isEmpty(user.emergencyContactOne)) this.down('field[itemId=emergencyContactOne]').setValue(user.emergencyContactOne);
        if(!Common.isEmpty(user.emergencyContactTwo)) this.down('field[itemId=emergencyContactTwo]').setValue(user.emergencyContactTwo);
        if(!Common.isEmpty(user.cabServicePreference)) this.down('field[itemId=cabServicePreferenceSelectField]').setValue(user.cabServicePreference);
        else this.down('field[itemId=cabServicePreferenceSelectField]').setValue('other');
        if(!Common.isEmpty(user.paymentPreference))  this.down('field[itemId=paymentPreferenceSelectField]').setValue(user.paymentPreference);
        else this.down('field[itemId=paymentPreferenceSelectField]').setValue('cash');
        if(!Common.isEmpty(user.travelModePreference))  this.down('field[itemId=travelModePreferenceField]').setValue(user.travelModePreference);
        else this.down('field[itemId=travelModePreferenceField]').setValue('auto');
        if(!Common.isEmpty(user.enableDialogPreference))  this.down('field[itemId=enableDialogPreferenceField]').setValue(user.enableDialogPreference);
        else this.down('field[itemId=enableDialogPreferenceField]').setValue(0);
        if(!Common.isEmpty(user.womenOnlySearchPreference))  this.down('field[itemId=womenOnlyPreferenceField]').setValue(user.womenOnlySearchPreference);
        else this.down('field[itemId=womenOnlyPreferenceField]').setValue(0);
        this.displayWomenOnlySearchField(user);
    },
    displayWomenOnlySearchField: function(user){
        if(user) {
            if(user.isMale) {
                this.down('field[itemId=womenOnlyPreferenceField]').hide();
            }
            else {
                this.down('field[itemId=womenOnlyPreferenceField]').show();
            }
        } 
    }
});