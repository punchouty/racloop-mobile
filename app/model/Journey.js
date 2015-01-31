
Ext.define('Racloop.model.Journey', {
    extend: 'Ext.data.Model',

    requires: [
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
            name: 'fromPlace',
            type: 'string'
        }, {
            name: 'fromLatitude',
            type: 'float'
        }, {
            name: 'fromLongitude',
            type: 'float'
        }, {
            name: 'toPlace',
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
            name: 'validStartTimeString',
            type: 'string'
        }, {
            name: 'tripDistance',
            type: 'number'
        }, {
            name: 'tripUnit',
            type: 'string'
        }, {
            name: 'photoUrl',
            type: 'string'
        }, {
            name: 'incomingRequests',
            type: 'auto'
        }, {
            name: 'outgoingRequests',
            type: 'auto'
        }, {
            name: 'numberOfIncomingRequests',
            type: 'integer'
        }, {
            name: 'numberOfOutgoingRequests',
            type: 'integer'
        },{
            name: 'matchedJourney',
            type: 'auto'
        },{
            name: 'workflow',
            type: 'auto'
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