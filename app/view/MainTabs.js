
Ext.define('Racloop.view.MainTabs', {
    extend: 'Ext.tab.Panel',
    //alias: 'widget.tabmain',
    xtype: 'mainTabs',
    requires: [
        'Ext.TitleBar',
        'Racloop.view.SearchNavigationView',
        'Ext.navigation.Bar',
        'Racloop.view.JourneyNavigationView'
    ],
    config: {
        itemId: 'mainTabs',
        tabBarPosition: 'bottom',
         listeners: {
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
                title: 'Search',
                iconCls: 'magnifier',
                xtype: 'searchNavigationView'
            },
            {
                title: 'My Journeys',
                iconCls: 'home',
                xtype: 'userJourneysList'
            },
            {
                title: 'History',
                iconCls: 'time',

                styleHtmlContent: true,
                scrollable: true,

                items: {
                   docked: 'top',
                    xtype: 'titlebar',
                    title: 'History'
                },

                html: [
                    "History"
                ].join("")
            },
            { //IMPORTANT IT IS HIDDEN
                title: 'Notifications',
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
                title: 'Settings',
                iconCls: 'settings'
            },
            {
                title: 'SOS!',
                iconCls: 'bell',
                styleHtmlContent: true,
                scrollable: true,

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