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
        supportsHtml5SessionStorage: function() {
            try {
                return 'sessionStorage' in window && window['sessionStorage'] !== null;
            } catch (e) {
                return false;
            }
        },
        getDefaultTime: function() {
            var now = new Date();
            return (now.getHours() + 1) + ':00'
        },
        convertLatLangToObject : function(latLng) {
            var obj = new Object();
            obj['lat'] = latLng.lat();
            obj['lng'] = latLng.lng();
            return obj;
        },
        convertObjectToLatLan : function(obj) {
            var latLng = new google.maps.LatLng(obj['lat'], obj['lng']);
            return latLng;
        },
        getToleranceInDegrees : function(distanceInMeters) {
            var nauticalMileInMeters = 1852;
            var distanceInDegrees = (1/(1852 * 60)) * distanceInMeters;
            return distanceInDegrees;
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
//    ,
//
//    checkInternet: function() {
//        var isOffline = 'onLine' in navigator && !navigator.onLine;
//        if(isOffline) {
////            var networkState = navigator.connection.type;
////            if(networkState == Connection.NONE) {
////                return false;
////
////            } else {
////                return true;
////            }
//            return false;
//        }
//        else {
//            return true;
//        }
//
//    },
//
//    isPhoneGap : function() {
//        return (cordova || PhoneGap || phonegap)
//            && /^file:\/{3}[^\/]/i.test(window.location.href)
//            && /ios|iphone|ipod|ipad|android/i.test(navigator.userAgent);
//    }
});