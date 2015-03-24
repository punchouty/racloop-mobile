
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
        validations: [
//            {
//            type: 'presence',
//            field: 'fullName',
//            message: "Name is required"
//        },
            {
            type: 'length',
            field: 'fullName',
            min: 3,
            max: 50,
            message: "Name should be between 3 and 50 characters"
        },
//            {
//            type: 'length',
//            field: 'fullName',
//            max: 50,
//            message: "Name should be maximum 50 characters long"
//        },
//            {
//            type: 'presence',
//            field: 'mobile',
//            message: "Mobile is required"
//        },
            {
            type: 'format',
            field: 'mobile',
            matcher: /^[7-9][0-9]{9}$/,
            message: "Mobile should be like 98XXXXXXXX"
        }
//            , {
//            type: 'presence',
//            field: 'email',
//            message: "Email is required"
//        }, {
//            type: 'email',
//            field: 'email',
//            message: 'Email format is invalid'
//        }
//            , {
//            type: 'inclusion',
//            field: 'gender',
//            list: ['male', 'female']
//        }
        ]
    }
});