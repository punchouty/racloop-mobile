
Ext.define('Racloop.model.Preferences', {
    extend: 'Ext.data.Model',

    config: {
        fields: [{
            name: 'contactOne',
            type: 'string'
        }, {
            name: 'contactTwo',
            type: 'string'
        },{
            name: 'travelModePreference',
            type: 'string'
        },{
            name: 'paymentPreference',
            type: 'string'
        },{
            name: 'cabServicePreference',
            type: 'string'
        },{
            name: 'enableDialogPreference',
            type: 'boolean'
        },{
            name: 'womenOnlySearchPreference',
            type: 'boolean'
        }
        ]
        //,
        //validations: [
        //    {
        //    type: 'format',
        //    field: 'contactOne',
        //    matcher: /^[7-9][0-9]{9}$/,
        //    message: "Invalid Mobile Number"
        //},
        //{
        //    type: 'format',
        //    field: 'contactTwo',
        //    matcher: /^[7-9][0-9]{9}$/,
        //    message: "Invalid Mobile Number"
        //}
        //]
    }
});