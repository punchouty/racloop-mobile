Ext.define('Racloop.controller.JourneysController', {
    extend: 'Ext.app.Controller',
    requires: [
        'Racloop.store.Searches',
        'Racloop.view.SearchNavigationView',
        //'Racloop.view.UserSearchList',
        //'Racloop.view.SearchViewItem',
        'Racloop.view.SearchResultViewItem',
        'Racloop.view.RequestJourneyPanel',
        'Racloop.view.ExistingJourneyPanel',
        'Racloop.util.Config'
    ],
    config: {
        refs: {
            searchNavigationView: 'searchNavigationView',
            searchForm: 'searchNavigationView #searchForm',
            searchButton: 'searchNavigationView #searchButton',
            // RequestJourneyPanel: '#requestPanel',
            //  SearchForm: 'searchForm',
            // searchDataView: 'UserSearchList',
            RequestButton: 'button[action=Request]',
            SearchListItem: 'SearchDataItem',
            SendRequestButton:'button[action=SendRequest]',
            CancelRequestButton: 'button[action=CancelRequest]',
            existingJourneyPanel: {
                selector: '#existingPanel',
                xtype: 'existingJourneyPanel'
            },
            existingSendRequestButton: 'button[action=existingSendRequest]'
        },
        control: {
            'searchNavigationView': {
                initialize: 'initialiseUi'
            },
            searchButton: {
                tap: 'searchJourneys'
            },
            "datepickerfield[itemId=searchScreenDate]": {
                change: 'onDatePickerFieldChange'
            },
            "timepickerfield[itemId=searchScreenTime]": {
                change: 'onTimePickerFieldChange'
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
        var fromField = searchForm.down('#searchScreenFrom');
        fromField.element.on({
            tap: function(e) {
                Ext.Viewport.add(actionSheetFrom);
                actionSheetFrom.down("#actionScreenFrom").focus();
                actionSheetFrom.show();
            }
        });
        var toField = searchForm.down('#searchScreenTo');
        toField.element.on({
            tap: function(e) {
                Ext.Viewport.add(actionSheetTo);
                actionSheetTo.down("#actionScreenTo").focus();
                actionSheetTo.show();
            }
        });

        var actionFromRoot = actionSheetFrom.element.dom;
        var actionToRoot = actionSheetTo.element.dom;

        var fromInput = actionFromRoot.querySelectorAll('input[name=from]')[0];
        var toInput = actionToRoot.querySelectorAll('input[name=to]')[0];
        var latFrom, longFrom, latTo, longTo;

        var autocompleteFrom = new google.maps.places.Autocomplete(fromInput);
        var autocompleteTo = new google.maps.places.Autocomplete(toInput);

        google.maps.event.addListener(autocompleteFrom, 'place_changed', function() {
            var place = autocompleteFrom.getPlace();
            latFrom = place.geometry.location.lat();
            longFrom = place.geometry.location.lng();
            var selectedPlace = fromInput.value;
            searchForm.down('field[name=fromPlace]').setValue(selectedPlace);
            searchForm.down('field[name=fromLatitude]').setValue(latFrom);
            searchForm.down('field[name=fromLongitude]').setValue(longFrom);
            setDistance();
            actionSheetFrom.hide();
        });

        google.maps.event.addListener(autocompleteTo, 'place_changed', function() {
            var place = autocompleteTo.getPlace();
            latTo = place.geometry.location.lat();
            longTo = place.geometry.location.lng();
            var selectedPlace = toInput.value;
            searchForm.down('field[name=toPlace]').setValue(selectedPlace);
            searchForm.down('field[name=toLatitude]').setValue(latTo);
            searchForm.down('field[name=toLongitude]').setValue(longTo);
            setDistance();
            actionSheetTo.hide();
        });

        var setDistance = function() {
            if (latFrom != null && longFrom != null & latTo != null && longTo != null) {
                console.log("if condition")
                var p1 = new google.maps.LatLng(latFrom, longFrom);
                var p2 = new google.maps.LatLng(latTo, longTo);
                var distance = calcDistance(p1, p2);
                console.log(distance);
                searchForm.down('field[name=tripDistance]').setValue(distance);
            }
        };
        //calculates distance between two points in km's
        var calcDistance = function(p1, p2) {
            return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
        };


        var now = new Date();
        var reserveTime = 25; //in minutes. Increment of 15 min will make ride reserve time 30 min
        var timeLimitInDays = 7; //in days
        var validStartTime = new Date(now.getTime() + reserveTime * 60000);
        //var initialTime = new Date(now.getTime() + (reserveTime + 15) * 60000);
        //console.log(validStartTime);
        var validEndTime = new Date(now.getTime() + timeLimitInDays * 24 * 60 * 60000);
        //console.log(validEndTime);

        var validStartTimeString = validStartTime.toString('dd MMMM hh:mm tt');
        searchForm.down('field[name=validStartTimeString]').setValue(validStartTimeString);
        searchForm.down('field[name=date]').setValue({
            day: now.getDate(),
            month: (now.getMonth() + 1),
            year: now.getFullYear()
        });
        searchForm.down('field[name=time]').setValue(now.getTime());
        var picker = searchForm.down('#searchScreenTime');


        //var searchFrm = this.getSearchForm();
        var selectedDate = searchForm.down('field[name=date]').getValue();
        var selectedTime = searchForm.down('field[name=time]').getValue();

        if (selectedDate != null && selectedTime != null) {
            var dateString = Ext.Date.format(selectedDate, 'd M y');
            var timeString = Ext.Date.format(selectedTime, 'h:i A');
            var datetimeString = dateString + " " + timeString;
            searchForm.down('field[name=dateOfJourneyString]').setValue(datetimeString);
        }

    },


    onDatePickerFieldChange: function(field, newDate, oldDate, eOpts) {
        //console.log("onDatepickerfieldChange" + field.getFormattedValue('m/d/Y'));
        this.setDateTime();
    },
    onTimePickerFieldChange: function(field, newDate, oldDate, eOpts) {
        //console.log("onTimepickerfieldChange" + field.getFormattedValue('g:i A'));
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
    searchJourneys: function(button, e, eOpts) {
        this.resetErrorFields();
        var searchForm = this.getSearchForm();
        var journeyModel = Ext.create('Racloop.model.Journey', {});
        var values = searchForm.getValues(); // Form values
        searchForm.updateRecord(journeyModel);

        var successCallback = function(response, ops) {
            var data = Ext.decode(response.responseText);
            if (data.success) {
                //Ext.Msg.alert("Search Successful "+ data.message+" find "+data.total+" Records" );

                if(data.existingJourney){ //TODO : What use case it is covering?
                    var newJourney=data.data.currentJourney;
                    var existingJourney=data.data.existingJourney;
                    console.dir(newJourney);
                    console.dir(existingJourney);
                    var existingPanel = Ext.create('Racloop.view.ExistingJourneyPanel', {
                        title: 'Existing Journey Found!'
                    });

                    var newDriver= newJourney.isDriver? "Yes": "No";
                    var existingDriver= existingJourney.isDriver? "Yes": "No";
                    var newDate = new Date(newJourney.dateOfJourney);
                    var newDay=Ext.Date.format(newDate, 'd');
                    var newMonth=Ext.Date.format(newDate, 'F');
                    var newTime=Ext.Date.format(newDate, 'g:i A');

                    var existingDate = new Date(existingJourney.dateOfJourney);
                    var existingDay=Ext.Date.format(existingDate, 'd');
                    var existingMonth=Ext.Date.format(existingDate, 'F');
                    var existingTime=Ext.Date.format(existingDate, 'g:i A');

                    var JourneyHtml='<div class="card">\
                                        <div class="card-info">\
                                            <div class="card-date">\
                                                <div class="card-day">'+newDay+'</div>\
                                                <div class="card-month">'+newMonth+'</div>\
                                            </div>\
                                            <div class="card-main">\
                                             <div class="card-name">\
                                                <h3>New Journey</h3>\
                                            </div>\
                                                <div>\
                                                    <span class="card-time">'+newTime+'</span>\
                                                    <span class="card-label card-label-gray">Driving</span>\
                                                    <span class="card-label card-label-green">'+newDriver+'</span>\
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
                                    <div class="card-info">\
                                        <div class="card-date">\
                                            <div class="card-day">'+existingDay+'</div>\
                                            <div class="card-month">'+existingMonth+'</div>\
                                        </div>\
                                        <div class="card-main">\
                                        <div class="card-name">\
                                                <h3>Existing Journey</h3>\
                                            </div>\
                                            <div>\
                                                <span class="card-time">'+Ext.Date.format(new Date(newJourney.dateOfJourney), 'g:i A')+'</span>\
                                                <span class="card-label card-label-gray">Driving</span>\
                                                <span class="card-label card-label-green">'+existingDriver+'</span>\
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




                    // var newJourneyHtml='<h1>New Journey</h1><ul>\
                    //   <li><b>From:</b> '+newJourney.fromPlace+'</li>\
                    //   <li><b>To:</b>   '+newJourney.toPlace+'</li>\
                    //   <li><b>Date:</b> '+Ext.Date.format(new Date(newJourney.dateOfJourney), 'd/m/Y g:i A')+'</li>\
                    //   <li><b>Driving:</b>'+newDriver+'</li>\
                    //   </ul>';

                    //  var existingJourneyHtml='<h1>Existing Journey</h1><ul>\
                    //   <li><b>From:</b> '+existingJourney.fromPlace+'</li>\
                    //   <li><b>To:</b>   '+existingJourney.toPlace+'</li>\
                    //   <li><b>Date:</b> '+Ext.Date.format(new Date(existingJourney.dateOfJourney), 'd/m/Y g:i A')+'</li>\
                    //   <li><b>Driving:</b>'+existingDriver+'</li>\
                    //   </ul>';
                    existingPanel.down("#existingJourneyInfo").setHtml(JourneyHtml);
                    // existingPanel.down("#existingJourneyInfo").down("#newJourney").setHtml(newJourneyHtml);
                    // existingPanel.down("#existingJourneyInfo").down("#existingJourney").setHtml(existingJourneyHtml);
                    existingPanel.setExistingJrny(existingJourney);
                    existingPanel.setNewJrny(newJourney);
                    searchForm.up().push(existingPanel);
                }
                else{
//                    LoginHelper.setJourney(data.data.currentJourney);
                    var SearchStore = Ext.getStore('SearchStore');
                    SearchStore.removeAll();
                    var jsonObj = data.data.matchedJourneys;
                    for (var i in jsonObj) {
                        SearchStore.add(jsonObj[i]);
                    };

                    searchForm.up().push({
                        title: 'Search Results',
                        xtype: 'searchResultsDataView',
                        isDummy: data.data.isDummyData
                    });
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

        var validationObj = journeyModel.validate();
        if (!validationObj.isValid()) {
            var errorString = this.handleValidation(validationObj);
            Ext.Msg.alert("Oops", errorString);
        } else {
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
                    dateOfJourneyString: values.dateOfJourneyString,
                    validStartTimeString: values.validStartTimeString,
                    fromPlace: values.fromPlace,
                    fromLatitude: values.fromLatitude,
                    fromLongitude: values.fromLongitude,
                    toPlace: values.toPlace,
                    toLatitude: values.toLatitude,
                    toLongitude: values.toLongitude,
                    isDriver: values.isDriver,
                    tripDistance: values.tripDistance,
                    tripUnit: values.tripUnit
                }),
                success: successCallback,
                failure: failureCallback
            });

        }


    },

    handleValidation: function(validationObj) {
        var errorstring = "";
        var fromPlaceErrors = validationObj.getByField('fromPlace');
        if (fromPlaceErrors != null && fromPlaceErrors.length > 0) {
            for (var i = 0; i < fromPlaceErrors.length; i++) {
                errorstring += fromPlaceErrors[i].getMessage() + "<br />";
            }

            Ext.ComponentQuery.query('#searchForm #searchScreenFrom')[0].addCls('error');
        }


        var toPlaceErrors = validationObj.getByField('toPlace');
        if (toPlaceErrors != null && toPlaceErrors.length > 0) {
            for (var i = 0; i < toPlaceErrors.length; i++) {
                errorstring += toPlaceErrors[i].getMessage() + "<br />";
            }

            Ext.ComponentQuery.query('#searchForm #searchScreenTo')[0].addCls('error');
        }

        var fromLatitudeErrors = validationObj.getByField('fromLatitude');
        if (fromLatitudeErrors != null && fromLatitudeErrors.length > 0) {
            for (var i = 0; i < fromLatitudeErrors.length; i++) {
                errorstring += fromLatitudeErrors[i].getMessage() + "<br />";
            }

            Ext.ComponentQuery.query('#searchForm #searchScreenFrom')[0].addCls('error');
        }

        var fromLongitudeErrors = validationObj.getByField('fromLongitude');
        if (fromLongitudeErrors != null && fromLongitudeErrors.length > 0) {
            for (var i = 0; i < fromLongitudeErrors.length; i++) {
                errorstring += fromLongitudeErrors[i].getMessage() + "<br />";
            }

            Ext.ComponentQuery.query('#searchForm #searchScreenFrom')[0].addCls('error');
        }

        var toLatitudeErrors = validationObj.getByField('toLatitude');
        if (toLatitudeErrors != null && toLatitudeErrors.length > 0) {
            for (var i = 0; i < toLatitudeErrors.length; i++) {
                errorstring += toLatitudeErrors[i].getMessage() + "<br />";
            }

            Ext.ComponentQuery.query('#searchForm #searchScreenTo')[0].addCls('error');
        }

        var toLongitudeErrors = validationObj.getByField('toLongitude');
        if (toLongitudeErrors != null && toLongitudeErrors.length > 0) {
            for (var i = 0; i < toLongitudeErrors.length; i++) {
                errorstring += toLongitudeErrors[i].getMessage() + "<br />";
            }

            Ext.ComponentQuery.query('#searchForm #searchScreenTo')[0].addCls('error');
        }

        var journeyErrors = validationObj.getByField('journeyDate');

        if (journeyErrors != null && journeyErrors.length > 0) {
            for (var i = 0; i < journeyErrors.length; i++) {
                errorstring += journeyErrors[i].getMessage() + "<br />";
            }

            Ext.ComponentQuery.query('#searchForm #searchScreenDate')[0].addCls('error');
            Ext.ComponentQuery.query('#searchForm #searchScreenTime')[0].addCls('error');
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

    launch: function(app) {

    },

    onRequestButtonTap: function(item) { //TODO for testing
        console.dir(item.getRecord());
        var searchDataView= this.getSearchDataView();
        console.debug(searchDataView);
        console.debug(searchDataView.getIsDummy());
        var record = item.getRecord();

        var recordData=record.get("matchedJourney");
        //TODO need to verify
        var currentJourney=LoginHelper.getJourney();
        var myJourneyId=currentJourney.id;
        var matchedJourneyId=recordData.id;
        // var requestPanel = Ext.create('Racloop.view.RequestJourneyPanel', {
        //     title: 'Driver Information',
        //   });
        // requestPanel.setMyJourneyId(currentJourney.id);
        // requestPanel.setMatchedJourneyId(recordData.id);
        // requestPanel.setIsDummy(searchDataView.getIsDummy());
        // var requestPhoto="";
        // if(recordData.photoUrl!=null){
        //     requestPhoto=recordData.photoUrl;
        // }else {
        //     requestPhoto='<img style="height: 100px; width: 100px; margin-right:10px;" src="http://www.gravatar.com/avatar/00000000000000000000000000000000" />';
        // }

        // requestPanel.down("#requestJourneyInfo").down("#requestPhoto").setHtml(requestPhoto);
        // requestPanel.down("#requestJourneyInfo").down("#requestData").setHtml('<h1>'+recordData.name+'</h1><ul>'+
        //     '<li><b>From:</b> '+recordData.fromPlace+'</li>'+
        //     '<li><b>To:</b>   '+recordData.toPlace+'</li>'+
        //     '<li><b>Date:</b> '+Ext.Date.format(new Date(recordData.dateOfJourney), 'd/m/Y g:i A')+'</li>'+
        //     '</ul>');
        // searchFrm.up().push(requestPanel);


        var searchNavView = this.getSearchNavigationView();
        var me=this;
        // var myJourneyId=button.up().up().getMyJourneyId();
        var isDummy=searchDataView.getIsDummy();
        var successCallback = function(response, ops) {
            var data = Ext.decode(response.responseText);
            console.log('Request success during launch : ' + response.responseText);
            if (data.success) {
               // Ext.Msg.alert("Request Successful " + data.message);
                // searchFrm.up().pop();

                 LoginHelper.setJourney(data.data);
                 currentJourney=data.data;
                 setTimeout(function(){
                    me.CallSearchAjax(currentJourney,function(){
                        searchNavView.pop(1);
                        Ext.getStore('journeyStore').load();
                        Ext.Viewport.unmask();
                    });
                 }, 1000);

               // Ext.Viewport.unmask();
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
    onCancelButtonTap: function(item) { //TODO for testing
        var searchNavView = this.getSearchNavigationView();
        var currentJourney=LoginHelper.getJourney();
        var record = item.getRecord();
        var me=this;
        var workflowId=record.get("workflow").id;
        var successCallback = function(response, ops) {
            var data = Ext.decode(response.responseText);
            console.log('Cancel Request success during launch : ' + response.responseText);
            if (data.success) {

                setTimeout(function(){
                    me.CallSearchAjax(currentJourney,function(){
                        searchNavView.pop();
                        Ext.getStore('journeyStore').load();
                        Ext.Viewport.unmask();
                    });
                 }, 1000);
                // Ext.Viewport.unmask();
            } else {
                Ext.Msg.alert("Cancel Request Failure", data.message);
                Ext.Viewport.unmask();
            }
        };
        // Failure
        var failureCallback = function(response, ops) {
            Ext.Msg.alert("Cancel Request Failure", response.message);
            Ext.Viewport.unmask();

        };

        Ext.Viewport.mask({
            xtype: 'loadmask',
            indicator: true,
            message: 'Sending Request...'
        });
        Ext.Ajax.request({
            url: Config.url.RACLOOP_CANCELREQUEST,
            withCredentials: true,
            useDefaultXhrHeader: false,
            headers: {
                'Content-Type': 'application/json'
            },
            params: Ext.JSON.encode({
                workflowId: workflowId
            }),
            //params: values, //TODO need to uncomment it
            success: successCallback,
            failure: failureCallback
        });



    },
    // "user":"admin","name":"Administrator","myJourneyId":"89","matchedJourneyId":"12de4899-74af-451a-a5ad-f3a8bfd1f678","isDummy":true}
    onSendRequestButton: function(button){
        var searchNavView = this.getSearchNavigationView();
        var currentJourney;
        var me=this;
        // var myJourneyId=button.up().up().getMyJourneyId();
        console.debug(button.up().up());
        var matchedJourneyId=button.up().up().getMatchedJourneyId();
        var isDummy=button.up().up().getIsDummy();
        var successCallback = function(response, ops) {
            var data = Ext.decode(response.responseText);
            console.log('Request success during launch : ' + response.responseText);
            if (data.success) {
                // Ext.Msg.alert("Request Successful " + data.message);
                // searchFrm.up().pop();

                LoginHelper.setJourney(data.data);
                currentJourney=data.data;
                Ext.getStore('journeyStore').load();
                setTimeout(function(){
                    me.CallSearchAjax(currentJourney,function(){
                        searchNavView.pop(2);
                        Ext.Viewport.unmask();
                    });
                }, 1000);

                // Ext.Viewport.unmask();
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
    onexistingSendRequestButtonTap: function(button){
        // alert("ok");
        var searchNavView = this.getSearchNavigationView();
        var me=this;
        var existingJourneyPanel=this.getExistingJourneyPanel();
        var selectedOption=existingJourneyPanel.down("#selectOpton").getValue();
        var currentJourney;
        var searchWithNewJourney;
        var existingJourney=existingJourneyPanel.getExistingJrny()
        var existingJourneyId=existingJourney.id;
        if (selectedOption=='existingJourney'){
            currentJourney=existingJourney;
            searchWithNewJourney=false;
        }else if (selectedOption=='newJourney'){
            currentJourney=existingJourneyPanel.getNewJrny();
            searchWithNewJourney=true
        }
        setTimeout(function(){
            me.CallExistingJourneyAjax(currentJourney,existingJourneyId,searchWithNewJourney,function(){
                Ext.Viewport.unmask();
            });
        }, 1000);
        LoginHelper.setJourney(currentJourney);
    },
    CallSearchAjax: function(currentJourney,callback){
        var searchNavView = this.getSearchNavigationView();
        var me=this;
        var successSearchCallback = function(response, ops) {
            var searchData = Ext.decode(response.responseText);
            console.log('Search success during launch : ' + response.responseText);
            if (searchData.success) {
                Ext.Msg.alert("Search Successful "+ searchData.message+" find "+searchData.total+" Records" );
                var SearchStore = Ext.getStore('SearchStore');
                SearchStore.removeAll();
                var jsonObj = searchData.data.matchedJourneys;
                for (var i in jsonObj) {
                    SearchStore.add(jsonObj[i]);
                };

                searchNavView.push({
                    title: 'Results',
                    xtype: 'UserSearchList'
                });

                if (typeof callback === "function") {
                    callback();
                }
            } else {
                Ext.Msg.alert("Search Failure", searchData.message);
                if (typeof callback === "function") {
                    callback();
                }
            }
        };


        // Failure
        var failureSearchCallback = function(response, ops) {
            Ext.Msg.alert("Search Failure", response.message);
            if (typeof callback === "function") {
                callback();
            }
        };

        if (currentJourney.dateOfJourneyString== null && currentJourney.dateOfJourney!=null) {
            var datetimeString = Ext.Date.format(new Date(currentJourney.dateOfJourney),'d F Y    g:i A');
            currentJourney.dateOfJourneyString=datetimeString;
            console.log(datetimeString);
        }


        Ext.Ajax.request({
            url: Config.url.RACLOOP_SEARCH,
            withCredentials: true,
            useDefaultXhrHeader: false,
            headers: {
                'Content-Type': 'application/json'
            },
            params: Ext.JSON.encode({
                id: currentJourney.id,
                dateOfJourneyString: currentJourney.dateOfJourneyString,
                fromPlace: currentJourney.fromPlace,
                fromLatitude: currentJourney.fromLatitude,
                fromLongitude: currentJourney.fromLongitude,
                toPlace: currentJourney.toPlace,
                toLatitude: currentJourney.toLatitude,
                toLongitude: currentJourney.toLongitude,
                isDriver: currentJourney.isDriver,
                tripDistance: currentJourney.tripDistance,
                tripUnit: currentJourney.tripUnit
            }),
            success: successSearchCallback,
            failure: failureSearchCallback
        });
    },
    CallExistingJourneyAjax: function(Journey,existingJourneyId,searchWithNewJourney,callback){
        var searchNavView = this.getSearchNavigationView();
        var me=this;
        var successSearchCallback = function(response, ops) {
            var searchData = Ext.decode(response.responseText);
            console.log('Search success during launch : ' + response.responseText);
            if (searchData.success) {
                Ext.Msg.alert("Search Successful "+ searchData.message+" find "+searchData.total+" Records" );
                var SearchStore = Ext.getStore('SearchStore');
                SearchStore.removeAll();
                var jsonObj = searchData.data.matchedJourneys;
                for (var i in jsonObj) {
                    SearchStore.add(jsonObj[i]);
                };

                searchNavView.push({
                    title: 'Results',
                    xtype: 'UserSearchList'
                });

                if (typeof callback === "function") {
                    callback();
                }
            } else {
                Ext.Msg.alert("Search Failure", searchData.message);
                if (typeof callback === "function") {
                    callback();
                }
            }
        };


        // Failure
        var failureSearchCallback = function(response, ops) {
            Ext.Msg.alert("Search Failure", response.message);
            if (typeof callback === "function") {
                callback();
            }
        };

        if (searchWithNewJourney){
            console.log('with new journey');
            Ext.Ajax.request({
                url: Config.url.RACLOOP_EXISTINGJOURNEY,
                withCredentials: true,
                useDefaultXhrHeader: false,
                headers: {
                    'Content-Type': 'application/json'
                },
                params: Ext.JSON.encode({
                    dateOfJourneyString: Journey.dateOfJourneyString,
                    fromPlace: Journey.fromPlace,
                    fromLatitude: Journey.fromLatitude,
                    fromLongitude: Journey.fromLongitude,
                    toPlace: Journey.toPlace,
                    toLatitude: Journey.toLatitude,
                    toLongitude: Journey.toLongitude,
                    isDriver: Journey.isDriver,
                    tripDistance: Journey.tripDistance,
                    tripUnit: Journey.tripUnit,
                    searchWithNewJourney: 'newJourney',
                    existingJourneyId: existingJourneyId
                }),
                success: successSearchCallback,
                failure: failureSearchCallback
            });
        }else {
            console.log('with existing journey');
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
                success: successSearchCallback,
                failure: failureSearchCallback
            });
        }
    }
});