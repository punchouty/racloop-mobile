
Ext.define('Racloop.view.EditProfileForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.editProfileForm',
    xtype: 'editProfileForm',

    requires: [
        'Racloop.util.Config',
        'Ext.form.FieldSet',
        'Ext.field.Email',
        'Ext.field.Password',
        'Ext.field.Search',
        'Ext.field.DatePicker',
        'Ext.field.Radio',
        'Ext.field.Number',
        'Ext.Img'
    ],

    config: {
    items: [{
            xtype: 'fieldset',
            //title: 'Edit Profile',
            //instructions: "You cannot change your email",
            items: [
                    {                    
                        xtype: 'image',
                        itemId: 'userImage',
                        name: 'photoUrl',                       
                        src: 'http://www.sencha.com/assets/images/sencha-avatar-64x64.png',
                        height: 100,
                        width: 100,
                        imagCls: 'image',
                        margin:'5 auto'            
                    },                       
                    {
                        xtype: 'button',
                        itemId: 'photoLibrary',
                        text: 'Photo Library',
                        hidden  : true,
                        margin: '5 5 5 5',
                        ui: 'action'
                    }, {
                        xtype: 'button',
                        itemId: 'photoCapture',
                        text: 'Take Photo',
                        hidden  : true,
                        margin: '5 5 5 5',
                        ui: 'action'              
             },{
                    name: 'fullName',
                xtype: 'textfield',
                label: 'Name',
                //labelWidth: '40%',
                itemId: 'editScreenName'
            },
            {
                name: 'email',
                xtype: 'emailfield',
                readOnly: true,
                label: 'Email',
                placeHolder: 'email@example.com',
                //labelWidth: '40%',
                itemId: 'editScreenEmail'
            }, {
                name: 'mobile',
                xtype: 'numberfield',
                readOnly: true,
                label: 'Mobile',
                //labelWidth: '40%',
                itemId: 'editScreenMobile'
            },{
                name: 'userCode',
                xtype: 'textfield',
                label: 'User Code',
                hidden : true,
                readOnly: true,
                //labelWidth: '40%',
                itemId: 'editScreenUserCode'
            }, {
                   name: 'gender',
                    xtype: 'selectfield',
                    //labelWidth: '50%',
                    itemId: 'editScreenGender',
                    label: 'Gender',
                    value : 'male',
                    options: [
                        {
                            text: 'Male',
                            value: 'male'
                        },
                        {
                            text: 'Female',
                            value: 'female'
                        }
                    ]
                }
            //    ,  {
            //    name: 'gender',
            //    xtype: 'radiofield',
            //    label: 'Male',
            //    value: 'male',
            //    //checked: true,
            //    //labelWidth: '40%',
            //    itemId: 'editScreenMale'
            //}, {
            //    name: 'gender',
            //    xtype: 'radiofield',
            //    label: 'Female',
            //    value: 'female',
            //    //labelWidth: '40%',
            //    itemId: 'editScreenFemale'
            //}

            ]
        }, {
            xtype: 'button',
            itemId: 'updateProfileButton',
            id: 'editProfileFormButton',
            text: 'Update',
            action: 'edit',
            ui: 'action',
            margin: 20,
            padding: 8
        }]
    },
    initialize: function() {
        this.callParent(arguments);
        var user = LoginHelper.getUser();
        this.setValues(user);
        //var isMale = this.down('field[name=gender]');
        if(user.isMale) {
            this.down('field[itemId=editScreenGender]').setValue("male");
        }
        else {
            this.down('field[itemId=editScreenGender]').setValue("female");
        }
        console.log("user.photoUrl : " + user.photoUrl)
        this.down("#userImage").setSrc(user.photoUrl);
        //console.log('facebook id :'+user.facebookId);
        if(!user.facebookId) {
            this.down('button[itemId=photoLibrary]').setHidden(false);
            this.down('button[itemId=photoCapture]').setHidden(false);
        }
    }
    // ,
    // getPhoto: function(source) {
    //     var me = this;
    //     navigator.camera.getPicture(me.success, me.failure, {
    //         quality: 50,
    //         destinationType: navigator.camera.DestinationType.FILE_URI,
    //         sourceType: source 
    //     });

    // },

    
});