
Ext.define('Racloop.view.MapPanel', {
    extend: 'Ext.Panel',
    xtype : "mapPanel",
    alias: 'widget.mapPanel',

    requires: [
        'Ext.Map'
    ],

    config: {
        layout: {
            type: 'vbox',
            pack: 'center'
        },
        fullscreen: true,
        items: [
            {
                xtype : 'toolbar',
                docked: 'top',
                title: 'Map',
                items : [
                    {
                        xtype: 'button',
                        itemId : 'sosButton',
                        ui: 'action',
                        text: 'SOS!',
                        iconCls: 'bell',
                        iconMask: true
                    },
                    {
                        xtype : 'spacer'
                    },
                    {
                        xtype: 'button',
                        itemId : 'watchButton',
                        ui: 'action',
                        text: 'Unwatch',
                        iconCls: 'eye',
                        iconMask: true
                    }
                ]
            },
            {
                xtype: "map",
                flex : 1,
                itemId : "googleMap",
                mapOptions: {
//                    center: new google.maps.LatLng (23.843138,79.44171),
//                    mapTypeId: google.maps.MapTypeId.ROADMAP,
//                    zoom: 5
                }
            }
        ]
    }
    ,
    initialize: function() {
        this.callParent(arguments);
        // wait 100 ms
        Ext.Function.defer(this.initMap,100,this);
    },
    initMap: function() {
        var mapPanel = this.down('map');
        var gMap = mapPanel.getMap();
        console.log("init map : " + mapPanel.getMap());

        if (gMap == null) {
            Ext.Function.defer(this.initMap,250,this);
        } else {
            var center = new google.maps.LatLng (23.843138,79.44171);
            var mapOptions = {
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                zoom: 5
            }
            gMap.setOptions(mapOptions);
            gMap.panTo(center);
        }
    }
});