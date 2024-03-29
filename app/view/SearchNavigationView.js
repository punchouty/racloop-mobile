
Ext.define('Racloop.view.SearchNavigationView', {
    extend: 'Ext.navigation.View',
    //extend: 'Ext.form.Panel',
    alias: 'widget.searchNavigationView',
    xtype: 'searchNavigationView',
    requires: [
        'Racloop.form.SearchFormTab'
        //'Ext.TitleBar',
        //'Ext.form.FieldSet',
        //'Ext.field.Password',
        //'Ext.field.Search',
        //'Ext.field.DatePicker',
        //'Ext.ux.field.TimePicker',
        //'Ext.field.Hidden',
        //'Ext.ActionSheet',
        //'Racloop.store.Journeys',
        //'Ext.DataView',
        //'Racloop.util.Common'
    ],
    config: {
        // layout: 'card',
        items: [{
            xtype: 'searchFormTab',
            itemId: 'searchFormTab',
            title: 'Search Rides'//,
//            items: [{
//                xtype: 'fieldset',
//                title: 'Search Journeys',
//                instructions: "Search where other people are going.",
//                items: [{
//                    name: 'from',
//                    xtype: 'searchfield',
//                    label: 'From*',
//                    itemId: 'searchScreenFrom'
//                }, {
//                    name: 'to',
//                    xtype: 'searchfield',
//                    label: 'To*',
//                    itemId: 'searchScreenTo'
//                }, {
//                    name: 'date',
//                    xtype: 'datepickerfield',
//                    label: 'Date*',
//                    picker: {
//                        yearFrom: new Date().getFullYear(),
//                        yearTo: new Date(new Date().getTime() + 7 * 24 * 60 * 60000).getFullYear() // 7 days from now
//                    },
//                    itemId: 'searchScreenDate'
//                }, {
//                    name: 'time',
//                    xtype: 'timepickerfield',
//                    label: 'Time*',
//                    itemId: 'searchScreenTime',
//                    picker: {
//                        minuteIncrement: 15
//                    }
////                    ,
////                    defaultTime : Racloop.util.Common.getDefaultTime()
//                }, {
//                    xtype: 'selectfield',
//                    itemId: 'autoTaxiSelectField',
//                    label: 'Auto/Taxi',
//                    options: [
//                        {
//                            text: 'Taxi',
//                            value: 'taxi'
//                        },
//                        {
//                            text: 'Auto Rickshaw',
//                            value: 'auto'
//                        }
//                    ],
//                    listeners: {
//                        change: function(field, newValue) {
//                            if (newValue == "auto") {
//                                var isTaxi = field.up().down('field[name=isTaxi]');
//                                isTaxi.setValue(false);
//                            } else if (newValue == "taxi") {
//                                var isTaxi = field.up().down('field[name=isTaxi]');
//                                isTaxi.setValue(true);
//                            }
//                        }
//                    }
//
//                }, {
//                    xtype: 'hiddenfield',
//                    name: 'dateOfJourneyString'
//                }, {
//                    xtype: 'hiddenfield',
//                    name: 'fromLatitude'
//                }, {
//                    xtype: 'hiddenfield',
//                    name: 'fromLongitude'
//                }, {
//                    xtype: 'hiddenfield',
//                    name: 'toLatitude'
//                }, {
//                    xtype: 'hiddenfield',
//                    name: 'toLongitude'
//                }, {
//                    xtype: 'hiddenfield',
//                    name: 'validStartTimeString'
//                }, {
//                    xtype: 'hiddenfield',
//                    name: 'tripDistance'
//                }, {
//                    xtype: 'hiddenfield',
//                    name: 'tripTimeInSeconds'
//                }, {
//                    xtype: 'hiddenfield',
//                    name: 'tripUnit',
//                    value: "KM"
//                }, {
//                    xtype: 'hiddenfield',
//                    name: 'isDriver',
//                    value: true
//                }, {
//                    xtype: 'hiddenfield',
//                    name: 'isTaxi',
//                    value: true
//                }
//
//                ]
//
//            }, {
//                xtype: 'button',
//                itemId: 'searchButton',
//                text: 'Search',
//                action: 'search',
//                iconCls: 'searchCls',
//                iconMask: true,
//                margin: 10,
//                ui: 'action'
//            }
//
//            ]
        }],
        navigationBar: {
            backButton: {
                id: 'searchNavigationViewBack'
            }
        }
    }
   // ,
   //  push: function (view) {
   //   if(typeof this.getActiveItem() == 'undefined' || this.getActiveItem().xtype != view.xtype) {
   //      this.callParent(arguments);
   //     }
   //   else {
   //      console.warn("Prevented pushing a potentially duplicate view of xtype: " + view.xtype);
   //      view.destroy();
   //   }
   //}

});