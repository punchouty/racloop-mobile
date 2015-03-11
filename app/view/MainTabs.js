
Ext.define('Racloop.view.MainTabs', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.mainTabs',
    xtype: 'mainTabs',
    requires: [
        'Ext.TitleBar',
        'Ext.navigation.Bar',
        'Racloop.view.SearchNavigationView',
        'Racloop.view.JourneyNavigationView',
        'Racloop.view.HistoryViewItem',
        'Racloop.store.History',
        'Racloop.util.Config'
    ],
    config: {
        //itemId: 'mainTabs',
        tabBarPosition: 'bottom',
         listeners: { //TODO why are these lines????
//                activeitemchange: function (tabPanel, tab, oldTab) {
//                    if(tab.config != undefined){
//                    var currentTab=this.down(tab.config.xtype);
//                    console.dir(currentTab);
//                    currentTab.pop(currentTab.getItems().length - 1);
//                }
//                    // tab.config.reset();
//                } // activeitemchange
            }, // 
        items: [
            {
                title: Config.tabHome,
                iconCls: 'home',
                xtype: 'mapPanel'
//                styleHtmlContent: true,
//
//                html: [
//                    "Home"
//                ].join("")
            },
            {
                title: Config.tabSearch,
                iconCls: 'magnifier',
                xtype: 'searchNavigationView'
            },
            {
                title: Config.tabMyJourneys,
                iconCls: 'journeys',
                xtype: 'journeyNavigationView'
            },
            {
                title: Config.tabHistory,
                iconCls: 'time',
                xtype: 'historyNavigationView'
            },
            { //IMPORTANT IT IS HIDDEN
                title: Config.tabNotifications,
                iconCls: 'browser',
                badgeText: '3',
                hidden : true,
                styleHtmlContent: true,
                scrollable: true,

                items: {
                    docked: 'top',
                    xtype: 'titlebar',
                    title: 'Notifications'
                },

                html: [
                    "Notifications"
                ].join("")
            } ,
            {
                xtype: 'settingNavigationView',
                title: Config.tabSettings,
                iconCls: 'settings'
            },
            {
                title: Config.tabSos,
                iconCls: 'bell',
                styleHtmlContent: true,
                scrollable: true,
                hidden : true,

                items: {
                    docked: 'top',
                    xtype: 'titlebar',
                    title: 'Safety'
                },

                html: [
                    "Safety"
                ].join("")
            } 
        ]
    }
});