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
        },
        isEmpty : function(str) {
            return (!(typeof str != "undefined" && str))
            //return (!str || 0 === str.length);
        },
        getRating: function (rating, max, hideRatingValue) {
          if (rating !== undefined) {
            var str = '<div class="ratings">';
            rating = parseFloat(rating);
            max = max || 5;
         
            // We divide the rating into a part upto maximum value
         
            for (var i = 1; i <= max; i++) {
              // For each 1 rating, add a full star
              if (i <= rating) {
                str += '<div class="star full-star"></div>';
              }
         
              if (i > rating) {
                // If the part rating is a decimal between 0 & 1, add half star
                if (rating % 1 !== 0 && (i - rating) < 1) {
                  str += '<div class="star half-star"></div>';
                } 
                // For all part rating value 0, add no star
                else {
                  str += '<div class="star no-star"></div>';
                }
              }
            }
         
            // if (!hideRatingValue) {
            //   str += '<div class="value">' + rating + '</div>';
            // }
         
            str += '</div>';
         
            return str;
          }
         
          return '';
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