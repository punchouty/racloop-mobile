
Ext.define('Racloop.model.RecurringSearch', {
    extend: 'Ext.data.Model',

    config: {
        fields: [{
            name: 'journeyId',
            type: 'string'
        }, {
            name: 'monday',
            type: 'integer'
        },{
            name: 'tuesday',
            type: 'integer'
        },{
            name: 'wednesday',
            type: 'integer'
        },{
            name: 'thursday',
            type: 'integer'
        },{
            name: 'monday',
            type: 'integer'
        },{
            name: 'friday',
            type: 'integer'
        },{
            name: 'saturday',
            type: 'integer'
        }],
        validations: [{
            type: 'presence',
            field: 'from',
            message: "From Place is required"
        }, {
            type: 'presence',
            field: 'to',
            message: "To Place is required"
        }]
    }
});