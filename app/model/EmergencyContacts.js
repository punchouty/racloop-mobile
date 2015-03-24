
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
            message: "Mobile for contact one should be like 98XXXXXXXX"
        },
        {
            type: 'format',
            field: 'contactTwo',
            matcher: /^[7-9][0-9]{9}$/,
            message: "Mobile for contact two should be like 98XXXXXXXX"
        }
        ]
    }
});