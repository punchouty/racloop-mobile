Ext.define('Racloop.view.ForgotPasswordForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.forgotPasswordForm',

    config: {

        items: [{
            xtype: 'fieldset',
            title: 'Forgot Password',
            instructions: "Email used during signup",

            items: [{
                name: 'email',
                xtype: 'emailfield',
                label: 'Email*',
                placeHolder: 'user@example.com',
                //labelWidth: '40%',
                itemId: 'ForgotScreenPassword'
            }]
        }, {
            xtype: 'button',
            itemId: 'ForgotPasswordButton',
            text: 'Send Email!',
            action: 'forgotpassword',
            iconCls: 'emailCls',
            iconMask: true,
            iconAlign: 'left',
            ui: 'action',
            margin: 20,
            padding: 8
        }]
    }
});