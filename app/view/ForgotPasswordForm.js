Ext.define('Racloop.view.ForgotPasswordForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.forgotPasswordForm',
    xtype: 'forgotPasswordForm',

    config: {

        items: [{
            xtype: 'fieldset',
            title: 'Forgot Password',
            instructions: "Password will be sent to your registered email",

            items: [{
                name: 'email',
                xtype: 'emailfield',
                label: 'User Id*',
                placeHolder: 'user@example.com',
                id : 'forgotPasswordFormEmail',
                //labelWidth: '40%',
                itemId: 'forgotPasswordTextField'
            }]
        }, {
            xtype: 'button',
            itemId: 'forgotPasswordButton',
            id: 'forgotPasswordFormRetrievePasswordButton',
            text: 'Retrieve Password',
            iconCls: 'emailCls',
            iconMask: true,
            iconAlign: 'left',
            ui: 'action',
            margin: 20,
            padding: 8
        }]
    }
});