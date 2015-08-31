Ext.define('Racloop.controller.WorkflowController', {
    extend: 'Ext.app.Controller',

    requires: [
        'Racloop.view.JourneyNavigationView',
        'Racloop.view.JourneyViewItem',
        'Racloop.util.LoginHelper',
        'Racloop.model.EditProfile'
    ],

    config: {
        //another view need to be added here for edit profile
        refs: {
            mainTabs: 'mainTabs',
            searchNavigationView : 'searchNavigationView',
            saveJourneyButtonInSearchResults : 'searchResultsView #saveJourneyButton',
            journeyNavigationView: 'journeyNavigationView'

        },
        control: {
            'journeyViewItem': {
                searchAgainButtonTap: 'handleSearchAgainButtonTap',
                deleteJourneyButtonTap: 'handleDeleteJourneyButtonTap',
                viewJourneyOnMapButtonTap: 'handleViewJourneyOnMapButtonTap',
                travelBuddiesButtonTap : 'handleTravelBuddiesButtonTap',
                detailsButtonTap : 'handleDetailsInMyJourneyButtonTap',
                chatButtonTap : 'handleChatButtonTap'
            },
            'relatedRequestViewItem': {
                rejectButtonTap: 'handleRejectButtonTap',
                acceptButtonTap: 'handleAcceptButtonTap',
                cancelButtonTap : 'handleCancelButtonTap',
                callButtonTap: 'handleCallButtonTap',
                bookButtonTap: 'handleBookButtonTap'
            },
            'searchResultViewItem': {
                requestButtonTap: 'handleRequestButtonTap',
                travelBuddiesReadOnlyButtonTap: 'travelBuddiesReadOnlyButtonTap',
                detailsButtonTap: 'handleDetailsInSearchButtonTap',
                rejectButtonTap: 'handleRejectButtonTap',
                acceptButtonTap: 'handleAcceptButtonTap',
                cancelButtonTap : 'handleCancelButtonTap',
                callButtonTap: 'handleCallButtonTap',
                inviteAgainButtonTap: 'handleInviteAgainButtonTap'
            }
        }
    },

    //called when the Application is launched, remove if not needed
    launch: function(app) {


    },

    handleSearchAgainButtonTap : function(item) { //TODO UNCOMMENT BELOW
        var me = this;
        var journeyNavigationView = this.getJourneyNavigationView();
        var record = item.getRecord();
        var journeyId = record.get("id");
        var successCallback = function(response, ops) {
            var data = Ext.decode(response.responseText);
            if (data.success) {
                if(data.total > 0) {
                    var searchStore = Ext.getStore('SearchStore');
                    searchStore.removeAll();
                    var jsonObj = data.data.journeys;
                    var disableMoreRequests = data.data.disableMoreRequests;
                    for (var i in jsonObj) {
                        if(disableMoreRequests) jsonObj[i].disableRequest = true;
                        else jsonObj[i].disableRequest = false;
                        searchStore.add(jsonObj[i]);
                    };
                    //journeyNavigationView.push({
                    //    title: 'Search Results',
                    //    xtype: 'searchResultsDataView'
                    //});
                    me.getMainTabs().setActiveItem(me.getSearchNavigationView());
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
                        searchResultsView.down('#saveJourneyButton').setHidden(true);
                        searchResultsView.down('#loginButtonInSearchResults').setHidden(true);
                        //me.getSaveJourneyButtonInSearchResults().setHidden(true);
                        /*if(disableMoreRequests) {
                            Ext.toast({message: "You cannot send more than two invites for same journey", timeout: Racloop.util.Config.toastTimeout, animation: true, cls: 'toastClass'});
                        }*/
                    }
                }
                else {
                    Ext.Msg.alert('Search Results', 'No Results Found');
                }
                Ext.Viewport.unmask();
            } else {
                Ext.Viewport.unmask();
                Ext.Msg.alert('Login Error', data.message);
            }
        };
        var failureCallback = function(response, ops) {
            Ext.Viewport.unmask();
            Ext.Msg.alert("Network Error", response.code);
        };

        Ext.Viewport.mask({
            xtype: 'loadmask',
            indicator: true,
            message: 'Searching...'
        });

        Ext.Ajax.request({
            url: Config.url.RACLOOP_SEARCH_AGAIN,
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
            useDefaultXhrHeader: false,
            params: Ext.JSON.encode({
                journeyId: journeyId
            }),
            success: successCallback,
            failure: failureCallback
        });
        //Racloop.app.getController('JourneysController').handleSearchAgainMyJourneyButtonTap(item);

    },

    handleDeleteJourneyButtonTap : function(item) {
        var record = item.getRecord();
        var journeyId = record.get("id");
        var me = this;
        var successCallback = function(response, ops) {
            var data = Ext.decode(response.responseText);
            if (data.success) {
                me.getMainTabs().setActiveItem('journeyNavigationView');
                Ext.getStore('journeyStore').load({
                    callback: function(records, operation, success) {
                        Racloop.app.getController('UiController').showMyJourneys();
                        Ext.Viewport.unmask();
                        Ext.toast({message: "Successfully deleted your journey", timeout: Config.toastTimeout, animation: true, cls: 'toastClass'});
                    },
                    scope: this
                });
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
            message: 'Deleting...'
        });
        Ext.Ajax.request({
            url: Racloop.util.Config.url.RACLOOP_DELETE_JOURNEY,
            method: 'post',
            withCredentials: true,
            useDefaultXhrHeader: false,
            params: Ext.JSON.encode({
                journeyId : journeyId
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            success: successCallback,
            failure: failureCallback
        });
    },

    handleViewJourneyOnMapButtonTap : function(item) {
        var record = item.getRecord();
        var journeyId = record.get("id");
        var fromLatitude = record.get("fromLatitude");
        var fromLongitude = record.get("fromLongitude");
        var toLatitude = record.get("toLatitude");
        var toLongitude = record.get("toLongitude");
        var currentJourney = {
            journeyId : journeyId,
            fromLatitude : fromLatitude,
            fromLongitude : fromLongitude,
            toLatitude : toLatitude,
            toLongitude : toLongitude
        };
        LoginHelper.setCurrentJourney(currentJourney);
        this.getMainTabs().setActiveItem('mapPanel');
        Racloop.app.getController('MapController').showCurrentJourney(true);
    },

    handleTravelBuddiesButtonTap : function(item) {
        var journeyNavigationView = this.getJourneyNavigationView();
        if (journeyNavigationView.getActiveItem().xtype != "dataview") {
            var record = item.getRecord();
            var journeyId = record.get("id");
            var numberOfCopassengers = record.get("numberOfCopassengers");
            console.log(journeyId + " : " + numberOfCopassengers);

            Ext.getStore('childJourneyStore').load({
                params:{
                    journeyId :journeyId
                },
                callback: function(records, operation, success) {
                    if(records.length > 0) {
                        journeyNavigationView.push({
                            title: 'My Requests',
                            xtype : "dataview",
                            defaultType: 'relatedRequestViewItem',
                            useComponents: true,
                            scrollable: {
                                direction: 'vertical'
                            },
                            store: "childJourneyStore"
                        });
                    }
                    else {
                        Ext.Msg.alert("No data Available", "No requests against this journey");
                    }
                },
                scope: this
            });
        }
    },

    handleDetailsInMyJourneyButtonTap : function(item) {
        if (typeof item.up('navigationview') == 'undefined' || item.up('navigationview').getActiveItem().xtype != "journeyDetailsPanel") {
            this.detailsButtonTap(item, true);
        }
    },

    handleDetailsInSearchButtonTap : function(item) {
        if (typeof item.up('navigationview') == 'undefined' || item.up('navigationview').getActiveItem().xtype != "journeyDetailsPanel") {
            this.detailsButtonTap(item, false);
        }
    },

    detailsButtonTap : function(item, isMyJourney) {
        var journeyNavigationView = this.getJourneyNavigationView();
        var searchNavigationView = this.getSearchNavigationView();
        var comp = searchNavigationView.down('#searchResultsDataViewInner');
        var isDummy = false
        if(!isMyJourney) isDummy = comp.isDummy;
        var record = item.getRecord();
        var journeyId = record.get("id");
        var journeyDetailsPanel = null;
        var successCallback = function(response, ops) {
            var data = Ext.decode(response.responseText);
            if (data.success) {
                   journeyDetailsPanel = Ext.create('Racloop.view.JourneyDetailsPanel',{
                            itemId: 'journeyDetailsPanel',
                            xtype: "journeyDetailsPanel",
                            title: "Suggested Route",
                            scrollable : true
                    });
                if(isMyJourney) {                   
                    journeyNavigationView.push(journeyDetailsPanel);
                }
                else {             
                        searchNavigationView.push(journeyDetailsPanel);                  
                }
                var JourneyDetailsText = journeyDetailsPanel.down('#JourneyDetailsText');
                JourneyDetailsText.setHtml(data.message);
                Ext.Viewport.unmask();
            } else {
                Ext.Msg.alert("Network Failure", data.message);
                Ext.Viewport.unmask();
            }
        };
        // Failure
        var failureCallback = function(response, ops) {
            Ext.Msg.alert("Network Failure", response.message);
            Ext.Viewport.unmask();
        };
        Ext.Viewport.mask({
            xtype: 'loadmask',
            indicator: true,
            message: 'Getting Details...'
        });
        Ext.Ajax.request({
            url: Racloop.util.Config.url.RACLOOP_JOURNEY_DETAILS + "?" + Ext.urlEncode({
                journeyId : journeyId,
                isMyJourney : isMyJourney,
                isDummy : isDummy
            }),
            method: 'GET',
            withCredentials: true,
            useDefaultXhrHeader: false,
            success: successCallback,
            failure: failureCallback
        });
    },

    travelBuddiesReadOnlyButtonTap : function(item) {
        var journeyNavigationView = this.getJourneyNavigationView();
        var searchNavigationView = this.getSearchNavigationView();
        var record = item.getRecord();
        var journeyId = record.get("id");
        var numberOfCopassengers = record.get("numberOfCopassengers");
        console.log(journeyId + " : " + numberOfCopassengers);

        Ext.getStore('passengersStore').load({
            params:{
                journeyId :journeyId
            },
            callback: function(records, operation, success) {
                if(records.length > 0) {
                    searchNavigationView.push({
                        title: 'Travel Buddies',
                        xtype : "dataview",
                        defaultType: 'relatedRequestViewReadOnlyItem',
                        useComponents: true,
                        scrollable: {
                            direction: 'vertical'
                        },
                        store: "passengersStore"
                    });
                }
                else {
                    Ext.Msg.alert("No data Available", "No incoming requests against this journey");
                }
            },
            scope: this
        });
    },

    handleRequestButtonTap: function(item) {
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

    handleInviteAgainButtonTap: function(item) {
        var me = this;
        var record = item.getRecord();
        var recordData = record.get("matchedJourney");
        var journeyId = record.get("id");//recordData.id;
        var pairId = record.get("myPairId");//recordData.id;
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
            url: Config.url.RACLOOP_REQUEST_AGAIN,
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
            useDefaultXhrHeader: false,
            params: Ext.JSON.encode({
                otherJourneyId: journeyId,
                isDummy: isDummy,
                pairId:pairId
                
            }),
            success: successCallback,
            failure: failureCallback
        });
    },

    handleAcceptButtonTap : function(item) {
        console.log('AcceptButton clicked');
        var record = item.getRecord();
        var journeyId = record.get("id");
        var journeyPairId = record.get("myPairId");

        var dataGrid = item.up().up();

        var successCallback = function(response, ops) {
            var data = Ext.decode(response.responseText);
            if (data.success) {
                Ext.getStore('childJourneyStore').load({
                    params:{
                        journeyId :data.data
                    },
                    callback: function(records, operation, success) {
                        dataGrid.refresh();
                        Ext.toast({message: "Request is Accepted", timeout: Config.toastTimeout, animation: true, cls: 'toastClass'});
                    },
                    scope: this
                });
                Ext.Viewport.unmask();
            } else {
                Ext.Msg.alert("Unable to Accept", data.message);
                Ext.Viewport.unmask();
            }
        };

        // Failure
        var failureCallback = function(response, ops) {
            Ext.Msg.alert("Request Accept Failure", response.message);
            Ext.Viewport.unmask();

        };

        Ext.Viewport.mask({
            xtype: 'loadmask',
            indicator: true,
            message: 'Sending Request...'
        });
       
        Ext.Ajax.request({
            url: Config.url.RACLOOP_ACCEPTREQUEST,
            withCredentials: true,
            useDefaultXhrHeader: false,
            headers: {
                'Content-Type': 'application/json'
            },
            params: Ext.JSON.encode({
                journeyPairId : journeyPairId
            }),
            success: successCallback,
            failure: failureCallback
        });

    },

    handleRejectButtonTap: function(item) {
        console.log('AcceptButton clicked');
        var record = item.getRecord();
        var journeyId = record.get("id");
        var journeyPairId = record.get("myPairId");

        var dataGrid = item.up().up();

        var successCallback = function(response, ops) {
            var data = Ext.decode(response.responseText);
            if (data.success) {
                Ext.getStore('childJourneyStore').load({
                    params:{
                        journeyId :data.data
                    },
                    callback: function(records, operation, success) {
                        dataGrid.refresh();
                        Ext.toast({message: "Request is Rejected", timeout: Config.toastTimeout, animation: true, cls: 'toastClass'});
                    },
                    scope: this
                });
                Ext.Viewport.unmask();
            } else {
                Ext.Msg.alert("Unable to Reject", data.message);
                Ext.Viewport.unmask();
            }
        };
        
        // Failure
        var failureCallback = function(response, ops) {
            Ext.Msg.alert("Request Reject Failure", response.message);
            Ext.Viewport.unmask();

        };

        var yesNoHandler = function(yesNo) {
            if(yesNo === "yes") {
                Ext.Viewport.mask({
                    xtype: 'loadmask',
                    indicator: true,
                    message: 'Cancelling Request...'
                });
                Ext.Ajax.request({
                    url: Config.url.RACLOOP_REJECTREQUEST,
                    withCredentials: true,
                    useDefaultXhrHeader: false,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: Ext.JSON.encode({
                        journeyPairId: journeyPairId
                    }),
                    success: successCallback,
                    failure: failureCallback
                });
            }
        }
        Ext.Msg.confirm("Confirmation", "Are you sure you want to Reject?", yesNoHandler);
    },

    handleCancelButtonTap: function(item) {
        console.log('CancelButton clicked');
        var record = item.getRecord();
        var journeyId = record.get("id");
        var journeyPairId = record.get("myPairId");

        var dataGrid = item.up().up();

        var successCallback = function(response, ops) {
            var data = Ext.decode(response.responseText);
            if (data.success) {
                Ext.getStore('childJourneyStore').load({
                    params:{
                        journeyId :data.data
                    },
                    callback: function(records, operation, success) {
                        dataGrid.refresh();
                        Ext.toast({message: "Request Cancelled", timeout: Config.toastTimeout, animation: true, cls: 'toastClass'});
                    },
                    scope: this
                });
                Ext.Viewport.unmask();
            } else {
                Ext.Msg.alert("Unable to Cancel", data.message);
                Ext.Viewport.unmask();
            }
        };

        var failureCallback = function(response, ops) {
            Ext.Msg.alert("Cancel request Failure", response.message);
            Ext.Viewport.unmask();

        };

        var yesNoHandler = function(yesNo) {
            if(yesNo === "yes") {
                Ext.Viewport.mask({
                    xtype: 'loadmask',
                    indicator: true,
                    message: 'Cancelling Request...'
                });
                Ext.Ajax.request({
                    url: Config.url.RACLOOP_CANCELREQUEST,
                    withCredentials: true,
                    useDefaultXhrHeader: false,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: Ext.JSON.encode({
                        journeyPairId: journeyPairId,
                        journeyId: journeyId
                    }),
                    success: successCallback,
                    failure: failureCallback
                });
            }
        }
        Ext.Msg.confirm("Confirmation", "Are you sure you want to cancel your request?", yesNoHandler);
    },

    handleCallButtonTap : function(item) {
        var record = item.getRecord();
        var mobile = record.get("mobile");
        console.log(mobile);
        window.location = 'tel:'+mobile;
    },

    handleBookButtonTap : function(item) {
        var random = Math.floor((Math.random() * 10) + 1);
        var url = "https://www.olacabs.com/";
        //if(random < 4) {
        //    url = "https://www.olacabs.com/";
        //}
        //else if(random > 7) {
        //    url = "https://www.uber.com/";
        //}
        //else if(random == 3) {
        //    url = "http://www.taxiforsure.com/";
        //}

        window.open(url, '_system', 'location=yes');
    },

    handleChatButtonTap : function(item) {
        Ext.Msg.alert("Chat", "still not implemented");
    }
});