Ext.define('Racloop.form.SearchFormTab', {
    extend: 'Ext.form.Panel',
    alias: 'widget.searchFormTab',
    xtype: 'searchFormTab',

    requires: [
        'Ext.TitleBar',
        'Ext.form.FieldSet',
        'Ext.field.Password',
        'Ext.field.Search',
        'Ext.field.DatePicker',
        'Ext.ux.field.TimePicker',
        'Ext.field.Hidden',
        'Ext.ActionSheet',
        'Racloop.store.Journeys',
        'Ext.DataView',
        'Racloop.util.Common'
    ],

    config: {
        items: [
            {
            xtype: 'fieldset',
            //title: 'Tell us your Plan',
            //instructions: "Split Your Travel Cost.",
            items: [{
                name: 'from',
                xtype: 'searchfield',
                //id: 'searchFormFrom',
                label: 'From*',
                itemId: 'searchScreenFrom'
            }, {
                name: 'to',
                xtype: 'searchfield',
                id: 'searchFormTabTo',
                label: 'To*',
                itemId: 'searchScreenTo'
            }, {
                name: 'date',
                xtype: 'datepickerfield',
                label: 'Date*',
                picker: {
                    yearFrom: new Date().getFullYear(),
                    yearTo: new Date(new Date().getTime() + 7 * 24 * 60 * 60000).getFullYear() // 7 days from now
                },
                itemId: 'searchScreenDate'
            },{
                name: 'time',
                xtype: 'timepickerfield',
                label: 'Time*',
                itemId: 'searchScreenTime',
                picker: {
                    minuteIncrement: 15
                }
            }, {
                xtype: 'selectfield',
                itemId: 'autoTaxiSelectField',
                label: 'Auto/Taxi',
                options: [
                    {
                        text: 'Auto',
                        value: 'auto'
                    },
                    {
                        text: 'Taxi',
                        value: 'taxi'
                    }
                ],
                listeners: {
                    change: function(field, newValue) {
                        if (newValue == "auto") {
                            var isTaxi = field.up().down('field[name=isTaxi]');
                            isTaxi.setValue(false);
                        } else if (newValue == "taxi") {
                            var isTaxi = field.up().down('field[name=isTaxi]');
                            isTaxi.setValue(true);
                        }
                    }
                }

            },{
                xtype: 'togglefield',
                name : 'isFemale',
                label: 'Females Only',
                itemId: 'searchScreenGender',
                hidden: true,
                listeners: {
                     change: function(field, newValue, oldValue) {
                        console.log('isFemale has changed:', (newValue) ? 'ON' : 'OFF');
                    }                     
                }
            }, {
                xtype: 'hiddenfield',
                name: 'dateOfJourneyString'
            }, {
                xtype: 'hiddenfield',
                name: 'fromLatitude'
            }, {
                xtype: 'hiddenfield',
                name: 'fromLongitude'
            }, {
                xtype: 'hiddenfield',
                name: 'toLatitude'
            }, {
                xtype: 'hiddenfield',
                name: 'toLongitude'
            }, {
                xtype: 'hiddenfield',
                name: 'validStartTimeString'
            }, {
                xtype: 'hiddenfield',
                name: 'tripDistance'
            }, {
                xtype: 'hiddenfield',
                name: 'tripTimeInSeconds'
            }, {
                xtype: 'hiddenfield',
                name: 'tripUnit',
                value: "KM"
            }, {
                xtype: 'hiddenfield',
                name: 'isDriver',
                value: true
            }, {
                xtype: 'hiddenfield',
                name: 'isTaxi',
                value: false
            }

            ]

        }, {
            xtype: 'button',
            itemId: 'searchButton',
            text: 'Search',
            action: 'search',
            iconCls: 'searchCls',
            iconMask: true,
            margin: 10,
            //id: 'searchFormSearchButton',
            ui: 'action'
        }
        ]
    },

    initialize: function() {
        this.callParent(arguments);
        var user = LoginHelper.getUser();
        if(user) {
            this.setValues(user);
            if (!Common.isEmpty(user.travelModePreference)) {
                if (user.travelModePreference === 'auto') {
                    this.down('field[name=isTaxi]').setValue('false');
                    this.down('field[itemId=autoTaxiSelectField]').setValue('auto');
                }
                else {
                    this.down('field[name=isTaxi]').setValue('true');
                    this.down('field[itemId=autoTaxiSelectField]').setValue('taxi');
                }
            }            
        }
        this.displayGenderField();  
        this.populateMainFormData();     
    },
    displayGenderField: function(){
        var user = LoginHelper.getUser();
        if(user) {
            if(user.isMale) {
                this.down('field[itemId=searchScreenGender]').hide();
            }
            else {
                this.down('field[itemId=searchScreenGender]').show();
            }
        } 
    },
    populateMainFormData: function() {
        var mainTabJourney = LoginHelper.getSearchedJourney();
        if(mainTabJourney) {
            console.log("Populating Home Search Form Data");
            this.setValues(mainTabJourney);
            // above line not updating date nad time field 
            this.down('field[itemId=searchScreenDate]').setValue(new Date(mainTabJourney.date));
            this.down('field[itemId=searchScreenTime]').setValue(new Date(mainTabJourney.time));
            LoginHelper.removeSearchedJourney();
        }
    }
});