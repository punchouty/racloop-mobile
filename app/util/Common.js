Ext.define('Racloop.util.Common', {
    singleton: true,
    alternateClassName: ['Common'],

    requires: [
        'Ext.device.Geolocation'
    ],

    config: {
        supportsHtml5Storage: function() {
            try {
                return 'localStorage' in window && window['localStorage'] !== null;
            } catch (e) {
                return false;
            }
        },
        getDefaultTime: function() {
            var now = new Date();
            return (now.getHours() + 1) + ':00'
        }
    },
    constructor: function() {
        return this.config;
    }
});