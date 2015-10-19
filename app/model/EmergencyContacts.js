
Ext.define('Racloop.model.EmergencyContacts', {
    extend: 'Ext.data.Model',

    config: {
        fields: [{
            name: 'contactOne',
            type: 'string'
        }, {
            name: 'contactTwo',
            type: 'string'
        }
        ],
        validations: [
            {
            type: 'format',
            field: 'contactOne',
            matcher: /^[7-9][0-9]{9}$/,
            message: "Invalid Mobile Number"
        },
        {
            type: 'format',
            field: 'contactTwo',
            matcher: /^[7-9][0-9]{9}$/,
            message: "Invalid Mobile Number"
        }
        ]
    }
});