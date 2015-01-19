
Ext.define('Racloop.model.EditProfile', {
    extend: 'Ext.data.Model',

    config: {
        fields: [{
            name: 'fullName',
            type: 'string'
        }, {
            name: 'mobile',
            type: 'string'
        }, {
            name: 'email',
            type: 'string'
        }, {
            name: 'gender',
            type: 'string'
        }

        ],
        validations: [{
            type: 'presence',
            field: 'fullName',
            message: "Name is required"
        }, {
            type: 'length',
            field: 'fullName',
            min: 3,
            message: "Name should be minimum 3 characters long"
        }, {
            type: 'length',
            field: 'fullName',
            max: 50,
            message: "Name should be maximum 50 characters long"
        }, {
            type: 'presence',
            field: 'mobile'
        }, {
            type: 'format',
            field: 'mobile',
            matcher: /^[7-9][0-9]{9}$/
        }, {
            type: 'presence',
            field: 'email',
            message: "Email is required"
        }, {
            type: 'email',
            field: 'email',
            message: 'Email format is invalid'
        }, {
            type: 'inclusion',
            field: 'gender',
            list: ['male', 'female']
        }]
    }
});