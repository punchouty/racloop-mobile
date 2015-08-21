
Ext.define('Racloop.view.ChangePasswordForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.changePasswordForm',

    config: {
        items: [{
            xtype: 'fieldset',
            //title: 'Change Password',
            instructions : 'Password should contain minimum 5 characters.',
            items: [{
                name: 'currentPassword',
                xtype: 'passwordfield',
                label: 'Old',
                placeHolder: 'Current Password',
                itemId: 'changeScreenOldPassword'
            }, {
                name: 'newPassword',
                xtype: 'passwordfield',
                label: 'New',
                placeHolder: 'Minimum 5 characters',
                itemId: 'changeScreenNewPassword'
            }, {
                name: 'repeatPassword',
                xtype: 'passwordfield',
                label: 'Repeat Password',
                placeHolder: 'Repeat Password',
                hidden : true,
                itemId: 'changeScreenRepeatPassword'
            }

            ]
        }, {
            xtype: 'button',
            itemId: 'changePasswordButton',
            action: 'change',
            text: 'Change Password',
            ui: 'action',
            margin: 20,
            padding: 8
        }

        ]
    }
});