
Ext.define('Racloop.view.JourneyViewItem', {
    extend: 'Ext.dataview.component.DataItem',
    alias: 'widget.journeyViewItem',
    xtype : 'journeyViewItem',

    config: {
        cls : 'journeyItem',
        layout: {
            type: 'hbox'
        },
        items: [{
            xtype: 'component',
            flex: 1,
            html: 'dummy',
            itemId: 'textCmp'            
        }]
    },

    updateRecord: function(record) {
        // Provide an implementation to update this container's child items
        var me = this;
        if (record != null) {
            var drivingText = '';
            var dateOfJourney = record.get("dateOfJourney");
            var day = Ext.Date.format(dateOfJourney, 'd');
            var month = Ext.Date.format(dateOfJourney, 'F');
            var time = Ext.Date.format(dateOfJourney, 'g:i A');
            var myStatus = record.get("statusAsParent");
            var myPairId = record.get("myPairId");
            var numberOfCopassengers = record.get("numberOfCopassengers");
            if(record.get("isTaxi")) {
                drivingText = "Taxi";
            }
            else {
                drivingText = "Auto Rickshaw";
            }
            var travelBuddiesButton = '<button  class="racloop-btn racloop-btn-primary travelBuddiesButton"><span class="travelBuddiesCls"></span> 0 Requests</button>'
            if(numberOfCopassengers > 0) {
                travelBuddiesButton = '<button  class="racloop-btn racloop-btn-primary travelBuddiesButton"><span class="travelBuddiesCls"></span> Travel Buddies (' + numberOfCopassengers + ')</button> ' +
                '<button  class="racloop-btn racloop-btn-warning chatButton"><span class="chatCls"></span> Chat</button>';
            }
            var statusMarkup = '<span class="card-label card-label-gray">' + drivingText + '</span>';
            var buttonMarkupTop = '<button  class="racloop-btn racloop-btn-warning viewMapButton"><span class="toCls"></span> Map</button>  ' +
                ' <button class="racloop-btn racloop-btn-primary detailsButton"><span class="rideDetailsCls"></span> Route</button>';
            var buttonMarkupBottom = '<button  class="racloop-btn racloop-btn-danger deleteJourneyButton"><span class="deleteCls"></span> Delete</button>  ' +
                '<button  class="racloop-btn racloop-btn-success searchAgainButton"><span class="searchCls"></span> Search</button>  ' + travelBuddiesButton;
            if(myStatus === "Cancelled") {
                statusMarkup = '<span class="card-label card-label-red">' + myStatus + '</span>';
                buttonMarkupTop = '<button  class="racloop-btn racloop-btn-warning viewMapButton"><span class="toCls"></span> Map</button>';
                buttonMarkupBottom = '';//'<button  class="racloop-btn racloop-btn-info searchAgainButton"><span class="searchCls"></span> Search</button>';
            }
            else {
                //console.log("status : " + myStatus);
                //statusMarkup = '<span class="card-label card-label-blue">' + drivingText + '</span>&nbsp;<span class="card-label card-label-green">' + myStatus + '</span>';
            }
            var html='\
            <div class="card">\
                <div class="card-info">\
                    <div class="card-date">\
                        <div class="card-day">'+day+'</div>\
                        <div class="card-month">'+month+'</div>\
                    </div>\
                    <div class="card-main">\
                        <div>\
                            <span class="card-time"> <span class="timeCls"></span>  '+time+'</span>\
                            <span class="card-pull-right">\
                                ' + buttonMarkupTop + '\
                            </span>\
                        </div>\
                        <div>\
                            ' + statusMarkup + '\
                        </div>\
                    </div>\
                </div>\
    \
                <div class="card-footer">\
                    <div class="card-footer-row">\
                        <span class="card-location-label">From : </span>\
                        <span class="card-location"> &nbsp;<span class="fromCls"> </span>'+record.get("from")+'</span>\
                    </div>\
                    <div class="card-footer-row">\
                        <span class="card-location-label">To : </span>\
                        <span class="card-location"> &nbsp;<span class="toCls"> </span>'+record.get("to")+' </span>\
                    </div>\
                    <div>\
                        <span class="card-control">\
                            ' + buttonMarkupBottom + '\
                        </span>\
                    </div>\
                </div>\
            </div>';
            me.down('#textCmp').setHtml(html);
        }
        me.callParent(arguments);
    },  
    initialize: function () {
        this.element.on({
            scope      : this,
            tap        : 'searchAgainButtonTapFired',
            delegate   : 'button.searchAgainButton'
        });
        this.element.on({
            scope      : this,
            tap        : 'viewJourneyOnMapButtonTapFired',
            delegate   : 'button.viewMapButton'
        });
        this.element.on({
            scope      : this,
            tap        : 'deleteJourneyButtonTapFired',
            delegate   : 'button.deleteJourneyButton'
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
        this.callParent(arguments);

    },
    searchAgainButtonTapFired: function(e) {
        this.fireEvent('searchAgainButtonTap',this);
    },
    viewJourneyOnMapButtonTapFired: function(e) {
        this.fireEvent('viewJourneyOnMapButtonTap',this);
    },
    deleteJourneyButtonTapFired: function(e) {
        this.fireEvent('deleteJourneyButtonTap',this);
    },
    travelBuddiesButtonTapFired : function(e) {
        this.fireEvent('travelBuddiesButtonTap',this);
    },
    detailsButtonTapFired : function(e) {
        this.fireEvent('detailsButtonTap',this);
    },
    chatButtonTapFired : function(e) {
        this.fireEvent('chatButtonTap',this);
    }
});