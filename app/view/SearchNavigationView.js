
Ext.define('Racloop.view.SearchNavigationView', {
    extend: 'Ext.navigation.View',
    //extend: 'Ext.form.Panel',
    alias: 'widget.searchNavigationView',
    xtype: 'searchNavigationView',
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
        // layout: 'card',
        items: [{
            xtype: 'formpanel',
            itemId: 'searchForm',
            title: 'Search',
            items: [{
                xtype: 'fieldset',
                title: 'Search Journeys',
                instructions: "Search where other people are going.",
                items: [{
                    name: 'fromPlace',
                    xtype: 'searchfield',
                    label: 'From*',
                    itemId: 'searchScreenFrom'
                }, {
                    name: 'toPlace',
                    xtype: 'searchfield',
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
                }, {
                    name: 'time',
                    xtype: 'timepickerfield',
                    label: 'Time*',
                    itemId: 'searchScreenTime',
                    picker: {
                        minuteIncrement: 15
                    },
                    defaultTime : Racloop.util.Common.getDefaultTime()
                }, {
                    xtype: 'selectfield',
                    label: 'You Are?',
                    options: [{
                        text: 'Passenger and Need Ride.',
                        value: 'hitcher'
                    },
                    {
                        text: 'Driving Your Own Vehicle.',
                        value: 'driver'
                    }],
                    listeners: {
                        change: function(field, newValue) {
                            if (newValue == "hitcher") {
                                var isDriver = field.up().down('field[name=isDriver]');
                                isDriver.setValue(false);
                                // var isDriver=this.up().getByField('isDriver');
                                console.log(isDriver);
                            } else if (newValue == "driver") {
                                var isDriver = field.up().down('field[name=isDriver]');
                                isDriver.setValue(true);
                                // var isDriver=this.up().getByField('isDriver');
                                console.log(isDriver);
                            }
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
                    name: 'tripUnit',
                    value: "KM"
                }, {
                    xtype: 'hiddenfield',
                    name: 'isDriver',
                    value: true
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
                ui: 'action'
            }

            ]
        }]
        // navigationBar : {
        //     listeners : {
        //         back : {
        //             fn : function(event, el) {
        //                 console.log("clicked back");
        //                 // var store = Ext.getStore('SearchStore');
        //                 // store.getProxy().clear();
        //                 // this.up().destroy();
        //                // return false;
        //             }
        //         }
        //     }
        // }
    }

});