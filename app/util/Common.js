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
        },
        updateCurrentLocation: function(){
            Ext.device.Geolocation.getCurrentPosition({
                allowHighAccuracy : false,
                timeout : 3000,
                success: function(position) {
                    var geocoder = new google.maps.Geocoder();
                    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                    geocoder.geocode({'latLng': latlng}, function(results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            if (results.length > 0) {
                                Ext.ComponentQuery.query('textfield[name=fromPlace]')[0].setValue(results[0].formatted_address);
                                Ext.ComponentQuery.query('hiddenfield[name=fromLatitude]')[0].setValue(results[0].geometry.location.lat());
                                Ext.ComponentQuery.query('hiddenfield[name=fromLongitude]')[0].setValue(results[0].geometry.location.lng());
                            } else {
                                console.log("No results found");
                            }
                        } else {
                            console.log("Geocoder failed due to: " + status);
                        }
                    });
                },
                failure: function() {
                    console.log('something went wrong!');
                }
            });
        },
        popToRoot: function(navigationView, destroy) {
            var navBar = navigationView.getNavigationBar(),
                stackLn = navigationView.getItems().length,
                stackRm;

            //just return if we're at root
            if(stackLn <= 1) return;
            //just return if we're already animating
            if(navBar && navBar.animating) return;

            //splice the stack to get rid of items between top and root
            stackRm = this.stack.splice(1, stackLn-2);
            //remove views that were removed from the stack if required
            if(destroy) {
                stackRm.forEach(function(val, idx, arr) {
                    this.remove(val, true);
                });
            }
            //clear out back button stack
            navBar.backButtonStack = [];
            //now we can do a normal pop
            navigationView.pop();
        }
    },
    constructor: function() {
        return this.config;
    }
});