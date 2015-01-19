Ext.define('Racloop.view.ExistingJourneyPanel', {
    extend: 'Ext.Panel',
    alias: 'widget.existingJourneyPanel',

    requires: [
        'Ext.Label'
    ],

    config: {
        itemId: 'existingPanel',
        scrollable: true,
        existingJrny: {},
        newJrny: {},
        layout: {
            type: 'vbox',
         //   align: 'center'
         autoScroll: true
        },
        items: [
              { 
                xtype: 'container',                
                itemId: 'existingJourneyInfo',
                html: 'newJourney'                         
            },{
                xtype: 'fieldset',
                // title: 'Please select your options',              
                items: [{
                    xtype: 'selectfield',
                    itemId: 'selectOpton',
                    label: 'Please Select Your Option',
                    options: [{
                        text: 'Please use existing journey',
                        value: 'existingJourney'
                    }, {
                        text: 'No, I want to put in a new journey request',
                        value: 'newJourney'
                    }]    
                  }]
                },
                {
                xtype: 'container',
                padding:'10px',
                items: [{                           
                    xtype: 'button',
                    text: 'Send Request',
                    ui: 'action',
                    action: 'existingSendRequest',
                    itemId: 'existingSendRequestButton',
                    style: 'height: 16px;'
                                
                 }]
            }
        ]
    }

});