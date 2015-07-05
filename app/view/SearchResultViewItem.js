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
            var statusMarkup = null;
            var numberOfCopassengers = record.get("numberOfCopassengers");
            var name = null;
            if(numberOfCopassengers == 0) {
                name = record.get("name");
            }
            else if(numberOfCopassengers == 1) {
                name = record.get("name") + ' & 1 more';
                buttonMarkup = "<button  class='racloop-btn racloop-btn-primary travelBuddiesButton'><span class='travelBuddiesCls'></span>Passengers</button> ";
            }
            else if(numberOfCopassengers == 2) {
                name = record.get("name") + ' & 2 more'
                buttonMarkup = "<button  class='racloop-btn racloop-btn-primary travelBuddiesButton'><span class='travelBuddiesCls'></span>Passengers</button> ";
            }
            else {
                console.error("Invalid number of coppassengers : " + numberOfCopassengers);
            }
            if(myStatus != null) {
                statusMarkup = '<span class="card-label card-label-blue">' + myStatus + '</span>';
            }
            else {
                statusMarkup = '<span class="card-label card-label-blue">New</span>';
            }
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
                        buttonMarkup = buttonMarkup + '<button class="racloop-btn racloop-btn-primary confirmButton"><span class="requestRideCls"></span>Invite</button>';
                    }

                }
                else if(myStatus === "Requested") {
                    buttonMarkup = buttonMarkup + '<button  class="racloop-btn racloop-btn-danger cancelButton"><span class="deleteCls"></span>Cancel</button>';
                }
                else if(myStatus === "Request Recieved") {
                    buttonMarkup = buttonMarkup + '<button  class="racloop-btn racloop-btn-danger rejectButton"><span class="deleteCls"></span>Reject</button>  '+
                    '<button  class="racloop-btn racloop-btn-success acceptButton"><span class="acceptCls"></span> Accept </button>  ';
                }
                else if(myStatus.lastIndexOf("Cancelled", 0)===0) {
                    buttonMarkup = '<button class="racloop-btn racloop-btn-danger disabled"><span class="requestRideCls"></span>'+ myStatus +'</</button>';
                }
               
                else if(myStatus === "Accepted") {
                    buttonMarkup = buttonMarkup + '<button  class="racloop-btn racloop-btn-danger cancelButton"><span class="deleteCls"></span>Cancel</button>  '+
                    '<button  class="racloop-btn racloop-btn-success callButton"><span class="mobileCls"></span> Call </button>';
                }
                else if(myStatus === "Rejected") {
                    buttonMarkup = buttonMarkup + '<button class="racloop-btn racloop-btn-primary confirmSearchRequestButton"><span class="requestRideCls"></span>Rejected</button>';
                } else {
                    buttonMarkup = '';
                }
            }
            else {
                legend = "A";
                legendText = "Auto Rickshaw";
                if(myStatus == null) {
                    if (disableRequest) {
                        buttonMarkup = "";
                    }
                    else {
                        buttonMarkup = buttonMarkup + '<button class="racloop-btn racloop-btn-primary confirmButton"><span class="requestRideCls"></span> Request</</button>';
                    }
                }
                else if(myStatus === "Requested") {
                    buttonMarkup = buttonMarkup + '<button  class="racloop-btn racloop-btn-danger cancelButton"><span class="deleteCls"></span>Cancel</button>';
                }
                else if(myStatus === "Request Recieved") {
                    buttonMarkup = buttonMarkup + '<button  class="racloop-btn racloop-btn-danger rejectButton"><span class="deleteCls"></span>Reject</button>  '+
                    '<button  class="racloop-btn racloop-btn-success acceptButton"><span class="acceptCls"></span> Accept </button>  ';
                }
                else if(myStatus.lastIndexOf("Cancelled", 0)===0) {
                    buttonMarkup = '<button class="racloop-btn racloop-btn-danger confirmSearchRequestButton disabled"><span class="requestRideCls"></span>'+ myStatus +'</</button>';
                }

                else if(myStatus === "Accepted") {
                    buttonMarkup = buttonMarkup + '<button  class="racloop-btn racloop-btn-danger cancelButton"><span class="deleteCls"></span>Cancel</button>  '+
                    '<button  class="racloop-btn racloop-btn-success callButton"><span class="mobileCls"></span> Call </button>';
                }
                else if(myStatus === "Rejected") {
                    buttonMarkup = buttonMarkup + '<button class="racloop-btn racloop-btn-primary confirmSearchRequestButton"><span class="requestRideCls"></span>Rejected</button>';
                } else {
                    buttonMarkup = buttonMarkup + '<button class="racloop-btn racloop-btn-primary confirmSearchRequestButton disabled"><span class="requestRideCls"></span>'+ myStatus +'</button>';
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
                                    <span class="card-time"> <span class="calendarCls"></span>  ' + dateString + ' ' + statusMarkup + '</span>\
                                    ' + cardControl + '\
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

        this.callParent(arguments);

    },
    confirmButtonTapFired: function(e) {
        this.fireEvent('requestButtonTap', this);
    },
    travelBuddiesButtonTapFired: function(e) {
        this.fireEvent('travelBuddiesReadOnlyButtonTap', this);
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
    }
});