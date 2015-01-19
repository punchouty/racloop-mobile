Ext.define('Racloop.model.ForgotPassword', {
    extend: 'Ext.data.Model',

    config: {
        fields: [{
            name: 'email',
            type: 'string'
        }],
        validations: [{
            type: 'presence',
            field: 'email',
            message: "Email is required"
        }, {
            type: 'email',
            field: 'email',
            message: 'Email format is invalid'
        }]
    }
});