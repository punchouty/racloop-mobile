
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
                placeHolder: 'secret',
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
        },  {
            xtype: 'button',
            hidden : true,
            itemId: 'facebookLoginButton',
            margin: 20,
            padding: 8,
            text: 'Login with Facebook',
            iconCls: 'facebookCls',
            iconMask: true,
            iconAlign: 'left',
            ui: 'action'
        }, {
            xtype: 'container',
            html: '<div class="links">' +
                '<a href="#" class="small-text-medium colored-text" onclick="Racloop.app.getController(\'UiController\').showForgotPassword(); return false;">' +
                'Forgot Password' +
                '</a> &nbsp; &nbsp;' +
                '<a href="#" class="small-text-medium colored-text" onclick="Racloop.app.getController(\'UiController\').showVerifyMobile(); return false;">' +
                'Verify Mobile' +
                '</a> ' +
                '</div>',
            itemId: 'loginLinks',
            flex: 2

        }]
    }

});