Ext.define('Racloop.controller.JourneysController', {
    extend: 'Ext.app.Controller',
    requires: [
        'Ext.Toast',
        'Racloop.store.Searches',
        'Racloop.view.SearchNavigationView',
        //'Racloop.view.UserSearchList',
        //'Racloop.view.SearchViewItem',
        'Racloop.view.SearchResultViewItem',
        'Racloop.view.RequestJourneyPanel',
        'Racloop.view.ExistingJourneyPanel',
        'Racloop.util.Common',
        'Racloop.util.Config'
    ],
    config: {
        refs: {
            mainTabs: 'mainTabs',
            searchNavigationView : 'searchNavigationView',
            searchForm : 'searchNavigationView #searchForm',
            searchButton : 'searchNavigationView #searchButton',

            saveJourneyButtonInEmptyResults : 'searchResultsEmptyView #saveJourneyButton',
            saveJourneyButtonInSearchResults : 'searchResultsView #saveJourneyButton',
            // RequestJourneyPanel: '#requestPanel',
            //  SearchForm: 'searchForm',
            // searchDataView: 'UserSearchList',
            RequestButton : 'button[action=Request]',
            SearchListItem : 'SearchDataItem',
            SendRequestButton :'button[action=SendRequest]',
            CancelRequestButton : 'button[action=CancelRequest]',

            existingJourneyPanel : 'existingJourneyPanel',
            existingJourneyInfoHtmlContainer : 'existingJourneyPanel #existingJourneyInfo',
            existingJourneyReplaceButton : 'existingJourneyPanel #existingJourneyReplaceButton',
            existingJourneyKeepOriginalButton : 'existingJourneyPanel #existingJourneyKeepOriginalButton'
        },
        control: {
            'searchNavigationView': {
                initialize : 'initialiseUi'
            },
            searchButton: {
                tap : 'searchButtonTap'
            },
            saveJourneyButtonInEmptyResults : {
                tap : 'handleSaveJourneyTap'
            },
            saveJourneyButtonInSearchResults : {
                tap : 'handleSaveJourneyTap'
            },
            "datepickerfield[itemId=searchScreenDate]": {
                change: 'onDatePickerFieldChange'
            },
            "timepickerfield[itemId=searchScreenTime]": {
                change: 'onTimePickerFieldChange'
            },
            'searchResultViewItem':{
                confirmSearchRequestButtonTap : 'handleConfirmSearchRequestButtonTap',
                cancelSearchRequestButtonTap : 'handleCancelSearchRequestButtonTap'
            },
            'historyViewItem': {
                searchAgainHistoryButtonTap: 'handleSearchAgainHistoryButtonTap'
            },
            'existingJourneyReplaceButton' : {
                tap: 'handleExistingJourneyReplaceButtonTap'
            },
            'existingJourneyKeepOriginalButton' : {
                tap: 'handleExistingJourneyKeepOriginalButtonTap'
            },


            RequestButton: {
                tap: 'onRequestButtonTap'
            },
            existingSendRequestButton:{
                tap: 'onexistingSendRequestButtonTap'
            },
            'SearchDataItem': {
                myRequestButtonTap: 'onRequestButtonTap',
                myCancelButtonTap:  'onCancelButtonTap'
            }
        }
    },

    initialiseUi : function() {
        var me = this;
        var searchForm = this.getSearchForm();
        var root = searchForm.element.dom;

        var actionSheetFrom = Ext.create('Ext.ActionSheet', {
            top: '0',
            showAnimation : {
                type: 'slideIn',
                //duration: 500,
                easing: 'ease-out'
            },
            items: [{
                xtype: 'fieldset',
                items: [{
                    name: 'from',
                    xtype: 'searchfield',
                    label: 'From *',
                    itemId: 'actionScreenFrom'

                }]
            }, {
                text: 'Cancel',
                ui: 'confirm',
                iconCls: 'searchCls',
                iconMask: true,
                handler: function() {
                    actionSheetFrom.hide();
                }
            }]
        });
        this.actionSheetFrom = actionSheetFrom;

        var actionSheetTo = Ext.create('Ext.ActionSheet', {
            top: '0',
            showAnimation : {
                type: 'slideIn',
                //duration: 500,
                easing: 'ease-out'
            },
            items: [{
                xtype: 'fieldset',
                items: [{
                    name: 'to',
                    xtype: 'searchfield',
                    label: 'To *',
                    itemId: 'actionScreenTo'
                }]
            }, {
                text: 'Cancel',
                ui: 'confirm',
                iconCls: 'searchCls',
                iconMask: true,
                handler: function() {
                    actionSheetTo.hide();
                }
            }]

        });
        this.actionSheetTo = actionSheetTo;

        var fromField = searchForm.down('#searchScreenFrom');
        fromField.element.on({
            tap: function(e) {
                Ext.Viewport.add(actionSheetFrom);
                searchForm.down('field[name=fromPlace]').setValue("");
                searchForm.down('field[name=fromLatitude]').setValue("");
                searchForm.down('field[name=fromLongitude]').setValue("");
                actionSheetFrom.down('field[name=from]').setValue("");
                actionSheetFrom.down('field[name=from]').focus();
                //actionSheetFrom.down("#actionScreenFrom").focus();
                actionSheetFrom.show();
            }
        });
        var toField = searchForm.down('#searchScreenTo');
        toField.element.on({
            tap: function(e) {
                Ext.Viewport.add(actionSheetTo);
                searchForm.down('field[name=toPlace]').setValue("");
                searchForm.down('field[name=toLatitude]').setValue("");
                searchForm.down('field[name=toLongitude]').setValue("");
                actionSheetTo.down('field[name=to]').setValue("");
                actionSheetFrom.down('field[name=from]').focus();
                //actionSheetTo.down("#actionScreenTo").focus();
                actionSheetTo.show();
            }
        });
    },

    launch : function() {

    },

    initGoogleElements : function() { // Called from MapController initApp method
        console.log("Journey Controller initGoogleElements starts");
        var me = this;
        var searchForm = this.getSearchForm();
        console.log("this.getSearchForm() : " + this.getSearchForm());
        var root = searchForm.element.dom;
        var actionFromRoot = this.actionSheetFrom.element.dom;
        var actionToRoot = this.actionSheetTo.element.dom;

        var fromInput = actionFromRoot.querySelectorAll('input[name=from]')[0];
        var toInput = actionToRoot.querySelectorAll('input[name=to]')[0];
        var latFrom, longFrom, latTo, longTo;

        var autocompleteFrom = new google.maps.places.Autocomplete(fromInput);
        var autocompleteTo = new google.maps.places.Autocomplete(toInput);

        google.maps.event.addListener(autocompleteFrom, 'place_changed', function () {
            var place = autocompleteFrom.getPlace();
            latFrom = place.geometry.location.lat();
            longFrom = place.geometry.location.lng();
            var selectedPlace = fromInput.value;
            searchForm.down('field[name=fromPlace]').setValue(selectedPlace);
            searchForm.down('field[name=fromLatitude]').setValue(latFrom);
            searchForm.down('field[name=fromLongitude]').setValue(longFrom);
            latTo = searchForm.down('field[name=toLatitude]').getValue();
            longTo = searchForm.down('field[name=toLongitude]').getValue();
            me.calculateDistance(latFrom, longFrom, latTo, longTo);
            me.actionSheetFrom.hide();
        });

        google.maps.event.addListener(autocompleteTo, 'place_changed', function () {
            var place = autocompleteTo.getPlace();
            latTo = place.geometry.location.lat();
            longTo = place.geometry.location.lng();
            var selectedPlace = toInput.value;
            searchForm.down('field[name=toPlace]').setValue(selectedPlace);
            searchForm.down('field[name=toLatitude]').setValue(latTo);
            searchForm.down('field[name=toLongitude]').setValue(longTo);
            latFrom = searchForm.down('field[name=fromLatitude]').getValue();
            longFrom = searchForm.down('field[name=fromLongitude]').getValue();
            me.calculateDistance(latFrom, longFrom, latTo, longTo);
            me.actionSheetTo.hide();
        });

        var now = new Date();
        var reserveTime = 25; //in minutes. Increment of 15 min will make ride reserve time 30 min
        var timeLimitInDays = 7; //in days
        var validStartTime = new Date(now.getTime() + reserveTime * 60000);
        var validEndTime = new Date(now.getTime() + timeLimitInDays * 24 * 60 * 60000);

        var validStartTimeString = validStartTime.toString('dd MMMM hh:mm tt');
        searchForm.down('field[name=validStartTimeString]').setValue(validStartTimeString);
        searchForm.down('field[name=date]').setValue({
            day: now.getDate(),
            month: (now.getMonth() + 1),
            year: now.getFullYear()
        });
        var defaultTime = new Date();
        defaultTime.setMinutes(0);
        //TODO rollback
        //defaultTime.setHours(defaultTime.getHours() + 1);
        defaultTime.setHours(defaultTime.getHours() + 3);
        var picker = searchForm.down('#searchScreenTime').getPicker();
        searchForm.down('#searchScreenTime').setValue(defaultTime);

        var selectedDate = searchForm.down('field[name=date]').getValue();
        var selectedTime = searchForm.down('field[name=time]').getValue();

        if (selectedDate != null && selectedTime != null) {
            var dateString = Ext.Date.format(selectedDate, 'd M y');
            var timeString = Ext.Date.format(selectedTime, 'h:i A');
            var datetimeString = dateString + " " + timeString;
            searchForm.down('field[name=dateOfJourneyString]').setValue(datetimeString);
        }
        console.log("Journey Controller initGoogleElements ends");
    },

    calculateDistance : function(latFrom, longFrom, latTo, longTo) {
        var searchForm = this.getSearchForm();
        var directionsService = Racloop.app.getController('MapController').directionsService
        if (latFrom != null && longFrom != null & latTo != null && longTo != null) {
            var request = {
                origin : new google.maps.LatLng(latFrom, longFrom),
                destination : new google.maps.LatLng(latTo, longTo),
                travelMode : google.maps.DirectionsTravelMode.DRIVING
            };
            directionsService.route(request, function(results, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    var total = 0;
                    var myroute = results.routes[0];
                    var numberOfLegs = 0;
                    //console.log("numberOfLegs : " + myroute.legs.length);
                    for ( var i = 0; i < myroute.legs.length; i++) {
                        total += myroute.legs[i].distance.value;
                        var start_location = myroute.legs[i].start_location
                        var end_location = myroute.legs[i].end_location
                        var start_address = myroute.legs[i].start_address
                        var end_address = myroute.legs[i].end_address
                        numberOfLegs++;
                        var steps = myroute.legs[i].steps
                        console.log(i + " i : total " + total + " steps : " + steps.length);
                        for ( var j = 0; j < steps.length; j++) {
                            var start_location_step = steps[j].start_location
                            var end_location_step = steps[j].end_location
                            var stepDistance = steps[j].distance.value;
                            //console.log("start_location_step : " + start_location_step + " end_location_step : " + end_location_step + " stepDistance : " + stepDistance)
                        }
                    }
                    if(numberOfLegs != 1) {
                        //console.log("numberOfLegs : " + numberOfLegs);
                    }
                    total = total / 1000
                    searchForm.down('field[name=tripUnit]').setValue('KM');
                    searchForm.down('field[name=tripDistance]').setValue(total + '');
                    console.log("Total Distance : " + total + " KM");
                }
            });
//            var p1 = new google.maps.LatLng(latFrom, longFrom);
//            var p2 = new google.maps.LatLng(latTo, longTo);
//            var distance = (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
//            return distance;
        }
        return -1;
    },

    onDatePickerFieldChange: function(field, newDate, oldDate, eOpts) {
        this.setDateTime();
    },
    onTimePickerFieldChange: function(field, newDate, oldDate, eOpts) {
        //selectedTime=field.getFormattedValue('g:i A');
        this.setDateTime();
    },
    setDateTime: function() {
        var searchForm = this.getSearchForm();
        var selectedDate = searchForm.down('field[name=date]').getValue();
        var selectedTime = searchForm.down('field[name=time]').getValue();

        if (selectedDate != null && selectedTime != null) {
            var dateString = Ext.Date.format(selectedDate, 'd M y');
            var timeString = Ext.Date.format(selectedTime, 'h:i A');
            var datetimeString = dateString + " " + timeString;
            searchForm.down('field[name=dateOfJourneyString]').setValue(datetimeString);
            //console.log("Date and Time : " + datetimeString);
        }
        var now = new Date();
        var reserveTime = 25; //in minutes. Increment of 15 min will make ride reserve time 30 min
        var timeLimitInDays = 7; //in days
        var validStartTime = new Date(now.getTime() + reserveTime * 60000);
        var validStartTimeString = Ext.Date.format(validStartTime, 'd F Y    h:i A'); //validStartTime.toString('dd MMMM hh:mm tt');
        searchForm.down('field[name=validStartTimeString]').setValue(validStartTimeString);
    },

    searchButtonTap: function(button, e, eOpts) {
        var me = this;
        this.resetErrorFields();
        var searchForm = this.getSearchForm();
        var journeyModel = Ext.create('Racloop.model.Journey', {});
        var values = searchForm.getValues(); // Form values
        searchForm.updateRecord(journeyModel);
        var validationObj = journeyModel.validate();
        if (!validationObj.isValid()) {
            var errorString = this.validateSearchForm(validationObj);
            Ext.Msg.alert("Oops, Input Errors", errorString);
        } else {
            this.executeSearch(values);
        }
    },

    executeSearch : function(journey) {
        var me = this;

        var successCallback = function(response, ops) {
            var data = Ext.decode(response.responseText);
            if (data.success) {
                if(data.existingJourney){ // If user is searching similar journey
                    var newJourney = data.data.currentJourney;
                    var existingJourney = data.data.existingJourney;

                    var newIsDriver = newJourney.isDriver? "Driver": "Passenger";
                    var existingIsDriver = existingJourney.isDriver? "Driver": "Passenger";
                    var newDateUnadjusted = new Date(newJourney.dateOfJourney);
                    var newDate = Ext.Date.add(newDateUnadjusted, Ext.Date.MINUTE, newDateUnadjusted.getTimezoneOffset());
                    var newDay = Ext.Date.format(newDate, 'd');
                    var newMonth = Ext.Date.format(newDate, 'F');
                    var newTime = Ext.Date.format(newDate, 'g:i A');

                    var existingDateUnadjusted = new Date(existingJourney.dateOfJourney);
                    var existingDate = Ext.Date.add(existingDateUnadjusted, Ext.Date.MINUTE, existingDateUnadjusted.getTimezoneOffset());
                    var existingDay = Ext.Date.format(existingDate, 'd');
                    var existingMonth = Ext.Date.format(existingDate, 'F');
                    var existingTime = Ext.Date.format(existingDate, 'g:i A');

                    var journeyHtml='<div class="card">\
                                        <span class="colored-text"><h3>Requested Journey</h3></span>\
                                        <div class="card-info">\
                                            <div class="card-date">\
                                                <div class="card-day">'+newDay+'</div>\
                                                <div class="card-month">'+newMonth+'</div>\
                                            </div>\
                                            <div class="card-main">\
                                             <div class="card-name">\
                                                <h3></h3>\
                                            </div>\
                                                <div>\
                                                    <span class="card-time">'+newTime+'</span>\
                                                    <span class="card-label card-label-blue">'+newIsDriver+'</span>\
                                                   \
                                                </div>\
                                                <div>\
                                                </div>\
                                            </div>\
                                        </div>\
                                        <div class="card-footer">\
                                            <div class="card-footer-row">\
                                                <span class="card-location-label">From :</span>\
                                                <span class="card-location">'+newJourney.fromPlace+'</span>\
                                            </div>\
                                            <div class="card-footer-row">\
                                                <span class="card-location-label">To :</span>\
                                                <span class="card-location"> '+newJourney.toPlace+'</span>\
                                            </div>\
                                        </div>\
                                    </div>\
                                        \
                                    <div class="card">\
                                    <span class="colored-text"><h3>Similar Existing Journey</h3></span>\
                                    <div class="card-info">\
                                        <div class="card-date">\
                                            <div class="card-day">'+existingDay+'</div>\
                                            <div class="card-month">'+existingMonth+'</div>\
                                        </div>\
                                        <div class="card-main">\
                                        <div class="card-name">\
                                                <h3></h3>\
                                            </div>\
                                            <div>\
                                                <span class="card-time">'+existingTime+'</span>\
                                                <span class="card-label card-label-blue">'+existingIsDriver+'</span>\
                                            </div>\
                                            <div>\
                                            </div>\
                                        </div>\
                                    </div>\
                                    <div class="card-footer">\
                                        <div class="card-footer-row">\
                                            <span class="card-location-label">From :</span>\
                                            <span class="card-location">'+existingJourney.fromPlace+'</span>\
                                        </div>\
                                        <div class="card-footer-row">\
                                            <span class="card-location-label">To :</span>\
                                            <span class="card-location"> '+existingJourney.toPlace+'</span>\
                                        </div>\
                                    </div>\
                                </div>';
                    var existingPanel = Ext.create('Racloop.view.ExistingJourneyPanel', {
                        title: 'Similar Journey Found!'
                    });
                    existingPanel.down("#existingJourneyInfo").setHtml(journeyHtml);
                    existingPanel.setPreviousJourney(existingJourney);
                    existingPanel.setNewJourney(newJourney);
                    me.getSearchNavigationView().push(existingPanel);
                }
                else{
                    var searchStore = Ext.getStore('SearchStore');
                    searchStore.removeAll();
                    var jsonObj = data.data.matchedJourneys;
                    for (var i in jsonObj) {
                        searchStore.add(jsonObj[i]);
                    };
                    if(data.data.matchedJourneys.length == 0) {
                        me.getSearchNavigationView().push({
                            title : 'Search Results',
                            xtype : 'searchResultsEmptyView'
                        });
                    }
                    else {
                        var searchResultsView = Ext.ComponentManager.create({title : 'Search Results'}, 'searchResultsView');
                        me.getSearchNavigationView().push(searchResultsView);
                        var comp = searchResultsView.getComponent('searchResultsDataViewInner');
                        comp.isDummy = data.data.isDummyData;
                    }
                }
                Ext.Viewport.unmask();
            } else {
                Ext.Msg.alert("Search Failure", data.message);
                Ext.Viewport.unmask();
            }
        };

        // Failure
        var failureCallback = function(response, ops) {
            Ext.Msg.alert("Search Failure", response.message);
            Ext.Viewport.unmask();

        };

        Ext.Viewport.mask({
            xtype: 'loadmask',
            indicator: true,
            message: 'Searching...'
        });
        Ext.Ajax.request({
            url: Config.url.RACLOOP_SEARCH,
            withCredentials: true,
            useDefaultXhrHeader: false,
            headers: {
                'Content-Type': 'application/json'
            },
            params: Ext.JSON.encode({
                dateOfJourneyString: journey.dateOfJourneyString,
                validStartTimeString: journey.validStartTimeString,
                fromPlace: journey.fromPlace,
                fromLatitude: journey.fromLatitude,
                fromLongitude: journey.fromLongitude,
                toPlace: journey.toPlace,
                toLatitude: journey.toLatitude,
                toLongitude: journey.toLongitude,
                isDriver: journey.isDriver,
                tripDistance: journey.tripDistance,
                tripUnit: journey.tripUnit
            }),
            success: successCallback,
            failure: failureCallback
        });
    },

    validateSearchForm: function(validationObj) {
        var errorstring = "";
        var formPlaceError = false;
        var fromPlaceErrors = validationObj.getByField('fromPlace');
        if (fromPlaceErrors != null && fromPlaceErrors.length > 0) {
            formPlaceError = true;
        }
        var fromLatitudeErrors = validationObj.getByField('fromLatitude');
        if (fromLatitudeErrors != null && fromLatitudeErrors.length > 0) {
            formPlaceError = true;
        }
        var fromLongitudeErrors = validationObj.getByField('fromLongitude');
        if (fromLongitudeErrors != null && fromLongitudeErrors.length > 0) {
            formPlaceError = true;
        }
        if(formPlaceError) {
            Ext.ComponentQuery.query('#searchForm  #searchScreenFrom')[0].addCls('error');
            errorstring += "Invalid Location : From* field<br />";
        }

        var toPlaceErrors = validationObj.getByField('toPlace');
        var toPlaceError = false;
        if (toPlaceErrors != null && toPlaceErrors.length > 0) {
            toPlaceError = true;
        }
        var toLatitudeErrors = validationObj.getByField('toLatitude');
        if (toLatitudeErrors != null && toLatitudeErrors.length > 0) {
            toPlaceError = true;
        }
        var toLongitudeErrors = validationObj.getByField('toLongitude');
        if (toLongitudeErrors != null && toLongitudeErrors.length > 0) {
            toPlaceError = true;
        }
        if(toPlaceError) {
            Ext.ComponentQuery.query('#searchForm  #searchScreenTo')[0].addCls('error');
            errorstring += "Invalid Location :  To* field<br />";
        }

        var journeyErrors = validationObj.getByField('journeyDate');

        if (journeyErrors != null && journeyErrors.length > 0) {
            for (var i = 0; i < journeyErrors.length; i++) {
                errorstring += journeyErrors[i].getMessage() + "<br />";
            }
            Ext.ComponentQuery.query('#searchForm  #searchScreenDate')[0].addCls('error');
            Ext.ComponentQuery.query('#searchForm  #searchScreenTime')[0].addCls('error');
        }
        return errorstring;
    },

    resetErrorFields: function() {
        Ext.ComponentQuery.query('#searchForm #searchScreenFrom')[0].removeCls('error');
        Ext.ComponentQuery.query('#searchForm #searchScreenTo')[0].removeCls('error');
        Ext.ComponentQuery.query('#searchForm #searchScreenDate')[0].removeCls('error');
        Ext.ComponentQuery.query('#searchForm #searchScreenTime')[0].removeCls('error');
    },

    resetFields: function() {

    },

    handleSearchAgainHistoryButtonTap: function(item) {
        var record = item.getRecord();
        Ext.ComponentQuery.query('#searchForm #searchScreenFrom')[0].setValue(record.get("fromPlace"));
        Ext.ComponentQuery.query('#searchForm field[name=fromLatitude]')[0].setValue(record.get("fromLatitude"));
        Ext.ComponentQuery.query('#searchForm field[name=fromLongitude]')[0].setValue(record.get("fromLongitude"));
        Ext.ComponentQuery.query('#searchForm #searchScreenTo')[0].setValue(record.get("toPlace"));
        Ext.ComponentQuery.query('#searchForm field[name=toLatitude]')[0].setValue(record.get("toLatitude"));
        Ext.ComponentQuery.query('#searchForm field[name=toLongitude]')[0].setValue(record.get("toLongitude"));

        var distance = this.calculateDistance(record.get("fromLatitude"), record.get("fromLongitude"), record.get("toLatitude"), record.get("toLongitude"));
        Ext.ComponentQuery.query('#searchForm field[name=tripDistance]')[0].setValue(distance);

        var isDriver = record.get("isDriver");
        if(isDriver) {
            Ext.ComponentQuery.query('#searchForm #driverHitcherSelectField')[0].setValue('driver');
        }
        else {
            Ext.ComponentQuery.query('#searchForm #driverHitcherSelectField')[0].setValue('driver');
        }
        var searchForm = this.getSearchForm();
        var activeItem = this.getSearchNavigationView().getActiveItem();
        if(searchForm != activeItem) this.getSearchNavigationView().pop();
        this.getMainTabs().setActiveItem('searchNavigationView');
        //this.searchJourneys();

    },

    // NOT USED - //CALLED FROM WORKFLOW CONTROLLER
    handleSearchAgainMyJourneyButtonTap: function(item) {
        var record = item.getRecord();
        Ext.ComponentQuery.query('#searchForm #searchScreenFrom')[0].setValue(record.get("fromPlace"));
        Ext.ComponentQuery.query('#searchForm field[name=fromLatitude]')[0].setValue(record.get("fromLatitude"));
        Ext.ComponentQuery.query('#searchForm field[name=fromLongitude]')[0].setValue(record.get("fromLongitude"));
        Ext.ComponentQuery.query('#searchForm #searchScreenTo')[0].setValue(record.get("toPlace"));
        Ext.ComponentQuery.query('#searchForm field[name=toLatitude]')[0].setValue(record.get("toLatitude"));
        Ext.ComponentQuery.query('#searchForm field[name=toLongitude]')[0].setValue(record.get("toLongitude"));

        var dateOfJourney = record.get("dateOfJourney");
        Ext.ComponentQuery.query('#searchForm #searchScreenDate')[0].setValue(dateOfJourney);
        Ext.ComponentQuery.query('#searchForm #searchScreenTime')[0].setValue(dateOfJourney);

        var distance = this.calculateDistance(record.get("fromLatitude"), record.get("fromLongitude"), record.get("toLatitude"), record.get("toLongitude"));
        Ext.ComponentQuery.query('#searchForm field[name=tripDistance]')[0].setValue(distance);

        var isDriver = record.get("isDriver");
        if(isDriver) {
            Ext.ComponentQuery.query('#searchForm #driverHitcherSelectField')[0].setValue('driver');
        }
        else {
            Ext.ComponentQuery.query('#searchForm #driverHitcherSelectField')[0].setValue('driver');
        }
        var searchForm = this.getSearchForm();
        var activeItem = this.getSearchNavigationView().getActiveItem();
        if(searchForm != activeItem) this.getSearchNavigationView().pop();
        this.getMainTabs().setActiveItem('searchNavigationView');
        //this.searchButtonTap();

    },

    handleSaveJourneyTap : function() {
        var me = this;
//        var controller = Racloop.app.getController('UiController');
//        var renderMyJourney = function() {
//            me.getMainTabs().setActiveItem('journeyNavigationView');;
//        };
        var successCallback = function(response, ops) {
            var data = Ext.decode(response.responseText);
            if (data.success) {
                console.log("calling showAndLoadAfterDelay")
                Racloop.app.getController('UiController').showAndLoadAfterDelay();
//                setTimeout(function(){
//                    Ext.getStore('journeyStore').load({
//                        callback: function(records, operation, success) {
//                            console.log("Journey Saved Ext.getStore('journeyStore').getAllCount() : " + Ext.getStore('journeyStore').getAllCount())
//                            me.getMainTabs().setActiveItem('journeyNavigationView');
//                            controller.showMyJourneys();
//                        },
//                        scope: controller
//                    });
//                }, 50);
                Ext.Viewport.unmask();
                Ext.toast({message: "Successfully saved your request", timeout: Config.toastTimeout, animation: true, cls: 'toastClass'});
            } else {
                Ext.Msg.alert("Server Failure", data.message);
                Ext.Viewport.unmask();
            }
        };

        // Failure
        var failureCallback = function(response, ops) {
            Ext.Msg.alert("Server Failure", response.message);
            Ext.Viewport.unmask();

        };

        Ext.Viewport.mask({
            xtype: 'loadmask',
            indicator: true,
            message: 'Saving...'
        });
        Ext.Ajax.request({
            url: Racloop.util.Config.url.RACLOOP_SAVE_JOURNEY,
            method: 'post',
            withCredentials: true,
            useDefaultXhrHeader: false,
            params: Ext.JSON.encode({
                journeyId : "from_session"
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            success: successCallback,
            failure: failureCallback
        });
    },

    handleConfirmSearchRequestButtonTap: function(item) {
        var me = this;
        var record = item.getRecord();
        var recordData = record.get("matchedJourney");
        var matchedJourneyId = recordData.id;
        var searchNavView = this.getSearchNavigationView();
        var searchList = Ext.ComponentQuery.query('searchNavigationView  #searchResultsDataViewInner')[0];
        var isDummy = searchList.isDummy;

        var successCallback = function(response, ops) {
            var data = Ext.decode(response.responseText);
            if (data.success) {
                setTimeout(function(){
                    Ext.getStore('journeyStore').load({
                        callback: function(records, operation, success) {
                            me.getMainTabs().setActiveItem('journeyNavigationView');
                            Racloop.app.getController('UiController').showMyJourneys();
                        },
                        scope: me
                    });
                }, 500);
                Ext.Viewport.unmask();
                Ext.toast({message: data.message, timeout: Config.toastTimeout, animation: true, cls: 'toastClass'});
            } else {
                Ext.Msg.alert(data.message);
                Ext.Viewport.unmask();
            }
        };
        // Failure
        var failureCallback = function(response, ops) {
            Ext.Msg.alert(response.message);
            Ext.Viewport.unmask();

        };

        Ext.Viewport.mask({
            xtype: 'loadmask',
            indicator: true,
            message: 'Sending Request...'
        });
        Ext.Ajax.request({
            url: Config.url.RACLOOP_REQUEST,
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
            useDefaultXhrHeader: false,
            params: Ext.JSON.encode({
                matchedJourneyId: matchedJourneyId,
                isDummy: isDummy
            }),
            success: successCallback,
            failure: failureCallback
        });
    },

    handleCancelSearchRequestButtonTap: function(item) { //TODO for testing

    },

//    onRequestButtonTap: function(item) { //TODO for testing
//        console.dir(item.getRecord());
//        var searchDataView= this.getSearchDataView();
//        console.debug(searchDataView);
//        console.debug(searchDataView.getIsDummy());
//        var record = item.getRecord();
//
//        var recordData=record.get("matchedJourney");
//        //TODO need to verify
//        var currentJourney=LoginHelper.getJourney();
//        var myJourneyId=currentJourney.id;
//        var matchedJourneyId=recordData.id;
//        // var requestPanel = Ext.create('Racloop.view.RequestJourneyPanel', {
//        //     title: 'Driver Information',
//        //   });
//        // requestPanel.setMyJourneyId(currentJourney.id);
//        // requestPanel.setMatchedJourneyId(recordData.id);
//        // requestPanel.setIsDummy(searchDataView.getIsDummy());
//        // var requestPhoto="";
//        // if(recordData.photoUrl!=null){
//        //     requestPhoto=recordData.photoUrl;
//        // }else {
//        //     requestPhoto='<img style="height: 100px; width: 100px; margin-right:10px;" src="http://www.gravatar.com/avatar/00000000000000000000000000000000" />';
//        // }
//
//        // requestPanel.down("#requestJourneyInfo").down("#requestPhoto").setHtml(requestPhoto);
//        // requestPanel.down("#requestJourneyInfo").down("#requestData").setHtml('<h1>'+recordData.name+'</h1><ul>'+
//        //     '<li><b>From:</b> '+recordData.fromPlace+'</li>'+
//        //     '<li><b>To:</b>   '+recordData.toPlace+'</li>'+
//        //     '<li><b>Date:</b> '+Ext.Date.format(new Date(recordData.dateOfJourney), 'd/m/Y g:i A')+'</li>'+
//        //     '</ul>');
//        // searchFrm.up().push(requestPanel);
//
//
//        var searchNavView = this.getSearchNavigationView();
//        var me=this;
//        // var myJourneyId=button.up().up().getMyJourneyId();
//        var isDummy=searchDataView.getIsDummy();
//        var successCallback = function(response, ops) {
//            var data = Ext.decode(response.responseText);
//            console.log('Request success during launch : ' + response.responseText);
//            if (data.success) {
//               // Ext.Msg.alert("Request Successful " + data.message);
//                // searchFrm.up().pop();
//
//                 LoginHelper.setJourney(data.data);
//                 currentJourney=data.data;
//                 setTimeout(function(){
//                    me.CallSearchAjax(currentJourney,function(){
//                        searchNavView.pop(1);
//                        Ext.getStore('journeyStore').load();
//                        Ext.Viewport.unmask();
//                    });
//                 }, 1000);
//
//               // Ext.Viewport.unmask();
//            } else {
//                Ext.Msg.alert(data.message);
//                Ext.Viewport.unmask();
//            }
//        };
//       // Failure
//        var failureCallback = function(response, ops) {
//            Ext.Msg.alert(response.message);
//            Ext.Viewport.unmask();
//
//        };
//
//        Ext.Viewport.mask({
//            xtype: 'loadmask',
//            indicator: true,
//            message: 'Sending Request...'
//        });
//        Ext.Ajax.request({
//            url: Config.url.RACLOOP_REQUEST,
//            headers: {
//                    'Content-Type': 'application/json'
//                },
//            withCredentials: true,
//            useDefaultXhrHeader: false,
//            params: Ext.JSON.encode({
//                matchedJourneyId: matchedJourneyId,
//                isDummy: isDummy
//            }),
//            success: successCallback,
//            failure: failureCallback
//        });
//
//
//
//
//    },
//    onCancelButtonTap: function(item) { //TODO for testing
//        var searchNavView = this.getSearchNavigationView();
//        var currentJourney=LoginHelper.getJourney();
//        var record = item.getRecord();
//        var me=this;
//        var workflowId=record.get("workflow").id;
//        var successCallback = function(response, ops) {
//            var data = Ext.decode(response.responseText);
//            console.log('Cancel Request success during launch : ' + response.responseText);
//            if (data.success) {
//
//                setTimeout(function(){
//                    me.CallSearchAjax(currentJourney,function(){
//                        searchNavView.pop();
//                        Ext.getStore('journeyStore').load();
//                        Ext.Viewport.unmask();
//                    });
//                 }, 1000);
//                // Ext.Viewport.unmask();
//            } else {
//                Ext.Msg.alert("Cancel Request Failure", data.message);
//                Ext.Viewport.unmask();
//            }
//        };
//        // Failure
//        var failureCallback = function(response, ops) {
//            Ext.Msg.alert("Cancel Request Failure", response.message);
//            Ext.Viewport.unmask();
//
//        };
//
//        Ext.Viewport.mask({
//            xtype: 'loadmask',
//            indicator: true,
//            message: 'Sending Request...'
//        });
//        Ext.Ajax.request({
//            url: Config.url.RACLOOP_CANCELREQUEST,
//            withCredentials: true,
//            useDefaultXhrHeader: false,
//            headers: {
//                'Content-Type': 'application/json'
//            },
//            params: Ext.JSON.encode({
//                workflowId: workflowId
//            }),
//            //params: values, //TODO need to uncomment it
//            success: successCallback,
//            failure: failureCallback
//        });
//
//
//
//    },
//    // "user":"admin","name":"Administrator","myJourneyId":"89","matchedJourneyId":"12de4899-74af-451a-a5ad-f3a8bfd1f678","isDummy":true}
//    onSendRequestButton: function(button){
//        var searchNavView = this.getSearchNavigationView();
//        var currentJourney;
//        var me=this;
//        // var myJourneyId=button.up().up().getMyJourneyId();
//        console.debug(button.up().up());
//        var matchedJourneyId=button.up().up().getMatchedJourneyId();
//        var isDummy=button.up().up().getIsDummy();
//        var successCallback = function(response, ops) {
//            var data = Ext.decode(response.responseText);
//            console.log('Request success during launch : ' + response.responseText);
//            if (data.success) {
//                // Ext.Msg.alert("Request Successful " + data.message);
//                // searchFrm.up().pop();
//
//                LoginHelper.setJourney(data.data);
//                currentJourney=data.data;
//                Ext.getStore('journeyStore').load();
//                setTimeout(function(){
//                    me.CallSearchAjax(currentJourney,function(){
//                        searchNavView.pop(2);
//                        Ext.Viewport.unmask();
//                    });
//                }, 1000);
//
//                // Ext.Viewport.unmask();
//            } else {
//                Ext.Msg.alert(data.message);
//                Ext.Viewport.unmask();
//            }
//        };
//        // Failure
//        var failureCallback = function(response, ops) {
//            Ext.Msg.alert(response.message);
//            Ext.Viewport.unmask();
//
//        };
//
//        Ext.Viewport.mask({
//            xtype: 'loadmask',
//            indicator: true,
//            message: 'Sending Request...'
//        });
//        Ext.Ajax.request({
//            url: Config.url.RACLOOP_REQUEST,
//            headers: {
//                'Content-Type': 'application/json'
//            },
//            withCredentials: true,
//            useDefaultXhrHeader: false,
//            params: Ext.JSON.encode({
//                matchedJourneyId: matchedJourneyId,
//                isDummy: isDummy
//            }),
//            success: successCallback,
//            failure: failureCallback
//        });
//    },
    handleExistingJourneyReplaceButtonTap: function(button){
        var searchNavView = this.getSearchNavigationView();
        var existingJourneyPanel = this.getExistingJourneyPanel();
        var existingJourney = existingJourneyPanel.getPreviousJourney();
        var newJourney = existingJourneyPanel.getNewJourney();
        var existingJourneyId = existingJourney.id;

        if (newJourney.dateOfJourneyString == null && newJourney.dateOfJourney!=null) {
            var datetimeString = Ext.Date.format(new Date(newJourney.dateOfJourney),'d F Y    g:i A');
            newJourney.dateOfJourneyString = datetimeString;
            console.log(datetimeString);
        }

        var successCallback = function(response, ops) {
            var searchData = Ext.decode(response.responseText);
            if (searchData.success) {
                var searchStore = Ext.getStore('SearchStore');
                searchStore.removeAll();
                var jsonObj = searchData.data.matchedJourneys;
                for (var i in jsonObj) {
                    searchStore.add(jsonObj[i]);
                };
                searchNavView.reset();

                var searchResultsView = Ext.ComponentManager.create({title : 'Search Results'}, 'searchResultsDataView');
                searchNavView.push(searchResultsView);
                var comp = searchResultsView.getComponent('searchResultsDataViewInner');
                comp.isDummy = searchData.data.isDummyData;

                Ext.Viewport.unmask();
            } else {
                Ext.Viewport.unmask();
                Ext.Msg.alert("Search Failure", searchData.message);
            }
        };
        // Failure
        var failureCallback = function(response, ops) {
            Ext.Viewport.unmask();
            Ext.Msg.alert("Search Failure", response.message);
        };
        Ext.Viewport.mask({
            xtype: 'loadmask',
            indicator: true,
            message: 'Searching...'
        });
        Ext.Ajax.request({
            url: Config.url.RACLOOP_EXISTINGJOURNEY,
            withCredentials: true,
            useDefaultXhrHeader: false,
            headers: {
                'Content-Type': 'application/json'
            },
            params: Ext.JSON.encode({
                dateOfJourneyString: newJourney.dateOfJourneyString,
                fromPlace: newJourney.fromPlace,
                fromLatitude: newJourney.fromLatitude,
                fromLongitude: newJourney.fromLongitude,
                toPlace: newJourney.toPlace,
                toLatitude: newJourney.toLatitude,
                toLongitude: newJourney.toLongitude,
                isDriver: newJourney.isDriver,
                tripDistance: newJourney.tripDistance,
                tripUnit: newJourney.tripUnit,
                searchWithNewJourney: 'newJourney',
                existingJourneyId: existingJourneyId
            }),
            success: successCallback,
            failure: failureCallback
        });
    },
    handleExistingJourneyKeepOriginalButtonTap: function(button){
        var me = this;
        var searchNavView = this.getSearchNavigationView();
        var existingJourneyPanel = this.getExistingJourneyPanel();
        var existingJourney = existingJourneyPanel.getPreviousJourney();
        var existingJourneyId = existingJourney.id;
        var successCallback = function(response, ops) {
            var searchData = Ext.decode(response.responseText);
            if (searchData.success) {
                searchNavView.reset();
                var searchStore = Ext.getStore('SearchStore');
                searchStore.removeAll();
                var jsonObj = searchData.data.matchedJourneys;
                for (var i in jsonObj) {
                    searchStore.add(jsonObj[i]);
                };
                var searchResultsView = Ext.ComponentManager.create({title : 'Search Results'}, 'searchResultsDataView');
                searchNavView.push(searchResultsView);
                var comp = searchResultsView.getComponent('searchResultsDataViewInner');
                comp.isDummy = searchData.data.isDummyData;
                Ext.Viewport.unmask();
            } else {
                Ext.Viewport.unmask();
                Ext.Msg.alert("Search Failure", searchData.message);
            }
        };
        // Failure
        var failureCallback = function(response, ops) {
            Ext.Viewport.unmask();
            Ext.Msg.alert("Search Failure", response.message);
        };
        Ext.Viewport.mask({
            xtype: 'loadmask',
            indicator: true,
            message: 'Searching...'
        });
        Ext.Ajax.request({
            url: Config.url.RACLOOP_EXISTINGJOURNEY,
            withCredentials: true,
            useDefaultXhrHeader: false,
            headers: {
                'Content-Type': 'application/json'
            },
            params: Ext.JSON.encode({
                searchWithNewJourney: 'existingJourney',
                existingJourneyId: existingJourneyId
            }),
            success: successCallback,
            failure: failureCallback
        });
    }
//    ,
//    searchAgain: function(searchType) {
//        var searchNavView = this.getSearchNavigationView();
//        var existingJourneyPanel = this.getExistingJourneyPanel();
//        var existingJourney = existingJourneyPanel.getPreviousJourney();
//        var existingJourneyId = existingJourney.id;
//        var successCallback = function(response, ops) {
//            var searchData = Ext.decode(response.responseText);
//            if (searchData.success) {
//                var searchStore = Ext.getStore('SearchStore');
//                searchStore.removeAll();
//                var jsonObj = searchData.data.matchedJourneys;
//                for (var i in jsonObj) {
//                    searchStore.add(jsonObj[i]);
//                };
//
//                var searchResultsView = Ext.ComponentManager.create({title : 'Search Results'}, 'searchResultsDataView');
//                searchNavView.push(searchResultsView);
//                var comp = searchResultsView.getComponent('searchResultsDataViewInner');
//                comp.isDummy = data.data.isDummyData;
//
//                Ext.Viewport.unmask();
//            } else {
//                Ext.Viewport.unmask();
//                Ext.Msg.alert("Search Failure", searchData.message);
//            }
//        };
//        // Failure
//        var failureCallback = function(response, ops) {
//            Ext.Viewport.unmask();
//            Ext.Msg.alert("Search Failure", response.message);
//        };
//        Ext.Viewport.mask({
//            xtype: 'loadmask',
//            indicator: true,
//            message: 'Searching...'
//        });
//        Ext.Ajax.request({
//            url: Config.url.RACLOOP_EXISTINGJOURNEY,
//            withCredentials: true,
//            useDefaultXhrHeader: false,
//            headers: {
//                'Content-Type': 'application/json'
//            },
//            params: Ext.JSON.encode({
//                searchWithNewJourney: searchType,
//                existingJourneyId: existingJourneyId
//            }),
//            success: successCallback,
//            failure: failureCallback
//        });
//    },
//    CallSearchAjax: function(currentJourney,callback){
//        var searchNavView = this.getSearchNavigationView();
//        var me=this;
//        var successSearchCallback = function(response, ops) {
//            var searchData = Ext.decode(response.responseText);
//            console.log('Search success during launch : ' + response.responseText);
//            if (searchData.success) {
//                Ext.Msg.alert("Search Successful "+ searchData.message+" find "+searchData.total+" Records" );
//                var SearchStore = Ext.getStore('SearchStore');
//                SearchStore.removeAll();
//                var jsonObj = searchData.data.matchedJourneys;
//                for (var i in jsonObj) {
//                    SearchStore.add(jsonObj[i]);
//                };
//
//                searchNavView.push({
//                    title: 'Results',
//                    xtype: 'UserSearchList'
//                });
//
//                if (typeof callback === "function") {
//                    callback();
//                }
//            } else {
//                Ext.Msg.alert("Search Failure", searchData.message);
//                if (typeof callback === "function") {
//                    callback();
//                }
//            }
//        };
//
//
//        // Failure
//        var failureSearchCallback = function(response, ops) {
//            Ext.Msg.alert("Search Failure", response.message);
//            if (typeof callback === "function") {
//                callback();
//            }
//        };
//
//        if (currentJourney.dateOfJourneyString== null && currentJourney.dateOfJourney!=null) {
//            var datetimeString = Ext.Date.format(new Date(currentJourney.dateOfJourney),'d F Y    g:i A');
//            currentJourney.dateOfJourneyString=datetimeString;
//            console.log(datetimeString);
//        }
//
//
//        Ext.Ajax.request({
//            url: Config.url.RACLOOP_SEARCH,
//            withCredentials: true,
//            useDefaultXhrHeader: false,
//            headers: {
//                'Content-Type': 'application/json'
//            },
//            params: Ext.JSON.encode({
//                id: currentJourney.id,
//                dateOfJourneyString: currentJourney.dateOfJourneyString,
//                fromPlace: currentJourney.fromPlace,
//                fromLatitude: currentJourney.fromLatitude,
//                fromLongitude: currentJourney.fromLongitude,
//                toPlace: currentJourney.toPlace,
//                toLatitude: currentJourney.toLatitude,
//                toLongitude: currentJourney.toLongitude,
//                isDriver: currentJourney.isDriver,
//                tripDistance: currentJourney.tripDistance,
//                tripUnit: currentJourney.tripUnit
//            }),
//            success: successSearchCallback,
//            failure: failureSearchCallback
//        });
//    },
//    CallExistingJourneyAjax: function(Journey,existingJourneyId,searchWithNewJourney,callback){
//        var searchNavView = this.getSearchNavigationView();
//        var me=this;
//        var successSearchCallback = function(response, ops) {
//            var searchData = Ext.decode(response.responseText);
//            console.log('Search success during launch : ' + response.responseText);
//            if (searchData.success) {
//                Ext.Msg.alert("Search Successful "+ searchData.message+" find "+searchData.total+" Records" );
//                var SearchStore = Ext.getStore('SearchStore');
//                SearchStore.removeAll();
//                var jsonObj = searchData.data.matchedJourneys;
//                for (var i in jsonObj) {
//                    SearchStore.add(jsonObj[i]);
//                };
//
//                searchNavView.push({
//                    title: 'Results',
//                    xtype: 'UserSearchList'
//                });
//
//                if (typeof callback === "function") {
//                    callback();
//                }
//            } else {
//                Ext.Msg.alert("Search Failure", searchData.message);
//                if (typeof callback === "function") {
//                    callback();
//                }
//            }
//        };
//
//
//        // Failure
//        var failureSearchCallback = function(response, ops) {
//            Ext.Msg.alert("Search Failure", response.message);
//            if (typeof callback === "function") {
//                callback();
//            }
//        };
//
//        if (searchWithNewJourney){
//            console.log('with new journey');
//            Ext.Ajax.request({
//                url: Config.url.RACLOOP_EXISTINGJOURNEY,
//                withCredentials: true,
//                useDefaultXhrHeader: false,
//                headers: {
//                    'Content-Type': 'application/json'
//                },
//                params: Ext.JSON.encode({
//                    dateOfJourneyString: Journey.dateOfJourneyString,
//                    fromPlace: Journey.fromPlace,
//                    fromLatitude: Journey.fromLatitude,
//                    fromLongitude: Journey.fromLongitude,
//                    toPlace: Journey.toPlace,
//                    toLatitude: Journey.toLatitude,
//                    toLongitude: Journey.toLongitude,
//                    isDriver: Journey.isDriver,
//                    tripDistance: Journey.tripDistance,
//                    tripUnit: Journey.tripUnit,
//                    searchWithNewJourney: 'newJourney',
//                    existingJourneyId: existingJourneyId
//                }),
//                success: successSearchCallback,
//                failure: failureSearchCallback
//            });
//        }else {
//            console.log('with existing journey');
//            Ext.Ajax.request({
//                url: Config.url.RACLOOP_EXISTINGJOURNEY,
//                withCredentials: true,
//                useDefaultXhrHeader: false,
//                headers: {
//                    'Content-Type': 'application/json'
//                },
//                params: Ext.JSON.encode({
//                    searchWithNewJourney: 'existingJourney',
//                    existingJourneyId: existingJourneyId
//                }),
//                success: successSearchCallback,
//                failure: failureSearchCallback
//            });
//        }
//    }
});