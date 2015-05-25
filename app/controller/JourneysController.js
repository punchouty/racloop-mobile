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
            searchResultsView : 'searchResultsView',
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
                searchForm.down('field[name=from]').setValue("").blur();
                searchForm.down('field[name=fromLatitude]').setValue("");
                searchForm.down('field[name=fromLongitude]').setValue("");
                actionSheetFrom.down('field[name=from]').setValue("").focus();
                //actionSheetFrom.down("#actionScreenFrom").focus();
                actionSheetFrom.show();
            }
        });
        var toField = searchForm.down('#searchScreenTo');
        toField.element.on({
            tap: function(e) {
                Ext.Viewport.add(actionSheetTo);
                searchForm.down('field[name=to]').setValue("").blur();
                searchForm.down('field[name=toLatitude]').setValue("");
                searchForm.down('field[name=toLongitude]').setValue("");
                actionSheetTo.down('field[name=to]').setValue("").focus();
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
            searchForm.down('field[name=from]').setValue(selectedPlace);
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
            searchForm.down('field[name=to]').setValue(selectedPlace);
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

        var validStartTimeString = Ext.Date.format(validStartTime, 'c');//validStartTime.toString('dd MMMM hh:mm tt');
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
            var formatDate = 'd M y';
            var formatTime = 'h:i A';
            var format = formatDate + " " + formatTime;
            var dateString = Ext.Date.format(selectedDate, 'd M y');
            var timeString = Ext.Date.format(selectedTime, 'h:i A');
            var datetimeString = dateString + " " + timeString;
            var journeyDate = Ext.Date.parse(datetimeString, format);
            var journeyDateString = Ext.Date.format(journeyDate,'c');
            console.log("datetimeString : " + datetimeString + ", journeyDateString : " + journeyDateString);
            searchForm.down('field[name=dateOfJourneyString]').setValue(journeyDateString);
            //var dateString = Ext.Date.format(selectedDate, 'd M y');
            //var timeString = Ext.Date.format(selectedTime, 'h:i A');
            //var datetimeString = dateString + " " + timeString;
            //searchForm.down('field[name=dateOfJourneyString]').setValue(datetimeString);
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
            var formatDate = 'd M y';
            var formatTime = 'h:i A';
            var format = formatDate + " " + formatTime;
            var dateString = Ext.Date.format(selectedDate, 'd M y');
            var timeString = Ext.Date.format(selectedTime, 'h:i A');
            var datetimeString = dateString + " " + timeString;
            var journeyDate = Ext.Date.parse(datetimeString, format);
            var journeyDateString = Ext.Date.format(journeyDate,'c');
            console.log("datetimeString : " + datetimeString + ", journeyDateString : " + journeyDateString);
            searchForm.down('field[name=dateOfJourneyString]').setValue(journeyDateString);
        }
        var now = new Date();
        var reserveTime = 25; //in minutes. Increment of 15 min will make ride reserve time 30 min
        var timeLimitInDays = 7; //in days
        var validStartTime = new Date(now.getTime() + reserveTime * 60000);
        var validStartTimeString = Ext.Date.format(validStartTime, 'c');
        console.log("validStartTimeString : " + validStartTimeString);
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
                    var newDate = new Date(newJourney.dateOfJourney);
                    //var newDate = Ext.Date.add(newDateUnadjusted, Ext.Date.MINUTE, newDateUnadjusted.getTimezoneOffset());
                    var newDay = Ext.Date.format(newDate, 'd');
                    var newMonth = Ext.Date.format(newDate, 'F');
                    var newTime = Ext.Date.format(newDate, 'g:i A');

                    var existingDate = new Date(existingJourney.dateOfJourney);
                    //var existingDate = Ext.Date.add(existingDateUnadjusted, Ext.Date.MINUTE, existingDateUnadjusted.getTimezoneOffset());
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
                                                <span class="card-location">'+newJourney.from+'</span>\
                                            </div>\
                                            <div class="card-footer-row">\
                                                <span class="card-location-label">To :</span>\
                                                <span class="card-location"> '+newJourney.to+'</span>\
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
                                            <span class="card-location"> &nbsp;<span class="fromCls"> </span> '+existingJourney.from+'</span>\
                                        </div>\
                                        <div class="card-footer-row">\
                                            <span class="card-location-label">To :</span>\
                                            <span class="card-location"> &nbsp;<span class="toCls"> </span> '+existingJourney.to+'</span>\
                                        </div>\
                                    </div>\
                                </div>';
                    var componentArray = Ext.ComponentQuery.query("existingJourneyPanel");
                    var existingPanel = null;
                    if(componentArray != null && componentArray.length > 0) {
                        existingPanel = componentArray[0];
                        me.getSearchNavigationView().setActiveItem(existingPanel);
                    }
                    else {
                        existingPanel = Ext.create('Racloop.view.ExistingJourneyPanel');
                        me.getSearchNavigationView().push(existingPanel);
                    }
                    existingPanel.down("#existingJourneyInfo").setHtml(journeyHtml);
                    existingPanel.setPreviousJourney(existingJourney);
                    existingPanel.setNewJourney(newJourney);
                }
                else{
                    var searchStore = Ext.getStore('SearchStore');
                    searchStore.removeAll();
                    var jsonObj = data.data.journeys;
                    for (var i in jsonObj) {
                        searchStore.add(jsonObj[i]);
                    };
                    if(data.total.length == 0) {
                        var componentArray = Ext.ComponentQuery.query("searchResultsEmptyView");
                        var searchResultsEmptyView = null;
                        if(componentArray != null && componentArray.length > 0) {
                            searchResultsEmptyView = componentArray[0];
                            me.getSearchNavigationView().setActiveItem(searchResultsEmptyView);
                        }
                        else {
                            searchResultsEmptyView = Ext.create('Racloop.view.SearchResultsEmptyView');
                            me.getSearchNavigationView().push(searchResultsEmptyView);
                        }
                    }
                    else {
                        var componentArray = Ext.ComponentQuery.query("searchResultsView");
                        var searchResultsView = null;
                        if(componentArray != null && componentArray.length > 0) {
                            searchResultsView = componentArray[0];
                            me.getSearchNavigationView().setActiveItem(searchResultsView);
                        }
                        else {
                            searchResultsView = Ext.create('Racloop.view.SearchResultsView');
                            me.getSearchNavigationView().push(searchResultsView);
                        }
                        var comp = searchResultsView.getComponent('searchResultsDataViewInner');
                        comp.isDummy = data.isDummy;
                        me.getSaveJourneyButtonInSearchResults().setHidden(false);
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
                from: journey.from,
                fromLatitude: journey.fromLatitude,
                fromLongitude: journey.fromLongitude,
                to: journey.to,
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
        var fromPlaceErrors = validationObj.getByField('from');
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

        var toPlaceErrors = validationObj.getByField('to');
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
        Ext.ComponentQuery.query('#searchForm #searchScreenFrom')[0].setValue(record.get("from"));
        Ext.ComponentQuery.query('#searchForm field[name=fromLatitude]')[0].setValue(record.get("fromLatitude"));
        Ext.ComponentQuery.query('#searchForm field[name=fromLongitude]')[0].setValue(record.get("fromLongitude"));
        Ext.ComponentQuery.query('#searchForm #searchScreenTo')[0].setValue(record.get("to"));
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
        Ext.ComponentQuery.query('#searchForm #searchScreenFrom')[0].setValue(record.get("from"));
        Ext.ComponentQuery.query('#searchForm field[name=fromLatitude]')[0].setValue(record.get("fromLatitude"));
        Ext.ComponentQuery.query('#searchForm field[name=fromLongitude]')[0].setValue(record.get("fromLongitude"));
        Ext.ComponentQuery.query('#searchForm #searchScreenTo')[0].setValue(record.get("to"));
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
        var searchNavView = this.getSearchNavigationView();

        var successCallback = function(response, ops) {
            var data = Ext.decode(response.responseText);
            if (data.success) {
                var data = Ext.decode(response.responseText);
                if (data.success) {
                    //searchNavView.reset();
                    var searchStore = Ext.getStore('SearchStore');
                    searchStore.removeAll();
                    var jsonObj = data.data.journeys;
                    for (var i in jsonObj) {
                        searchStore.add(jsonObj[i]);
                    };
                    if(data.total.length == 0) {
                        var componentArray = Ext.ComponentQuery.query("searchResultsEmptyView");
                        var searchResultsEmptyView = null;
                        if(componentArray != null && componentArray.length > 0) {
                            searchResultsEmptyView = componentArray[0];
                            me.getSearchNavigationView().setActiveItem(searchResultsEmptyView);
                        }
                        else {
                            searchResultsEmptyView = Ext.create('Racloop.view.SearchResultsEmptyView');
                            me.getSearchNavigationView().push(searchResultsEmptyView);
                        }
                        me.getSaveJourneyButtonInEmptyResults().setHidden(true);
                    }
                    else {
                        var componentArray = Ext.ComponentQuery.query("searchResultsView");
                        var searchResultsView = null;
                        if(componentArray != null && componentArray.length > 0) {
                            searchResultsView = componentArray[0];
                            me.getSearchNavigationView().setActiveItem(searchResultsView);
                        }
                        else {
                            searchResultsView = Ext.create('Racloop.view.SearchResultsView');
                            me.getSearchNavigationView().push(searchResultsView);
                        }
                        var comp = searchResultsView.getComponent('searchResultsDataViewInner');
                        comp.isDummy = data.isDummy;
                        me.getSaveJourneyButtonInSearchResults().setHidden(true);
                    }
                    //if(data.total.length == 0) {
                    //    me.getSearchNavigationView().push({
                    //        title : 'Search Results',
                    //        xtype : 'searchResultsEmptyView'
                    //    });
                    //}
                    //else {
                    //    var searchResultsView = Ext.ComponentManager.create({title : 'Search Results'}, 'searchResultsView');
                    //    me.getSearchNavigationView().push(searchResultsView);
                    //    var comp = searchResultsView.getComponent('searchResultsDataViewInner');
                    //    comp.isDummy = data.isDummy;
                    //    me.getSaveJourneyButtonInSearchResults().setHidden(true);
                    //}
                    Ext.Viewport.unmask();
                    Ext.toast({message: "Successfully saved your request", timeout: Config.toastTimeout, animation: true, cls: 'toastClass'});
                } else {
                    Ext.Viewport.unmask();
                    Ext.Msg.alert("Search Failure", data.message);
                }
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
                journeyId : "from_session" //not used
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
        var journeyId = record.get("id");//recordData.id;
        var searchNavView = this.getSearchNavigationView();
        var searchList = Ext.ComponentQuery.query('searchNavigationView  #searchResultsDataViewInner')[0];
        var isDummy = searchList.isDummy;
        var successCallback = function(response, ops) {
            var data = Ext.decode(response.responseText);
            if (data.success) {
                Ext.getStore('journeyStore').load({
                    callback: function(records, operation, success) {
                        me.getMainTabs().setActiveItem('journeyNavigationView');
                        Racloop.app.getController('UiController').showMyJourneys();
                    },
                    scope: me
                });
                //setTimeout(function(){
                //    Ext.getStore('journeyStore').load({
                //        callback: function(records, operation, success) {
                //            me.getMainTabs().setActiveItem('journeyNavigationView');
                //            Racloop.app.getController('UiController').showMyJourneys();
                //        },
                //        scope: me
                //    });
                //}, 500);
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
                matchedJourneyId: journeyId,
                isDummy: isDummy
            }),
            success: successCallback,
            failure: failureCallback
        });
    },

    handleCancelSearchRequestButtonTap: function(item) { //TODO for testing

    },

    handleExistingJourneyReplaceButtonTap: function(button){
        var me = this;
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
            var data = Ext.decode(response.responseText);
            if (data.success) {
                searchNavView.reset();
                var searchStore = Ext.getStore('SearchStore');
                searchStore.removeAll();
                var jsonObj = data.data.journeys;
                for (var i in jsonObj) {
                    searchStore.add(jsonObj[i]);
                };
                if(data.total.length == 0) {
                    me.getSearchNavigationView().push({
                        title : 'Search Results',
                        xtype : 'searchResultsEmptyView'
                    });
                }
                else {
                    var searchResultsView = Ext.ComponentManager.create({title : 'Search Results'}, 'searchResultsView');
                    me.getSearchNavigationView().push(searchResultsView);
                    var comp = searchResultsView.getComponent('searchResultsDataViewInner');
                    comp.isDummy = data.isDummy;
                    me.getSaveJourneyButtonInSearchResults().setHidden(true);
                }
                Ext.Viewport.unmask();
            } else {
                Ext.Viewport.unmask();
                Ext.Msg.alert("Search Failure", data.message);
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
            url: Config.url.RACLOOP_REPLACE_AND_SEARCH,
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
            var data = Ext.decode(response.responseText);
            if (data.success) {
                searchNavView.reset();
                var searchStore = Ext.getStore('SearchStore');
                searchStore.removeAll();
                var jsonObj = data.data.journeys;
                for (var i in jsonObj) {
                    searchStore.add(jsonObj[i]);
                };
                if(data.total.length == 0) {
                    me.getSearchNavigationView().push({
                        title : 'Search Results',
                        xtype : 'searchResultsEmptyView'
                    });
                }
                else {
                    var searchResultsView = Ext.ComponentManager.create({title : 'Search Results'}, 'searchResultsView');
                    me.getSearchNavigationView().push(searchResultsView);
                    var comp = searchResultsView.getComponent('searchResultsDataViewInner');
                    comp.isDummy = data.isDummy;
                    me.getSaveJourneyButtonInSearchResults().setHidden(true);
                }
                Ext.Viewport.unmask();
            } else {
                Ext.Viewport.unmask();
                Ext.Msg.alert("Search Failure", data.message);
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
            url: Config.url.RACLOOP_KEEP_ORIGINAL_AND_SEARCH,
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
});