Ext.define('Racloop.view.ForgotPasswordForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.forgotPasswordForm',
    xtype: 'forgotPasswordForm',

    config: {

        items: [{
            xtype: 'fieldset',
            title: 'Forgot Password',
            instructions: "Email used during Sign Up",

            items: [{
                name: 'email',
                xtype: 'emailfield',
                label: 'Email*',
                placeHolder: 'user@example.com',
                //labelWidth: '40%',
                itemId: 'forgotPasswordTextField'
            }]
        }, {
            xtype: 'button',
            itemId: 'forgotPasswordButton',
            text: 'Send SMS',
            iconCls: 'emailCls',
            iconMask: true,
            iconAlign: 'left',
            ui: 'action',
            margin: 20,
            padding: 8
        }]
    }
});