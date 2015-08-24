Ext.define('Racloop.view.HistoryNavigationView', {
    extend: 'Ext.navigation.View',
    xtype: 'historyNavigationView',
    alias : 'widget.historyNavigationView',

    requires: [
        'Ext.DataView',
        'Racloop.store.History',
        'Racloop.view.HistoryViewItem',
        'Racloop.util.Config'
    ],
    config: {
        items: [{
            title: Config.tabHistory,
            xtype: 'historyView'
        }],
        navigationBar: {
            backButton: {
                id: 'historyNavigationViewBack'
            }
        }
    }
   // ,
   //
   // push: function (view) {
   //   if(typeof this.getActiveItem() == 'undefined' || this.getActiveItem().xtype != view.xtype) {
   //      this.callParent(arguments);
   //     }
   //   else {
   //      console.warn("Prevented pushing a potentially duplicate view of xtype: " + view.xtype);
   //      view.destroy();
   //   }
   //}
});