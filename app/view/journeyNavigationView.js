Ext.define('Racloop.view.JourneyNavigationView', {
    extend: 'Ext.navigation.View',
    xtype: 'userJourneysList',

    requires: [
        //'RacloopApp.model.Journey',
        'Racloop.store.Journeys',
        'Ext.DataView',
        'Racloop.view.JourneyViewItem'
    ],
    config: {
        //layout : 'card',

        items: [{
            title: 'My Journeys',
            xtype: 'dataview',
            fullscreen: true,
            defaultType: 'JourneyDataItem',
            useComponents: true,

            // items : [{
            //     xtype: 'dataview',
            animation: {
                duration: 3000,
                easing: 'ease-in-out',
                type: 'slide',
                direction: 'right'
            },
            scrollable: {
                direction: 'vertical'
            },
            //cls: 'dataview-basic',
            itemTpl: //'<div class="box"><div class="img" style="background-image: url(https://avatars3.githubusercontent.com/u/624738?v=2&s=128)"><hr></div>'+
                '<div class="content"><div class="name">{name}</div><div class="affiliation">{dateOfJourney}</div></div>' +
                '</div></div><div class="journeycontent"><div class="name">From :</div><div class="name">To :</div>',

            store: "journeyStore"
        }]
    }
});