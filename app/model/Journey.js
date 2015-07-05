
Ext.define('Racloop.model.Journey', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.DateExtras',
        'Racloop.util.Config'
    ],

    config: {
        fields: [{
            name: 'journeyId',
            type: 'string'
        },{
            name: 'name',
            type: 'string'
        }, {
            name: 'email',
            type: 'string'
        }, {
            name: 'mobile',
            type: 'string'
        }, {
            name: 'gender',
            type: 'string'
        }, {
            name: 'dateOfJourney',
            type: 'date'
        }, {
            name: 'dateOfJourneyString',
            type: 'string'
        }, {
            name: 'from',
            type: 'string'
        }, {
            name: 'fromLatitude',
            type: 'float'
        }, {
            name: 'fromLongitude',
            type: 'float'
        }, {
            name: 'to',
            type: 'string'
        }, {
            name: 'toLatitude',
            type: 'float'
        }, {
            name: 'toLongitude',
            type: 'float'
        }, {
            name: 'isDriver',
            type: 'boolean'
        }, {
            name: 'isTaxi',
            type: 'boolean'
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
            name: 'statusAsParent',
            type: 'string'
        }, {
            name: 'myStatus',
            type: 'string'
        }, {
            name: 'myPairId',
            type: 'string'
        }, {
            name: 'photoUrl',
            type: 'string'
        }, {
            name: 'relatedJourneys',
            type: 'auto'
        },{
            name: 'numberOfCopassengers',
            type: 'integer'
        },{
            name: 'disableRequest',
            type: 'boolean'
        }
        ],
        validations: [{
            type: 'presence',
            field: 'from',
            message: "From Place is required"
        }, {
            type: 'presence',
            field: 'to',
            message: "To Place is required"
        }, {
            type: 'presence',
            field: 'fromLatitude',
            message: "From Place is required"
        }, {
            type: 'presence',
            field: 'fromLongitude',
            message: 'From Place is required'
        }, {
            type: 'presence',
            field: 'toLatitude',
            message: "To Place is required"
        }, {
            type: 'presence',
            field: 'toLongitude',
            message: 'To Place is required'
        }]
    },
    validate: function(options) {
        var me = this,
        errors = me.callParent(arguments);
        var now = new Date();
        var reserveTime = 30; //in minutes
        var timeLimitInDays = 7; //in days
        var validStartTime = new Date(now.getTime() + reserveTime * 60000);
        var initialTime = new Date(now.getTime() + (reserveTime + 15) * 60000);
        var validEndTime = new Date(now.getTime() + timeLimitInDays * 24 * 60 * 60000);
        var journeyDateString = this.get('dateOfJourneyString');
        var selectedDate = Ext.DateExtras.parse(journeyDateString, 'd M y h:i A');
        if (selectedDate < now) {
            console.log("Invalid Date/Time : You have selected past moment");
            errors.add({
                field: 'journeyDate',
                message: "Invalid Date/Time : You have selected past moment"
            })
        } else if (selectedDate < validStartTime) {
            console.log("You have selected past date/time");
            errors.add({
                field: 'journeyDate',
                message: "Invalid Date/Time : You can select time only after 30 minutes from now"
            })
        } else if (selectedDate > validEndTime) {
            console.log("You have selected past date/time");
            errors.add({
                field: 'journeyDate',
                message: "Invalid Date/Time : You can not select time more than seven days in future"
            })
        }

        return errors;

    }

});