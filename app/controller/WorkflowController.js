Ext.define('Racloop.controller.WorkflowController', {
    extend: 'Ext.app.Controller',

    requires: [
        'Racloop.view.JourneyNavigationView',
        'Racloop.view.JourneyViewItem',
        //'Racloop.view.IncomingRequestList',
        //'Racloop.view.OutgoingRequestList',
        'Racloop.view.IncomingRequestViewItem',
        'Racloop.view.OutgoingRequestViewItem',
        'Racloop.model.EditProfile'
    ],

    config: {
        //another view need to be added here for edit profile
        refs: {
            journeyNavigationView: 'journeyNavigationView',
//            incomingButton: "button[action=Incoming]",
//            outgoingButton: "button[action=Outgoing]",
            acceptButton: "button[action=Accept]",
            rejectButton: "button[action=Reject]",
            cancelButton: "button[action=Cancel]"

        },
        control: {
//           incomingButton: {
//                 tap: 'onInComingButtonTap'
//            },
//            outgoingButton: {
//                 tap: 'onOutGoingButtonTap'
//            },
            acceptButton: {
                tap: 'acceptButtonTap'
            },
            rejectButton: {
                tap: 'rejectButtonTap'
            },
            cancelButton: {
                tap: 'cancelButtonTap'
            },
            'journeyViewItem': {
                searchAgainButtonTap: 'handleSearchAgainButtonTap',
                deleteJourneyButtonTap: 'handleDeleteJourneyButtonTap',
                incomingButtonTap: 'handleInComingButtonTap',
                outgoingButtonTap: 'handleOutGoingButtonTap'
            },
            'IncomingRequestItem': {
                myAcceptButtonTap: 'acceptButtonTap',
                myRejectButtonTap:  'rejectButtonTap'
            },
            'OutgoingRequestItem': {
                myCancelButtonTap: 'cancelButtonTap'
            }
        }
    },
    //called when the Application is launched, remove if not needed
    launch: function(app) {


    },
    handleSearchAgainButtonTap : function(item) {
        var record = item.getRecord();
        console.log('handleSearchAgainButtonTap clicked');
        console.debug(record);
    },
    handleDeleteJourneyButtonTap : function(item) {
        var record = item.getRecord();
        console.log('handleDeleteJourneyButtonTap clicked');
        console.debug(record);
    },
    handleInComingButtonTap: function(item) {
        var journeyNavigationView = this.getJourneyNavigationView();
        var record = item.getRecord();
        console.log('handleInComingButtonTap clicked');
        console.debug(record);
        var data = record.get("incomingRequests");
        var incomingRequest;
        if (data.length>0) {
            incomingRequest= Ext.create('Ext.DataView', {
                title: 'Incoming Requests',
                fullscreen: true,
                itemTpl: '{name}',
                data: data,
                defaultType: 'incomingRequestViewItem',
                useComponents: true
            });
            journeyNavigationView.push(incomingRequest);
        }
        else {
            Ext.Msg.alert("No data Available", "No incoming requests against this journey");
        }
    },
    handleOutGoingButtonTap: function(item) {
        var journeyNavigationView = this.getJourneyNavigationView();
        var record = item.getRecord();
        var data = record.get("outgoingRequests");
        console.log('handleOutGoingButtonTap clicked');
        console.debug(record);
        var outgoingRequest;
        if (data.length>0) {
            outgoingRequest = Ext.create('Ext.DataView', {
                title: 'My Outgoing Requests',
                fullscreen: true,
                itemTpl: '{name}',
                data: data,
                defaultType: 'outgoingRequestViewItem',
                useComponents: true
            });
            journeyNavigationView.push(outgoingRequest);
        }
        else {
            Ext.Msg.alert("No data Available", "You haven't requested any one yet against this journey");
        }
    },

    acceptButtonTap: function(item) {
        console.log('AcceptButton clicked');
        // var record = button.up().getRecord();
        // Ext.Msg.alert("Mobile No. is :-"+record.get("mobile"));
        var record = item.getRecord();
        var myJourneyId=record.get("workflow").requestJourneyId;
        var workflowId=record.get("workflow").id;
        var journeyList = this.getJourneyList();
        // var textCmp=button.up().down('textCmp').element.domquerySelectorAll('.card-main');
        // textCmp.innerHTML="";
        
        var successCallback = function(response, ops) {
            var data = Ext.decode(response.responseText);
            console.log('Request success during launch : ' + response.responseText);
            if (data.success) {
                Ext.Msg.alert("Request Successful " + data.message);
                Ext.getStore('journeyStore').load();
                journeyList.pop();
                // button.up().down("#statusCmp").setHtml('<div class="name"><b>Status</b></div><div class="name">Accepted</div><div class="name">'+mobile+'</div>');
                // button.up().down('button[action="Accept"]').hide();
                // button.up().down('button[action="Reject"]').show();

                Ext.Viewport.unmask();
            } else {
                Ext.Msg.alert("Request Failure", data.message);
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
                    myJourneyId: myJourneyId,
                    workflowId: workflowId                    
                }),
                //params: values, //TODO need to uncomment it
                success: successCallback,
                failure: failureCallback
            });
        


    },

    rejectButtonTap: function(item) {
        console.log('RejectButton clicked');
        var record = item.getRecord();
        var myJourneyId=record.get("workflow").requestJourneyId;
        var workflowId=record.get("workflow").id;
        var journeyList = this.getJourneyList();
        var successCallback = function(response, ops) {
            var data = Ext.decode(response.responseText);
            console.log('Request success during launch : ' + response.responseText);
            if (data.success) {
                Ext.Msg.alert("Request Successful " + data.message);
                Ext.getStore('journeyStore').load();
                journeyList.pop();
                // button.up().down("#statusCmp").setHtml('<div class="name"><b>Status</b></div><div class="name">Rejected</div>');
                // button.up().down('button[action="Accept"]').show();
                // button.up().down('button[action="Reject"]').hide();
                Ext.Viewport.unmask();
            } else {
                Ext.Msg.alert("Request Failure", data.message);
                Ext.Viewport.unmask();
            }
        };
        
        // Failure
        var failureCallback = function(response, ops) {
            Ext.Msg.alert("Request Reject Failure", response.message);
            Ext.Viewport.unmask();

        };

        Ext.Viewport.mask({
            xtype: 'loadmask',
            indicator: true,
            message: 'Sending Request...'
        });
        if (Racloop.util.Config.debug) {
            successCallbackDebug();
        } else {
            Ext.Ajax.request({
                url: Config.url.RACLOOP_REJECTREQUEST,
                withCredentials: true,
                useDefaultXhrHeader: false,
                headers: {
                    'Content-Type': 'application/json'
                },
                params: Ext.JSON.encode({
                    myJourneyId: myJourneyId,
                    workflowId: workflowId                    
                }),
                //params: values, //TODO need to uncomment it
                success: successCallback,
                failure: failureCallback
            });
        }



    },

    cancelButtonTap: function(item) {
        console.log('CancelButton clicked');
        // console.log("request");
        var record = item.getRecord();
        var workflowId=record.get("workflow").id;
        var journeyList = this.getJourneyList();
        // Ext.Msg.alert(record.get('name'));
        var successCallback = function(response, ops) {
            var data = Ext.decode(response.responseText);
            console.log('Request success during launch : ' + response.responseText);
            if (data.success) {
                Ext.Msg.alert("Request Successful " + data.message);
                Ext.getStore('journeyStore').load();
                journeyList.pop();
                // button.up().down("#statusCmp").setHtml('<div class="name"><b>Status</b></div><div class="name">Cancelled By Requester</div>');
                //  button.up().down('button[action="Cancel"]').hide();
                Ext.Viewport.unmask();
            } else {
                Ext.Msg.alert("Request Failure", data.message);
                Ext.Viewport.unmask();
            }
        };
        
        // Failure
        var failureCallback = function(response, ops) {
            Ext.Msg.alert("Request Cancellation Failure", response.message);
            Ext.Viewport.unmask();

        };

        Ext.Viewport.mask({
            xtype: 'loadmask',
            indicator: true,
            message: 'Sending Request...'
        });
        if (Racloop.util.Config.debug) {
            successCallbackDebug();
        } else {
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
        }
    }
});