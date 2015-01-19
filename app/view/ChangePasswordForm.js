
Ext.define('Racloop.view.ChangePasswordForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.changePasswordForm',

    config: {
        items: [{
            xtype: 'fieldset',
            title: 'Change Password',

            items: [{
                name: 'currentPassword',
                xtype: 'passwordfield',
                label: 'Old Password',
                placeHolder: 'Current Password',
                itemId: 'changeScreenoldPassword'
            }, {
                name: 'newpassword',
                xtype: 'passwordfield',
                label: 'New Password',
                placeHolder: 'New Password',
                itemId: 'changeScreennewpassword'
            }, {
                name: 'repeatpassword',
                xtype: 'passwordfield',
                label: 'Repeat Password',
                placeHolder: 'Repeat Password',
                itemId: 'changeScreenrepeatpassword'
            }

            ]
        }, {
            xtype: 'button',
            itemId: 'changeButton',
            action: 'change',
            text: 'Change Password',
            ui: 'action',
            margin: 20,
            padding: 8
        }

        ]
    }
});