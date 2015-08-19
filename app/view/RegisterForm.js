
Ext.define('Racloop.view.RegisterForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.registerForm',
    xtype: 'registerForm',

    requires: [
        'Ext.form.FieldSet',
        'Ext.field.Email',
        'Ext.field.Number',
        'Ext.field.Password',
        'Ext.field.Search',
        'Ext.field.DatePicker',
        'Ext.field.Radio'
    ],

    config: {
        items: [{
            xtype: 'fieldset',
            //title: 'Sign Up',
            instructions : 'You will receive SMS for verification after this step.',
//            instructions: 'By registering you are agreeing to ' +
//                '<a href="#" class="small-text-medium colored-text" onclick="Racloop.app.getController(\'UiController\').showTerms(); return false;">Terms</a> and ' +
//                '<a href="#" class="small-text-medium colored-text" onclick="Racloop.app.getController(\'UiController\').showPrivacy(); return false;">Privacy</a> Statement of Racloop',
            items: [{
                name: 'email',
                xtype: 'emailfield',
                label: 'Email*',
                placeHolder: 'user@example.com',
                itemId: 'registerScreenEmail'
            }, {
                name: 'password',
                xtype: 'passwordfield',
                label: 'Password*',
                placeHolder: 'Minimum 5 characters',
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
                xtype: 'numberfield',
                label: 'Mobile*',
                placeHolder: 'Mobile Number',
                itemId: 'registerScreenMobile'
            }, {
            //    name: 'referalCode',
            //    xtype: 'textfield',
            //    label: 'Referal Code',
            //    placeHolder: 'Referal Code',
            //    itemId: 'registerScreenReferalCode'
            //}, {
                xtype: 'radiofield',
                name: 'gender',
                value: 'true',
                label: 'Male',
                checked: true,
                itemId: 'registerScreenMale'
            }, {
                xtype: 'radiofield',
                name: 'gender',
                value: 'false',
                label: 'Female',
                itemId: 'registerScreenFemale'
            }]
        }, {
            xtype: 'button',
            itemId: 'registerButton',
            id: 'registerFormRegisterButton',
            action: 'register',
            iconCls: 'registerCls',
            iconMask: true,
            iconAlign: 'left',
            margin: 20,
            padding: 8,
            ui: 'action',
            text: 'Sign Up'
        } ,{
            xtype: 'button',
            itemId: 'facebookSignInButton',
            margin: 20,
            padding: 8,
            text: 'Facebook Login',
            iconCls: 'facebookCls',
            iconMask: true,
            iconAlign: 'left',
            ui: 'action'
        },
            {
                xtype : 'container',
                margin: 20,
                padding: 20,
                //styleHtmlContent: true,
                html: [
                    //"Password should contain upper case, lower case, numeric value and a symbol."
                        'By registering you are agreeing to ' +
                        '<a href="#" id="registerFormTermsLink" class="small-text-medium colored-text" onclick="Racloop.app.getController(\'UiController\').showTerms(); return false;">Terms</a> and ' +
                        '<a href="#" id="registerFormPrivacyLink" class="small-text-medium colored-text" onclick="Racloop.app.getController(\'UiController\').showPrivacy(); return false;">Privacy</a> statement of CabShare'
                ].join("")
            } ]
    }

});