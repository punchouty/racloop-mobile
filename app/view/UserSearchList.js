
Ext.define('Racloop.view.UserSearchList', {
    extend: 'Ext.dataview.DataView',
    xtype: 'UserSearchList',

    requires: [
        'Racloop.store.Searches',
        'Ext.DataView'
    ],
    config: {
        fullscreen: true,
        isDummy: true,
        defaultType: 'SearchDataItem',
        useComponents: true,
        store: 'SearchStore',
        itemTpl: '<div class="box"><div class="img" style="background-image: url(https://avatars3.githubusercontent.com/u/624738?v=2&s=128)"></div>' +
            '<div class="content"><div class="name">{name}</div><div class="affiliation">{dateOfJourney}</div></div>' +
            '</div></div><div class="journeycontent"><div class="name">From :{fromPlace}</div><div class="name">To :{toPlace}</div>' +
            '<div class="x-button x-button-action button-cls1" <span class="x-button-label" id="accept">Accept</span></div>'

    }

});