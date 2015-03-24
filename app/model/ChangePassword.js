Ext.define('Racloop.model.ChangePassword', {
    extend: 'Ext.data.Model',

    config: {
        fields: [{
            name: 'currentPassword',
            type: 'string'
        }, {
            name: 'newPassword',
            type: 'string'
        }, {
            name: 'repeatPassword',
            type: 'string'
        }

        ],
        validations: [{
            type: 'presence',
            field: 'currentPassword',
            message: "Old Password is required"
        },
//            {
//            type: 'presence',
//            field: 'newpassword',
//            message: "New Password is required"
//        },
            {
            type: 'length',
            field: 'newPassword',
            min: 7,
            max: 25,
            message: "New Password should be between 7 and 25 characters"
        }
//            , {
//            type: 'length',
//            field: 'newpassword',
//            max: 25,
//            message: "New Password should be maximum 25 characters long"
//        }
//            , {
//            type: 'presence',
//            field: 'repeatpassword',
//            message: "Repeat Password is required"
//        }
        ]
    }
});