Ext.define('Racloop.view.SearchResultViewItem', {
    extend: 'Ext.dataview.component.DataItem',
    alias: 'widget.searchResultViewItem',
    xtype: 'searchResultViewItem',

    config: {
        padding: 10,
        layout: {
            type: 'hbox'
        },
        align: 'center',
        pack: 'center',
        cls: 'journeyItem',
        items: [
            {
                xtype: 'component',
                flex: 2,
                html: 'name',
                itemId: 'textCmp',
                itemCls: 'dataItem'
            }
        ]
    },

    updateRecord: function (record) {
        // Provide an implementation to update this container's child items
        var recordData = "";
        var me = this;
        var html = '';
        var drivingText = '';
        if (record != null) {
            var disableRequest = record.get("disableRequest");
            //recordData = record.get("data");
            var dateOfJourney = new Date(record.get("dateOfJourney"));
            //var dateOfJourney = Ext.Date.add(dateUnadjusted, Ext.Date.MINUTE, dateUnadjusted.getTimezoneOffset());
            var dateString = Ext.Date.format(dateOfJourney, 'j M, Y, g:i a');
            var myStatus = record.get("myStatus");
            var legend = "";
            var legendText = "";
            var buttonMarkup = "";
            var labelHtml = "";
            var imgSrc = '';
            var cardControl = '';
            var statusMarkup = '';
            var numberOfCopassengers = record.get("numberOfCopassengers");
            var name = null;
            if(numberOfCopassengers>0 &&  (myStatus === "" || myStatus == null)) {
                name = record.get("name") + ' & ' + numberOfCopassengers +' more';
                buttonMarkup = "<button  class='racloop-btn racloop-btn-primary racloop-btn-sm travelBuddiesButton'>Passengers</button> ";
            }
            else {
                name = record.get("name");
            }
            
            //if(myStatus != null) {
            //    statusMarkup = '<span class="card-label card-label-gray">' + myStatus + '</span>';
            //}
            //else {
            //    statusMarkup = '<span class="card-label card-label-gray">New</span>';
            //}
            if(record.get("femaleOnlySearch")) {
                statusMarkup = '<span class="card-label card-label-pink">Pink Ride</span>';
            }
            console.log('record.get("femaleOnlySearch") : ' +  record.get("femaleOnlySearch"))
            //var buttonMarkup = '<button  class="racloop-btn racloop-btn-danger rejectButton"><span class="deleteCls"></span> Reject </button>  ' +
            //    '<button  class="racloop-btn racloop-btn-danger cancelButton"><span class="deleteCls"></span> Cancel </button>  '+
            //    '<button  class="racloop-btn racloop-btn-info acceptButton"><span class="acceptCls"></span> Accept </button>  '+
            //    '<button  class="racloop-btn racloop-btn-success callButton"><span class="mobileCls"></span> Call </button>';
            if (record.get("isTaxi")) {
                legend = "T";
                legendText = "Taxi";
                if(myStatus == null) {
                    if(disableRequest) {
                        buttonMarkup = "";
                    }
                    else {
                        if(record.get("hideButtons")) {
                            buttonMarkup = "";
                        }
                        else {
                            if(numberOfCopassengers>0) {
                                buttonMarkup = buttonMarkup + '<button class="racloop-btn racloop-btn-primary racloop-btn-sm confirmButtonDisabled" disabled="disabled">Connect</button> ';
                                
                            }
                            else {
                                buttonMarkup = buttonMarkup + '<button class="racloop-btn racloop-btn-primary racloop-btn-sm confirmButton">Connect</button> ' +
                                ' <button class="racloop-btn racloop-btn-primary racloop-btn-sm detailsButton">Route</button>';
                            }
                        }
                    }
                    statusMarkup = statusMarkup + ' <span class="card-label card-label-blue">New</span>';

                }
                else if(myStatus === "Requested") {
                    buttonMarkup = buttonMarkup + '<button  class="racloop-btn racloop-btn-danger racloop-btn-sm cancelButton">Cancel</button>';
                    statusMarkup = statusMarkup + ' <span class="card-label card-label-blue">' + myStatus +'</span>';
                }
                else if(myStatus === "Request Received") {
                    buttonMarkup = buttonMarkup + '<button  class="racloop-btn racloop-btn-danger racloop-btn-sm rejectButton">Reject</button>  '+
                    '<button  class="racloop-btn racloop-btn-success racloop-btn-sm acceptButton">Accept </button>  ';
                    statusMarkup = statusMarkup + ' <span class="card-label card-label-blue">' + myStatus +'</span>';
                }
                else if(myStatus.lastIndexOf("Cancelled", 0)===0) {
                    buttonMarkup = '<button class="racloop-btn racloop-btn-danger racloop-btn-sm disabled">Cancelled</</button>';
                    statusMarkup = statusMarkup + ' <span class="card-label card-label-red">' + myStatus +'</span>';
                }
                else if(myStatus === "Accepted") {
                    buttonMarkup = buttonMarkup + '<button  class="racloop-btn racloop-btn-danger racloop-btn-sm cancelButton">Cancel</button>  '+
                    '<button  class="racloop-btn racloop-btn-success racloop-btn-sm callButton">Call </button>'+
                    ' <button  class="racloop-btn racloop-btn-warning racloop-btn-sm bookButton">Cab Help </button>';
                    statusMarkup = statusMarkup + ' <span class="card-label card-label-blue">' + myStatus +'</span>';
                }
                else if(myStatus === "Available") {
                    if(disableRequest) {
                        buttonMarkup = "";
                        statusMarkup = statusMarkup + ' <span class="card-label card-label-blue">' + myStatus +'</span>';
                    }
                    else {
                        buttonMarkup = buttonMarkup + '<button class="racloop-btn racloop-btn-primary racloop-btn-sm inviteAgainButton">Connect Again</button> ' +
                            ' <button class="racloop-btn racloop-btn-primary racloop-btn-sm detailsButton">Route</button>';
                        statusMarkup = statusMarkup + ' <span class="card-label card-label-blue">' + myStatus +'</span>';
                    }
                    
                }
                else if(myStatus === "Rejected") {
                    buttonMarkup = buttonMarkup + '<button class="racloop-btn racloop-btn-primary racloop-btn-sm confirmSearchRequestButton">Rejected</button>';
                    statusMarkup = statusMarkup + ' <span class="card-label card-label-red">' + myStatus +'</span>';
                } else {
                    buttonMarkup = '';
                }
            }
            else {
                legend = "A";
                legendText = "Auto";
                if(myStatus == null) {
                    if (disableRequest) {
                        buttonMarkup = "";
                    }
                    else {
                        if(record.get("hideButtons")) {
                            buttonMarkup = "";
                        }
                        else {
                            if(numberOfCopassengers>0) {
                                buttonMarkup = buttonMarkup + '<button class="racloop-btn racloop-btn-primary racloop-btn-sm confirmButtonDisabled" disabled="disabled">Connect</button> ';
                                
                            }
                            else {
                                buttonMarkup = buttonMarkup + '<button class="racloop-btn racloop-btn-primary racloop-btn-sm confirmButton">Connect</button> ' +
                                ' <button class="racloop-btn racloop-btn-primary racloop-btn-sm detailsButton">Route</button>';
                            }
                        }
                    }
                    statusMarkup = statusMarkup + ' <span class="card-label card-label-blue">New</span>';
                }
                else if(myStatus === "Requested") {
                    buttonMarkup = buttonMarkup + '<button  class="racloop-btn racloop-btn-danger racloop-btn-sm cancelButton">Cancel</button>';
                    statusMarkup = statusMarkup + ' <span class="card-label card-label-blue">' + myStatus +'</span>';
                }
                else if(myStatus === "Request Received") {
                    buttonMarkup = buttonMarkup + '<button  class="racloop-btn racloop-btn-danger racloop-btn-sm rejectButton">Reject</button>  '+
                    '<button  class="racloop-btn racloop-btn-success racloop-btn-sm acceptButton">Accept </button>  ';
                    statusMarkup = statusMarkup + ' <span class="card-label card-label-blue">' + myStatus +'</span>';
                }
                else if(myStatus.lastIndexOf("Cancelled", 0)===0) {
                    buttonMarkup = '<button class="racloop-btn racloop-btn-danger racloop-btn-sm confirmSearchRequestButton disabled">Cancelled</</button>';
                    statusMarkup = statusMarkup + ' <span class="card-label card-label-red">' + myStatus +'</span>';
                }

                else if(myStatus === "Accepted") {
                    buttonMarkup = buttonMarkup + '<button  class="racloop-btn racloop-btn-danger racloop-btn-sm cancelButton">Cancel</button>  '+
                    '<button  class="racloop-btn racloop-btn-success racloop-btn-sm callButton">Call </button>'+
                    ' <button  class="racloop-btn racloop-btn-warning racloop-btn-sm bookButton">Radio Cab</button>';
                    statusMarkup = statusMarkup + ' <span class="card-label card-label-blue">' + myStatus +'</span>';
                }
                else if(myStatus === "Available") {
                    if(disableRequest) {
                        buttonMarkup = "";
                        statusMarkup = statusMarkup + ' <span class="card-label card-label-blue">' + myStatus +'</span>';
                    }
                    else {
                        buttonMarkup = buttonMarkup + '<button class="racloop-btn racloop-btn-primary racloop-btn-sm inviteAgainButton">Connect Again</button> ' +
                            ' <button class="racloop-btn racloop-btn-primary racloop-btn-sm detailsButton">Route</button>';
                    }
                    statusMarkup = statusMarkup + ' <span class="card-label card-label-blue">' + myStatus +'</span>';
                    
                }
                else if(myStatus === "Rejected") {
                    buttonMarkup = buttonMarkup + '<button class="racloop-btn racloop-btn-primary racloop-btn-sm confirmSearchRequestButton">Rejected</button>';
                    statusMarkup = statusMarkup + ' <span class="card-label card-label-red">' + myStatus +'</span>';
                } else {
                    buttonMarkup = buttonMarkup + '<button class="racloop-btn racloop-btn-primary racloop-btn-sm confirmSearchRequestButton disabled">'+ myStatus +'</button>';
                }
            }
            cardControl = labelHtml + '<div><span class="card-control">' + buttonMarkup + '</span></div>';
            if (record.get("photoUrl") != null) {
                imgSrc = record.get("photoUrl");
            }
            else {
                imgSrc = "http://www.gravatar.com/avatar/00000000000000000000000000000000?v=2&s=128&d=mm";
            }
            html = '<div class="card">\
                        <div class="card-info">\
                            <div class="image">\
                                <img src="' + imgSrc + '" alt="profile image" style="width:60px;"> </img>\
                            </div>\
                            <div class="card-date">\
                                <div class="card-day">' + legend + '</div>\
                                <div class="card-month">' + legendText + '</div>\
                            </div>\
                            <div class="card-main">\
                                <div class="card-name">\
                                    <h3>' + name + '</h3>\
                                </div>\
                                <div>\
                                    <span class="card-time"> <span class="calendarCls"></span>  ' + dateString + '</span>  \
                                </div>\
                                <div>\
                                    <span class="card-time"> ' + statusMarkup + '\
                                </div>\
                                <div>\
                                </div>\
                            </div>\
                        </div>\
                        <div class="card-footer">\
                            <div class="card-footer-row">\
                                <span class="card-location-label">From :</span>\
                                <span class="card-location"> &nbsp;<span class="fromCls"> </span>' + record.get("from") + '</span>\
                            </div>\
                            <div class="card-footer-row">\
                                <span class="card-location-label">To :</span>\
                                <span class="card-location"> &nbsp;<span class="toCls"> </span>' + record.get("to") + '</span>\
                            </div>\
                            ' + cardControl + '\
                        </div>\
                    </div>';
            me.down('#textCmp').setHtml(html);
        }
        me.callParent(arguments);
    },
    initialize: function () {
        this.element.on({
            scope       : this,
            tap         : 'confirmButtonTapFired',
            delegate    : 'button.confirmButton'
        });
        this.element.on({
            scope      : this,
            tap        : 'travelBuddiesButtonTapFired',
            delegate   : 'button.travelBuddiesButton'
        });
        this.element.on({
            scope      : this,
            tap        : 'detailsButtonTapFired',
            delegate   : 'button.detailsButton'
        });
        this.element.on({
            scope      : this,
            tap        : 'rejectButtonTapFired',
            delegate   : 'button.rejectButton'
        });
        this.element.on({
            scope      : this,
            tap        : 'acceptButtonTapFired',
            delegate   : 'button.acceptButton'
        });
        this.element.on({
            scope      : this,
            tap        : 'cancelButtonTapFired',
            delegate   : 'button.cancelButton'
        });
        this.element.on({
            scope      : this,
            tap        : 'callButtonTapFired',
            delegate   : 'button.callButton'
        });
        this.element.on({
            scope      : this,
            tap        : 'inviteAgainButtonTapFired',
            delegate   : 'button.inviteAgainButton'
        });
        this.element.on({
            scope      : this,
            tap        : 'bookButtonTapFired',
            delegate   : 'button.bookButton'
        });

        this.callParent(arguments);

    },
    confirmButtonTapFired: function(e) {
        this.fireEvent('requestButtonTap', this);
    },
    travelBuddiesButtonTapFired: function(e) {
        this.fireEvent('travelBuddiesReadOnlyButtonTap', this);
    },
    detailsButtonTapFired: function(e) {
        this.fireEvent('detailsButtonTap', this);
    },
    rejectButtonTapFired: function(e) {
        this.fireEvent('rejectButtonTap', this);
    },
    acceptButtonTapFired: function(e) {
        this.fireEvent('acceptButtonTap', this);
    },
    cancelButtonTapFired: function(e) {
        this.fireEvent('cancelButtonTap', this);
    },
    callButtonTapFired: function(e) {
        this.fireEvent('callButtonTap', this);
    },
    inviteAgainButtonTapFired: function(e) {
        this.fireEvent('inviteAgainButtonTap', this);
    },
    bookButtonTapFired: function(e) {
        this.fireEvent('bookButtonTap', this);
    }
});