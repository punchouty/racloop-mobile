Ext.define('Racloop.model.VerifySms', {
    extend: 'Ext.data.Model',

    config: {
        fields: [{
            name: 'mobile',
            type: 'String'
        }, {
            name: 'verificationCode',
            type: 'String'
        }

        ],
        validations: [{
            type: 'presence',
            field: 'mobile',
            message: "Mobile is required"
        }, {
            type: 'length',
            field: 'mobile',
            min: 10,
            max : 10,
            message: "Mobile number should be 10 character long"
        }, {
            type: 'format',
            field: 'mobile',
            matcher: /^[7-9][0-9]{9}$/,
            message: "Invalid Mobile number"
        }, {
            type: 'length',
            field: 'verificationCode',
            min: 6,
            max : 6,
            message: "Verification code should be 6 character long"
        }]
    }
});