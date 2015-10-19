Ext.define('Racloop.view.HelpPage', {
    extend: 'Ext.Container',
    alias: 'widget.helpPageView',
    xtype : 'helpPageView',

    requires: [
        'Ext.Carousel',
        'Ext.Button'
    ],

    config: {
        layout: 'vbox',
        // height: 'Ext.getBody().getSize().height+\'px\'',
        // width: 'Ext.getBody().getSize().width+\'px\'',
        items: [
            {
                xtype: 'carousel',
                height: '100%',
                itemId: 'helpCarousel',
                direction: 'horizontal',
                items: [
                    {   xtype: 'image',
                        src: 'slide1.jpg'
                    },
                    {   xtype: 'image',
                        src: 'slide2.jpg'
                    },
                    {   xtype: 'image',
                        src: 'slide3.jpg'
                    }
                ]
            },
            {
                xtype: 'panel',                
                left: '2%',
                style: "background-color: transparent",
                itemId: 'skipHelpLink', 
                hidden: true,             
                items: [                    
                    {
                        xtype: 'panel',
                        html: '<a href="#" onclick="Racloop.app.getController(\'SessionsController\').removeHelpView(); return false;">Skip</a>',
                        padding: '10'
                    }
                ]
            }
        ]
    }
});

