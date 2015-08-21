
Ext.define('Racloop.view.LoginForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.loginForm',
    xtype: 'loginForm', // Use First in ID

    requires: [
        'Ext.TitleBar',
        'Ext.field.Text',
        'Ext.Button',
        'Ext.form.FieldSet',
        'Ext.form.Email',
        'Ext.field.Password'
    ],

    //listeners: {
    //    blur: function(comp, e, eopts) {
    //        window.scrollTo(0, 0);
    //    }
    //},

    config: {
        //cls: 'form-bg',
        items: [{
            xtype: 'fieldset',
            title: 'Welcome',
            //instructions: "Welcome!",

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
            id: 'loginFormLoginButton', // Insert Id 
            margin: 20,
            padding: 8,
            text: 'Login',
            iconCls: 'lockCls',
            iconMask: true,
            iconAlign: 'left',
            ui: 'action'
        },  {
            xtype: 'button',
            hidden : false,
            itemId: 'facebookLoginButton',
            margin: 20,
            padding: 8,
            text: 'Facebook Login',
            iconCls: 'facebookCls',
            iconMask: true,
            iconAlign: 'left',
            ui: 'action'
        }, {
            xtype: 'container',
            html: '<div class="links">' +
                '<a href="#" id="loginFormForgetPasswordLink" class="racloop-btn racloop-btn-default" onclick="Racloop.app.getController(\'UiController\').showForgotPassword(); return false;">' +
                'Forgot Password' +
                '</a> &nbsp; &nbsp;' +
                '<a href="#" id="loginFormVerifyMobileLink" class="racloop-btn racloop-btn-default" onclick="Racloop.app.getController(\'UiController\').showVerifyMobile(); return false;">' +
                'Verify Mobile' +
                '</a> ' +
                '</div>',
            itemId: 'loginLinks',
            flex: 2

        }]
    }

});