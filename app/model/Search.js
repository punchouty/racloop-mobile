
Ext.define('Racloop.model.Search', {
    extend: 'Ext.data.Model',

    config: {
        fields: [{
            name: 'fromPlace',
            type: 'string'
        }, {
            name: 'toPlace',
            type: 'string'
        }, {
            name: 'date',
            type: 'date'
        }, {
            name: 'time',
            type: 'time'
        }, {
            name: 'dateOfJourneyString',
            type: 'string'
        }, {
            name: 'fromLatitude',
            type: 'number'
        }, {
            name: 'fromLongitude',
            type: 'number'
        }, {
            name: 'toLatitude',
            type: 'number'
        }, {
            name: 'toLongitude',
            type: 'number'
        }, {
            name: 'validStartTimeString',
            type: 'string'
        }, {
            name: 'tripDistance',
            type: 'number'
        }, {
            name: 'tripUnit',
            type: 'string'
        }, {
            name: 'isDriver',
            type: 'boolean'
        }, {
            name: 'isTaxi',
            type: 'boolean'
        }

        ],
        validations: [{
            type: 'presence',
            field: 'fromPlace',
            message: "From Place is required"
        }, {
            type: 'presence',
            field: 'toPlace',
            message: "To Place is required"
        }, {
            type: 'presence',
            field: 'date',
            message: "Date is required"
        }, {
            type: 'presence',
            field: 'time',
            message: 'Time format is invalid'
        }
            //{type: 'checkDate', field: 'dateOfJourneyString'},
        ]
    },
    validate: function(options) {
        var me = this,
            errors = me.callParent(arguments);
        var now = new Date();
        var reserveTime = 30; //in minutes
        var timeLimitInDays = 7; //in days
        var validStartTime = new Date(now.getTime() + reserveTime * 60000);
        var initialTime = new Date(now.getTime() + (reserveTime + 15) * 60000);
        //console.log(validStartTime);
        var validEndTime = new Date(now.getTime() + timeLimitInDays * 24 * 60 * 60000);
        var journeyDate = this.get('dateOfJourneyString');
        var selectedDate = new Date(journeyDate);
        if (selectedDate < now) {
            console.log("You have selected past date/time");
            errors.add({
                field: 'journeyDate',
                message: "You have selected past date/time"
            })
        } else if (selectedDate < validStartTime) {
            console.log("You have selected past date/time");
            errors.add({
                field: 'journeyDate',
                message: "You can select time only after 30 minutes from now"
            })
        } else if (selectedDate > validEndTime) {
            console.log("You have selected past date/time");
            errors.add({
                field: 'journeyDate',
                message: "You can not select time more than seven days in future"
            })
        }

        return errors;

    }
});