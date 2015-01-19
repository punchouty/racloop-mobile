Ext.define('Racloop.model.LoginCredential', {
    extend: 'Ext.data.Model',

    config: {
        fields: [{
            name: 'email',
            type: 'email'
        }, {
            name: 'password',
            type: 'password'
        }

        ],
        validations: [{
            type: 'presence',
            field: 'email',
            message: "Email is required"
        }, {
            type: 'presence',
            field: 'password',
            message: "Password is required"
        }]
    }
});