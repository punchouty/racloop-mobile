
Ext.define('Racloop.view.LoginForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.loginForm',
    xtype: 'loginForm',

    requires: [
        'Ext.TitleBar',
        'Ext.field.Text',
        'Ext.Button',
        'Ext.form.FieldSet',
        'Ext.form.Email',
        'Ext.field.Password'
    ],

    config: {
        cls: 'form-bg',
        items: [{
            xtype: 'fieldset',
            title: 'Login',
            instructions: "Welcome!",

            items: [{
                name: 'email',
                xtype: 'emailfield',
                label: 'Email*',
                placeHolder: 'user@example.com',
                itemId: 'loginScreenEmail'
            }, {
                name: 'password',
                xtype: 'passwordfield',
                label: 'Password*',
                placeHolder: 'Password',
                itemId: 'loginScreenPassword'
            }]
        }, {
            xtype: 'button',
            itemId: 'loginButton',
            margin: 20,
            padding: 8,
            text: 'Login',
            iconCls: 'lockCls',
            iconMask: true,
            iconAlign: 'left',
            ui: 'action'
        }]
    }

});