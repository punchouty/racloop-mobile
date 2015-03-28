
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
            instructions : 'Password should contain upper case, lower case, numeric value and a symbol.',
//            instructions: 'By registering you are agreeing to ' +
//                '<a href="#" class="small-text-medium colored-text" onclick="Racloop.app.getController(\'UiController\').showTerms(); return false;">Terms</a> and ' +
//                '<a href="#" class="small-text-medium colored-text" onclick="Racloop.app.getController(\'UiController\').showPrivacy(); return false;">Privacy</a> Statement of Racloop',
            items: [{
                name: 'email',
                xtype: 'textfield',
                label: 'Email*',
                placeHolder: 'user@racloop.com',
                itemId: 'registerScreenEmail'
            }, {
                name: 'password',
                xtype: 'passwordfield',
                label: 'Password*',
                placeHolder: 'Secret',
                itemId: 'registerScreenPassword'
            }, {
                name: 'repeatpassword',
                xtype: 'passwordfield',
                label: 'Again*',
                hidden: true,
                placeHolder: 'Password Confirmation',
                itemId: 'registerScreenRepeatPassword'
            }, {
                name: 'name',
                xtype: 'textfield',
                label: 'Name*',
                placeHolder: 'Full Name',
                itemId: 'registerScreenName'
            }, {
                name: 'mobile',
                xtype: 'textfield',
                label: 'Mobile* (+91)',
                placeHolder: '10 digit mobile number',
                itemId: 'registerScreenMobile'
            }, {
                xtype: 'radiofield',
                name: 'gender',
                value: 'male',
                label: 'Male',
                hidden: true,
                checked: true,
                itemId: 'registerScreenMale'
            }, {
                xtype: 'radiofield',
                name: 'gender',
                value: 'female',
                label: 'Female',
                hidden: true,
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
        },
            {
                xtype : 'panel',
                styleHtmlContent: true,
                html: [
                    //"Password should contain upper case, lower case, numeric value and a symbol."
                        'By registering you are agreeing to ' +
                        '<a href="#" class="small-text-medium colored-text" onclick="Racloop.app.getController(\'UiController\').showTerms(); return false;">Terms</a> and ' +
                        '<a href="#" class="small-text-medium colored-text" onclick="Racloop.app.getController(\'UiController\').showPrivacy(); return false;">Privacy</a> Statement of Racloop'
                ].join("")
            } ]
    }

});