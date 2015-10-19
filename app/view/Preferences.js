
Ext.define('Racloop.view.Preferences', {
    extend: 'Ext.form.Panel',
    alias: 'widget.preferences',
    xtype: 'preferencesForm',

    requires: [
        'Ext.form.FieldSet',
        'Ext.field.Number',
        'Racloop.util.Common',
        'Ext.field.Toggle',
        'Racloop.util.LoginHelper',
    ],

    config: {
        items: [ {
            xtype: 'fieldset',
            //title: 'Preferences',
            //instructions: "Preferences to customize your experience",

            items: [ {
                name: 'contactOne',
                xtype: 'numberfield',
                labelWidth: '50%',
                label: 'Contact 1',
                placeHolder: 'Emergency Mobile',
                itemId: 'emergencyContactOne'
            }, {
                name: 'contactTwo',
                xtype: 'numberfield',
                labelWidth: '50%',
                label: 'Contact 2',
                placeHolder: 'Emergency Mobile',
                itemId: 'emergencyContactTwo'
            },{
                name: 'travelModePreference',
                xtype: 'selectfield',
                labelWidth: '50%',
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
                labelWidth: '50%',
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
                labelWidth: '50%',
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
                name : 'enableRecurringSearch',
                labelWidth: '50%',
                label: 'Show Recurring Dialog',
                itemId: 'enableDialogPreferenceField',
                listeners: {
                    change: function(field, newValue, oldValue) {                      
                         //console.log('Enable Recurring Search has changed:', (newValue) ? 'ON' : 'OFF');
                    }              
              }             
            }, {
                xtype: 'togglefield',
                name : 'femaleOnlySearch',
                label: 'Women Only Search',
                labelWidth: '50%',
                itemId: 'womenOnlyPreferenceField',
                hidden: true,
                listeners: {
                    change: function(field, newValue, oldValue) {
                        //console.log('Women Only Search has changed:', (newValue) ? 'ON' : 'OFF');
                    }              
              }             
            }, {
                xtype: 'togglefield',
                name : 'showHelpPreference',
                label: 'Show Help',
                labelWidth: '50%',
                itemId: 'showHelpPreferenceField',                
                 listeners: {
                    change: function(field, newValue, oldValue) {
                        // console.log('Help Preference has changed:', (newValue) ? 'ON' : 'OFF');
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
        if(!Common.isEmpty(user.emergencyContactOne)) this.down('field[itemId=emergencyContactOne]').setValue(user.emergencyContactOne);
        if(!Common.isEmpty(user.emergencyContactTwo)) this.down('field[itemId=emergencyContactTwo]').setValue(user.emergencyContactTwo);
        if(!Common.isEmpty(user.cabServicePreference)) this.down('field[itemId=cabServicePreferenceSelectField]').setValue(user.cabServicePreference);
        else this.down('field[itemId=cabServicePreferenceSelectField]').setValue('other');
        if(!Common.isEmpty(user.paymentPreference))  this.down('field[itemId=paymentPreferenceSelectField]').setValue(user.paymentPreference);
        else this.down('field[itemId=paymentPreferenceSelectField]').setValue('cash');
        if(!Common.isEmpty(user.travelModePreference))  this.down('field[itemId=travelModePreferenceField]').setValue(user.travelModePreference);
        else this.down('field[itemId=travelModePreferenceField]').setValue('auto');
        if(!Common.isEmpty(user.enableRecurringSearch))  this.down('field[itemId=enableDialogPreferenceField]').setValue(user.enableRecurringSearch);
        else this.down('field[itemId=enableDialogPreferenceField]').setValue(0);
        if(user.showHelpPreference !== undefined)  this.down('field[itemId=showHelpPreferenceField]').setValue(user.showHelpPreference);
        else this.down('field[itemId=showHelpPreferenceField]').setValue(true);
        if(user.isMale) {
            this.down('field[itemId=womenOnlyPreferenceField]').hide();
        }
        else {
            this.down('field[itemId=womenOnlyPreferenceField]').show();
            if(user.femaleOnlySearch)  this.down('field[itemId=womenOnlyPreferenceField]').setValue(user.femaleOnlySearch);
        }
        //if(!Common.isEmpty(user.femaleOnlySearch))  this.down('field[itemId=womenOnlyPreferenceField]').setValue(user.femaleOnlySearch);
        //else this.down('field[itemId=womenOnlyPreferenceField]').setValue(0);
        //this.displayWomenOnlySearchField(user);
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