
Ext.define('Racloop.view.EditProfileForm', {
    extend: 'Ext.form.Panel',
    xtype: 'editprofileform',

    requires: [
        'Racloop.util.Config',
        'Ext.field.Number'
    ],

    config: {
        items: [{
            xtype: 'fieldset',
            title: 'Edit Profile',
            instructions: "You cannot change your email",
            items: [{
                name: 'fullName',
                xtype: 'textfield',
                label: 'Name',
                labelWidth: '40%',
                itemId: 'editScreenName'
            }, {
                name: 'mobile',
                xtype: 'numberfield',
                label: 'Mobile',
                labelWidth: '40%',
                itemId: 'editScreenMobile'
            }, {
                name: 'email',
                xtype: 'emailfield',
                readOnly: true,
                label: 'Email',
                placeHolder: 'email@example.com',
                labelWidth: '40%',
                itemId: 'editScreenEmail'
            }, {
                name: 'gender',
                xtype: 'radiofield',
                label: 'Male',
                value: 'male',
                checked: true,
                labelWidth: '40%',
                itemId: 'editScreenMale'
            }, {
                name: 'gender',
                xtype: 'radiofield',
                label: 'Female',
                value: 'female',
                labelWidth: '40%',
                itemId: 'editScreenFemale'
            }

            ]
        }, {
            xtype: 'button',
            itemId: 'editButton',
            text: 'Update Profile',
            action: 'edit',
            ui: 'action',
            margin: 20,
            padding: 8
        }]
    },
    initialize: function() {
        this.callParent(arguments);
        var user = LoginHelper.getUser();
        this.setValues(user);
    }
});