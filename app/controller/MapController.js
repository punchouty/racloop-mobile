Ext.define('Racloop.controller.MapController', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.device.Notification',
        'Ext.util.DelayedTask',
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

            sosView : 'sosView',

            mapPanel : 'mainTabs mapPanel',
            sosButton : 'mainTabs #sosButton',
            sosCancelButton : 'sosView #cancelSos',
            watchButton : 'mainTabs #watchButton'
        },

        control: {
            sosButton : {
                tap : 'sosButtonClicked'
            },
            watchButton : {
                tap : 'watchButtonClicked'
            },
            sosCancelButton : {
                tap : 'sosCancelButtonClicked'
            }
        },
        watching : false,
        sosActivated : false,
        mapLoadingInProgress : false,
        mapLoadingCompleted : false
    },

    launch : function() {
        console.log("Map Controller  - launch");
        var me = this;
        window.addEventListener("online", this.online, false);
        window.addEventListener("offline", this.offline, false);
        if (Ext.device.Connection.isOnline()) {
            console.log("Map Controller  - launch - online application");
            this.initApp();
        }
        else {
            console.log("Map Controller  - launch - offline application");
        }
    },

    initApp : function() {
        var me = this;
        console.log("initApp - initialising Maps");
        if (typeof google === 'object' && typeof google.maps === 'object') {
            console.log("Google Maps are already loaded : google === 'object' && typeof google.maps === 'object'")
        } else {
            if(me.getMapLoadingCompleted()) {
            //if(window.mapLoaded) {
                console.log("Google Maps are already loaded : me.getMapLoadingCompleted() === true");
            }
            else {
                console.log("Google Maps are already loaded : me.getMapLoadingCompleted() === false");
                Ext.Viewport.mask({
                    xtype: 'loadmask',
                    indicator: true,
                    message: 'Loading Maps...'
                });
                console.log("Google Maps are not loaded : creating dynamic links for google maps");
                me.setMapLoadingInProgress(true);
                //window.mapLoading = true;
                var script = document.createElement("script");
                script.type = "text/javascript";
                script.src = "https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyD-2SVsFAN8CLCAU7gU7xdbF2Xdkox9JoI&sensor=true&libraries=places,geometry&callback=handleApiReady";
                document.body.appendChild(script);
                window.handleApiReady = function() {
                    console.log("Google Maps loaded successfully");
                    //window.mapLoading = false;
                    me.setMapLoadingInProgress(false);
                    console.log("Starting sencha touch application init start");
                    Ext.Viewport.unmask();
                    Ext.Viewport.add(Ext.create('Racloop.view.MapPanel'));
                    Ext.Viewport.add(Ext.create('Racloop.view.MainTabs'));
                    Ext.Viewport.add(Ext.create('Racloop.view.MainNavigationView'));
                    me.initGoogleElements();
                    Racloop.app.getController('JourneysController').initGoogleElements();
                    Racloop.app.getController('SessionsController').autoLogin();
                    console.log("Starting sencha touch application init ends");
                    me.setMapLoadingCompleted(true);
                    //window.mapLoaded = true;
                }

            }
            //Ext.Function.defer(this.pageRefresh, 10000, this);
        }
    },

    online : function() {
        console.log("online event fired");
        var me = this;
        if (typeof google === 'object' && typeof google.maps === 'object') {
            Racloop.app.getController('SessionsController').autoLogin();
        } else {
            //if(window.mapLoaded) {
            if(me.getMapLoadingCompleted()) {
                console.log("Google Maps are already loaded : online event : me.getMapLoadingCompleted() == true");
            }
            //else if(window.mapLoading) {
            else if(me.getMapLoadingInProgress()) {
                console.log("Google Maps loading in process : online event : me.getMapLoadingInProgress() == true");
            }
            else {
                console.log("Google Maps loading in process : online event : me.getMapLoadingInProgress() == false : me.getMapLoadingCompleted() == false");
                Racloop.app.getController('MapController').initApp();
            }
        }

        //window.location.reload();
        //window.location.href = "";
    },

    offline : function() {
        console.log("offline event fired");
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
        var me = this;
        var mainNavigationView = this.getMainNavigationView(); // Main view
        var mapPanel = this.getMapPanel();
        me.googleMap = mapPanel.down('map').getMap();
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

    sosCancelButtonClicked : function(button, e, eOpts) {
        console.log("sosCancelButton event fired");
        var me = this;
        Ext.Msg.confirm("Confirmation", "Are you sure you want to do that?", function(btn, text){
            console.log("buttonId : " + btn);
             if (btn == 'yes'){
                var mainTabs = Ext.ComponentQuery.query('mainTabs')[0];
                Ext.Viewport.setActiveItem(mainTabs);
                me.setSosActivated(false);
              } else {
                   return false;
             }
            
        });
    },

    sosButtonClicked: function(button, e, eOpts) {
        console.log("sosButtonClicked event fired");
        this.setSosActivated(true);
        var sosView = Ext.ComponentQuery.query('sosView')[0];
        if(sosView) {
            Ext.Viewport.setActiveItem(sosView);
        }
        else {
            sosView = Ext.create('Racloop.view.SosView');
            Ext.Viewport.add(sosView);
            Ext.Viewport.setActiveItem(sosView);
        }
        this.sos();
    },

    sos : function() {
        var me = this;
        console.log("sos : " + new Date());
        if(!this.getSosActivated()) return;

        Ext.device.Geolocation.getCurrentPosition({
            allowHighAccuracy : true,
            timeout : 5000,
            success: function(position) {
                console.log("MapController : sos : getCurrentPosition : success");
                me.sendSosMessage(position.coords.latitude, position.coords.longitude);
            },
            failure: function() {
                console.log('MapController : sos : getCurrentPosition : failure : ');
                Ext.Msg.alert("GPS Issue", "Please switch on GPS of the device");
            }
        });

        var task = Ext.create('Ext.util.DelayedTask', this.sos, this);
        task.delay(Config.locationUpdateFrequency);
    },

    //watchButtonClicked : function(button, e, eOpts) {
    //    console.log("MapController - watchButtonClicked - STARTS");
    //    if(button.getText() === "Unwatch") {
    //        this.setWatching(false);
    //        this.getWatchButton().setText("Watch");
    //    }
    //    else {
    //        if(LoginHelper.getCurrentJourney()) {
    //            this.setWatching(true);
    //            this.getWatchButton().setText("Unwatch");
    //            this.processCurrentLocation();
    //        }
    //        else {
    //            Ext.Msg.alert("No Journey to Watch", "Please select journey from 'My Journeys'");
    //        }
    //    }
    //
    //},

    processCurrentLocation : function() {
        console.log("MapController - processCurrentLocation - STARTS");
        var me = this;
        console.log("processCurrentLocation : " + new Date());
        if(!this.getWatching()) return;
        var mapPanel = this.getMapPanel();
        var gMap = mapPanel.down('map').getMap();
        Ext.Viewport.mask({
            xtype: 'loadmask',
            indicator: true,
            message: 'Getting Location..'
        });
        Ext.device.Geolocation.getCurrentPosition({
            allowHighAccuracy : true,
            timeout : 5000,
            success: function(position) {
                console.log("MapController - updateCurrentLocationOnMap - success");
                var geocoder = new google.maps.Geocoder();
                var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                var mapOptions = {
                    center: latlng,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                    //,
                    //zoom: 14
                };
                gMap.setOptions(mapOptions);
                me.marker.setMap(gMap);
                me.marker.setPosition(latlng);
                Ext.Viewport.unmask();
            },
            failure: function() {
                console.log('Error : processCurrentLocation : ');
                Ext.Viewport.unmask();
                Ext.Msg.alert("GPS Issue", "Please switch on GPS of the device");
            }
        });
        var task = Ext.create('Ext.util.DelayedTask', this.processCurrentLocation, this);
        task.delay(Config.locationUpdateFrequency);
    },

    //stopWatchingJourney: function() {
    //    console.log("MapController - stopWatchingJourney - STARTS");
    //    this.getWatchButton().setText("Watch");
    //    this.unwatchCurrentLocation();
    //},
    //
    //startWatchingJourney: function() {
    //    console.log("MapController - startWatchingJourney - STARTS");
    //    if(this.isWatching) {
    //        this.getWatchButton().setText("Unwatch");
    //        this.watchCurrentLocation();
    //    }
    //},

    updateCurrentLocationOnMap: function(){ // Used in login and autologin
        console.log("MapController - updateCurrentLocationOnMap - STARTS");
        var me = this;
        var mapPanel = this.getMapPanel();
        var gMap = mapPanel.down('map').getMap();
        Ext.Viewport.mask({
            xtype: 'loadmask',
            indicator: true,
            message: 'Getting Location..'
        });

        /*
        var geolocationSuccess = function(position) {
            console.log("MapController - updateCurrentLocationOnMap - success");
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
            Ext.Viewport.unmask();
        };
        var geolocationError = function() {
            console.log('Error : updateCurrentLocationOnMap : ' + error.code + " : " + error.message);
            Ext.Viewport.unmask();
            Ext.Msg.alert("GPS Issue", "Please switch on GPS of the device");
        };
        var geolocationOptions = { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true };
        navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, geolocationOptions);
        /* */
        Ext.device.Geolocation.getCurrentPosition({
            allowHighAccuracy : true,
            timeout : 5000,
            success: function(position) {
                console.log("MapController - updateCurrentLocationOnMap - success");
                var geocoder = new google.maps.Geocoder();
                var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                var mapOptions = {
                    center: latlng,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                    //,
                    //zoom: 14
                };
                gMap.setOptions(mapOptions);
                me.marker.setMap(gMap);
                me.marker.setPosition(latlng);
                Ext.Viewport.unmask();
            },
            failure: function() {
                console.log('Error : updateCurrentLocationOnMap Ext.device.Geolocation.getCurrentPosition');
                Ext.Viewport.unmask();
                Ext.Msg.alert("GPS Issue", "Please switch on GPS of the device");
            }
        });
        /* */
    },

    updateFromFieldWithCurrentLocation: function(){
        console.log("MapController - updateFromFieldWithCurrentLocation - STARTS");
        Ext.Viewport.mask({
            xtype: 'loadmask',
            indicator: true,
            message: 'Getting Location'
        });
        /*
        var geolocationSuccess = function(position) {
            console.log("MapController - updateFromFieldWithCurrentLocation - Ext.device.Geolocation.getCurrentPosition - success");
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
        };
        var geolocationError = function() {
            console.log('Error : updateFromFieldWithCurrentLocation : ' + error.code + " : " + error.message);
            Ext.Viewport.unmask();
            Ext.Msg.alert("GPS Issue", "Please switch on GPS of the device");
        };
        var geolocationOptions = { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true };
        navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, geolocationOptions);
        /* */
        Ext.device.Geolocation.getCurrentPosition({
            allowHighAccuracy : true,
            timeout : 3000,
            success: function(position) {
                console.log("MapController - updateFromFieldWithCurrentLocation - Ext.device.Geolocation.getCurrentPosition - success");
                if(this.geocoder == null) this.geocoder = new google.maps.Geocoder();
                var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                this.geocoder.geocode({'latLng': latlng}, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results.length > 0) {
                            Ext.ComponentQuery.query('textfield[name=from]')[0].setValue(results[0].formatted_address);
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
            failure: function(error) {
                console.log('Error : updateFromFieldWithCurrentLocation : ');
                Ext.Viewport.unmask();
                Ext.Msg.alert("GPS Issue", "Please switch on GPS of the device");
            }
        });
        /* */
    },

    showCurrentJourney : function() { //from sessioncontroller login and auto login methods
        console.log("MapController - showCurrentJourney - STARTS");
        var me = this;
        var currentJourney = LoginHelper.getCurrentJourney();
        if(currentJourney) {
            console.log("MapController - showCurrentJourney - currentJourney exists : ");
            console.dir(currentJourney);
            me.isWatching = true;
            var fromLatitude = currentJourney.fromLatitude;
            var fromLongitude = currentJourney.fromLongitude;
            var toLatitude = currentJourney.toLatitude;
            var toLongitude = currentJourney.toLongitude;
            var from = new google.maps.LatLng(fromLatitude, fromLongitude);
            var to = new google.maps.LatLng(toLatitude, toLongitude);
            console.log(from + " : " + to);
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
                    console.error("Direction Status not OK " + status);
                }
            });
        }
        else {
            console.log("MapController - showCurrentJourney - currentJourney does not exists");
        }
    },


    //watchCurrentLocation : function() { //from sessioncontroller login and auto login methods
    //    console.log("MapController - watchCurrentLocation - START");
    //    var me = this;
    //    if(this.isGeolocationActive) {
    //        console.log("MapController - watchCurrentLocation - this.isGeolocationActive : " + this.isGeolocationActive);
    //    }
    //    else {
    //        console.log("MapController - watchCurrentLocation - this.isGeolocationActive : " + this.isGeolocationActive);
    //        this.isGeolocationActive = true;
    //        console.log("watch position : " + new Date());
    //        /*
    //        var geolocationSuccess = function(position) {
    //            console.log("MapController - watchCurrentLocation - watchPosition - callback " + new Date());
    //            if(me.isSosActivated) {
    //                console.log("MapController - watchCurrentLocation - watchPosition - callback - me.isSosActivated : " + me.isSosActivated);
    //                me.sendSosMessage(position.coords.latitude, position.coords.longitude);
    //            }
    //            else {
    //                console.log("MapController - watchCurrentLocation - watchPosition - callback - me.isSosActivated : " + me.isSosActivated);
    //            }
    //            if(me.isWatching) {
    //                console.log("MapController - watchCurrentLocation - watchPosition - callback - me.isWatching : " + me.isWatching);
    //                var current = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    //                me.marker.setPosition(current);
    //                me.marker.setMap(me.googleMap);
    //                me.infoWindow.open(me.googleMap, me.marker);
    //                var tracks = me.tracks;//LoginHelper.getRoutes();
    //                var isDanger = false;
    //                var message = "All Good";
    //                if (tracks) {
    //                    for (var i = 0; i < tracks.length; i++) {
    //                        var routeInfo = tracks[i];
    //                        var track = routeInfo.track;
    //                        var polyline = new google.maps.Polyline({
    //                            path: track
    //                        });
    //                        var distance = routeInfo.length;
    //                        var tolerance = Common.getToleranceInDegrees(distance / 10);
    //                        if (google.maps.geometry.poly.isLocationOnEdge(current, polyline, tolerance)) {
    //                            isDanger = false;
    //                            message = "On Track";
    //                        }
    //                        else {
    //                            isDanger = true;
    //                            message = "Danger : Off Track";
    //                            break;
    //                            //Ext.Msg.alert('Bad', 'Not OK');
    //                        }
    //                    }
    //
    //                }
    //                Ext.toast({message: message, timeout: Config.toastTimeout, animation: true, cls: 'toastClass'});
    //                if (isDanger) {
    //                    navigator.vibrate();
    //                }
    //            }
    //            else {
    //                console.log("MapController - watchCurrentLocation - watchPosition - callback - me.isWatching : " + me.isWatching);
    //            }
    //        };
    //        var geolocationError = function(error) {
    //            console.log('Error : watchCurrentLocation : ' + error.code + " : " + error.message);
    //            Ext.Msg.alert("GPS Issue", "Please switch on GPS of the device");
    //        };
    //        var geolocationOptions = { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true };
    //        navigator.geolocation.watchPosition(geolocationSuccess, geolocationError, geolocationOptions);
    //
    //        */
    //        Ext.device.Geolocation.watchPosition({
    //            frequency: Config.locationUpdateFrequency,
    //            allowHighAccuracy : true,
    //            maximumAge : 0,
    //            callback: function (position) {
    //                console.log("MapController - watchCurrentLocation - watchPosition - callback " + new Date());
    //                if(me.isSosActivated) {
    //                    console.log("MapController - watchCurrentLocation - watchPosition - callback - me.isSosActivated : " + me.isSosActivated);
    //                    me.sendSosMessage(position.coords.latitude, position.coords.longitude);
    //                }
    //                else {
    //                    console.log("MapController - watchCurrentLocation - watchPosition - callback - me.isSosActivated : " + me.isSosActivated);
    //                }
    //                if(me.isWatching) {
    //                    console.log("MapController - watchCurrentLocation - watchPosition - callback - me.isWatching : " + me.isWatching);
    //                    var current = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    //                    me.marker.setPosition(current);
    //                    me.marker.setMap(me.googleMap);
    //                    me.infoWindow.open(me.googleMap, me.marker);
    //                    var tracks = me.tracks;//LoginHelper.getRoutes();
    //                    var isDanger = false;
    //                    var message = "All Good";
    //                    if (tracks) {
    //                        for (var i = 0; i < tracks.length; i++) {
    //                            var routeInfo = tracks[i];
    //                            var track = routeInfo.track;
    //                            var polyline = new google.maps.Polyline({
    //                                path: track
    //                            });
    //                            var distance = routeInfo.length;
    //                            var tolerance = Common.getToleranceInDegrees(distance / 10);
    //                            if (google.maps.geometry.poly.isLocationOnEdge(current, polyline, tolerance)) {
    //                                isDanger = false;
    //                                message = "On Track";
    //                            }
    //                            else {
    //                                isDanger = true;
    //                                message = "Danger : Off Track";
    //                                break;
    //                                //Ext.Msg.alert('Bad', 'Not OK');
    //                            }
    //                        }
    //
    //                    }
    //                    Ext.toast({message: message, timeout: Config.toastTimeout, animation: true, cls: 'toastClass'});
    //                    if (isDanger) {
    //                        Ext.device.Notification.vibrate();
    //                    }
    //                }
    //                else {
    //                    console.log("MapController - watchCurrentLocation - watchPosition - callback - me.isWatching : " + me.isWatching);
    //                }
    //            },
    //            failure: function (error) {
    //                console.log('Error : watchCurrentLocation : ' + error.code + " : " + error.message);
    //                Ext.Msg.alert("GPS Issue", "Please switch on GPS of the device");
    //            }
    //        });
    //        /* */
    //    }
    //},
    //
    //unwatchCurrentLocation : function() {
    //    this.infoWindow.close();
    //    this.marker.setMap(null);
    //    this.showCurrentJourney();
    //    if(this.isSosActivated) {
    //        console.log("MapController - unwatchCurrentLocation - this.isSosActivated : " + this.isSosActivated);
    //    }
    //    else {
    //        console.log("MapController - unwatchCurrentLocation - this.isSosActivated : " + this.isSosActivated);
    //        Ext.device.Geolocation.clearWatch();
    //        this.isGeolocationActive = false;
    //    }
    //
    //},

    sendSosMessage : function(lat, lng) {
        var successCallback = function(response, ops) {
            console.log("MapController - sendSosMessage - successCallback ");
        };

        // Failure
        var failureCallback = function(response, ops) {
            console.log("MapController - sendSosMessage - failureCallback ");
            Ext.toast({message: "Issue with sending message", timeout: Config.toastTimeout, animation: true, cls: 'toastClass'});
        };
        var currentDateString = Ext.Date.format(new Date(),'c');
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