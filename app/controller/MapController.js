Ext.define('Racloop.controller.MapController', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.device.Notification',
        'Racloop.view.MainTabs',
        'Racloop.view.MainNavigationView',
        'Racloop.view.MapPanel',
        'Racloop.util.LoginHelper',
        'Racloop.util.Common',
        'Racloop.util.Config'
    ],

    config: {
        refs: {
            mainTabs : "mainTabs",

            mainNavigationView: 'mainNavigationView',

            searchNavigationView : 'searchNavigationView',
            searchForm : 'searchNavigationView #searchForm',

            mapPanel : 'mainTabs mapPanel',
            sosButton : 'mainTabs #sosButton'
        },

        control: {
            sosButton : {
                tap : 'sosButtonClicked'
            },
            homeButton : {
                tap : 'homeButtonClicked'
            }
        }
    },

    launch : function() {
        window.addEventListener("online", this.online, false);
        window.addEventListener("offline", this.offline, false);
        if (Ext.device.Connection.isOnline()) {
            this.initApp();
        }
    },

    initApp : function() {
        var me = this;
        if (typeof google === 'object' && typeof google.maps === 'object') {
            console.log('google already there .....');
        } else {
            Ext.Viewport.mask({
                xtype: 'loadmask',
                indicator: true,
                message: 'Loading Maps...'
            });
            console.log('loading google.....');
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = "https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyD-2SVsFAN8CLCAU7gU7xdbF2Xdkox9JoI&sensor=true&libraries=places,geometry&callback=handleApiReady";
            document.body.appendChild(script);
            window.handleApiReady = function() {
                console.log("handleApiReady Start");
                Ext.Viewport.unmask();
                Ext.Viewport.add(Ext.create('Racloop.view.MapPanel'));
                Ext.Viewport.add(Ext.create('Racloop.view.MainTabs'));
                Ext.Viewport.add(Ext.create('Racloop.view.MainNavigationView'));
                me.initGoogleElements();
                Racloop.app.getController('JourneysController').initGoogleElements();
                Racloop.app.getController('SessionsController').autoLogin();
                console.log("handleApiReady Ends");
            }
            Ext.Function.defer(this.pageRefresh, 10000, this);
        }
    },

    pageRefresh : function() {
        if (typeof google === 'object' && typeof google.maps === 'object') {
            console.log('pageRefresh google already there .....');
        } else {
            window.location.reload();
        }
    },

    online : function() {
        console.log("Online event fired");
        window.location.reload();
    },

    offline : function() {
        console.log("Offline event fired");
        var offlineView = Ext.ComponentQuery.query('offlineView')[0];
        console.log("offlineView event " + offlineView);
        if(offlineView) {
            console.log("view present")
            Ext.Viewport.setActiveItem(offlineView);
        }
        else {
            console.log("view NOT present")
            offlineView = Ext.create('Racloop.view.OfflineView');
            Ext.Viewport.add(offlineView);
            Ext.Viewport.setActiveItem(offlineView);
        }
    },

    initGoogleElements: function() {
        console.log("Map Controller initGoogleElements starts");
        var mainNavigationView = this.getMainNavigationView(); // Main view
        var mapPanel = this.getMapPanel();
        this.googleMap = mapPanel.down('map').getMap();
        var me = this;
        this.directionsDisplay = new google.maps.DirectionsRenderer();
        this.directionsService = new google.maps.DirectionsService();
        var mapRendererOptions = {
            map: this.googleMap
        };
        this.directionsDisplay.setOptions(mapRendererOptions);
        this.infoWindow = new google.maps.InfoWindow({
            content: "<div style='color: #ff0000;'>My Location</div>"
        });
        this.marker = new google.maps.Marker({
            map: this.googleMap,
            //icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
            title: 'Current Location'
        });
        console.log("Map Controller initGoogleElements ends");
    },

    sosButtonClicked: function(button, e, eOpts) {
        console.log("sosButtonClicked");
    },

