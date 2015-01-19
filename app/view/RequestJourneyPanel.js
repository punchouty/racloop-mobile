Ext.define('Racloop.view.RequestJourneyPanel', {
    extend: 'Ext.Panel',
    alias: 'widget.requestJourneyPanel',

    requires: [
        'Ext.Label'
    ],

    config: {
        itemId: 'requestPanel',
        myJourneyId: null,
        matchedJourneyId: null,  
        isDummy: true,     
        layout: {
            type: 'vbox'
         //   align: 'center'
        },
        items: [
              { 
                xtype: 'container',
                layout: {
                    type: 'hbox',
                    pack: 'center'
                },
                itemId: 'requestJourneyInfo',
                flex: 6,
                items: [
                    {
                        xtype: 'component',                       
                        html: 'Request Photo',
                        itemId: 'requestPhoto',                        
                        padding: '10px',
                        flex: 2
                    },
                    {
                        xtype: 'component',                      
                        html: 'Request Data',
                        itemId: 'requestData',                        
                        padding: '10px',
                        flex: 3 
                    }
                ]
            },
            {
                xtype: 'container',
                flex: 1,
                padding:'10px',
                items: [{                           
                    xtype: 'button',
                    text: 'Send Request',
                    ui: 'action',
                    action: 'SendRequest',
                    itemId: 'SendRequestButton',
                    style: 'height: 16px;'
                                
                 }]
         }
        ]
    }

});