Ext.define('Racloop.view.UserFeedbackView', {
    extend: 'Ext.form.Panel',
    alias: 'widget.feedbackView',
    xtype : 'feedbackView',

    requires: [
        'Ext.TitleBar',
        'Ext.form.FieldSet',
        'Ext.ux.touch.Rating'
    ],

    config: {
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },
        title: "User Feedback Form",
        items: [ 
        {
                xtype: 'container',
                itemId: 'feedbackViewPanel',
                html: 'Feedback'
        },
        {
            xtype: 'fieldset',
            title: 'User Feedbacks',
            instructions: "Feedback to user",
            items: [{
                        xtype: 'rating',
                        label : 'Ratings',
                        name: 'userRating',                        
                        itemsCount : 5,
                        value: 2, //zero-based!                     
                        itemCls : 'x-rating-star',
                        itemHoverCls : 'x-rating-star-hover'
                    },{
                        xtype: 'textareafield',
                        label: 'Comments',
                        name: 'comment',
                        maxLength: 200,
                        maxRows: 4                        
                    },{
                        xtype: "hiddenfield",
                        name: 'userId',
                        value: ''
                    }]               
            },
            {
                xtype: 'button',
                itemId: 'saveUserFeedBack',
                margin: 20,
                padding: 8,
                text: 'Save'
            //    ui: 'action'
            },{
                xtype: 'button',
                itemId: 'cancelUserFeedBack',
                margin: 20,
                padding: 8,
                text: 'Cancel',
                ui: 'decline'
            }]
    }

});