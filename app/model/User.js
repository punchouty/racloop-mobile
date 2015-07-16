
Ext.define('Racloop.model.User', {
    extend: 'Ext.data.Model',

    config: {
        fields: [{
            name: 'name',
            type: 'string'
        }, {
            name: 'email',
            type: 'string'
        }, {
            name: 'password',
            type: 'string'
        }, {
            name: 'repeatpassword',
            type: 'string'
        }, {
            name: 'mobile',
            type: 'string'
        }, {
            name: 'gender',
            type: 'string'
        }, {
            name: 'isVerified',
            type: 'boolean'
        }, {
            name: 'emergencyContactOne',
            type: 'string'
        }, {
            name: 'emergencyContactTwo',
            type: 'string'
        }, {
            name: 'travelModePreference',
            type: 'string'
        }, {
            name: 'paymentPreference',
            type: 'string'
        }, {
            name: 'cabServicePreference',
            type: 'string'
        }

        ],
        validations: [{
            type: 'presence',
            field: 'name',
            message: "Name is required"
        }, {
            type: 'length',
            field: 'name',
            min: 3,
            max: 50,
            message: "Name should be between 3 and 50 characters"
        }, {
            type: 'presence',
            field: 'email',
            message: "Email is required"
        }, {
            type: 'email',
            field: 'email',
            message: 'Email format is invalid'
        }, {
            type: 'presence',
            field: 'password',
            message: "Password is required"
        }, {
            type: 'length',
            field: 'password',
            min: 5,
            max: 25,
            message: "Password should be between 5 and 25 characters"
        }, {
            type: 'presence',
            field: 'repeatpassword',
            message: "Repeat Password is required"
        },
//            {
//            type: 'presence',
//            field: 'mobile',
//            message: "Mobile is required"
//        },
            {
            type: 'format',
            field: 'mobile',
            matcher: /^[7-9][0-9]{9}$/,
            message: "Invalid Mobile Number"
        }, {
            type: 'inclusion',
            field: 'gender',
            list: ['male', 'female']
        }]
    }
});