
Ext.define('Racloop.model.UserReview', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.DateExtras',
        'Racloop.util.Config'
    ],

    config: {
        fields: [{
            name: 'journeyId',
            type: 'string'
        },{
            name: 'pairId1',
            type: 'string'
        },{
            name: 'pairId2',
            type: 'string'
        },{
            name: 'comment1',
            type: 'string'
        },{
            name: 'comment2',
            type: 'string'
        },{
            name: 'punchuality1',
            type: 'string'
        },{
            name: 'punchuality2',
            type: 'string'
        },{
            name: 'overall1',
            type: 'string'
        },{
            name: 'overall2',
            type: 'string'
        }]         
    }   

});