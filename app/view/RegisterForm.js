
Ext.define('Racloop.view.RegisterForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.registerForm',
    xtype: 'registerForm',

    requires: [
        'Ext.form.FieldSet',
        'Ext.field.Email',
        'Ext.field.Password',
        'Ext.field.Search',
        'Ext.field.DatePicker',
        'Ext.field.Radio'
    ],

    config: {
        items: [{
            xtype: 'fieldset',
            title: 'Sign Up',
            instructions: 'By registering you are agreeing to ' +
                '<a href="#" class="small-text-medium colored-text" onclick="Racloop.app.getController(\'AccountController\').showTerms(); return false;">Terms</a> and ' +
                '<a href="#" class="small-text-medium colored-text" onclick="Racloop.app.getController(\'AccountController\').showPrivacy(); return false;">Privacy</a> Statement of Racloop',
            items: [{
                name: 'name',
                xtype: 'textfield',
                label: 'Name*',
                placeHolder: 'Full Name',
                itemId: 'registerScreenName'
            }, {
                name: 'email',
                xtype: 'textfield',
                label: 'Email*',
                placeHolder: 'user@example.com',
                itemId: 'registerScreenEmail'
            }, {
                name: 'password',
                xtype: 'passwordfield',
                label: 'Password*',
                placeHolder: 'Password',
                itemId: 'registerScreenPassword'
            }, {
                name: 'repeatpassword',
                xtype: 'passwordfield',
                label: 'Again*',
                placeHolder: 'Password Confirmation',
                itemId: 'registerScreenRepeatPassword'
            }, {
                name: 'mobile',
                xtype: 'textfield',
                label: 'Mobile*',
                placeHolder: 'Mobile No.',
                itemId: 'registerScreenMobile'
            }, {
                xtype: 'radiofield',
                name: 'gender',
                value: 'male',
                label: 'Male',
                checked: true,
                itemId: 'registerScreenMale'
            }, {
                xtype: 'radiofield',
                name: 'gender',
                value: 'female',
                label: 'Female',
                itemId: 'registerScreenFemale'
            }]
        }, {
            xtype: 'button',
            itemId: 'registerButton',
            action: 'register',
            iconCls: 'registerCls',
            iconMask: true,
            iconAlign: 'left',
            margin: 20,
            padding: 8,
            ui: 'action',
            text: 'Sign Up'
        }]
    }

});