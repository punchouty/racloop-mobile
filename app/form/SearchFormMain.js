Ext.define('Racloop.form.SearchFormMain', {
    extend: 'Ext.form.Panel',
    alias: 'widget.searchFormMain',
    xtype: 'searchFormMain',

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
                xtype: 'container',
                html:   '<div class="section-header">' +
                //'<div class="small-text-medium uppercase colored-text">' +
                //'Search, Connect and Go' +
                //'</div>' +
                //'<h2 class="dark-text"><strong>Cab</strong>Share</h2>' +
                //    '<div class="colored-line"></div>' +
                //    '<div class="sub-heading">' +
                //        'Share Taxi and Auto Rides Conveniently.' +
                //    '</div>' +
                '</div>',
                itemId: 'searchHeading'
            },
            {
            xtype: 'fieldset',
            title: 'Search Rides',
            instructions: "Split Your Travel Cost",
            items: [{
                name: 'from',
                xtype: 'searchfield',
                id: 'searchFormMainFrom',
                label: 'From*',
                itemId: 'searchScreenFrom'
            }, {
                name: 'to',
                xtype: 'searchfield',
                id: 'searchFormMainTo',
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
                }
            }, {
                xtype: 'selectfield',
                itemId: 'autoTaxiSelectField',
                label: 'Auto/Taxi',
                options: [
                    {
                        text: 'Auto Rickshaw',
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
            id: 'searchFormMainSearchButton',
            ui: 'action'
        }, {
            //    xtype: 'container',
            //    html: '<div class="section-header">' +
            //            '<div class="small-text-medium uppercase colored-text">' +
            //            'Or' +
            //            '</div>' +
            //            //'<h2 class="dark-text"><strong>Cab</strong>Share</h2>' +
            //            //'<div class="colored-line"></div>' +
            //            //'<div class="sub-heading">' +
            //            //    'Share Taxi and Auto Rides Conveniently.' +
            //            //'</div>' +
            //          '</div>',
            //    itemId: 'homeLabel'
            //
            //},{
            //    xtype: 'button',
            //    itemId: 'showLoginButton',
            //    iconCls: 'lockCls',
            //    iconMask: true,
            //    iconAlign: 'left',
            //    ui: 'action',
            //    text: 'Sign In',
            //    margin: 10
            //}, {
                xtype: 'container',
                html:   '<div class="links">' +
                            '<a href="#" id="searchFormSignInLink" class="small-text-medium colored-text" onclick="Racloop.app.getController(\'UiController\').showLogin(); return false;">' +
                            'Sign In' +
                            '</a> &nbsp;&nbsp;' +
                            ' <a href="#" id="searchFormRegisterLink" class="small-text-medium colored-text" onclick="Racloop.app.getController(\'UiController\').showRegister(); return false;">' +
                            'New User?' +
                            '</a>' +
                        '</div>',
                itemId: 'homeLinks',
                margin: '20 10 10 10'

            }

        ]
    }
});