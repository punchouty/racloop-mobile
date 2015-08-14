
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
                name: 'userCode',
                xtype: 'textfield',
                label: 'User Code',
                readOnly: true,
                labelWidth: '40%',
                itemId: 'editScreenUserCode'
            }, {
                name: 'gender',
                xtype: 'radiofield',
                label: 'Male',
                value: 'male',
                //checked: true,
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
            itemId: 'updateProfileButton',
            id: 'editProfileFormButton',
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
        console.log("user.isMale : " + user.isMale);
        this.setValues(user);
        var isMale = this.down('field[name=gender]');
        if(user.isMale) {
            this.down('field[itemId=editScreenFemale]').uncheck();
            this.down('field[itemId=editScreenMale]').check();
        }
        else {
            this.down('field[itemId=editScreenFemale]').check();
            this.down('field[itemId=editScreenMale]').uncheck();
        }
    }
});