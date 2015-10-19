
Ext.define('Racloop.view.VerifySmsForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.verifySmsForm',
    xtype : 'verifySmsForm',

    config: {
        items: [{
            xtype: 'fieldset',
            //title: 'Verification',
            instructions: "Mobile number used during registration.",

            items: [{
                name: 'mobile',
                xtype: 'numberfield',
                label: 'Mobile',
                placeHolder: 'Mobile Number',
                itemId: 'mobileForVerification'
            }, {
                name: 'verificationCode',
                xtype: 'numberfield',
                label: 'Code',
                placeHolder: 'Verification Code',
                itemId: 'verificationCode'
            }]
        }, {
            xtype: 'button',
            itemId: 'verifyMobile',
            id: 'verifySmsFormVerifyMobileButton',
            text: 'Submit',
            iconCls: 'mobileCls',
            iconMask: true,
            iconAlign: 'left',
            margin: 10,
            ui: 'action'
        }, {
            xtype: 'button',
            itemId: 'resendSms',
            id: 'verifySmsFormResendSMSButton',
            text: 'Resend SMS',
            iconCls: 'emailCls',
            iconMask: true,
            iconAlign: 'left',
            margin: 10,
            ui: 'confirm'
        } ]
    }
});