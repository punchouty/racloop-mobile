Ext.define('Racloop.model.ChangePassword', {
    extend: 'Ext.data.Model',

    config: {
        fields: [{
            name: 'currentPassword',
            type: 'string'
        }, {
            name: 'newpassword',
            type: 'string'
        }, {
            name: 'repeatpassword',
            type: 'string'
        }

        ],
        validations: [{
            type: 'presence',
            field: 'currentPassword',
            message: "Old Password is required"
        }, {
            type: 'presence',
            field: 'newpassword',
            message: "New Password is required"
        }, {
            type: 'length',
            field: 'newpassword',
            min: 7,
            message: "New Password should be minimum 7 characters long"
        }, {
            type: 'length',
            field: 'newpassword',
            max: 25,
            message: "New Password should be maximum 25 characters long"
        }, {
            type: 'presence',
            field: 'repeatpassword',
            message: "Repeat Password is required"
        }]
    }
});