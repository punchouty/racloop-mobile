
Ext.define('Racloop.view.EditProfileForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.editProfileForm',
    xtype: 'editProfileForm',

    requires: [
        'Racloop.util.Config',
        'Ext.form.FieldSet',
        'Ext.field.Email',
        'Ext.field.Password',
        'Ext.field.Search',
        'Ext.field.DatePicker',
        'Ext.field.Radio',
        'Ext.field.Number'
    ],

    config: {
        items: [{
            xtype: 'fieldset',
            title: 'Edit Profile',
            instructions: "You cannot change your email",
            items: [{
                name: 'email',
                xtype: 'emailfield',
                readOnly: true,
                label: 'Email',
                placeHolder: 'email@example.com',
                labelWidth: '40%',
                itemId: 'editScreenEmail'
            }, {
                name: 'fullName',
                xtype: 'textfield',
                label: 'Name',
                labelWidth: '40%',
                itemId: 'editScreenName'
            },  {
                name: 'mobile',
                xtype: 'numberfield',
                label: 'Mobile',
                labelWidth: '40%',
                itemId: 'editScreenMobile'
            },{
                name: 'gender',
                xtype: 'radiofield',
                label: 'Male',
                value: 'male',
                hidden: true,
                checked: true,
                labelWidth: '40%',
                itemId: 'editScreenMale'
            }, {
                name: 'gender',
                xtype: 'radiofield',
                label: 'Female',
                value: 'female',
                hidden: true,
                labelWidth: '40%',
                itemId: 'editScreenFemale'
            }

            ]
        }, {
            xtype: 'button',
            itemId: 'updateProfileButton',
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