Ext.define('Racloop.model.Comment', {
    extend: 'Ext.data.Model',

    config: {
        fields: [{
            name: 'user',
            type: 'String'
        }, {
            name: 'content',
            type: 'String'
        }, {
            name: 'photoUrl',
            type: 'string'
        }]
    }
});