//    updateMap: function() {
//        var currentDateString = Ext.Date.format(new Date(),'d M y h:i A');
//        var successCallback = function(response, ops) {
//            var mobileResponse = Ext.decode(response.responseText);
//            if (mobileResponse.success) {
//
//                Ext.Viewport.unmask();
//            } else {
//                Ext.Viewport.unmask();
//            }
//        };
//        // Failure
//        var failureCallback = function(response, ops) {
//            Ext.Viewport.unmask();
//            Ext.Msg.alert("Network Error", response.message);
//        };
//        Ext.Viewport.mask({
//            xtype: 'loadmask',
//            indicator: true,
//            message: 'Fetching Current Journey...'
//        });
//        Ext.Ajax.request({
//            url: Config.url.RACLOOP_EXISTINGJOURNEY,
//            withCredentials: true,
//            useDefaultXhrHeader: false,
//            headers: {
//                'Content-Type': 'application/json'
//            },
//            params: Ext.JSON.encode({
//                currentDateString: currentDateString
//            }),
//            success: successCallback,
//            failure: failureCallback
//        });
//    },

    updateCurrentLocationOnMap: function(){
        var me = this;
        var mapPanel = this.getMapPanel();
        var gMap = mapPanel.down('map').getMap();
        Ext.Viewport.mask({
            xtype: 'loadmask',
            indicator: true,
            message: 'Getting Location..'
        });
        Ext.device.Geolocation.getCurrentPosition({
            allowHighAccuracy : true,
            timeout : 3000,
            success: function(position) {
                var geocoder = new google.maps.Geocoder();
                var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                geocoder.geocode({'latLng': latlng}, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results.length > 0) {
                            var currentLocation = results[0].geometry.location;
                            var mapOptions = {
                                center: currentLocation,
                                mapTypeId: google.maps.MapTypeId.ROADMAP,
                                zoom: 12
                            }
                            gMap.setOptions(mapOptions);
                            me.marker.setPosition(currentLocation);
//                            me.marker = new google.maps.Marker({
//                                position: currentLocation,
//                                map: gMap,
//                                title: 'Current Location'
//                            });
//                            gMap.setZoom(10);
//                            gMap.panTo(currentLocation);
                        } else {
                            console.log("No results found");
                        }
                    } else {
                        console.log("Geocoder failed due to: " + status);
                    }
                    Ext.Viewport.unmask();
                });
            },
            failure: function() {
                console.log('something went wrong!');
                Ext.Viewport.unmask();
            }
        });
    },

    updateFromFieldWithCurrentLocation: function(){
        Ext.Viewport.mask({
            xtype: 'loadmask',
            indicator: true,
            message: 'Getting Location'
        });
        Ext.device.Geolocation.getCurrentPosition({
            allowHighAccuracy : true,
            timeout : 3000,
            success: function(position) {
                if(this.geocoder == null) this.geocoder = new google.maps.Geocoder();
                var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                this.geocoder.geocode({'latLng': latlng}, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results.length > 0) {
                            Ext.ComponentQuery.query('textfield[name=fromPlace]')[0].setValue(results[0].formatted_address);
                            Ext.ComponentQuery.query('hiddenfield[name=fromLatitude]')[0].setValue(results[0].geometry.location.lat());
                            Ext.ComponentQuery.query('hiddenfield[name=fromLongitude]')[0].setValue(results[0].geometry.location.lng());
                            console.log("results[0].geometry.location.lat() : " + results[0].geometry.location.lat());
                            console.log("results[0].geometry.location.lng() : " + results[0].geometry.location.lng())
                        } else {
                            console.log("No results found");
                        }
                        Ext.Viewport.unmask();
                    } else {
                        Ext.Viewport.unmask();
                        console.log("Geocoder failed due to: " + status);
                    }
                });
            },
            failure: function() {
                console.log('something went wrong!');
                Ext.Viewport.unmask();
            }
        });
    },

    showCurrentJourney : function() {
        var me = this;
        var currentJourney = LoginHelper.getCurrentJourney();
        if(currentJourney) {
            var fromLatitude = currentJourney.fromLatitude;
            var fromLongitude = currentJourney.fromLongitude;
            var toLatitude = currentJourney.toLatitude;
            var toLongitude = currentJourney.toLongitude;
            console.log("fromLatitude : " + fromLatitude + "fromLongitude : " + fromLongitude + "toLatitude : " + toLatitude + "toLongitude : " + toLongitude + "")
            var from = new google.maps.LatLng(fromLatitude, fromLongitude);
            var to = new google.maps.LatLng(toLatitude, toLongitude);
            var display = this.directionsDisplay;
            var request = {
                origin: from,
                destination: to,
                travelMode: google.maps.TravelMode.DRIVING,
                provideRouteAlternatives : true

            };
            this.directionsService.route(request, function (results, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    display.setDirections(results);
                    var tracks = [];
                    var routes = results.routes;
                    for(var i = 0; i < routes.length; i++) {
                        var legs = routes[i].legs;
                        for(var j = 0; j < legs.length; j++) {
                            var steps = legs[j].steps;
                            //var polyline = new google.maps.Polyline();
                            //var path = polyline.getPath();
                            var track = [];
                            var length = 0;
                            for ( var k = 0; k < steps.length; k++) {
                                var start_location_step = steps[k].start_location;
                                var position = Common.convertLatLangToObject(start_location_step);
                                length = length + steps[k].distance.value;
                                track.push(start_location_step);
                                if(k == (steps.length - 1)) {
                                    var end_location_step = steps[k].end_location;
                                    var end_position = Common.convertLatLangToObject(end_location_step);
                                    track.push(end_location_step);
                                }
                                //console.log("i : " + i + ", j : " + j + ", k : " + k + ", leg_start : " + legs[j].start_address + ", leg_end : " + legs[j].end_address + ", start_location : " + steps[k].start_location + ", end_location" + steps[k].end_location);
                            }
                            var routeInfo = {};
                            routeInfo.length = length;
                            routeInfo.track = track;
                            tracks.push(routeInfo);
                        }
                    }
                    //LoginHelper.setRoutes(polylines);
                    me.tracks = tracks;
                    console.log("TRACKS : " + tracks);
                }
                else {
                    console.error("Direction Status not OK");
                }
            });
        }
    },

    watchCurrentLocation : function() {
        var me = this;
        Ext.device.Geolocation.watchPosition({
            frequency: 30000, // Update every 30 seconds
            allowHighAccuracy : true,
            callback: function (position) {
                console.log("location updated");
                var current = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                current = new google.maps.LatLng(28.9853413, 77.7029944);//28.9853413,77.7029944
                me.marker.setPosition(current);
                me.googleMap.panTo(current);
                me.infoWindow.open(me.googleMap, me.marker);
                var tracks = me.tracks;//LoginHelper.getRoutes();
                var isDanger = false;
                var message = "All Good";
                if(tracks) {
                    console.log("WATCH TRACKS : " + tracks);
                    for( var i = 0; i < tracks.length; i++) {
                        var routeInfo = tracks[i];
                        console.log("Distance : " + routeInfo.length)
                        console.log("routeInfo.track : " + routeInfo.track)
                        var track = routeInfo.track;
                        var polyline = new google.maps.Polyline({
                            path: track
                        });
                        var distance = routeInfo.length;
                        var tolerance = Common.getToleranceInDegrees(distance/10);
                        if(google.maps.geometry.poly.isLocationOnEdge(current, polyline, tolerance)) {
                            isDanger = false;
                            //Ext.Msg.alert('Good', 'OK');
                            Ext.toast({message: "All Good", timeout: Config.toastTimeout, animation: true, cls: 'toastClass'});
                        }
                        else {
                            isDanger = true;
                            message = "Danger";
                            break;
                            //Ext.Msg.alert('Bad', 'Not OK');
                        }
                    }

                }
                if(isDanger) {
                    Ext.toast({message: message, timeout: Config.toastTimeout, animation: true, cls: 'toastClass'});
                    Ext.device.Notification.vibrate();
                }
            },
            failure: function () {
                console.log('something went wrong!');
            }
        });
    },

    unwatchCurrentLocation : function() {
        Ext.device.Geolocation.clearWatch();
    }
});