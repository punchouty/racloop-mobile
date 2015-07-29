Ext.define('Racloop.controller.JourneysController', {
    extend: 'Ext.app.Controller',
    requires: [
        'Ext.Toast',
        'Racloop.store.Searches',
        'Racloop.view.SearchNavigationView',
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
            searchFormInTab : 'searchNavigationView #searchFormInTabs',
            searchButtonInTab : 'searchNavigationView #searchFormInTabs #searchButton',
            datePickerInTab : 'searchNavigationView #searchFormInTabs datepickerfield[itemId=searchScreenDate]',
            timePickerInTab : 'searchNavigationView #searchFormInTabs timepickerfield[itemId=searchScreenTime]',
            //loginButtonInSearchResults : 'searchNavigationView #loginButtonInSearchResults',

            mainNavigationView: 'mainNavigationView',
            searchFormInMainView : 'mainNavigationView #searchFormInMain',
            searchButtonInMainView : 'mainNavigationView #searchFormInMain #searchButton',
            datePickerInMainView : 'mainNavigationView #searchFormInMain datepickerfield[itemId=searchScreenDate]',
            timePickerInMainView : 'mainNavigationView #searchFormInMain timepickerfield[itemId=searchScreenTime]',

            saveJourneyButtonInEmptyResults : 'searchResultsEmptyView #saveJourneyButton',
            emptySearchResultsHtml : 'searchResultsEmptyView #emptySearchHtml',
            saveJourneyButtonInSearchResults : 'searchResultsView #saveJourneyButton',
            loginButtonInSearchResults : 'searchResultsView #loginButtonInSearchResults',
            searchResultsView : 'searchResultsView',

            existingJourneyPanel : 'existingJourneyPanel',
            existingJourneyInfoHtmlContainer : 'existingJourneyPanel #existingJourneyInfo',
            existingJourneyReplaceButton : 'existingJourneyPanel #existingJourneyReplaceButton',
            existingJourneyKeepOriginalButton : 'existingJourneyPanel #existingJourneyKeepOriginalButton'
        },
        control: {
            //'searchForm': {
            //    initialize : 'initialiseUi'
            //},
            'searchNavigationView': {
                initialize : 'initSearchControlsInMainTabs'
            },
            'mainNavigationView': {
                initialize : 'initSearchControlsInMainView'
            },
            searchButtonInTab: {
                tap : 'searchButtonInTabTap'
            },
            searchButtonInMainView: {
                tap : 'searchButtonInMainViewTap'
            },
            saveJourneyButtonInEmptyResults : {
                tap : 'handleSaveJourneyTap'
            },
            saveJourneyButtonInSearchResults : {
                tap : 'handleSaveJourneyTap'
            },
            "datePickerInTab": {
                change: 'onDatePickerFieldChange'
            },
            "timePickerInTab": {
                change: 'onTimePickerFieldChange'
            },
            "datePickerInMainView": {
                change: 'onDatePickerFieldChange'
            },
            "timePickerInMainView": {
                change: 'onTimePickerFieldChange'
            },
            'searchResultViewItem':{
                confirmSearchRequestButtonTap : 'handleConfirmSearchRequestButtonTap'
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
            'loginButtonInSearchResults' : {
                tap : 'loginButtonInSearchResultsTap'
            }
        }
    },

    initSearchControlsInMainTabs : function() {
        console.log("initSearchControlsInMainTabs");
        var searchForm = this.getSearchFormInTab();
        this.initialiseUi(searchForm);
    },

    initSearchControlsInMainView : function() {
        console.log("initSearchControlsInMainView");
        var searchForm = this.getSearchFormInMainView();
        this.initialiseUi(searchForm);
    },

    initialiseUi : function(searchForm) {
        var me = this;
        //var searchForm = this.getSearchForm();
        //var root = searchForm.element.dom;

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
        //this.actionSheetFrom = actionSheetFrom;

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
        //this.actionSheetTo = actionSheetTo;

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
        this.initGoogleElements(searchForm, actionSheetFrom, actionSheetTo);
        this.initTime(searchForm);
    },

    launch : function() {

    },

    initGoogleElements : function(searchForm, actionSheetFrom, actionSheetTo) {
        console.log("Journey Controller initGoogleElements starts");
        var me = this;
        //var searchForm = this.getSearchForm();
        //console.log("this.getSearchForm() : " + this.getSearchForm());
        var root = searchForm.element.dom;
        var actionFromRoot = actionSheetFrom.element.dom;
        var actionToRoot = actionSheetTo.element.dom;

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
            me.calculateDistance(searchForm, latFrom, longFrom, latTo, longTo);
            actionSheetFrom.hide();
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
            me.calculateDistance(searchForm, latFrom, longFrom, latTo, longTo);
            actionSheetTo.hide();
        });
    },

    initTime : function(searchForm) {
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
        searchForm.down('#searchScreenDate').setValue(defaultTime);
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
            searchForm.down('field[name=dateOfJourneyString]').setValue(journeyDateString);
        }
        console.log("Journey Controller initGoogleElements ends");
    },

    calculateDistance : function(searchForm, latFrom, longFrom, latTo, longTo) {
        //var searchForm = this.getSearchForm();
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
                    var tripTimeInSeconds = 0;
                    var myroute = results.routes[0];
                    var numberOfLegs = 0;
                    for ( var i = 0; i < myroute.legs.length; i++) {
                        total += myroute.legs[i].distance.value;
                        tripTimeInSeconds += myroute.legs[i].duration.value;
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
                        }
                    }
                    if(numberOfLegs != 1) {
                        //console.log("numberOfLegs : " + numberOfLegs);
                    }
                    total = total / 1000
                    searchForm.down('field[name=tripUnit]').setValue('KM');
                    searchForm.down('field[name=tripDistance]').setValue(total + '');
                    searchForm.down('field[name=tripTimeInSeconds]').setValue(tripTimeInSeconds + '');
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
        var searchForm = field.up('searchForm');
        this.setDateTime(searchForm);
    },
    onTimePickerFieldChange: function(field, newDate, oldDate, eOpts) {
        var searchForm = field.up('searchForm');
        this.setDateTime(searchForm);
    },
    setDateTime: function(searchForm) {
        //var searchForm = this.getSearchForm();
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
            searchForm.down('field[name=dateOfJourneyString]').setValue(journeyDateString);
        }
        var now = new Date();
        var reserveTime = 25; //in minutes. Increment of 15 min will make ride reserve time 30 min
        var timeLimitInDays = 7; //in days
        var validStartTime = new Date(now.getTime() + reserveTime * 60000);
        var validStartTimeString = Ext.Date.format(validStartTime, 'c');
        searchForm.down('field[name=validStartTimeString]').setValue(validStartTimeString);
    },

    searchButtonInTabTap : function(button, e, eOpts) {
        this.searchButtonTap(false, button, e, eOpts );
    },

    searchButtonInMainViewTap : function(button, e, eOpts) {
        this.searchButtonTap(true, button, e, eOpts );
    },

    searchButtonTap: function(isFirstScreen, button, e, eOpts) {
        console.log("searchButtonTap searchButtonTap")
        var me = this;
        var searchForm = button.up('searchForm');
        console.log('searchForm : ' + searchForm)
        this.resetErrorFields(isFirstScreen);
        //var searchForm = this.getSearchForm();
        var journeyModel = Ext.create('Racloop.model.Journey', {});
        var values = searchForm.getValues(); // Form values
        searchForm.updateRecord(journeyModel);
        var validationObj = journeyModel.validate();
        if (!validationObj.isValid()) {
            var errorString = this.validateSearchForm(isFirstScreen, validationObj);
            Ext.Msg.alert("Oops, Input Errors", errorString);
        } else {
            var isTaxi = values.isTaxi;
            var tripDistance = values.tripDistance;
            if(isTaxi === 'false' && tripDistance > 75) {
                Ext.Msg.alert("Use Taxi", "We don't allow journeys more that 75 KM by Auto Rickshaw. Please use Taxi as transport mode");
            }
            else {
                this.executeSearch(values, isFirstScreen);
            }
        }
    },

    executeSearch : function(journey, isFirstScreen) {
        var me = this;

        var successCallback = function(response, ops) {
            var data = Ext.decode(response.responseText);
            if (data.success) {
                if(data.existingJourney){ // If user is searching similar journey
                    var newJourney = data.data.currentJourney;
                    var existingJourney = data.data.existingJourney;

                    var newIsDriver = newJourney.isTaxi ? "Taxi": "Auto Rickshaw";
                    var existingIsDriver = existingJourney.isTaxi? "Taxi": "Auto Rickshaw";
                    var newDate = new Date(newJourney.dateOfJourney);
                    var newDay = Ext.Date.format(newDate, 'd');
                    var newMonth = Ext.Date.format(newDate, 'F');
                    var newTime = Ext.Date.format(newDate, 'g:i A');

                    var existingDate = new Date(existingJourney.dateOfJourney);
                    var existingDay = Ext.Date.format(existingDate, 'd');
                    var existingMonth = Ext.Date.format(existingDate, 'F');
                    var existingTime = Ext.Date.format(existingDate, 'g:i A');

                    var journeyHtml='<div class="card">\
                                        <div class="sub-heading">Requested Journey</div>\
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
                                    <div class="sub-heading">Similar Existing Journey</div>\
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
                    var existingPanel = me.getSearchNavigationView().push({
                        xtype: "existingJourneyPanel",
                        title: "Duplicate Request"
                    });
                    existingPanel.down("#existingJourneyInfo").setHtml(journeyHtml);
                    existingPanel.setPreviousJourney(existingJourney);
                    existingPanel.setNewJourney(newJourney);
                }
                else{
                    var searchStore = Ext.getStore('SearchStore');
                    searchStore.removeAll();
                    var jsonObj = data.data.journeys;
                    var disableMoreRequests = data.data.disableMoreRequests;
                    for (var i in jsonObj) {
                        if(disableMoreRequests) jsonObj[i].disableRequest = true;
                        else jsonObj[i].disableRequest = false;
                        if(isFirstScreen) {
                            jsonObj[i].hideButtons = true;
                        }
                        searchStore.add(jsonObj[i]);
                    };
                    if(data.total == 0) {
                        var searchResultsView = null
                        if(isFirstScreen) {
                            searchResultsView = me.getMainNavigationView().push({
                                xtype: "searchResultsEmptyView",
                                title: "Search Results"
                            });
                        }
                        else {
                            searchResultsView = me.getSearchNavigationView().push({
                                xtype: "searchResultsEmptyView",
                                title: "Search Results"
                            });
                        }
                        if(data.data.hideSaveButton) {
                            me.getEmptySearchResultsHtml().setHtml(Config.zeroResultsHtml);
                            me.getSaveJourneyButtonInEmptyResults().setHidden(true);
                        }
                    }
                    else {
                        //var searchResultsView = me.getSearchNavigationView().push({
                        //    xtype: "searchResultsView",
                        //    title: "Search Results"
                        //});
                        //var comp = searchResultsView.getComponent('searchResultsDataViewInner');
                        //comp.isDummy = data.isDummy;
                        //console.log("executeSearch : data.data.hideSaveButton : " + data.data.hideSaveButton);
                        //if(data.data.hideSaveButton) {
                        //    //me.getSaveJourneyButtonInSearchResults().setHidden(true);
                        //    searchResultsView.down('#saveJourneyButton').setHidden(true);
                        //}
                        //else {
                        //    //me.getSaveJourneyButtonInSearchResults().setHidden(false);
                        //    searchResultsView.down('#saveJourneyButton').setHidden(false);
                        //}
                        //console.log("isFirstScreen : " + isFirstScreen + " searchResultsView.down('#loginButtonInSearchResults') : " + searchResultsView.down('#loginButtonInSearchResults'))
                        //if(isFirstScreen === false) {
                        //    searchResultsView.down('#loginButtonInSearchResults').setHidden(true);
                        //}
                        //else {
                        //    searchResultsView.down('#loginButtonInSearchResults').setHidden(false);
                        //}
                        //if(disableMoreRequests) {
                        //    Ext.toast({message: "You cannot send more than two invites for same journey", timeout: Racloop.util.Config.toastTimeout, animation: true, cls: 'toastClass'});
                        //}
                        var task = Ext.create('Ext.util.DelayedTask', function(){
                            var searchResultsView = null
                            if(isFirstScreen) {
                                searchResultsView = me.getMainNavigationView().push({
                                    xtype: "searchResultsView",
                                    title: "Search Results"
                                });
                            }
                            else {
                                searchResultsView = me.getSearchNavigationView().push({
                                    xtype: "searchResultsView",
                                    title: "Search Results"
                                });
                            }
                            var comp = searchResultsView.getComponent('searchResultsDataViewInner');
                            comp.isDummy = data.isDummy;
                            console.log("executeSearch : data.data.hideSaveButton : " + data.data.hideSaveButton);
                            if(data.data.hideSaveButton || isFirstScreen) {
                                //me.getSaveJourneyButtonInSearchResults().setHidden(true);
                                searchResultsView.down('#saveJourneyButton').setHidden(true);
                            }
                            else {
                                //me.getSaveJourneyButtonInSearchResults().setHidden(false);
                                searchResultsView.down('#saveJourneyButton').setHidden(false);
                            }
                            console.log("isFirstScreen : " + isFirstScreen + " searchResultsView.down('#loginButtonInSearchResults') : " + searchResultsView.down('#loginButtonInSearchResults'))
                            if(isFirstScreen) {
                                searchResultsView.down('#loginButtonInSearchResults').setHidden(false);
                            }
                            else {
                                searchResultsView.down('#loginButtonInSearchResults').setHidden(true);
                            }
                            if(disableMoreRequests) {
                                Ext.toast({message: "You cannot send more than two invites for same journey", timeout: Racloop.util.Config.toastTimeout, animation: true, cls: 'toastClass'});
                            }
                        });
                        task.delay(300);
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
                isTaxi: journey.isTaxi,
                tripDistance: journey.tripDistance,
                tripTimeInSeconds: journey.tripTimeInSeconds,
                tripUnit: journey.tripUnit
            }),
            success: successCallback,
            failure: failureCallback
        });
    },

    validateSearchForm: function(isFirstScreen, validationObj) {
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
            if(isFirstScreen) Ext.ComponentQuery.query('mainNavigationView #searchFormInMain  #searchScreenFrom')[0].addCls('error');
            else Ext.ComponentQuery.query('searchNavigationView #searchFormInTabs  #searchScreenFrom')[0].addCls('error');
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
            if(isFirstScreen) Ext.ComponentQuery.query('mainNavigationView #searchFormInMain  #searchScreenTo')[0].addCls('error');
            else Ext.ComponentQuery.query('searchNavigationView #searchFormInTabs  #searchScreenTo')[0].addCls('error');
            errorstring += "Invalid Location :  To* field<br />";
        }

        var journeyErrors = validationObj.getByField('journeyDate');

        if (journeyErrors != null && journeyErrors.length > 0) {
            for (var i = 0; i < journeyErrors.length; i++) {
                errorstring += journeyErrors[i].getMessage() + "<br />";
            }
            if(isFirstScreen) {
                Ext.ComponentQuery.query('mainNavigationView #searchFormInMain  #searchScreenDate')[0].addCls('error');
                Ext.ComponentQuery.query('mainNavigationView #searchFormInMain  #searchScreenTime')[0].addCls('error');
            }
            else {
                Ext.ComponentQuery.query('searchNavigationView #searchFormInTabs  #searchScreenDate')[0].addCls('error');
                Ext.ComponentQuery.query('searchNavigationView #searchFormInTabs  #searchScreenTime')[0].addCls('error');
            }
        }
        return errorstring;
    },

    resetErrorFields: function(isFirstScreen) {
        if(isFirstScreen) {
            Ext.ComponentQuery.query('mainNavigationView #searchFormInMain #searchScreenFrom')[0].removeCls('error');
            Ext.ComponentQuery.query('mainNavigationView #searchFormInMain #searchScreenTo')[0].removeCls('error');
            Ext.ComponentQuery.query('mainNavigationView #searchFormInMain #searchScreenDate')[0].removeCls('error');
            Ext.ComponentQuery.query('mainNavigationView #searchFormInMain #searchScreenTime')[0].removeCls('error');
        }
        else {
            Ext.ComponentQuery.query('searchNavigationView #searchFormInTabs #searchScreenFrom')[0].removeCls('error');
            Ext.ComponentQuery.query('searchNavigationView #searchFormInTabs #searchScreenTo')[0].removeCls('error');
            Ext.ComponentQuery.query('searchNavigationView #searchFormInTabs #searchScreenDate')[0].removeCls('error');
            Ext.ComponentQuery.query('searchNavigationView #searchFormInTabs #searchScreenTime')[0].removeCls('error');
        }
    },

    resetFields: function() {

    },

    handleSearchAgainHistoryButtonTap: function(item) {
        var record = item.getRecord();
        Ext.ComponentQuery.query('searchNavigationView #searchFormInTabs #searchScreenFrom')[0].setValue(record.get("from"));
        Ext.ComponentQuery.query('searchNavigationView #searchFormInTabs field[name=fromLatitude]')[0].setValue(record.get("fromLatitude"));
        Ext.ComponentQuery.query('searchNavigationView #searchFormInTabs field[name=fromLongitude]')[0].setValue(record.get("fromLongitude"));
        Ext.ComponentQuery.query('searchNavigationView #searchFormInTabs #searchScreenTo')[0].setValue(record.get("to"));
        Ext.ComponentQuery.query('searchNavigationView #searchFormInTabs field[name=toLatitude]')[0].setValue(record.get("toLatitude"));
        Ext.ComponentQuery.query('searchNavigationView #searchFormInTabs field[name=toLongitude]')[0].setValue(record.get("toLongitude"));

        var distance = this.calculateDistance(this.getSearchFormInTab(), record.get("fromLatitude"), record.get("fromLongitude"), record.get("toLatitude"), record.get("toLongitude"));
        Ext.ComponentQuery.query('searchNavigationView #searchFormInTabs field[name=tripDistance]')[0].setValue(distance);
        Ext.ComponentQuery.query('searchNavigationView #searchFormInTabs field[name=tripTimeInSeconds]')[0].setValue(record.get("tripTimeInSeconds"));

        var isTaxi = record.get("isTaxi");
        if(isTaxi) {
            Ext.ComponentQuery.query('searchNavigationView #searchFormInTabs #autoTaxiSelectField')[0].setValue('taxi');
        }
        else {
            Ext.ComponentQuery.query('searchNavigationView #searchFormInTabs #autoTaxiSelectField')[0].setValue('auto');
        }
        var searchForm = this.getSearchFormInTab();
        var activeItem = this.getSearchNavigationView().getActiveItem();
        if(searchForm != activeItem) this.getSearchNavigationView().pop();
        this.getMainTabs().setActiveItem('searchNavigationView');
        Racloop.app.getController('UiController').hideLoginLinksFromSearchForm();
        //this.searchJourneys();

    },

    handleSaveJourneyTap : function() {
        var me = this;
        this.getSearchNavigationView().pop();
        var searchNavView = this.getSearchNavigationView();

        var successCallback = function(response, ops) {
            var data = Ext.decode(response.responseText);
            if (data.success) {
                Ext.getStore('journeyStore').load({
                    callback: function(records, operation, success) {
                        me.getMainTabs().setActiveItem('journeyNavigationView');
                        Racloop.app.getController('UiController').showMyJourneys();
                    },
                    scope: this
                });
                Ext.Viewport.unmask();
                Ext.toast({message: "Successfully saved your request", timeout: Config.toastTimeout, animation: true, cls: 'toastClass'});
            } else {
                Ext.Viewport.unmask();
                Ext.Msg.alert("Search Failure", data.message);
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

    handleExistingJourneyReplaceButtonTap: function(button){
        var me = this;
        me.getSearchNavigationView().pop();
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
                //searchNavView.reset();
                var searchStore = Ext.getStore('SearchStore');
                searchStore.removeAll();
                var jsonObj = data.data.journeys;
                var disableMoreRequests = data.data.disableMoreRequests;
                for (var i in jsonObj) {
                    if(disableMoreRequests) jsonObj[i].disableRequest = true;
                    else jsonObj[i].disableRequest = false;
                    searchStore.add(jsonObj[i]);
                };
                var task = Ext.create('Ext.util.DelayedTask', function(){
                    if(data.total == 0) {
                        me.getSearchNavigationView().push({
                            title : 'Search Results',
                            xtype : 'searchResultsEmptyView'
                        });
                        me.getEmptySearchResultsHtml().setHtml(Config.zeroResultsHtml);
                        me.getSaveJourneyButtonInEmptyResults().setHidden(true);
                    }
                    else {
                        var searchResultsView = me.getSearchNavigationView().push({
                            title : 'Search Results',
                            xtype : 'searchResultsView'
                        });
                        me.getLoginButtonInSearchResults().setHidden(true);
                        Racloop.app.getController('UiController').hideLoginLinksFromSearchForm();
                        if(disableMoreRequests) {
                            Ext.toast({message: "You cannot send more than two invites for same journey", timeout: Racloop.util.Config.toastTimeout, animation: true, cls: 'toastClass'});
                        }
                    }
                });
                task.delay(300);
                //if(data.total == 0) {
                //    me.getSearchNavigationView().push({
                //        title : 'Search Results',
                //        xtype : 'searchResultsEmptyView'
                //    });
                //    me.getEmptySearchResultsHtml().setHtml(Config.zeroResultsHtml);
                //    me.getSaveJourneyButtonInEmptyResults().setHidden(true);
                //}
                //else {
                //    var searchResultsView = me.getSearchNavigationView().push({
                //        title : 'Search Results',
                //        xtype : 'searchResultsView'
                //    });
                //    searchResultsView.down('#saveJourneyButton').setHidden(true);
                //    searchResultsView.down('#loginButtonInSearchResults').setHidden(true);
                //    if(disableMoreRequests) {
                //        Ext.toast({message: "You cannot send more than two invites for same journey", timeout: Racloop.util.Config.toastTimeout, animation: true, cls: 'toastClass'});
                //    }
                //}
                Ext.Viewport.unmask();
            } else {
                Ext.Viewport.unmask();
                Ext.Msg.alert("Unable to replace", data.message);
            }
        };
        // Failure
        var failureCallback = function(response, ops) {
            Ext.Viewport.unmask();
            Ext.Msg.alert("Network Failure", response.message);
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
                validStartTimeString : newJourney.validStartTimeString,
                from: newJourney.from,
                fromLatitude: newJourney.fromLatitude,
                fromLongitude: newJourney.fromLongitude,
                to: newJourney.to,
                toLatitude: newJourney.toLatitude,
                toLongitude: newJourney.toLongitude,
                isDriver: newJourney.isDriver,
                isTaxi: newJourney.isTaxi,
                tripDistance: newJourney.tripDistance,
                tripTimeInSeconds: newJourney.tripTimeInSeconds,
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
        me.getSearchNavigationView().pop();
        var existingJourneyPanel = this.getExistingJourneyPanel();
        var existingJourney = existingJourneyPanel.getPreviousJourney();
        var existingJourneyId = existingJourney.id;
        var successCallback = function(response, ops) {
            var data = Ext.decode(response.responseText);
            if (data.success) {
                var searchStore = Ext.getStore('SearchStore');
                searchStore.removeAll();
                var jsonObj = data.data.journeys;
                var disableMoreRequests = data.data.disableMoreRequests;
                for (var i in jsonObj) {
                    if(disableMoreRequests) jsonObj[i].disableRequest = true;
                    else jsonObj[i].disableRequest = false;
                    searchStore.add(jsonObj[i]);
                };
                var task = Ext.create('Ext.util.DelayedTask', function(){
                    if(data.total == 0) {
                        me.getSearchNavigationView().push({
                            title : 'Search Results',
                            xtype : 'searchResultsEmptyView'
                        });
                        me.getEmptySearchResultsHtml().setHtml(Config.zeroResultsHtml);
                        me.getSaveJourneyButtonInEmptyResults().setHidden(true);
                    }
                    else {
                        var searchResultsView = me.getSearchNavigationView().push({
                            title : 'Search Results',
                            xtype : 'searchResultsView'
                        });
                        //me.getSaveJourneyButtonInSearchResults().setHidden(true);
                        me.getLoginButtonInSearchResults().setHidden(true);
                        Racloop.app.getController('UiController').hideLoginLinksFromSearchForm();
                        if(disableMoreRequests) {
                            Ext.toast({message: "You cannot send more than two invites for same journey", timeout: Racloop.util.Config.toastTimeout, animation: true, cls: 'toastClass'});
                        }
                    }
                });
                task.delay(300);
                //if(data.total == 0) {
                //    me.getSearchNavigationView().push({
                //        title : 'Search Results',
                //        xtype : 'searchResultsEmptyView'
                //    });
                //    me.getEmptySearchResultsHtml().setHtml(Config.zeroResultsHtml);
                //    me.getSaveJourneyButtonInEmptyResults().setHidden(true);
                //}
                //else {
                //    var searchResultsView = me.getSearchNavigationView().push({
                //        title : 'Search Results',
                //        xtype : 'searchResultsView'
                //    });
                //    console.log("handleExistingJourneyKeepOriginalButtonTap : data.data.hideSaveButton : " + data.data.hideSaveButton);
                //    //me.getSaveJourneyButtonInSearchResults().setHidden(true);
                //    searchResultsView.down('#saveJourneyButton').setHidden(true);
                //    searchResultsView.down('#loginButtonInSearchResults').setHidden(true);
                //    if(disableMoreRequests) {
                //        Ext.toast({message: "You cannot send more than two invites for same journey", timeout: Racloop.util.Config.toastTimeout, animation: true, cls: 'toastClass'});
                //    }
                //}
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
    },

    loginButtonInSearchResultsTap : function() {
        Racloop.app.getController('UiController').showLogin();
    }

});