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
            sosButton : 'mainTabs #sosButton',
            watchButton : 'mainTabs #watchButton'
        },

        control: {
            sosButton : {
                tap : 'sosButtonClicked'
            },
            watchButton : {
                tap : 'watchButtonClicked'
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
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = "https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyD-2SVsFAN8CLCAU7gU7xdbF2Xdkox9JoI&sensor=true&libraries=places,geometry&callback=handleApiReady";
            document.body.appendChild(script);
            window.handleApiReady = function() {
                Ext.Viewport.unmask();
                Ext.Viewport.add(Ext.create('Racloop.view.MapPanel'));
                Ext.Viewport.add(Ext.create('Racloop.view.MainTabs'));
                Ext.Viewport.add(Ext.create('Racloop.view.MainNavigationView'));
                me.initGoogleElements();
                Racloop.app.getController('JourneysController').initGoogleElements();
                Racloop.app.getController('SessionsController').autoLogin();
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
        window.location.reload();
    },

    offline : function() {
        var offlineView = Ext.ComponentQuery.query('offlineView')[0];
        if(offlineView) {
            Ext.Viewport.setActiveItem(offlineView);
        }
        else {
            offlineView = Ext.create('Racloop.view.OfflineView');
            Ext.Viewport.add(offlineView);
            Ext.Viewport.setActiveItem(offlineView);
        }
    },

    initGoogleElements: function() { // Called from MapController initApp method
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
            content: "<div style='color: #ff0000;'>Watching Location</div>"
        });
        this.marker = new google.maps.Marker({
            map: this.googleMap,
            //icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
            title: 'Current Location'
        });
    },

    sosButtonClicked: function(button, e, eOpts) {
        if(button.getText() === "SOS!") {
            this.isSosActivated = true;
            this.getSosButton().setUi('decline');
            this.getSosButton().setText("Cancel SOS");
            this.watchCurrentLocation();
        }
        else {
            this.isSosActivated = false;
            this.getSosButton().setUi('action');
            this.getSosButton().setText("SOS!");
            this.unwatchCurrentLocation();
        }
    },

    watchButtonClicked : function(button, e, eOpts) {
        if(button.getText() === "Unwatch") {
            this.isWatching = false;
            this.stopWatchingJourney();
        }
        else {
            if(LoginHelper.getCurrentJourney()) {
                this.isWatching = true;
                this.startWatchingJourney();
            }
            else {
                Ext.Msg.alert("No Journey to Watch", "Please select journey from 'My Journeys'");
            }
        }

    },

    stopWatchingJourney: function() {
        this.getWatchButton().setText("Watch");
        this.unwatchCurrentLocation();
    },

    startWatchingJourney: function() {
        if(this.isWatching) {
            this.getWatchButton().setText("Unwatch");
            this.watchCurrentLocation();
        }
    },

    updateCurrentLocationOnMap: function(){ // Used in login and autologin
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
                console.log('updateCurrentLocationOnMap success');
                var geocoder = new google.maps.Geocoder();
                var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                var mapOptions = {
                    center: latlng,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    zoom: 12
                };
                gMap.setOptions(mapOptions);
                me.marker.setMap(gMap);
                me.marker.setPosition(latlng);
//                geocoder.geocode({'latLng': latlng}, function(results, status) {
//                    if (status == google.maps.GeocoderStatus.OK) {
//                        if (results.length > 0) {
//                            var currentLocation = results[0].geometry.location;
//                            var mapOptions = {
//                                center: currentLocation,
//                                mapTypeId: google.maps.MapTypeId.ROADMAP,
//                                zoom: 12
//                            };
//                            console.log(latlng + ' updateCurrentLocationOnMap success : ' + currentLocation);
//                            gMap.setOptions(mapOptions);
//                            me.marker.setMap(gMap);
//                            me.marker.setPosition(latlng);
//                        } else {
//                            console.log("No results found");
//                        }
//                    } else {
//                        console.log("Geocoder failed due to: " + status);
//                    }
//                    Ext.Viewport.unmask();
//                });
                Ext.Viewport.unmask();
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

    showCurrentJourney : function() { //from sessioncontroller login and auto login methods
        var me = this;
        var currentJourney = LoginHelper.getCurrentJourney();
        if(currentJourney) {
            me.isWatching = true;
            var fromLatitude = currentJourney.fromLatitude;
            var fromLongitude = currentJourney.fromLongitude;
            var toLatitude = currentJourney.toLatitude;
            var toLongitude = currentJourney.toLongitude;
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
                    display.setMap(me.googleMap);
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
                    me.tracks = tracks;
                    me.googleMap.panTo(from);
                    //console.log("TRACKS : " + tracks);
                }
                else {
                    console.error("Direction Status not OK");
                }
            });
        }
    },

    watchCurrentLocation : function() { //from sessioncontroller login and auto login methods
        var me = this;
        if(this.isGeolocationActive) {

        }
        else {
            this.isGeolocationActive = true;
            console.log("watch position : " + new Date())
            Ext.device.Geolocation.watchPosition({
                frequency: Config.locationUpdateFrequency,
                allowHighAccuracy : true,
                maximumAge : 0,
                callback: function (position) {
                    console.log(me.isWatching + " : Rajan : " + new Date());
                    if(me.isSosActivated) {
                        me.sendSosMessage(position.coords.latitude, position.coords.longitude);
                    }
                    if(me.isWatching) {
                        var current = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                        me.marker.setPosition(current);
                        me.marker.setMap(me.googleMap);
                        me.infoWindow.open(me.googleMap, me.marker);
                        var tracks = me.tracks;//LoginHelper.getRoutes();
                        var isDanger = false;
                        var message = "All Good";
                        if (tracks) {
                            for (var i = 0; i < tracks.length; i++) {
                                var routeInfo = tracks[i];
                                var track = routeInfo.track;
                                var polyline = new google.maps.Polyline({
                                    path: track
                                });
                                var distance = routeInfo.length;
                                var tolerance = Common.getToleranceInDegrees(distance / 10);
                                if (google.maps.geometry.poly.isLocationOnEdge(current, polyline, tolerance)) {
                                    isDanger = false;
                                    message = "On Track";
                                }
                                else {
                                    isDanger = true;
                                    message = "Danger : Off Track";
                                    break;
                                    //Ext.Msg.alert('Bad', 'Not OK');
                                }
                            }

                        }
                        Ext.toast({message: message, timeout: Config.toastTimeout, animation: true, cls: 'toastClass'});
                        if (isDanger) {
                            Ext.device.Notification.vibrate();
                        }
                    }
                },
                failure: function () {
                    console.log('something went wrong!');
                }
            });
        }
    },

    unwatchCurrentLocation : function() {
        this.infoWindow.close();
        this.marker.setMap(null);
        this.showCurrentJourney();
        if(this.isSosActivated) {

        }
        else {
            Ext.device.Geolocation.clearWatch();
            this.isGeolocationActive = false;
        }

    },

    sendSosMessage : function(lat, lng) {
        var successCallback = function(response, ops) {

        };

        // Failure
        var failureCallback = function(response, ops) {
            Ext.toast({message: "Issue with sending message", timeout: Config.toastTimeout, animation: true, cls: 'toastClass'});
        };
        var currentDateString = Ext.Date.format(new Date(),'d M y h:i A');
        var user = LoginHelper.getUser();
        Ext.Ajax.request({
            url: Config.url.RACLOOP_SOS,
            withCredentials: true,
            useDefaultXhrHeader: false,
            headers: {
                'Content-Type': 'application/json'
            },
            params: Ext.JSON.encode({
                email: user.email,
                lat: lat,
                lng: lng,
                currentDateString : currentDateString
            }),
            success: successCallback,
            failure: failureCallback
        });
    }
});