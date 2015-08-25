Ext.define('Racloop.view.JourneyNavigationView', {
    extend: 'Ext.navigation.View',
    xtype: 'journeyNavigationView',
    alias : 'widget.journeyNavigationView',

    requires: [
        'Racloop.view.MyJourneyView',
        'Racloop.util.Config'
    ],
    config: {
        items: [{
            title : Config.tabMyJourneys,
            xtype : 'myJourneyView'
        }],
        navigationBar: {
            backButton: {
                id: 'journeyNavigationViewBack'
            }
        }
    }
   //  ,
   //   push: function (view) {
   //    if(typeof this.getActiveItem() == 'undefined' || this.getActiveItem().xtype != view.xtype) {
   //       this.callParent(arguments);
   //      }
   //    else {
   //       console.warn("Prevented pushing a potentially duplicate view of xtype: " + view.xtype);
   //       view.destroy();
   //    }
   // }
});
