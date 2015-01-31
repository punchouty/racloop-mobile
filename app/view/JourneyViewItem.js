
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
            var matchedJourneyCount = 0;
            var requestedJourneyCount = 0;
            var drivingText = '';
            var day=Ext.Date.format(record.get("dateOfJourney"), 'd');
            var month=Ext.Date.format(record.get("dateOfJourney"), 'F');
            var time=Ext.Date.format(record.get("dateOfJourney"), 'g:i A');
            if(record.get("numberOfIncomingRequests")) {
                matchedJourneyCount = record.get("numberOfIncomingRequests");
            }
            if(record.get("numberOfOutgoingRequests")) {
                requestedJourneyCount = record.get("numberOfOutgoingRequests");
            }
            //console.log("............... : " + record.get("isDriver"))
            if(record.get("isDriver")) {
                drivingText = "I am driving";
            }
            else {
                drivingText = "I need a Ride";
            }

            var html='<div class="card">\
            <div class="card-info">\
                <div class="card-date">\
                    <div class="card-day">'+day+'</div>\
                    <div class="card-month">'+month+'</div>\
                </div>\
                <div class="card-main">\
                    <div>\
                        <span class="card-time"> <span class="calendarCls"></span>  '+time+'</span>\
                        <span class="card-pull-right"><button  class="racloop-btn racloop-btn-danger deleteJourneyButton"><span class="deleteCls"></span> Delete</button></span>\
                    </div>\
                    <div>\
                        <span class="card-label card-label-blue">'+drivingText+'</span>\
                    </div>\
                </div>\
            </div>\
\
            <div class="card-footer">\
                <div class="card-footer-row">\
                    <span class="card-location-label">From : </span>\
                    <span class="card-location"> &nbsp;<span class="fromCls"> </span>'+record.get("fromPlace")+'</span>\
                </div>\
                <div class="card-footer-row">\
                    <span class="card-location-label">To : </span>\
                    <span class="card-location"> &nbsp;<span class="toCls"> </span>'+record.get("toPlace")+' </span>\
                </div>\
                <div>\
                    <span class="card-control">\
                        <button  class="racloop-btn racloop-btn-warning searchAgainButton"><span class="searchCls"></span> Search</button>\
                        <button  class="racloop-btn racloop-btn-success incomingButton"><span class="incomingCls"></span> Incoming('+matchedJourneyCount+')</button>\
                        <button  class="racloop-btn racloop-btn-primary outgoingButton"><span class="outgoingCls"></span> Outgoing('+requestedJourneyCount+')</button>\
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
            tap        : 'deleteJourneyButtonTapFired',
            delegate   : 'button.deleteJourneyButton'
        });
        this.element.on({
            scope      : this,
            tap        : 'incomingButtonTapFired',
            delegate   : 'button.incomingButton'
        });
        this.element.on({
            scope      : this,
            tap        : 'outgoingButtonTapFired',
            delegate   : 'button.outgoingButton'
        });
        this.callParent(arguments);

    },
    searchAgainButtonTapFired: function(e) {
        this.fireEvent('searchAgainButtonTap',this);
    },
    deleteJourneyButtonTapFired: function(e) {
        this.fireEvent('deleteJourneyButtonTap',this);
    },
    incomingButtonTapFired: function(e) {
        this.fireEvent('incomingButtonTap',this);
    },
    outgoingButtonTapFired: function(e) {
        this.fireEvent('outgoingButtonTap',this);
    }
});